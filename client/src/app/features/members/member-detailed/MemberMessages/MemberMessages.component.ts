import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-member-messages',
  imports: [],
  templateUrl: './MemberMessages.component.html',
  styleUrl: './MemberMessages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberMessagesComponent { }
