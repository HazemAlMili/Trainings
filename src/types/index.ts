export type BrandDirection = 'A' | 'B' | 'C';

export type LearnerAudience = 'child' | 'adult' | 'work';
export type LanguageCode = 'hebrew' | 'english' | 'german' | 'french';
export type LessonDuration = 25 | 55;

export interface PackageTier {
  id: string;
  name: string;
  sessions: number;
  price25: number;
  unitPrice25: number;
  price55: number;
  unitPrice55: number;
  isPopular?: boolean;
  editorialBadge?: string;
  features: string[];
}

export interface TeacherProfile {
  slug: string;
  firstName: string;
  languages: LanguageCode[];
  audiences: LearnerAudience[];
  shortBio: string;
  fullBio: string;
  approach: string;
  avatarUrl?: string;
  videoUrl?: string;
  arabicSupport: boolean;
  status: 'verified' | 'staging_placeholder';
}

export interface StoryItem {
  slug: string;
  title: string;
  excerpt: string;
  publicDisplayName: string;
  learnerSegment: LearnerAudience;
  language: LanguageCode;
  startingPoint: string;
  theExperience: string;
  observedGrowth: string;
  quote?: string;
  mediaType: 'text' | 'video' | 'audio';
  sourceDate: string;
  isVerified: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'for-parents' | 'conversation' | 'methods' | 'school' | 'novatova';
  readTimeMinutes: number;
  date: string;
  sections: { heading: string; body: string }[];
  targetAudience: LearnerAudience;
  relatedCta: string;
}

export interface FaqItem {
  id: string;
  category: 'getting-started' | 'lessons' | 'teachers' | 'pricing' | 'parents' | 'privacy';
  question: string;
  answer: string;
  isPolicyReview?: boolean;
}

export interface TrialFormData {
  audience: LearnerAudience;
  language: LanguageCode;
  childAge?: number;
  adultGoal?: string;
  level: string;
  focusAreas: string[];
  duration: LessonDuration;
  contactName: string;
  phone: string;
  notes?: string;
  consent: boolean;
  sourceCode: string;
}

export interface AttributionParams {
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  creative_id?: string;
  source?: string;
  language?: string;
  audience?: string;
  package?: string;
  duration?: string;
}

