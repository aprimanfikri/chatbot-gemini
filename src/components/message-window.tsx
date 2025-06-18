'use client';

import { Bot, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface MessageWindowProps {
  history: ChatHistory;
}

const MessageWindow = ({ history }: MessageWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {history.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={index}
              className={`flex items-end ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="mr-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                    <Bot size={16} className="text-gray-700" />
                  </div>
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-lg shadow-sm max-w-xs sm:max-w-md whitespace-pre-wrap break-words ${
                  isUser
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.parts.map((part, i) => (
                  <span key={i}>{part.text}</span>
                ))}
              </div>
              {isUser && (
                <div className="ml-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                    <User size={16} className="text-white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageWindow;
