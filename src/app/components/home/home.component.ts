import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AddUserDiagComponent } from './add-user-diag/add-user-diag.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public row: any
  public displayedColumns: string[] = [
    'userName',
    'email',
    'password',
    'select_role',
    'action',
  ];

  public userProfile: string[] = [
    'userName',
    'email',
    'password',
    'action',
  ];


  public dataSource!: MatTableDataSource<any>;
  public loggedInUserRole: any;
  public loggedInUser: any;
  public loggedInUserDetails: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private commonService: CommonService, private router: ActivatedRoute) {
    this.router.params.subscribe((param) => {
      alert(param['id']);
      this.loggedInUserRole = param['id'];
    })
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser') as any);
  }

  ngOnInit() {
    this.getAllUsers();
  }
  // after adding new user update the list
  addUser() {
    this.dialog.open(AddUserDiagComponent, {
      width: '30%',
    })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllUsers();
        }
      });
  }
  // get all the existing users where there role is user
  getAllUsers() {
    this.commonService.getSignupFormData().subscribe({
      next: (res: any) => {
        let data = res.filter((data: any) => data.select_role === 'user');
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        alert("Error while geting User's list");
      },
    });
  }
  // save edited user and update the list
  editUser(row: any) {
    debugger;
    this.dialog
      .open(AddUserDiagComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllUsers();
        }
      });
  }
  // delete user
  deleteUser(id: number) {
    if (confirm("Do you want to delete the user?") == true) {
      this.commonService.deleteUser(id).subscribe({
        next: (res: any) => {
          alert('User Deleted successfully');
          this.getAllUsers();
        },
        error: () => {
          alert('Error occured while deleting the User');
        },
      });
    } else {
      return;
    }
  }
  // search existing users
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editLoggedInUser(loggedInUserDetails: any) {
    this.dialog
      .open(AddUserDiagComponent, {
        width: '30%',
        data: loggedInUserDetails,
      })
  }
}
