import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";


export interface SignupCredentials {
  username: string;
  password: string;
  passwordConformation: string
}

export interface SignupResponse {
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// export interface LoginResponse {
//   username: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'https://api.angular-email.com';
  public signedin$ = new BehaviorSubject(false);

  usernameAvailable(username: string) {
    return this.http.post<any>(this.baseUrl + '/auth/username', {username})
  }

  signup(values: SignupCredentials) {
    return this.http.post<SignupResponse>(this.baseUrl + '/auth/signup', values)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http.get(`${this.baseUrl}/auth/signedin`).pipe(
      tap((response: any) => {
        this.signedin$.next(response.authenticated)
      })
    );
  }

  signout() {
    return this.http.post(`${this.baseUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    )
  }

  signin(loginCredentials: LoginCredentials) {
    return this.http.post(`${this.baseUrl}/auth/signin`, loginCredentials).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }
}
