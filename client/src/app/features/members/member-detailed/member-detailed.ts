import { Component, computed, input, signal, DestroyRef } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MemberEntity } from '../../../types/member';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AgePipe } from '../../../shared/pipes/Age.pipe';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed {
  id = input<string | null>(null);
  protected title = signal<string | undefined>(undefined);
  memberDetails = signal<MemberEntity | null>(null);
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destroyRef: DestroyRef
  ) {
    // this.id.set(this.route.snapshot.paramMap.get('id'));
    this.route.data
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((data) => !!data),
        tap((data) => this.memberDetails.set(data['member']))
      )
      .subscribe();
    // this.memberDetails.set(this.route.snapshot.data['member']);
  }

  ngOnInit() {
    this.title.set(this.route.firstChild?.snapshot?.title);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap((event) => this.title.set(this.route.firstChild?.snapshot?.title))
      )
      .subscribe();
  }
}
