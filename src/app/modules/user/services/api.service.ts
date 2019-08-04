import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly http: HttpClient) { }

  public getUsers(page: number = 0): Observable<any> {
    return this.http.get(`https://reqres.in/api/users?page=${page}`); // 'https://reqres.in/api/' - can be replaced with http interceptor
  }

  public getUser(id: string): Observable<any> {
    return this.http.get(`https://reqres.in/api/users/${id}`); // 'https://reqres.in/api/' - can be replaced with http interceptor
  }
}
