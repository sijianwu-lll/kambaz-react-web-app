export interface Quiz {
    _id: string;
    title: string;
    availableDate: string;
    untilDate: string;
    dueDate: string;
    points: number;
    timeLimit: number;     // 单位：分钟
    numQuestions: number;  // 自动统计 or 手动设置
    published: boolean;
  }
  