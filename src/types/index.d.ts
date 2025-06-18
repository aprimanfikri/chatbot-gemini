declare global {
  type MessageRole = 'user' | 'model';

  interface MessagePart {
    text: string;
  }

  interface Message {
    role: MessageRole;
    parts: MessagePart[];
  }

  type ChatHistory = Array<Message>;

  interface GenerationConfig {
    temperature: number;
    topP: number;
    responseMimeType: string;
  }

  interface ChatSettings {
    temperature: number;
    model: string;
    systemInstruction: string;
  }

  interface ModelOption {
    id: string;
    name: string;
  }
}

export {};
