import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public tokenKey = 'jwtAuthorizationToken';

  set(data: string): void {
    localStorage.setItem(this.tokenKey, data);
  }

  get(): string | undefined {
    return localStorage.getItem(this.tokenKey) || undefined;
  }

  remove(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
