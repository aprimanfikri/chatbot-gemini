'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 border border-black/10 bg-white p-3 mx-4 rounded-t-3xl shadow-md">
        <div className="flex-1">
          <Textarea
            className="w-full px-3 py-2 border-none bg-transparent focus:outline-none"
            placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            rows={1}
          />
        </div>
        <Button
          type="button"
          className="p-2.5 rounded-full"
          onClick={handleSend}
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
