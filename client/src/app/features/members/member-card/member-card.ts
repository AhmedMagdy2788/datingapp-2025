import { Router, RouterLink } from '@angular/router';
import { User } from './../../../types/user';
import { Component, computed, input } from '@angular/core';
import { FlatButtonComponent } from '../../../layout/FlatButton/FlatButton.component';
import { MemberEntity } from '../../../types/member';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCard {
  member = input.required<MemberEntity>();
  memberAge = computed(() => {
    const today = new Date();
    const birthDate = new Date(this.member()!.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  });
  constructor(private router: Router) {}
  viewProfile() { 
    this.router.navigateByUrl(`/members/${this.member().id}`);
  }
}
