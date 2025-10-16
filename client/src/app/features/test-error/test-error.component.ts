import { ToastService } from './../../core/services/Toast.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-test-error',
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css',
})
export class TestErrorComponent {
  baseUrl = 'https://localhost:7053/api/';
  validationErrors = signal<string[]>([]);
  constructor(private http: HttpClient, private toaster: ToastService) {}
  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      // next: (response) => {
      //   console.log(response);
      // },
      // error: (error) => {
      //   console.log(error);
      //   this.toaster.error(JSON.stringify(error.error));
      // },
    });
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      // next: (response) => {
      //   console.log(response);
      // },
      // error: (error) => {
      //   console.log(error);
      //   this.toaster.error(JSON.stringify(error.error));
      // },
    });
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      // next: (response) => {
      //   console.log(response);
      // },
      // error: (error) => {
      //   console.log(error);
      //   this.toaster.error(JSON.stringify(error.error));
      // },
    });
  }
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      // next: (response) => {
      //   console.log(response);
      // },
      // error: (error) => {
      //   console.log(error);
      //   this.toaster.error(JSON.stringify(error.error));
      // },
    });
  }
  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        this.validationErrors.set(error);
        // this.toaster.error(JSON.stringify(error.error));
      },
    });
  }
}
