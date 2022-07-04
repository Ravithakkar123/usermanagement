import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  headerhide: boolean = true
  homepage: boolean = true

  constructor(private route: Router) {
    this.route.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === "/sign-up" || e.url === "/login") {
          this.headerhide = false
        }
        if (e.url === "/home/admin" || e.url === "/home/user" ) {
          this.homepage = false
        }
      }
    })

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  title = 'User-Management-systems';

  logoutbtn() {
    localStorage.removeItem('currentUser');
    this.route.navigate(['login'])
  }
}
