import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import {
  RouterOutlet,
} from '@angular/router';
import { Nav } from './layout/nav/nav';
import { AccountService } from './core/services/account.service';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Dating App');

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }
  setCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.accountService.currentUser.set(user);
    }
  }
}

