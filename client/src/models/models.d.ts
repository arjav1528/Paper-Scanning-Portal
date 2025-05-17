// types/models.d.ts

export interface User {
  _id?: string;
  clerkId: string;
  name: string;
  email: string;
  imageUrl: string;
  role: "TA" | "PROFESSOR" | "UNAUTHORIZED"; // User role
  courseIds?: string[]; // Course._id[]
}

export interface Course {
  _id?: string;
  name: string;
  code: string;
  professorId: string;     // User._id (role: PROFESSOR)
  taIds: string[];         // User._id[] (role: TA)
}

export interface Exam {
  _id?: string;
  courseId: string;         // Course._id
  title: string;
  num_questions: number;
  questionIds: string[];    // Question._id[]
  uploaded_zip: string;     // URL to ZIP file containing all PDFs
  date: Date;
}

export interface Question {
  _id?: string;
  examId: string;           // Exam._id
  question_number: number;  // 1-based index (e.g., Q1, Q2)
  assignedTaId: string;     // User._id (TA)
  max_marks: number;        // Max marks for the question
}

export interface QuestionPageMap {
  questionId: string;       // Question._id
  page_numbers: number[];   // Pages in the PDF where this question appears
}

export interface AnswerSheet {
  _id?: string;
  examId: string;           // Exam._id
  studentId: string;        // BITS student ID
  pdf_url: string;          // URL to student's individual PDF
  question_pages: QuestionPageMap[];
}

export interface Grade {
  _id?: string;
  examId: string;           // Exam._id
  questionId: string;       // Question._id
  studentId: string;        // BITS student ID
  gradedBy: string;         // User._id (TA)
  marks_awarded: number;    // Marks given to student
  comments?: string;
  graded_at: Date;
  graded: boolean;          // ✅ Whether this question is graded
}
