# nb02-codi-it-psk

## 프로젝트 소개
### 패션 이커머스 플랫폼(2025.9.15 ~ 2025.11.2)
🛍️ 판매자와 구매자를 위한 패션 커머스의 모든 것!
상품 등록부터 실시간 알림, 판매 분석까지 한 번에 관리해보세요.
구매자와 판매자를 위한 맞춤형 기능을 제공하며, 안정적인 인증 시스템과 다양한 필터링∙정렬 기능, 그리고 상세한 대시보드까지 지원하는 스마트한 쇼핑몰 운영 솔루션입니다.
지금 바로 더 편리하고 똑똑한 패션 커머스를 시작해보세요. 👗🧾

### 기술 스택
Backend: Express.js, PrismaORM
Database: MongoDB
공통 Tool: Git & Github, Discord

### 관련 문서
- 박성국
  - [개인 프로젝트 계획서](https://www.notion.so/26f1de3a2b0b800d8db2e57f76ca9045)

### 파일 구조
```
src
 ┣ config
 ┃ ┗ db.ts
 ┣ controllers
 ┃ ┣ auth.controller.ts
 ┃ ┗ user.controller.ts
 ┣ middleware
 ┃ ┣ auth.middleware.ts
 ┃ ┗ error.middleware.ts
 ┣ models
 ┃ ┣ user.model.ts
 ┃ ┗ course.model.ts
 ┣ routes
 ┃ ┣ auth.routes.ts
 ┃ ┗ user.routes.ts
 ┣ services
 ┃ ┣ auth.service.ts
 ┃ ┗ user.service.ts
 ┣ utils
 ┃ ┣ jwt.ts
 ┃ ┣ constants.ts
 ┃ ┗ logger.ts
 ┣ app.ts
 ┗ server.ts
prisma
 ┣ schema.prisma
 ┗ seed.ts
.env
.gitignore
package.json
tsconfig.json
README.md
```

### 구현 홈페이지
(개발한 홈페이지에 대한 링크 게시)

https://www.codeit.kr/

### 프로젝트 회고록
(제작한 발표자료 링크 혹은 첨부파일 첨부)