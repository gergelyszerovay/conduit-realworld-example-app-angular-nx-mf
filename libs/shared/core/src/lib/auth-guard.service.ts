import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LocalStorageService } from "./local-storage.service";

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  canActivate(): boolean {
    const token = this.localStorage.get();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
