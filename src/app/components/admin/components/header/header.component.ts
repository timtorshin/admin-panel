import { Component, OnInit } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { filter, mapTo, merge, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private showLoader!: Observable<boolean>;
  private hideLoader!: Observable<boolean>;
  isLoading!: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.showLoader = this.router.events.pipe(
      filter(evt => evt instanceof ResolveStart),
      mapTo(true)
    );

    this.hideLoader = this.router.events.pipe(
      filter(evt => evt instanceof ResolveEnd),
      mapTo(false)
    );

    this.isLoading = merge(this.showLoader, this.hideLoader);
  }

  onClickLogout() {
    this.authService.logout();
  }
}
