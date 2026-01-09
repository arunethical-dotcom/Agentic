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
    const [attachedFile, setAttachedFile] = useState(null); // { name, type, file }
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate size (client-side check)
        if (file.size > 5 * 1024 * 1024) {
            alert('File is too large. Max size is 5MB.');
            return;
        }

        // Validate file type
        const isImage = file.type.startsWith('image/');
        const isPdf = file.type === 'application/pdf';

        if (!isImage && !isPdf) {
            alert('Invalid file type. Only images (PNG, JPEG) and PDFs are supported.');
            return;
        }

        // Store file for sending with message
        setAttachedFile({
            name: file.name,
            type: isImage ? 'image' : 'pdf',
            file: file
        });

        // Reset input so same file can be selected again if needed
        e.target.value = null;
    };

    const sendMessage = async () => {
        const messageText = input.trim();
        if (!messageText && !attachedFile) return;
        if (isLoading) return;

        // Save input value before clearing
        const currentInput = messageText;
        const currentFile = attachedFile;

        // Show user message in UI
        const userMessageText = currentInput || (currentFile ? `📎 ${currentFile.name}` : '');
        const userMessage = { role: 'user', content: userMessageText };
        setMessages(prev => [...prev, userMessage]);

        // Clear inputs immediately so user knows it's being sent
        setInput('');
        setAttachedFile(null);
        setIsLoading(true);

        try {
            // Prepare history for API (exclude system messages and current message)
            const history = messages
                .filter(m => m.role !== 'system')
                .map(m => ({ role: m.role, content: m.content }));

            // Use FormData to send file + message together
            const formData = new FormData();

            // Add file if attached
            if (currentFile && currentFile.file) {
                formData.append('file', currentFile.file);
            }

            // Add message/prompt
            if (currentInput) {
                formData.append('message', currentInput);
            } else if (currentFile) {
                // Default prompt if no message provided
                formData.append('message', 'Please analyze this medical document and explain it in simple, patient-friendly terms.');
            }

            // Add history as JSON string
            formData.append('history', JSON.stringify(history));

            // Send to unified query endpoint
            const response = await fetch(`${API_URL}/api/query`, {
                method: 'POST',
                // Do NOT set Content-Type header - browser will set it with boundary for FormData
                body: formData
            });

            // Check if response is OK before trying to parse JSON
            if (!response.ok) {
                let errorMessage = `Server error: ${response.status}`;
                try {
                    const errorData = await response.json();
                    // Use the most detailed message available
                    errorMessage = errorData.details || errorData.error || errorData.fullError || response.statusText;
                } catch (e) {
                    // If JSON parsing fails, use the status text
                    errorMessage = response.statusText || 'Unknown server error';
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (!data.content) {
                throw new Error('Invalid response from server: missing content');
            }

            // Add assistant response
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.content
            }]);


        } catch (error) {
            console.error('Chat error details:', error);
            const errorMessage = error.message || 'An unknown error occurred';

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `🚨 **AI Pipeline Error**\n\n${errorMessage}\n\n*Technical Details: The system attempted to recover using multiple models, but all attempts failed. Please check your network or API status.*`,
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
                        disabled={isLoading}
                        className="p-3 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                        title="Attach file (Image or PDF)"
                    >
                        <Paperclip size={20} />
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
