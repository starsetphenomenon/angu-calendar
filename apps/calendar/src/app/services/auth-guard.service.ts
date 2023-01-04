import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor() { }

  localToken!: string | null;

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.localToken = localStorage.getItem('token');
    if (this.localToken !== null) {
      return true;
    }

    return false;
  }

}
