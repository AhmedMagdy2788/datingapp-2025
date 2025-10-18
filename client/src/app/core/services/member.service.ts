import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../../app.config';
import { MemberEntity, Photo } from '../../types/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = inject(BASE_API_URL);
  constructor(private http: HttpClient) { }

  getMembers() {
    const url = `${this.baseUrl}members`;
    return this.http.get<MemberEntity[]>(url);
  }

  getMember(id: string) {
    const url = `${this.baseUrl}members/${id}`;
    return this.http.get<MemberEntity>(url);
  }

  getMemberPhotos(id: string){
    const url = `${this.baseUrl}members/${id}/photos`;
    return this.http.get<Photo[]>(url);
  }
}
