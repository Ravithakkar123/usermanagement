import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-user-diag',
  templateUrl: './add-user-diag.component.html',
  styleUrls: ['./add-user-diag.component.scss']
})
export class AddUserDiagComponent implements OnInit {
  public hidePassword = true;
  public actionBtn: string = 'save';
  public addNewUserForm!: FormGroup;
  public show: boolean | undefined;

  constructor(
    private fb: FormBuilder,
    private api: CommonService,
    private router: Router,
    private diagRef: MatDialogRef<AddUserDiagComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    @Inject(MAT_DIALOG_DATA) public editLoggedInUser: any
  ) { }

  ngOnInit() {
    this.addNewUserForm = this.fb.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
      select_role: new FormControl('user'),
    },
      {
        validator: this.confirmedValidator('password', 'confirm_password')
      })
    if (this.router.url == '/home/user') {
      this.addNewUserForm?.controls['username'].disable();
    }
    if (this.editUser) {
      this.actionBtn = 'Update';
      this.addNewUserForm.controls['username'].setValue(this.editUser?.username);
      this.addNewUserForm.controls['email'].setValue(this.editUser?.email);
      this.addNewUserForm.controls['password'].setValue(this.editUser?.password);
      this.addNewUserForm.controls['confirm_password'].setValue(
        this.editUser.confirm_password
      );
    }
    if (this.editLoggedInUser) {
      this.actionBtn = 'Update';
      this.addNewUserForm.controls['username'].setValue(this.editLoggedInUser?.username);
      this.addNewUserForm.controls['email'].setValue(this.editLoggedInUser?.email);
      this.addNewUserForm.controls['password'].setValue(this.editLoggedInUser?.password);
      this.addNewUserForm.controls['confirm_password'].setValue(
        this.editLoggedInUser.confirm_password
      );
    }
  }
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
  // add new user
  addNewUser() {
    if (!this.editUser) {
      if (this.addNewUserForm.valid) {
        this.api.sendSignupFormData(this.addNewUserForm.value).subscribe((res) => {
          alert("user added sucessfully");
        })
      }
    } else {
      this.updateUser();
    }
  }
  // update the existing user
  updateUser() {
    if (this.editUser) {

      this.api.putUser(this.addNewUserForm.value, this.editUser.id).subscribe({
        next: (res: any) => {
          alert('User updated successfully');
          this.diagRef.close('update');
        },
        error: () => {
          alert('Error occcured while updating User');
        }
      });
    }
    else if (this.editLoggedInUser) {
      this.api.putUser(this.addNewUserForm.value, this.editLoggedInUser.id).subscribe({
        next: (res: any) => {
          alert('profile updated successfully');
          this.diagRef.close('update');
        },
        error: () => {
          alert('Error occcured while updating User');
        }
      });
    }
  }
}
