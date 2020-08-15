import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../components/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;
  constructor(private router: Router) { }
  


  save(username: string, password:string)
  {
     sessionStorage.setItem('username', username);
     sessionStorage.setItem('password', password);
     return this.router.navigate(['login']);
     
  }
  authenticate(username, password) {
    if (username === sessionStorage.getItem('username') && password === sessionStorage.getItem('password')) {
      sessionStorage.setItem('username', username)
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logout() :void {    
    sessionStorage.setItem('isLoggedIn','false');    
    sessionStorage.removeItem('username');  
    sessionStorage.removeItem('password');  
    }    
   
}
