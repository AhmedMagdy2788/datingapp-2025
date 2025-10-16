import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../types/user';

@Component({
  selector: 'app-member-detailed',
  imports: [],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css'
})
export class MemberDetailed {
  id = signal<string | null>(null);
  memberDetails = signal<User | null>(null);
  memberAge = computed(() => {
    if (!this.memberDetails()) return null;
    const today = new Date();
    const birthDate = new Date(this.memberDetails()!.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  });
  constructor(private route: ActivatedRoute) {
    this.id.set(this.route.snapshot.paramMap.get('id'));
    this.memberDetails.set(this.route.snapshot.data['member']);
  }
}
