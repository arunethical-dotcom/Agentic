import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, FileText, Image as ImageIcon, Loader2, Bot, User } from 'lucide-react';

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello! I can help you understand your discharge summary. You can upload a photo or PDF of your document, or just ask me questions.'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [attachedFile, setAttachedFile] = useState(null); // { name, type, context }
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate size (client-side check)
        if (file.size > 5 * 1024 * 1024) {
            alert('File is too large. Max size is 5MB.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            setAttachedFile({
                name: data.fileName,
                type: file.type.startsWith('image/') ? 'image' : 'pdf',
                context: data.extractedText
            });

            // Add a system notification about the file
            setMessages(prev => [...prev, {
                role: 'system',
                content: `Attached: ${data.fileName} (Text processed)`
            }]);

        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload file: ' + error.message);
        } finally {
            setIsUploading(false);
            // Reset input so same file can be selected again if needed (though infrequent)
            e.target.value = null;
        }
    };

    const sendMessage = async () => {
        if ((!input.trim() && !attachedFile) || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Prepare history for API (exclude system messages)
            const history = messages
                .filter(m => m.role !== 'system')
                .map(m => ({ role: m.role, content: m.content }));

            const payload = {
                prompt: input || "Please analyze the attached document.",
                history: history,
                // If there's an attached file, include its extracted text as context
                // If it was already sent in a previous turn, we might rely on history, 
                // but our backend logic adds it to the current prompt if provided.
                // Simple strategy: Send 'context' only if it's currently attached newly 
                // OR we might want to keep it persistent. 
                // For now, let's assume we send it with the request that accompanies the upload "session".
                context: attachedFile ? attachedFile.context : '' // TODO: Handle multi-file context persistence?
            };

            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.content
            }]);

            // Clear attached file after successfully "using" it in a prompt?
            // Or keep it attached until user removes it?
            // UX Decision: Clear it so next message doesn't re-inject context unless user wants.
            // But usually context should persist.
            // Let's Keep it in state but maybe visually indicate it's "part of the conversation" now.
            // Actually, if we clear it, we rely on the implementation of 'history' in backend to remember it?
            // Our backend doesn't store session state. It receives history on every request.
            // So if I clear 'context' here, and the *backend* only sees 'history', 
            // the 'context' (extracted text) will be lost from the prompt construction unless it was added to 'history'.
            // My backend implementation adds context to the prompt string. It does NOT push it to history array explicitly as a message.
            // So... if I want context to persist, I should probably inject it into the message history myself or keep sending it.
            // Let's inject it into the USER message content for history purposes? 
            // OR better: When we get a response, we assume the AI "knows" it now.
            // If the backend isn't stateful, we must send the context every time OR send the *full conversation including the context*.
            // Let's stick to: sending context with THIS message. 
            // Ideally, the backend should put the context into the history logic.
            // Let's modify the flow: If attachedFile, we append "[Attached File Content...]" to the user's message in the history we maintain?
            // No, that makes the UI messy.

            // Let's simply NOT clear attachedFile for now, so it keeps sending context. 
            // User can click 'remove' to stop sending it.
            // Alternatively, I can append the extracted text to the `history` prompt I send next time.
            // Let's just keep simple: Attached file stays attached until User removes it.

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'system',
                content: 'Error: ' + error.message,
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>

                            {/* Icon */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : (msg.role === 'system' ? 'bg-gray-400' : 'bg-green-600')
                                }`}>
                                {msg.role === 'user' ? <User size={16} className="text-white" /> :
                                    msg.role === 'system' ? <Loader2 size={16} className="text-white" /> :
                                        <Bot size={16} className="text-white" />}
                            </div>

                            {/* Bubble */}
                            <div className={`p-3 rounded-2xl shadow-sm whitespace-pre-wrap ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : (msg.role === 'system'
                                        ? 'bg-gray-200 text-gray-600 text-sm italic py-1 px-3'
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none')
                                } ${msg.isError ? 'bg-red-100 text-red-600 border-red-200' : ''}`}>
                                {msg.content}
                            </div>

                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">

                {/* Attachment Preview */}
                {attachedFile && (
                    <div className="flex items-center gap-2 mb-3 bg-blue-50 p-2 rounded-lg w-fit border border-blue-100">
                        {attachedFile.type === 'image' ? <ImageIcon size={16} className="text-blue-500" /> : <FileText size={16} className="text-red-500" />}
                        <span className="text-sm text-blue-900 font-medium truncate max-w-[200px]">{attachedFile.name}</span>
                        <button
                            onClick={() => setAttachedFile(null)}
                            className="ml-2 text-blue-400 hover:text-blue-600 text-xs font-bold px-1"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <div className="flex items-end gap-2">
                    {/* File Button */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading || isLoading}
                        className={`p-3 rounded-full transition-colors ${isUploading ? 'bg-gray-100' : 'hover:bg-gray-100 text-gray-500'
                            }`}
                        title="Attach file"
                    >
                        {isUploading ? <Loader2 size={20} className="animate-spin text-blue-500" /> : <Paperclip size={20} />}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/*,application/pdf"
                    />

                    {/* Text Input */}
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={attachedFile ? "Ask about this document..." : "Type your message..."}
                        className="flex-1 max-h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
                        rows={1}
                        style={{ minHeight: '44px' }} // Match button height
                    />

                    {/* Send Button */}
                    <button
                        onClick={sendMessage}
                        disabled={(!input.trim() && !attachedFile) || isLoading}
                        className={`p-3 rounded-full transition-colors flex-shrink-0 ${(!input.trim() && !attachedFile) || isLoading
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                            }`}
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    </button>
                </div>
                <div className="text-xs text-gray-400 mt-2 text-center">
                    AI can make mistakes. Please verify important medical information.
                </div>
            </div>
        </div>
    );
}
