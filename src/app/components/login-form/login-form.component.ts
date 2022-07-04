import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;
  public signupData: any;
  public userRole: any;
  private getUserDetails: any;

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) {
    this.commonService.getSignupFormData().subscribe(
      (res: any) => {
        this.getUserDetails = res;
      }
    )
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    })
  }
  // submit the login form
  onSubmit(value: any) {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.commonService.sendLoginFormData(this.loginForm.value).subscribe(
        (res: any) => {
        }
      );
    }
    // match the entered user details with users that already have signed up
    this.userRole = this.getUserDetails.find((userDetails: any) => {
      return userDetails.username === value.username && userDetails.password === value.password
    })
    if (this.userRole) {
      if(this.userRole.select_role === 'admin'){

        alert('Logged in as ' + this.userRole.select_role)
        localStorage.setItem("currentUser", JSON.stringify(value))
        this.router.navigate(['home/admin'])
      }else if(this.userRole.select_role === 'user'){
        alert('Logged in as ' + this.userRole.select_role)
        localStorage.setItem("currentUser", JSON.stringify(value))
        this.router.navigate(['home/user'])
      }
    } else {
      alert("Username or password is incorrect")
      this.router.navigate(['login'])
    }
  }

}
