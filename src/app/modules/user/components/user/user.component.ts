import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';


import { ApiService } from '../../services/api.service';
import { IUser } from '../../interfaces/user.interface';

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
    private readonly api: ApiService,
  ) { }

  public isLoading = true;

  private loadSubscription: Subscription;

  public user: IUser;

  public ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.loadSubscription = this.api
      .getUser(this.router.snapshot.params.id)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe(data => this.user = data.data);
  }

  public ngOnDestroy(): void {
    this.loadSubscription.unsubscribe();
  }

}
