import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'https://api.angular-email.com';


  usernameAvailable(username: string) {
    return this.http.post<any>(this.baseUrl + '/auth/username', {username})
  }
}
