import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginFormModel } from '../model/loginform.model';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  sendSignupFormData(sendSignupFormData: any) {
    return this.http.post<any>('http://localhost:3000/signupFormData', sendSignupFormData)
  }

  getSignupFormData(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/signupFormData')
  }

  sendLoginFormData(sendLoginFormData: loginFormModel) {
    return this.http.post<loginFormModel>('http://localhost:3000/loginFormData', sendLoginFormData)
  }

  getLoginFormData(): Observable<loginFormModel>{
    return this.http.get<loginFormModel>('http://localhost:3000/loginFormData')
  }

  deleteUser(id: number) {
    return this.http.delete<any>('http://localhost:3000/signupFormData/' + id);
  }

  putUser(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/signupFormData/' + id, data);
  }
}
