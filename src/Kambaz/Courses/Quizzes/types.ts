export type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_THE_BLANK";

export interface Question {
  _id: string;
  title: string;
  type: QuestionType;
  points: number;
  question: string;
  options?: string[];         // ✅ For multiple choice
  correct?: number[];         // ✅ Index(es) of correct options
  answer?: boolean | string[]; // ✅ For true/false or fill-in-the-blank
  blanks?: string[][];        // ✅ Updated: multiple answers per blank
}

export interface Quiz {
  _id: string;
  title: string;
  description?: string;
  availableDate: string;
  untilDate: string;
  dueDate: string;
  points: number;
  timeLimit: number;
  numQuestions: number;
  published: boolean;
  shuffle?: boolean;
  questions?: Question[];     // ✅ Quiz 中包含的题目列表
}