/**
 * @copyright https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
 * 
 * 원래 타입 T에서 R이 가진 키들을 제거하고(`Omit<T, keyof R>`), 대신 R을 합쳐서(&) 결과를 만든다는 의미
 * T의 일부 속성들을 R로 대체(modify) 하거나 새 속성으로 덮어쓰기
 * 
 * @example
 * ```ts
 * type User = {
 *   id: string;
 *   name: string;
 *   points: number;
 *   createdAt: string;
 * };
 * 
 * type R = { points: string; admin?: boolean };
 * 
 * type NewUser = Modify<User, R>;
 * ```
 * 
 * NewUser 는 다음과 같은 타입:
 * ```json
 * {
 *   id: string;
 *   name: string;
 *   createdAt: string;
 *   points: string;      // User의 number였던 points가 string으로 '대체'됨
 *   admin?: boolean;     // 새로 추가된 속성
 * }
 * ```
 */
export type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * @copyright https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript 
 * 
 * 타입 T에서 특정 키 K들만 선택해(=Pick) 그들만 Optional(선택적)로 바꾸고, 나머지는 그대로 둔다 는 의미
 * 
 * Partial<T> : T의 모든 프로퍼티를 선택적(optional)으로 만든다.
 * Pick<Partial<T>, K> : 그 중에서 K만 골라서(이제는 선택적) 타입으로 만든다.
 * Omit<T, K> : 원래 T에서 K를 제거한 나머지(원래 요구사항 유지).
 * 
 * ```ts
 * type User = { id: string; name: string; points: number };
 * type MakeNameOptional = Optional<User, "name">;
 * // 결과: { id: string; points: number; name?: string }
 * ```
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;