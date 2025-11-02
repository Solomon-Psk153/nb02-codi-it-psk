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