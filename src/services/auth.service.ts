import axios from 'axios';
import jwtDecode from 'jwt-decode';

export interface ITokenPack {
  accessToken: string;
  refreshToken: string;
}

class AuthServiceClazz {
  private keyName = '@tokens';
  private instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  private setToken(data: ITokenPack) {
    return localStorage.setItem(this.keyName, JSON.stringify(data));
  }

  public getTokens() {
    const data = localStorage.getItem(this.keyName);

    if (data) {
      return JSON.parse(data) as ITokenPack;
    }

    return null;
  }

  public getUserId() {
    const tokens = this.getTokens();
    return tokens ? this.decodeJWT(tokens.accessToken).id : '';
  }

  public async signIn(data: { email: string; password: string }) {
    try {
      const result = await this.instance.post<ITokenPack>('/auth/login', data);

      this.setToken(result.data);

      return result.data;
    } catch (e) {
      console.log('ERROR signIn', e);
      throw e;
    }
  }

  public async signUp(data: { fname: string; email: string; password: string }) {
    try {
      const result = await this.instance.post<ITokenPack>('/auth/register', data);

      this.setToken(result.data);

      return result.data;
    } catch (e) {
      console.log('ERROR signUp', e);
      throw e;
    }
  }

  public async signUpInvite(data: { fname: string; inviteCode: string; password: string }) {
    try {
      const result = await this.instance.post<ITokenPack>('/auth/invite-register', data);

      this.setToken(result.data);

      return result.data;
    } catch (e) {
      console.log('ERROR signUpInvite', e);
      throw e;
    }
  }

  public decodeJWT<T extends { id: string; role: number }>(token: string) {
    return jwtDecode<{ iat: number; exp: number } & T>(token);
  }

  public signOut() {
    localStorage.removeItem(this.keyName);
  }

  private refreshToken() {
    return this.instance.post<ITokenPack>('/auth/update');
  }
}

export const AuthService = new AuthServiceClazz();
