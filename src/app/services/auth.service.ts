import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;

  constructor(private commonService: CommonService) { }

  isLoggedIn() {
   this.currentUser = JSON.parse(localStorage.getItem('currentUser')as any);
    if (this.currentUser) {
      return true;
    }
    else {
      return false;
    }
  }
}
