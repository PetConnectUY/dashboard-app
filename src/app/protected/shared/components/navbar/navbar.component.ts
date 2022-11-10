import { Component, OnInit } from '@angular/core';
import { faBars, faSignOut, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  faKey = faKey;
  faSignOut = faSignOut;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.logout();
    window.location.reload();
  }

  getUser() {
    return this.authService.getUser()!;
  }
}
