import type { Cohort, Curriculum, Team, User, Submission, Post } from '../types';

export const cohort: Cohort = {
  cohortId: 'cohort-3',
  name: '3기',
  cohortNumber: 3,
  startDate: '2026-03-03',
  endDate: '2026-04-07',
  status: 'active',
  maxTeams: 5,
};

export const curriculum: Curriculum[] = [
  {
    curriculumId: 'cur-0', cohortId: 'cohort-3', weekNumber: 0, order: 0,
    title: 'Week 0: 오리엔테이션 & 자기소개',
    description: '워크샵 소개, 팀 빌딩, AI 도구 설치 및 환경 세팅',
    objectives: ['워크샵 목표 이해', '팀원 소개 및 네트워킹', 'AI 도구 설치 (ChatGPT, Claude, Gemini)'],
    materials: [{ title: '오리엔테이션 가이드', url: '#', type: 'doc' }],
    assignments: [
      { assignmentId: 'a0-1', title: '자기소개 작성', description: '본인의 업무와 AI 활용 목표를 작성하세요', dueOffsetDays: 3, type: 'text', required: true },
      { assignmentId: 'a0-2', title: 'AI 도구 설치 인증', description: 'AI 도구 설치 완료 스크린샷을 업로드하세요', dueOffsetDays: 5, type: 'file', required: true },
    ],
  },
  {
    curriculumId: 'cur-1', cohortId: 'cohort-3', weekNumber: 1, order: 1,
    title: 'Week 1: AI 기초 & 프롬프트 엔지니어링',
    description: 'AI 도구 기본 사용법과 효과적인 프롬프트 작성법',
    objectives: ['프롬프트 엔지니어링 기본 원리 이해', '역할 지정 프롬프트 작성', '체인 오브 쏘트 기법 활용'],
    materials: [{ title: '프롬프트 엔지니어링 101', url: '#', type: 'video' }],
    assignments: [
      { assignmentId: 'a1-1', title: '프롬프트 실습 과제', description: '주어진 시나리오에 맞는 프롬프트 3개를 작성하세요', dueOffsetDays: 5, type: 'text', required: true },
    ],
  },
  {
    curriculumId: 'cur-2', cohortId: 'cohort-3', weekNumber: 2, order: 2,
    title: 'Week 2: 업무별 AI 활용 실습',
    description: '마케팅, 영업, 기획, CS, 개발 등 직무별 AI 활용',
    objectives: ['직무별 AI 활용 시나리오 학습', '실제 업무에 AI 적용 실습', '팀 프로젝트 기획'],
    materials: [{ title: '직무별 AI 활용 사례집', url: '#', type: 'doc' }],
    assignments: [
      { assignmentId: 'a2-1', title: '업무 AI 적용 보고서', description: '본인 업무에 AI를 적용한 사례 보고서를 작성하세요', dueOffsetDays: 5, type: 'file', required: true },
    ],
  },
  {
    curriculumId: 'cur-3', cohortId: 'cohort-3', weekNumber: 3, order: 3,
    title: 'Week 3: 자동화 워크플로우',
    description: 'Make, Zapier, n8n을 활용한 자동화 워크플로우 설계',
    objectives: ['자동화 도구 기본 이해', '업무 자동화 워크플로우 설계', '팀 프로젝트 수행'],
    materials: [{ title: 'Make/Zapier 튜토리얼', url: '#', type: 'video' }],
    assignments: [
      { assignmentId: 'a3-1', title: '자동화 워크플로우 제출', description: '설계한 자동화 워크플로우 링크를 제출하세요', dueOffsetDays: 5, type: 'link', required: true },
    ],
  },
  {
    curriculumId: 'cur-4', cohortId: 'cohort-3', weekNumber: 4, order: 4,
    title: 'Week 4: 팀 프로젝트 & 피드백',
    description: '팀 프로젝트 수행 및 중간 피드백 세션',
    objectives: ['팀 프로젝트 완성', '중간 발표 및 피드백', '개선 계획 수립'],
    materials: [{ title: '팀 프로젝트 가이드', url: '#', type: 'doc' }],
    assignments: [
      { assignmentId: 'a4-1', title: '팀 프로젝트 중간 발표', description: '팀 프로젝트 진행 상황을 발표하세요', dueOffsetDays: 5, type: 'file', required: true },
    ],
  },
  {
    curriculumId: 'cur-5', cohortId: 'cohort-3', weekNumber: 5, order: 5,
    title: 'Week 5: 통합 과제 발표 & 수료',
    description: '최종 발표(경쟁 PT), 수료 및 AI 슈퍼유저 인증',
    objectives: ['최종 프로젝트 발표', 'AI 슈퍼유저 인증 획득', '수료 후 계획 수립'],
    materials: [{ title: '최종 발표 템플릿', url: '#', type: 'doc' }],
    assignments: [
      { assignmentId: 'a5-1', title: '최종 발표 자료', description: '최종 발표 PPT를 업로드하세요', dueOffsetDays: 3, type: 'file', required: true },
    ],
  },
];

