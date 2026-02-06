# 🏗️ Technical Design: Firebase Real-time Architecture (v1.1)

**작성자:** [DEV-TAN]
**상태:** 🟢 **Active** (Multi-tenancy Added)
**관련 회의:** [2026-02-06 Threads & Firebase Kickoff](../chronicle/daily/meeting/2026-02-06_threads_firebase_kickoff.md)

---

## 1. Architecture Overview (Multi-tenancy Support)
- **Concept**: 각 고객사(Client)별로 독립된 대화방(Boardroom)을 제공하며, 상호 데이터 접근을 원천 차단함.
- **Root Collection**: `/clients/{clientId}/chronicles/{date}` 구조 채택.

## 2. Security & Environment (.env)
- **.env 관리**: `FIREBASE_PRIVATE_KEY` 등 민감 정보는 `.env`로 격리하고 `.gitignore` 처리.
- **Firestore Rules**:
    ```javascript
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Client Isolation Rule
        match /clients/{clientId}/chronicles/{docId} {
          allow read: if request.auth.uid != null && request.auth.token.clientId == clientId;
          allow write: if false; // Admin SDK only
        }
      }
    }
    ```

## 3. Automation Pipeline
- **Threads Posting**: `APIFY_ACTOR_THREADS_POSTER`를 통해 1일 1회 'The Leak' 콘텐츠 자동 업로드.
- **Sync Agent**: `CURRENT_CLIENT_ID` 환경 변수를 참조하여 해당 고객사의 DB 경로로 데이터 푸시.

---
**DEV-TAN : "0.1초의 지연도, 단 하나의 데이터 유출도 허용하지 않습니다."** ⚔️🚀
