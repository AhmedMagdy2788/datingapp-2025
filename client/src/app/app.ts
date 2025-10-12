import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Dating App');
  protected readonly members = signal<any[]>([]);

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getMembers();
  }
  getMembers() {
    this.httpClient.get('https://localhost:7053/api/members').subscribe({
      next: (response) => this.members.set(response as any[]),
      error: (error) => console.error(error),
      complete: () => console.log('Request completed'),
    });
  }
}
