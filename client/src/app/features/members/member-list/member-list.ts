import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../types/user';
import { MemberCard } from '../member-card/member-card';
import { MemberEntity } from '../../../types/member';

@Component({
  selector: 'app-member-list',
  imports: [MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  members = signal<MemberEntity[]>([]);
  constructor(private route: ActivatedRoute) {
    this.members.set(this.route.snapshot.data['members']);
  }
}
