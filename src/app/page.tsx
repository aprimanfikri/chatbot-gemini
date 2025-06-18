'use client';

import React, { useState } from 'react';
import ChatInput from '@/components/chat-input';
import MessageWindow from '@/components/message-window';
import { chatWithGemini } from '@/lib/action';
import { ScrollArea } from '@/components/ui/scroll-area';

const HomePage = () => {
  const [history, setHistory] = useState<ChatHistory>([]);

  const handleSend = async (message: string) => {
    const userMessage: Message = {
      role: 'user',
      parts: [{ text: message }],
    };

    const updatedHistory = [...history, userMessage];
    setHistory(updatedHistory);

    try {
      const result = await chatWithGemini(message, updatedHistory);

      if ('error' in result) {
        console.error(result.error);
        return;
      }

      const aiMessage: Message = {
        role: 'model',
        parts: [{ text: result.response }],
      };

      setHistory([...updatedHistory, aiMessage]);
    } catch (error) {
      console.error('Request Failed:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollArea className="h-[calc(100vh-100px)]">
        <MessageWindow history={history} />
      </ScrollArea>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default HomePage;
