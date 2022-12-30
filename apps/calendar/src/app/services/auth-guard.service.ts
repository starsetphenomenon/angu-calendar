import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  localToken!: string | null;

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.localToken = localStorage.getItem('token');
    if (this.localToken !== 'pending' && this.localToken !== null) {
      return true;
    }
    setTimeout(_ => {
      this.router.navigate(['/login']);
    }, 3000);
    return false;
  }

}
