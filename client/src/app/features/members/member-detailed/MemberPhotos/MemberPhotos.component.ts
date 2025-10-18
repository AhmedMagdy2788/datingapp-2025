import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  DestroyRef,
} from '@angular/core';
import { MemberService } from '../../../../core/services/member.service';
import { Photo } from '../../../../types/member';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-photos',
  imports: [],
  templateUrl: './MemberPhotos.component.html',
  styleUrl: './MemberPhotos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberPhotosComponent implements OnInit {
  id = signal<string | undefined>(undefined);
  protected photos = signal<Photo[]>([]);
  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private destroyRef: DestroyRef
  ) {
    this.id.set(this.route.parent?.snapshot.paramMap.get('id') ?? '');
  }
  ngOnInit(): void {
    this.memberService
      .getMemberPhotos(this.id()!)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((data) => !!data),
        tap((data) => this.photos.set(data))
      )
      .subscribe();
  }
}
