import axios, { AxiosInstance } from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

export function createTestHttpClient(baseURL: string): { client: AxiosInstance; jar: CookieJar } {
  const jar = new CookieJar();                     // 테스트별로 새 쿠키 저장소 생성
  const client = wrapper(axios.create({ baseURL, jar }));
  return { client, jar };
}