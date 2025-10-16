import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../types/api-error';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerErrorComponent {
  protected error = signal<ApiError | null>(null);
  protected showDetails = signal(false);
  constructor(private location: Location, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error.set(navigation?.extras?.state?.['error']);
  }
  detailsToggle() {
    this.showDetails.update((s) => !s);
  }
  goBack() {
    this.location.back();
  }
}
