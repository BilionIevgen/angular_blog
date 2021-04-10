import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { FbAuthResponse, User } from "src/app/shared/interface";
import { Observable, Subject, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) {}

  login(user: User): Observable<FbAuthResponse> {
    return this.httpClient
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout() {
    this.setToken(null);
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('exp-token'))
    if (expDate < new Date()) {
      this.logout();
      return null;
    }
    return localStorage.getItem("token");
  }

  private setToken(data: FbAuthResponse | null) {
    if (data) {
      const expDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("exp-token", expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    
    switch (message) {
      case "EMAIL_NOT_FOUND":
        // emmited new event
        this.error$.next('No such Email')
        break;
      case "INVALID_EMAIL":
        // emmited new event
        this.error$.next('Wrong Email')
        break;
      case "INVALID_PASSWORD":
        // emmited new event
        this.error$.next('Wrong Password')
        break;

      default:
        break;
    }
    throwError(error);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

}