export const users: User[] = [
  // Admin
  { userId: 'admin-1', displayName: '김하비 (관리자)', email: 'admin@hobbytan.com', photoURL: null, role: 'admin', cohortId: 'cohort-3', teamId: null, progress: { week0: { status: 'completed', completedAt: null }, week1: { status: 'completed', completedAt: null }, week2: { status: 'completed', completedAt: null }, week3: { status: 'completed', completedAt: null }, week4: { status: 'completed', completedAt: null }, week5: { status: 'completed', completedAt: null } } },
  // Team Alpha
  { userId: 'u1', displayName: '이수진', email: 'sujin@example.com', photoURL: null, role: 'team_lead', cohortId: 'cohort-3', teamId: 'team-alpha', progress: { week0: { status: 'completed', completedAt: '2026-03-05' }, week1: { status: 'completed', completedAt: '2026-03-12' }, week2: { status: 'in-progress', completedAt: null }, week3: { status: 'not-started', completedAt: null }, week4: { status: 'not-started', completedAt: null }, week5: { status: 'not-started', completedAt: null } } },
  { userId: 'u2', displayName: '박민수', email: 'minsu@example.com', photoURL: null, role: 'student', cohortId: 'cohort-3', teamId: 'team-alpha', progress: { week0: { status: 'completed', completedAt: '2026-03-06' }, week1: { status: 'completed', completedAt: '2026-03-13' }, week2: { status: 'in-progress', completedAt: null }, week3: { status: 'not-started', completedAt: null }, week4: { status: 'not-started', completedAt: null }, week5: { status: 'not-started', completedAt: null } } },
  { userId: 'u3', displayName: '최지은', email: 'jieun@example.com', photoURL: null, role: 'student', cohortId: 'cohort-3', teamId: 'team-alpha', progress: { week0: { status: 'completed', completedAt: '2026-03-04' }, week1: { status: 'in-progress', completedAt: null }, week2: { status: 'not-started', completedAt: null }, week3: { status: 'not-started', completedAt: null }, week4: { status: 'not-started', completedAt: null }, week5: { status: 'not-started', completedAt: null } } },
  // Team Beta
  { userId: 'u4', displayName: '정현우', email: 'hyunwoo@example.com', photoURL: null, role: 'team_lead', cohortId: 'cohort-3', teamId: 'team-beta', progress: { week0: { status: 'completed', completedAt: '2026-03-05' }, week1: { status: 'completed', completedAt: '2026-03-11' }, week2: { status: 'completed', completedAt: '2026-03-18' }, week3: { status: 'in-progress', completedAt: null }, week4: { status: 'not-started', completedAt: null }, week5: { status: 'not-started', completedAt: null } } },
  { userId: 'u5', displayName: '김서연', email: 'seoyeon@example.com', photoURL: null, role: 'student', cohortId: 'cohort-3', teamId: 'team-beta', progress: { week0: { status: 'completed', completedAt: '2026-03-06' }, week1: { status: 'completed', completedAt: '2026-03-12' }, week2: { status: 'completed', completedAt: '2026-03-19' }, week3: { status: 'in-progress', completedAt: null }, week4: { status: 'not-started', completedAt: null }, week5: { status: 'not-started', completedAt: null } } },
  { userId: 'u6', displayName: '한동현', email: 'donghyun@example.com', photoURL: null, role: 'student', cohortId: 'cohort-3', teamId: 'team-beta', progress: { week0: { status: 'completed', completedAt: '2026-03-07' }, week1: { status: 'completed', completedAt: '2026-03-14' }, week2: { status: 'in-progress', completedAt: null }, week3: { status: 'not-started', completedAt: null }, week4: { status: 'not-started', completedAt: null }, week5: { status: 'not-started', completedAt: null } } },
  // Team Gamma
  { userId: 'u7', displayName: '오예진', email: 'yejin@example.com', photoURL: null, role: 'team_lead', cohortId: 'cohort-3', teamId: 'team-gamma', progress: { week0: { status: 'completed', completedAt: '2026-03-04' }, week1: { status: 'in-progress', completedAt: null }, week2: { status: 'not-started', completedAt: null }, week3: { status: 'not-started', completedAt: null }, week4: { status: 'not-started', completedAt: null }, week5: { status: 'not-started', completedAt: null } } },
  { userId: 'u8', displayName: '윤재호', email: 'jaeho@example.com', photoURL: null, role: 'student', cohortId: 'cohort-3', teamId: 'team-gamma', progress: { week0: { status: 'completed', completedAt: '2026-03-05' }, week1: { status: 'in-progress', completedAt: null }, week2: { status: 'not-started', completedAt: null }, week3: { status: 'not-started', completedAt: null }, week4: { status: 'not-started', completedAt: null }, week5: { status: 'not-started', completedAt: null } } },
  { userId: 'u9', displayName: '송미래', email: 'mirae@example.com', photoURL: null, role: 'student', cohortId: 'cohort-3', teamId: 'team-gamma', progress: { week0: { status: 'in-progress', completedAt: null }, week1: { status: 'not-started', completedAt: null }, week2: { status: 'not-started', completedAt: null }, week3: { status: 'not-started', completedAt: null }, week4: { status: 'not-started', completedAt: null }, week5: { status: 'not-started', completedAt: null } } },
];

