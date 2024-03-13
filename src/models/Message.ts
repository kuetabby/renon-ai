import type { AnalyzeDtoConversation } from './Analyze';

export interface MessageStartAnalyze {
  states: AnalyzeDtoConversation;
  stages: any;
  chatId: number;
  messageId: number;
  messageText: string;
}
