import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


import { IUser } from '../interfaces/user.interface';
import { IUsersRequest } from '../interfaces/users-request.interface';

@Injectable()
export class ApiService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  // 'https://reqres.in/api/' - can be replaced with http interceptor
  public getUsers(request: IUsersRequest): Observable<any> {
    return this.http.get(`https://reqres.in/api/users?page=${request.page}&per_page=${request.perPage}`);
  }

  public getUser(id: Number): Observable<IUser> {
    return this.http.get(`https://reqres.in/api/users/${id}`) // 'https://reqres.in/api/' - can be replaced with http interceptor
      .pipe(
        map(data => data['data'])
      );
  }
}
