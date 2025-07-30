export interface User {
  id: string;
  username: string; // The user's displayed name
}

export interface Question {
  id: string;
  title: string;
  content: string;
  authorId: string;   // Link to the user who asked
  authorUsername: string; // Display name of the user
  createdAt: string;
  answersCount: number; // To show how many answers a question has
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  authorId: string;    // Link to the user who answered
  authorUsername: string;  // Display name of the user
  createdAt: string;
}

// For form inputs
export interface NewQuestionFormData {
  title: string;
  content: string;
}

export interface NewAnswerFormData {
  content: string;
}
