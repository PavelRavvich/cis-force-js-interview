import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';


import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent
  implements OnInit, OnDestroy {

  constructor(
    private readonly route: Router,
    private readonly router: ActivatedRoute,
    private readonly userService: UserService,
  ) { }

  public isLoading = true;

  private loadSubscription: Subscription;

  public user: IUser;

  public ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.loadSubscription = this.userService
      .getUser(+this.router.snapshot.params.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(user => {
        this.userService
          .caching(user.id, user);

        this.user = user;
      });
  }

  public ngOnDestroy(): void {
    this.loadSubscription.unsubscribe();
  }
}
