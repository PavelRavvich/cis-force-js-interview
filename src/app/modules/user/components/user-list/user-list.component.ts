import {
  OnInit,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import {
  Observable,
  Subscription
} from 'rxjs';
import {
  map,
  tap,
  filter,
} from 'rxjs/operators';


import { IUser } from '../../interfaces/user.interface';
import { ApiService } from '../../services/api.service';
import { IPaginatorConfig } from 'app/shared/interfaces/paginator-config.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
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

  public readonly columns = [
    'First name',
    'Last name',
    'Email'
  ];

  public readonly keys = [
    'first_name',
    'last_name',
    'email',
  ];

  public paginatorConfig: IPaginatorConfig = {
    page: 1,
    dataLength: 0,
    perPage: 10,
    totalPages: 0,
    total: 0,
  };

  public ngOnInit(): void {
    this.loadPage();
  }

  public loadPage(): void {
    this.users = this.api
      .getUsers({
        page: this.paginatorConfig.page,
        perPage: this.paginatorConfig.perPage,
      })
      .pipe(
        tap(data => {
          this.paginatorConfig.page = data.page;
          this.paginatorConfig.total = data.total;
          this.paginatorConfig.perPage = data.per_page;
          this.paginatorConfig.totalPages = data.total_pages;
          this.paginatorConfig.dataLength = data.data.length;
        }),
        map(data => data.data)
      );
  }

  public view(id: Number): void {
    this.router.navigate([ `users/${id}` ]);
  }

  private updateRoute(): void {
    this.isBaseRoute = this.router.isActive(
      this.router.createUrlTree([ '.' ], { relativeTo: this.route }),
      true
    );
  }

  public pageChange(config: IPaginatorConfig): void {
    this.paginatorConfig = config;
    this.loadPage();
  }

  public ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
