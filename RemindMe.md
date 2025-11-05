https://devhints.io/knex

여기에서 knex에 관련된 코드들을 한번에 볼 수 있다.

https://stackoverflow.com/questions/30728248/how-to-define-knex-migrations-using-typescript
https://dev.to/taiworoqeeb/knexjs-sql-query-builder-for-nodejs-2728
https://medium.com/@tobie.tsuzuki/getting-started-with-node-js-express-and-knex-5640f595df98
knex 마이그레이션에 대한 도움을 이 답변에서 받을 수 있었다.

https://stackoverflow.com/questions/36728899/knex-js-auto-update-trigger
knex에서 update가 자동으로 등록되게 하는 방법이 존재하지 않는다. 그래서 위 사이트를 참고해서 코드를 작성했다.

https://betterstack.com/community/guides/scaling-nodejs/knexjs-explained/
위 사이트는 좋은 튜토리얼 사이트이다.

https://medium.com/@aashishdhiman88/knex-js-setup-with-mysql-and-typescript-17f35d592c38
시딩에 대한 도움을 받을 수 있었다.
---
c12를 사용하려고 했으나 아직 이 패키지에 대한 이해가 부족하다
https://www.npmjs.com/package/c12
https://github.com/pi0/config-dir

---
https://github.com/paralleldrive/cuid
cuid2는 math.random과 같이 0 ~ 1 사이의 값을 줘야 한다.
cuid를 쓰지말고 cuid2를 쓰자

암호학적으로 안전한 난수를 생성하기 위해서 아래 사이트를 참고했다.
- https://yceffort.kr/2021/09/javascript-random-number
- https://medium.com/@vishvashivam32/navigating-randomness-in-javascript-math-random-vs-crypto-getrandomvalues-0088ab0bcf09

하지만, 정수에 제한되어 있어서 다른 패키지도 찾아보았다. 아래 패키지를 사용하려고 한다. 자바스크립트의 math.random보다 안전하다고 한다.
https://www.npmjs.com/package/math-random

---
tsoa를 사용하면 아래 함수가 필요가 없다.
```ts
export function withAsync(handler: RequestHandler) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}
```
tsoa는 이미 내부적으로 컨트롤러 메서드를 감싸고 Promise rejection → next(err) 흐름을 자동으로 처리한다.

---
https://dev.to/nas5w/how-to-select-or-omit-properties-from-an-object-in-javascript-3ina
위 사이트에서 객체를 제외하는데 사용할 수 있는 좋은 함수를 발견했다.

---
- https://medium.com/@relee6203/typescript-tsconfig-%EC%A0%88%EB%8C%80%EA%B2%BD%EB%A1%9C-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-4db1870767f8
- https://www.typescriptlang.org/tsconfig/paths.html

ts에서 절대 경로를 이용해서 상대경로를 더 짧게 표현할 수 있다.

위의 해결책은 아래의 이슈를 통해서 알게됬다.
[No matching model found for referenced type "Name of type". #876](https://github.com/lukeautry/tsoa/issues/876)

---
## 컨테이너(의존성 주입)를 어느 디렉터리/파일에 적용해야 하는가?
### 적용해야 할 곳 (DI로 인스턴스 주입 권장)
- `src/di/*` : DI 초기화 코드(당연히).
- `src/mvc/repos/*` : DB 접근 레포지토리(데이터베이스 커넥션 등) — DB 인스턴스(예: knex) 주입.
- `src/mvc/services/*` : 서비스 계층 — 레포/외부 클라이언트/로거/메일러를 주입.
- `src/mvc/controllers/*` : 컨트롤러(※ TSOA처럼 프레임워크가 컨트롤러 인스턴스를 생성하면, 컨트롤러 내부에서 container를 꺼내 쓰는 방식으로 대응).
- `src/bin/*` 또는 `src/app/*` : bootstrap 코드(서버, DB 연결, scheduler 등 초기화) — 여기서 container를 초기화/주입.

**이유**: 위 컴포넌트들은 런타임 인스턴스(데이터베이스, 메일러, 캐시, 외부 SDK 등)에 의존하고, 테스트에서 교체(모킹)하거나 런타임 설정에 따라 다른 인스턴스를 주입해야 하기 때문입니다.

### DI 적용하지 않는 것이 좋은 곳 (피해야 할 곳)
- `src/configs/*`, `src/envs/*`, `src/types/*`, `src/utils/pure/*` (순수 함수 유틸): 순수 값·타입·설정.
- `src/models/*` (DB 모델 정의 파일들 — 타입만 가진 파일은 DI 불필요).
- `src/middlewares/*` 중 구성 없는 순수 미들웨어 (그러나 DB 트랜잭션 미들웨어처럼 리소스를 쓰면 DI 필요).

**이유**: 설정/상수/타입 파일은 모듈 로드 시점에 바로 사용 가능해야 하며 DI 컨테이너 초기화 순서에 의존하면 안 됩니다. 즉, 컨테이너가 초기화 되기 전에 사용해야 하는 값은 컨테이너에 의존하지 않는 순수 모듈로 만들어야 합니다.