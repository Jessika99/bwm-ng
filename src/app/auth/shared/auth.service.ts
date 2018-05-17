import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import 'rxjs/Rx';

class DecodedToken {
	exp: number = 0;
	username: string = '';
}

@Injectable()
export class AuthService {
  private decodedToken: DecodedToken;

  constructor(private http: HttpClient) {
    this.setDecodedToken();
  }

  private saveToken(token) {
  	this.decodedToken = jwt.decode(token);

    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  private setDecodedToken() {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  private getExpiration(): any {
  	return moment.unix(this.decodedToken.exp);
  }

  public getAuthToken(): string {
      return localStorage.getItem('bwm_auth');
   }
 
  public getUsername(): string {
    return this.decodedToken.username;
  }

  public register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  public login(loginData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', loginData)
    				.map(token => this.saveToken(token));
  }

  public logout() {
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');
    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
  	return moment().isBefore(this.getExpiration());
  }
}