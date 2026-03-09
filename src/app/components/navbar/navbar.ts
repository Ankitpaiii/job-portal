import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserRole(): string {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString).role;
    }
    return '';
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
