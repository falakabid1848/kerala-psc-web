export interface Option {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface Question {
  id: string;
  year: number;
  category: string;
  sub_category: string;
  exam_name: string;
  exam_code?: string;
  paper_id?: string;
  paper_qno?: number;
  language: 'en' | 'ml';
  question_type: 'statement' | 'mcq' | 'match' | 'assertion';
  question_text: string;
  statements?: string[];
  options: Option[];
  correct_option: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  status: 'approved' | 'pending_review';
  source_url?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  sub_categories: string[];
  years: number[];
}

export interface ExamNotification {
  id: string;
  category_number: string;
  post_name: string;
  department: string;
  scale_of_pay: string;
  vacancies: string;
  qualification: string;
  age_limit: string;
  last_date: string;
  exam_date: string;
  status: 'active' | 'upcoming' | 'closed';
  thulasi_link: string;
  notification_pdf_url: string;
  syllabus: string[];
  recommended_category_id: string;
  is_featured?: boolean;
}

export interface PreviousPaper {
  id: string;
  exam_name: string;
  year: number;
  question_code: string;
  stage?: string;
  total_questions: number;
  duration_minutes: number;
  category: string;
  pdf_download_url: string;
  answer_key_url: string;
  cut_off?: string;
  description: string;
  is_interactive_available: boolean;
}

export interface QuestionBankStats {
  total: number;
  byType: Record<string, number>;
  byCategory: Record<string, number>;
  byYear: Record<string, number>;
  statementCount: number;
  mcqCount: number;
  matchCount: number;
  assertionCount: number;
}
