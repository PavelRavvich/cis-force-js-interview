import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


import { ApiService } from './api.service';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {

  constructor(
    private readonly api: ApiService
  ) {}

  private readonly _cache = new Map<Number, IUser>();

  public getUser(id: Number): Observable<IUser> {
    let user: Observable<IUser>;
    if (this._cache.has(id)) {
      user = of(this._cache.get(id));
    } else {
      user = this.api.getUser(id);
    }
    return user;
  }

  public caching(id: Number, user: IUser): void {
    this._cache.set(id, user);
  }
}
