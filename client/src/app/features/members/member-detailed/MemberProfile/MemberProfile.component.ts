import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { MemberEntity } from '../../../../types/member';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-profile',
  imports: [CommonModule],
  templateUrl: './MemberProfile.component.html',
  styleUrl: './MemberProfile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberProfileComponent implements OnInit{
  protected memberDetails = signal<MemberEntity | null>(null);
  constructor(
    private route: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {
   
  }
  ngOnInit(){
 this.route.parent?.data
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((data) => !!data),
        tap((data) => this.memberDetails.set(data['member']))
      )
      .subscribe();
  }
}
