import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup | any;

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'confirm_password': new FormControl(null, [Validators.required]),
      'select_role': new FormControl(null, [Validators.required]),
    },
      {
        validator: this.confirmedValidator('password', 'confirm_password')
      })
  }
  // submit sign-up form
  onSubmit() {
    if (this.signupForm.invalid) {
      return
    } else {
      this.commonService.sendSignupFormData(this.signupForm.value).subscribe(
        (res) => {
        }
      );
      this.signupForm.reset()
      this.router.navigate(['login']);
    }
  }
  // custom validator to macth the password and confirm password
  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }
}
