import fs from 'fs';
import path from 'path';
import { Question, Category, ExamNotification, PreviousPaper, QuestionBankStats, CurrentAffairEntry } from '@/types';

function getDataDir(): string {
  const candidates = [
    path.resolve(process.cwd(), 'data'),
    path.resolve(process.cwd(), '../../data'),
    path.resolve(process.cwd(), '../data'),
    '/Users/abidkt/.gemini/antigravity/scratch/kerala-psc-quiz/data'
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  return candidates[0];
}

const DATA_DIR = getDataDir();
const QUESTIONS_FILE = path.join(DATA_DIR, 'questions.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const NOTIFICATIONS_FILE = path.join(DATA_DIR, 'notifications.json');
const PREVIOUS_PAPERS_FILE = path.join(DATA_DIR, 'previous_papers.json');
const CURRENT_AFFAIRS_FILE = path.join(DATA_DIR, 'current_affairs.json');

// Memory Cache
let cachedQuestions: Question[] | null = null;
let cachedStats: QuestionBankStats | null = null;
let cachedCategories: Category[] | null = null;
let cachedNotifications: ExamNotification[] | null = null;
let cachedPreviousPapers: PreviousPaper[] | null = null;
let cachedCurrentAffairs: CurrentAffairEntry[] | null = null;

export function getQuestions(): Question[] {
  if (cachedQuestions) {
    return cachedQuestions;
  }

  try {
    if (!fs.existsSync(QUESTIONS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(QUESTIONS_FILE, 'utf-8');
    cachedQuestions = JSON.parse(data);
    return cachedQuestions || [];
  } catch (error) {
    console.error('Error reading questions.json:', error);
    return [];
  }
}

export function saveQuestions(questions: Question[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(questions, null, 2), 'utf-8');
    cachedQuestions = questions;
    cachedStats = null; // Invalidate stats cache
  } catch (error) {
    console.error('Error saving questions.json:', error);
  }
}

export function getQuestionBankStats(): QuestionBankStats {
  if (cachedStats) {
    return cachedStats;
  }

  const all = getQuestions();
  const byType: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  const byYear: Record<string, number> = {};

  let statementCount = 0;
  let mcqCount = 0;
  let matchCount = 0;
  let assertionCount = 0;

  for (const q of all) {
    const t = q.question_type || 'statement';
    byType[t] = (byType[t] || 0) + 1;
    if (t === 'statement') statementCount++;
    else if (t === 'mcq') mcqCount++;
    else if (t === 'match') matchCount++;
    else if (t === 'assertion') assertionCount++;

    const cat = q.category || 'General';
    byCategory[cat] = (byCategory[cat] || 0) + 1;

    const yr = String(q.year || 2024);
    byYear[yr] = (byYear[yr] || 0) + 1;
  }

  cachedStats = {
    total: all.length,
    byType,
    byCategory,
    byYear,
    statementCount,
    mcqCount,
    matchCount,
    assertionCount
  };

  return cachedStats;
}

export interface QuestionFilters {
  category?: string | null;
  subCategory?: string | null;
  year?: string | null;
  language?: string | null;
  type?: string | null;
  search?: string | null;
  difficulty?: string | null;
  exam?: string | null;
  paper_id?: string | null;
  status?: string | null;
}

export function queryQuestions(
  filters: QuestionFilters,
  page = 1,
  limit = 20,
  random = false
): { questions: Question[]; total: number; page: number; totalPages: number } {
  let list = getQuestions();

  const status = filters.status || 'approved';
  if (status !== 'all') {
    list = list.filter((q) => q.status === status);
  }

  if (filters.type && filters.type !== 'all') {
    list = list.filter((q) => (q.question_type || 'statement') === filters.type);
  }

  if (filters.category && filters.category !== 'All') {
    list = list.filter((q) => q.category.toLowerCase() === filters.category!.toLowerCase());
  }

  if (filters.subCategory && filters.subCategory !== 'All') {
    list = list.filter((q) => q.sub_category.toLowerCase() === filters.subCategory!.toLowerCase());
  }

  if (filters.year && filters.year !== 'All') {
    const y = parseInt(filters.year, 10);
    if (!isNaN(y)) {
      list = list.filter((q) => q.year === y);
    }
  }

  if (filters.language && filters.language !== 'all') {
    list = list.filter((q) => q.language === filters.language);
  }

  if (filters.difficulty && filters.difficulty !== 'all') {
    list = list.filter((q) => q.difficulty === filters.difficulty);
  }

  if (filters.paper_id && filters.paper_id !== 'all') {
    const pid = filters.paper_id.trim();
    list = list.filter((q) => q.paper_id === pid || q.exam_code === pid);
    list.sort((a, b) => (a.paper_qno || 0) - (b.paper_qno || 0));
  }

  if (filters.exam && filters.exam !== 'All') {
    const exTerm = filters.exam.toLowerCase();
    list = list.filter(
      (q) =>
        (q.paper_id && q.paper_id.toLowerCase() === exTerm) ||
        (q.exam_code && q.exam_code.toLowerCase().includes(exTerm)) ||
        q.exam_name.toLowerCase().includes(exTerm)
    );
  }

  if (filters.search && filters.search.trim() !== '') {
    const s = filters.search.toLowerCase();
    list = list.filter(
      (q) =>
        q.question_text.toLowerCase().includes(s) ||
        (q.explanation && q.explanation.toLowerCase().includes(s)) ||
        (q.statements && q.statements.some((st) => st.toLowerCase().includes(s))) ||
        (q.options && q.options.some((opt) => opt.text.toLowerCase().includes(s)))
    );
  }

  const total = list.length;

  if (random) {
    // Fisher-Yates shuffle a slice
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const result = shuffled.slice(0, limit);
    return {
      questions: result,
      total,
      page: 1,
      totalPages: Math.ceil(total / limit)
    };
  }

  const offset = (page - 1) * limit;
  const paginated = list.slice(offset, offset + limit);

  return {
    questions: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}

export function getCategories(): Category[] {
  if (cachedCategories) return cachedCategories;
  try {
    if (!fs.existsSync(CATEGORIES_FILE)) return [];
    const data = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
    cachedCategories = JSON.parse(data);
    return cachedCategories || [];
  } catch (error) {
    console.error('Error reading categories.json:', error);
    return [];
  }
}

export function getNotifications(): ExamNotification[] {
  if (cachedNotifications) return cachedNotifications;
  try {
    if (!fs.existsSync(NOTIFICATIONS_FILE)) return [];
    const data = fs.readFileSync(NOTIFICATIONS_FILE, 'utf-8');
    cachedNotifications = JSON.parse(data);
    return cachedNotifications || [];
  } catch (error) {
    console.error('Error reading notifications.json:', error);
    return [];
  }
}

export function getPreviousPapers(): PreviousPaper[] {
  if (cachedPreviousPapers) return cachedPreviousPapers;
  try {
    if (!fs.existsSync(PREVIOUS_PAPERS_FILE)) return [];
    const data = fs.readFileSync(PREVIOUS_PAPERS_FILE, 'utf-8');
    cachedPreviousPapers = JSON.parse(data);
    return cachedPreviousPapers || [];
  } catch (error) {
    console.error('Error reading previous_papers.json:', error);
    return [];
  }
}

export function getCurrentAffairs(): CurrentAffairEntry[] {
  if (cachedCurrentAffairs) return cachedCurrentAffairs;
  try {
    if (!fs.existsSync(CURRENT_AFFAIRS_FILE)) return [];
    const data = fs.readFileSync(CURRENT_AFFAIRS_FILE, 'utf-8');
    cachedCurrentAffairs = JSON.parse(data);
    return cachedCurrentAffairs || [];
  } catch (error) {
    console.error('Error reading current_affairs.json:', error);
    return [];
  }
}

export function queryCurrentAffairs(filters: {
  month?: string | null;
  category?: string | null;
  search?: string | null;
  year?: number | null;
}): CurrentAffairEntry[] {
  let list = getCurrentAffairs();

  if (filters.year) {
    list = list.filter((e) => e.year === filters.year);
  }

  if (filters.month && filters.month !== 'All') {
    const m = filters.month.toLowerCase();
    list = list.filter(
      (e) => e.month.toLowerCase().includes(m) || e.month_slug.toLowerCase() === m
    );
  }

  if (filters.category && filters.category !== 'All') {
    const c = filters.category.toLowerCase();
    list = list.filter((e) => e.category.toLowerCase() === c);
  }

  if (filters.search && filters.search.trim() !== '') {
    const s = filters.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.title.toLowerCase().includes(s) ||
        e.malayalam_title.toLowerCase().includes(s) ||
        e.summary.toLowerCase().includes(s) ||
        e.tags.some((t) => t.toLowerCase().includes(s)) ||
        e.key_points.some((k) => k.toLowerCase().includes(s))
    );
  }

  // Sort descending by date (latest first)
  list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return list;
}
