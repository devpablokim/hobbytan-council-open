export type Role = 'admin' | 'team_lead' | 'student';
export type WeekStatus = 'not-started' | 'in-progress' | 'completed';
export type CohortStatus = 'recruiting' | 'active' | 'completed';
export type TeamStatus = 'active' | 'completed';
export type AssignmentType = 'file' | 'text' | 'link';

export interface Cohort {
  cohortId: string;
  name: string;
  cohortNumber: number;
  startDate: string;
  endDate: string;
  status: CohortStatus;
  maxTeams: number;
}

export interface Assignment {
  assignmentId: string;
  title: string;
  description: string;
  dueOffsetDays: number;
  type: AssignmentType;
  required: boolean;
}

export interface Material {
  title: string;
  url: string;
  type: 'video' | 'doc' | 'link';
}

export interface Curriculum {
  curriculumId: string;
  cohortId: string;
  weekNumber: number;
  title: string;
  description: string;
  objectives: string[];
  materials: Material[];
  assignments: Assignment[];
  order: number;
}

export interface WeekProgress {
  status: WeekStatus;
  completedAt: string | null;
}

export interface UserProgress {
  week0: WeekProgress;
  week1: WeekProgress;
  week2: WeekProgress;
  week3: WeekProgress;
  week4: WeekProgress;
  week5: WeekProgress;
}

export interface User {
  userId: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  role: Role;
  cohortId: string;
  teamId: string | null;
  progress: UserProgress;
}

export interface TeamProgress {
  week0: number;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
  week5: number;
}

export interface Team {
  teamId: string;
  cohortId: string;
  name: string;
  teamLeadId: string;
  members: string[];
  currentWeek: number;
  progress: TeamProgress;
  status: TeamStatus;
}

export interface Feedback {
  comment: string;
  score: number | null;
  reviewedBy: string;
  reviewedAt: string;
}

export interface Submission {
  submissionId: string;
  userId: string;
  teamId: string;
  cohortId: string;
  weekNumber: number;
  assignmentId: string;
  type: AssignmentType;
  content: string;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  submittedAt: string;
  feedback: Feedback | null;
}

export interface Post {
  postId: string;
  authorId: string;
  authorName: string;
  authorPhotoURL: string | null;
  cohortId: string;
  teamId: string | null;
  title: string;
  content: string;
  attachments: { url: string; fileName: string; fileSize: number }[];
  likesCount: number;
  commentsCount: number;
  pinned: boolean;
  createdAt: string;
}

export interface Comment {
  commentId: string;
  authorId: string;
  authorName: string;
  authorPhotoURL: string | null;
  content: string;
  createdAt: string;
}
