import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { filter, map } from 'rxjs/operators';


import { IUser } from '../../interfaces/user.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent
  implements OnInit, OnDestroy {

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(this.updateRoute.bind(this));
  }

  private routerSubscription: Subscription;

  public users: Observable<IUser[]>;

  public isBaseRoute: boolean;

  public ngOnInit() {
    this.users = this.api.getUsers()
      .pipe(
        map(data => data.data)
      );
  }

  public toDetails(id: string): void {
    this.router.navigate([ `users/${id}` ]);
  }

  private updateRoute(): void {
    this.isBaseRoute = this.router.isActive(
      this.router.createUrlTree([ '.' ], { relativeTo: this.route }),
      true
    );
  }

  public ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
