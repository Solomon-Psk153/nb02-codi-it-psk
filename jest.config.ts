// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  // 출력 옵션
  verbose: true,                    // 각 테스트 케이스의 실행 결과를 자세히 보여줌 (디버깅에 유용)

  // TypeScript 지원
  preset: "ts-jest",                // ts-jest가 TS 파일을 트랜스폼해서 Jest에서 실행 가능하게 함
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",    // ts-jest가 사용할 tsconfig 경로 (프로젝트에 맞게 지정)
      isolatedModules: false         // 빠른 트랜스폼: 전체 타입체크를 ts-node에 떠넘기고, 테스트 속도↑
    }
  },

  // 런타임 환경
  testEnvironment: "node",          // Node/Express 환경에 맞음

  // 어떤 파일을 테스트로 인식할지
  roots: ["<rootDir>/test/jest"], // test 디렉토리 우선, 필요한 경우 src 아래 테스트도 허용
  testMatch: ['**/?(*.)+(spec|test).(ts|js)'], // .test.ts, .spec.ts 등

  // 모듈 확장자 및 매칭
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // 트랜스폼 (ts-jest가 담당)
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // 테스트 타임아웃(통합 테스트·DB 연동을 고려해서 넉넉히)
  testTimeout: 10000,               // ms (기본 5s가 짧을 수 있으니 10s 권장)
  // testTimeout: 30000, // CI에서 긴 작업이 있으면 늘리세요

  // 테스트 실행 병렬화
  maxWorkers: '50%',                // 로컬에서 CPU 절반 사용, CI는 적절히 조정

  // 커버리지
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/index.ts",
    "!src/**/types/**",
    "!src/**/schemas/**",
    "!src/**/generated/**",
    "!**/node_modules/**",
  ],
  coverageDirectory: "<rootdir>/coverage",
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    }
  },

  // mock/clear 옵션
  clearMocks: true,                 // 각 테스트마다 jest.mock() 상태를 초기화
  restoreMocks: true,               // jest.spyOn의 자동 복원

  // transformIgnorePatterns: node_modules 내부를 변환 제외하되 필요시 특정 패키지는 허용
  transformIgnorePatterns: [
    // "/node_modules/(?!some-esm-package|another-esm-package).+\\.js$"
    "/node_modules/"
  ],

  // 테스트 파일 실행 전후로 실행할 스크립트
  setupFiles: ['<rootDir>/test/jest/settings/setupEnv.ts'],
  // setupFilesAfterEnv: [
  //   "<rootDir>/test/jest/setup-after-env.ts" // 예: jest-extended, supertest helpers, iconv-lite 패치 등
  // ],

  // (선택) 테스트 시작/종료 단계에서 무거운 작업 처리
  // globalSetup: "<rootDir>/test/jest/global-setup.ts",
  // globalTeardown: "<rootDir>/test/jest/global-teardown.ts",

  // 기타 안정성 관련
  watchPathIgnorePatterns: ["<rootdir>/coverage/", "<rootdir>/node_modules/", "<rootdir>/knex/", "<rootdir>/envs/", "<rootdir>/archive/"],
  // bail: 1 // 실패 1건 발생 시 즉시 종료(선택)
};

export default config;
