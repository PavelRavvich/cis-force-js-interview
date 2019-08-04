import { NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  constructor(
    private readonly router: Router,
  ) {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(this.update.bind(this));
    this.update();
  }

  private routerSubscription: Subscription;

  private update(): void {
    if (location.pathname.indexOf('users') === -1) {
      this.router.navigate(['users']);
    }
  }

  public ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
