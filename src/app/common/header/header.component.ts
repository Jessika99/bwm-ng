import { Component } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'app';

  constructor(public auth: AuthService,
  			      public router: Router) {
  }

  logout() {
  	this.auth.logout();
  	this.router.navigate(['login']);
  }

  public search(city: string): void {
    city ? this.router.navigate([`rentals/${city}/homes`]) : this.router.navigate(['rentals'])
  }
}
