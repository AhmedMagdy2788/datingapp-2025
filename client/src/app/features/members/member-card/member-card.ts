import { Router } from '@angular/router';
import { User } from './../../../types/user';
import { Component, computed, input } from '@angular/core';
import { FlatButtonComponent } from '../../../layout/FlatButton/FlatButton.component';

@Component({
  selector: 'app-member-card',
  imports: [FlatButtonComponent],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCard {
  member = input.required<User>();
  memberAge = computed(() => {
    return new Date(this.member().dateOfBirth).getFullYear() - new Date().getFullYear();
  });
  constructor(private router: Router) {}
  viewProfile() { 
    this.router.navigateByUrl(`/members/${this.member().id}`);
  }
}
