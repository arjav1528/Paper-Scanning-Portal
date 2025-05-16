
export default interface User {
  _id?: string;
  clerkId: string;
  name: string;
  email: string;
  imageUrl: string;
  role: "TA" | "PROFESSOR";
  courseIds: string[];
}



export default interface Course {
  _id?: string;
  name: string;
  code: string;
  professorId: string;
  taIds: string[];
}


export default interface Exam {
  _id?: string;
  courseId: string;
  title: string;
  num_questions: number;
  questionIds: string[];
  uploaded_zip: string;
  date: Date;
}

export default interface Question {
  _id?: string;
  examId: string;
  question_number: number;
  assignedTaId: string;
}

export interface QuestionPageMap {
  questionId: string;
  page_numbers: number[];
}

export default interface AnswerSheet {
  _id?: string;
  examId: string;
  studentId: string;
  pdf_url: string;
  question_pages: QuestionPageMap[];
}


export default interface Grade {
  _id?: string;
  questionId: string;
  examId: string;
  studentId: string;
  gradedBy: string; // TAid
  marks_awarded: number;
  comments?: string;
  graded_at: Date;
}