export const teams: Team[] = [
  { teamId: 'team-alpha', cohortId: 'cohort-3', name: 'Team Alpha', teamLeadId: 'u1', members: ['u1', 'u2', 'u3'], currentWeek: 2, progress: { week0: 100, week1: 80, week2: 30, week3: 0, week4: 0, week5: 0 }, status: 'active' },
  { teamId: 'team-beta', cohortId: 'cohort-3', name: 'Team Beta', teamLeadId: 'u4', members: ['u4', 'u5', 'u6'], currentWeek: 3, progress: { week0: 100, week1: 100, week2: 80, week3: 30, week4: 0, week5: 0 }, status: 'active' },
  { teamId: 'team-gamma', cohortId: 'cohort-3', name: 'Team Gamma', teamLeadId: 'u7', members: ['u7', 'u8', 'u9'], currentWeek: 1, progress: { week0: 80, week1: 30, week2: 0, week3: 0, week4: 0, week5: 0 }, status: 'active' },
];

export const submissions: Submission[] = [
  { submissionId: 's1', userId: 'u1', teamId: 'team-alpha', cohortId: 'cohort-3', weekNumber: 0, assignmentId: 'a0-1', type: 'text', content: '안녕하세요, 마케팅팀 이수진입니다. AI를 활용한 콘텐츠 마케팅 자동화가 목표입니다.', fileUrl: null, fileName: null, fileSize: null, submittedAt: '2026-03-04T10:30:00', feedback: { comment: '목표가 명확합니다. 콘텐츠 자동화는 좋은 방향이에요!', score: 90, reviewedBy: 'admin-1', reviewedAt: '2026-03-05T09:00:00' } },
  { submissionId: 's2', userId: 'u2', teamId: 'team-alpha', cohortId: 'cohort-3', weekNumber: 0, assignmentId: 'a0-1', type: 'text', content: '영업팀 박민수입니다. CRM 데이터 분석에 AI를 적용하고 싶습니다.', fileUrl: null, fileName: null, fileSize: null, submittedAt: '2026-03-05T14:20:00', feedback: { comment: 'CRM + AI 조합 기대됩니다!', score: 85, reviewedBy: 'admin-1', reviewedAt: '2026-03-06T09:00:00' } },
  { submissionId: 's3', userId: 'u4', teamId: 'team-beta', cohortId: 'cohort-3', weekNumber: 1, assignmentId: 'a1-1', type: 'text', content: '프롬프트 3개 작성: 1) 보고서 요약 프롬프트, 2) 고객 응대 템플릿 생성, 3) 데이터 분석 요청', fileUrl: null, fileName: null, fileSize: null, submittedAt: '2026-03-12T16:00:00', feedback: null },
];

export const posts: Post[] = [
  { postId: 'p1', authorId: 'u1', authorName: '이수진', authorPhotoURL: null, cohortId: 'cohort-3', teamId: null, title: 'ChatGPT로 마케팅 카피 자동 생성하기', content: '이번 주에 배운 프롬프트 엔지니어링을 활용해서 마케팅 카피를 자동 생성해봤습니다. 정말 효율적이네요!', attachments: [], likesCount: 5, commentsCount: 2, pinned: false, createdAt: '2026-03-10T09:00:00' },
  { postId: 'p2', authorId: 'u4', authorName: '정현우', authorPhotoURL: null, cohortId: 'cohort-3', teamId: null, title: 'n8n 자동화 워크플로우 공유', content: 'Slack → Google Sheets → Email 자동화 워크플로우를 만들어봤습니다. 설정 방법 공유합니다.', attachments: [], likesCount: 8, commentsCount: 3, pinned: true, createdAt: '2026-03-15T14:30:00' },
  { postId: 'p3', authorId: 'u7', authorName: '오예진', authorPhotoURL: null, cohortId: 'cohort-3', teamId: 'team-gamma', title: '팀 Gamma 주간 회고', content: '이번 주는 AI 도구 설치를 완료했습니다. 다음 주부터 본격적인 실습 시작합니다!', attachments: [], likesCount: 3, commentsCount: 1, pinned: false, createdAt: '2026-03-07T18:00:00' },
];
