import { User } from './../../types/user';
import {Component, signal } from '@angular/core';
import { Register } from '../account/register/register';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  protected registerMode = signal(false);

  protected toggleRegisterMode() {
    this.registerMode.update((current) => !current);
  }
 
  onRegisterSuccess(user: User) {
    console.log('Registration successful:', user);
    this.registerMode.set(false);
  }
 }