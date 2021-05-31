import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let router = this.router;
		let auth = this.auth;
    return new Promise((resolve, reject) => this.auth.validateToken()
      .then(v => resolve(true),
      r => {
		  if(r.status === 403) { // 403 Forbidden is the code reterned went token is invalid
			auth.removeToken();
			alert('You are signed out. Redirecting to the login page');
			router.navigate(['/login']);
		  } else {
			console.log(r);
			alert('There was an error verifying your login. Redirecting to the home page');
			router.navigate(['/home']);
		  }
		  resolve(false);
	  })
      .catch(e => resolve(false)));
  }

}
