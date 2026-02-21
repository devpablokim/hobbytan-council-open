# FEAT-SUPERWORKSHOP — Firestore 스키마 확정안 v1.0

**작성자:** TAN-DEV
**일자:** 2026-02-21
**기반:** PO 데이터 모델 + DEV 아키텍처 초안 통합

---

## 설계 원칙

1. **최상위 컬렉션 분리** — cross-query 성능 확보. collectionGroup 의존 최소화.
2. **cohortId 필드로 기수 연결** — 모든 컬렉션에 cohortId 포함하여 기수별 필터링 지원.
3. **역할 3단계** — admin / team_lead / student (PO PRD 기준, CEO 확인 시 조정 가능).
4. **과제 타입 3종** — file / text / link (PO 수용 완료).

---

## 컬렉션 구조

### 1. `/cohorts/{cohortId}`
기수(배치) 관리. PO 모델에서 가져온 최상위 컬렉션.

```
{
  cohortId: string (auto),
  name: string,              // "3기", "4기"
  cohortNumber: number,      // 3, 4
  startDate: timestamp,
  endDate: timestamp,
  status: "recruiting" | "active" | "completed",
  maxTeams: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 2. `/curriculum/{curriculumId}`
0주차(오리엔테이션) ~ 5주차 커리큘럼. Admin CRUD 가능.

```
{
  curriculumId: string (auto),
  cohortId: string,          // 기수별 커리큘럼 분리 가능
  weekNumber: number,        // 0~5
  title: string,             // "Week 0: 오리엔테이션 & 자기소개"
  description: string,
  objectives: string[],      // 주차별 학습 목표
  materials: [               // 학습 자료
    { title: string, url: string, type: "video" | "doc" | "link" }
  ],
  assignments: [
    {
      assignmentId: string,
      title: string,
      description: string,
      dueOffsetDays: number, // 주차 시작일 기준 마감 오프셋
      type: "file" | "text" | "link",
      required: boolean
    }
  ],
  order: number,             // 정렬용
  updatedAt: timestamp,
  updatedBy: string          // admin userId
}
```

### 3. `/teams/{teamId}`
팀 관리. 상황판의 핵심 데이터.

```
{
  teamId: string (auto),
  cohortId: string,
  name: string,              // "Team Alpha"
  teamLeadId: string,        // userId ref (team_lead 역할)
  members: string[],         // userId refs
  currentWeek: number,       // 0~5 (팀 진행 현황)
  progress: {                // 주차별 완료율 캐시 (실시간 계산 부하 방지)
    week0: number,           // 0~100 (%)
    week1: number,
    week2: number,
    week3: number,
    week4: number,
    week5: number
  },
  status: "active" | "completed",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 4. `/users/{userId}`
Firebase Auth UID를 documentId로 사용.

```
{
  userId: string (= Firebase Auth UID),
  displayName: string,
  email: string,
  photoURL: string | null,
  role: "admin" | "team_lead" | "student",
  cohortId: string,
  teamId: string | null,     // null = 미배정
  progress: {
    week0: { status: "not-started" | "in-progress" | "completed", completedAt: timestamp | null },
    week1: { status: string, completedAt: timestamp | null },
    week2: { status: string, completedAt: timestamp | null },
    week3: { status: string, completedAt: timestamp | null },
    week4: { status: string, completedAt: timestamp | null },
    week5: { status: string, completedAt: timestamp | null }
  },
  createdAt: timestamp,
  lastLoginAt: timestamp
}
```

### 5. `/submissions/{submissionId}`
과제 제출. 수강생 → 과제 업로드.

```
{
  submissionId: string (auto),
  userId: string,
  teamId: string,
  cohortId: string,
  weekNumber: number,
  assignmentId: string,
  type: "file" | "text" | "link",
  content: string,           // text: 본문, link: URL, file: ""
  fileUrl: string | null,    // Firebase Storage ref (file type만)
  fileName: string | null,
  fileSize: number | null,   // bytes
  submittedAt: timestamp,
  updatedAt: timestamp,
  feedback: {
    comment: string,
    score: number | null,    // 선택적 점수
    reviewedBy: string,      // admin or team_lead userId
    reviewedAt: timestamp
  } | null
}
```

### 6. `/posts/{postId}`
커뮤니티 게시판.

```
{
  postId: string (auto),
  authorId: string,
  authorName: string,
  authorPhotoURL: string | null,
  cohortId: string,
  teamId: string | null,     // null = 전체 공개, 값 있으면 팀 내 게시
  title: string,
  content: string,
  attachments: [
    { url: string, fileName: string, fileSize: number }
  ],
  likesCount: number,
  commentsCount: number,
  pinned: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 7. `/posts/{postId}/comments/{commentId}`
커뮤니티 댓글 (subcollection).

```
{
  commentId: string (auto),
  authorId: string,
  authorName: string,
  authorPhotoURL: string | null,
  content: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## Firebase Storage 구조

```
/superworkshop/
  /submissions/{cohortId}/{teamId}/{userId}/{submissionId}/{fileName}
  /community/{cohortId}/{postId}/{fileName}
  /curriculum/{cohortId}/{weekNumber}/{fileName}
```

---

## Firestore 보안 규칙 개요

| 컬렉션 | admin | team_lead | student |
|---------|-------|-----------|---------|
| cohorts | RW | R | R |
| curriculum | RW | R | R |
| teams | RW | R (own team) | R (own team) |
| users | RW | R (own team members) | R (self) / W (self) |
| submissions | RW | R (own team) | RW (self only) |
| posts | RW | RW | RW (own posts) |
| comments | RW | RW | RW (own comments) |

---

## 필수 복합 인덱스

1. `submissions` — (cohortId ASC, teamId ASC, weekNumber ASC)
2. `submissions` — (userId ASC, cohortId ASC, weekNumber ASC)
3. `posts` — (cohortId ASC, createdAt DESC)
4. `posts` — (cohortId ASC, teamId ASC, createdAt DESC)

---

## PO 모델과의 차이점 및 결정 사항

| 항목 | PO 모델 | DEV 확정안 | 근거 |
|------|---------|-----------|------|
| 구조 | cohort 하위 중첩 | 최상위 분리 + cohortId 필드 | cross-query 성능, 유지보수 |
| 역할 | 3단계 (admin/team_lead/student) | 3단계 동일 | PO PRD 수용 |
| 과제 타입 | file만 | file/text/link 3종 | PO 수용 완료 |
| 팀 진행률 | 실시간 계산 | progress 캐시 필드 + Cloud Function 업데이트 | 대시보드 로딩 속도 최적화 |
| 커뮤니티 댓글 | 별도 컬렉션 | subcollection | 게시글-댓글 자연스러운 계층 구조 |

---

**상태:** 확정안 v1.0 — PO/PM 리뷰 후 확정.
