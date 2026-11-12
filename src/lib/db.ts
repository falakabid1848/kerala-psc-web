import fs from 'fs';
import path from 'path';
import { Question } from '@/types';

export interface QuizAttempt {
  id: string;
  userName: string;
  yearFilter: string;
  categoryFilter: string;
  subCategoryFilter: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeTakenSeconds: number;
  answers: Record<string, string>;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  questionId: string;
  createdAt: string;
}

export interface QuestionReport {
  id: string;
  questionId: string;
  questionText: string;
  reason: 'wrong_answer' | 'typo' | 'missing_statement' | 'syllabus_outdated' | 'other';
  details?: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedAt?: string;
}

function getDataDir(): string {
  const candidates = [
    path.resolve(process.cwd(), '../../data'),
    path.resolve(process.cwd(), '../data'),
    path.resolve(process.cwd(), 'data'),
    '/Users/abidkt/.gemini/antigravity/scratch/kerala-psc-quiz/data'
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  return candidates[0];
}

const DATA_DIR = getDataDir();
const ATTEMPTS_FILE = path.join(DATA_DIR, 'attempts.json');
const BOOKMARKS_FILE = path.join(DATA_DIR, 'bookmarks.json');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');
const QUESTIONS_FILE = path.join(DATA_DIR, 'questions.json');

// --- ATTEMPTS STORAGE ---
export function getAttempts(): QuizAttempt[] {
  try {
    if (!fs.existsSync(ATTEMPTS_FILE)) return [];
    const data = fs.readFileSync(ATTEMPTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading attempts:', err);
    return [];
  }
}

export function saveAttempt(attempt: Omit<QuizAttempt, 'id' | 'createdAt'>): QuizAttempt {
  const attempts = getAttempts();
  const newAttempt: QuizAttempt = {
    ...attempt,
    id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  attempts.unshift(newAttempt);

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify(attempts, null, 2), 'utf-8');
  return newAttempt;
}

// --- BOOKMARKS STORAGE ---
export function getBookmarks(): string[] {
  try {
    if (!fs.existsSync(BOOKMARKS_FILE)) return [];
    const data = fs.readFileSync(BOOKMARKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading bookmarks:', err);
    return [];
  }
}

export function toggleBookmark(questionId: string): { bookmarked: boolean } {
  let bookmarks = getBookmarks();
  const index = bookmarks.indexOf(questionId);
  let bookmarked = false;

  if (index >= 0) {
    bookmarks.splice(index, 1);
    bookmarked = false;
  } else {
    bookmarks.unshift(questionId);
    bookmarked = true;
  }

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(BOOKMARKS_FILE, JSON.stringify(bookmarks, null, 2), 'utf-8');
  return { bookmarked };
}

// --- REPORTS STORAGE ---
export function getReports(): QuestionReport[] {
  try {
    if (!fs.existsSync(REPORTS_FILE)) return [];
    const data = fs.readFileSync(REPORTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading reports:', err);
    return [];
  }
}

export function saveReport(report: Omit<QuestionReport, 'id' | 'createdAt' | 'status'>): QuestionReport {
  const reports = getReports();
  const newReport: QuestionReport = {
    ...report,
    id: `rep-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  reports.unshift(newReport);

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2), 'utf-8');
  return newReport;
}

export function updateReportStatus(reportId: string, status: 'resolved' | 'dismissed'): boolean {
  const reports = getReports();
  const report = reports.find((r) => r.id === reportId);
  if (!report) return false;

  report.status = status;
  report.resolvedAt = new Date().toISOString();

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2), 'utf-8');
  return true;
}

export function updateQuestionAnswer(questionId: string, newCorrectOption: string): boolean {
  try {
    if (!fs.existsSync(QUESTIONS_FILE)) return false;
    const questions: Question[] = JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf-8'));
    const q = questions.find((item) => item.id === questionId);
    if (!q) return false;

    q.correct_option = newCorrectOption.toUpperCase();
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(questions, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error updating question answer:', err);
    return false;
  }
}
