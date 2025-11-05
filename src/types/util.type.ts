/**
 * sub: userId
 * role?: user set
 * scope: permissions
 */
export type JwtSignParamsGenerateType = {
  sub: string;
  // roles?: string[];
  scopes: string[];
}