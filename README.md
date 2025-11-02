# nb02-codi-it-psk

## 프로젝트 소개
### 패션 이커머스 플랫폼(2025.9.15 ~ 2025.11.2)
🛍️ 판매자와 구매자를 위한 패션 커머스의 모든 것!
상품 등록부터 실시간 알림, 판매 분석까지 한 번에 관리해보세요.
구매자와 판매자를 위한 맞춤형 기능을 제공하며, 안정적인 인증 시스템과 다양한 필터링∙정렬 기능, 그리고 상세한 대시보드까지 지원하는 스마트한 쇼핑몰 운영 솔루션입니다.
지금 바로 더 편리하고 똑똑한 패션 커머스를 시작해보세요. 👗🧾

### 주요 기술 스택
- Backend: Express
- 의존성 관리: awilix
- DB 프레임워크: Knex
- swagger 문서: tsoa(router, spec을 코드를 수정할 때마다 다시 만들어야 함)
- Database: PostgreSQL
- 코드 관리: Git & Github
- 테스트: rest-client
- 기타 패키지
  - tsconfig-paths: 독립적으로 실행되는 스크립트가 타입스크립트 코드의 경로 문자열을 해석하게 한다.
  - zod: 런타임 검증
  - dotenv: 환경 변수를 http, ts 확장자 파일이 로드할 수 있도록 한다.

### 관련 문서
- 박성국
  - [개인 프로젝트 계획서](https://www.notion.so/26f1de3a2b0b800d8db2e57f76ca9045)

### 파일 구조
```
.
├── README.md
├── RemindMe.md
├── configs
│   ├── default.ts
│   ├── development.ts
│   ├── index.ts
│   ├── production.ts
│   ├── schemas
│   │   ├── app.schema.ts
│   │   ├── env.schema.ts
│   │   └── pg.schema.ts
│   └── test.ts
├── envs
│   ├── example.dev.env
│   ├── example.production.env
│   └── example.test.env
├── knex
│   ├── config
│   │   ├── createDb.ts
│   │   └── knexfile.ts
│   ├── migrations
│   │   ├── 20250922003826_create_updated_at_function.ts
│   │   ├── 20250922013619_grade_user_alarm_cart_store.ts
│   │   ├── 20250924021126_category_product_review_inquiry_reply.ts
│   │   └── 20250924021405_order_orderItem_stock_size_cartItem.ts
│   ├── models
│   │   ├── alarms.model.ts
│   │   ├── cart-items.model.ts
│   │   ├── carts.model.ts
│   │   ├── categories.model.ts
│   │   ├── grades.model.ts
│   │   ├── inquiries.model.ts
│   │   ├── order-items.model.ts
│   │   ├── orders.model.ts
│   │   ├── products.model.ts
│   │   ├── replies.model.ts
│   │   ├── reviews.model.ts
│   │   ├── size-info.model.ts
│   │   ├── sizes.model.ts
│   │   ├── stocks.model.ts
│   │   ├── stores.model.ts
│   │   └── users.model.ts
│   └── seeds
│       ├── init.ts
│       └── test_user.seed.ts
├── package-lock.json
├── package.json
├── src
│   ├── app
│   │   ├── bootstrap.app.ts
│   │   ├── init.app.ts
│   │   └── utils
│   ├── bin
│   │   ├── createDB4Migration.bin.ts
│   │   └── www.bin.ts
│   ├── di
│   │   └── container.di.ts
│   ├── middlewares
│   │   ├── errorHandler.ts
│   │   └── repoDBErrorCatcher.ts
│   ├── mvc
│   │   ├── controllers
│   │   ├── repos
│   │   ├── routes
│   │   └── services
│   ├── types
│   │   ├── app.type.ts
│   │   ├── auth.type.ts
│   │   ├── config.type.ts
│   │   ├── di.type.ts
│   │   ├── error.type.ts
│   │   ├── express.d.ts
│   │   ├── interfaces
│   │   ├── knex.type.ts
│   │   ├── typeFunc.type.ts
│   │   └── user.type.ts
│   └── utils
│       ├── app.util.ts
│       ├── consts
│       ├── error.util.ts
│       ├── errors
│       ├── expressAuthentication.tsoa.ts
│       ├── knex.util.ts
│       └── token.util.ts
├── test
│   └── restClient
│       ├── auth.test.http
│       └── user.test.http
├── tsconfig.json
├── tsoa.json
└── validators
    └── requests
        ├── auth.validator.ts
        └── user.validator.ts
```

### 구현 홈페이지
(개발한 홈페이지에 대한 링크 게시)

### 프로젝트 회고록
(제작한 발표자료 링크 혹은 첨부파일 첨부)