import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API } from '../../../environnement/api.environnement';
import {jwtDecode} from 'jwt-decode';
import Utilisateur from '../../../models/utilisateur.model';



interface UtilisateurDTO{
  email: string
  motDePasse: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(username : string, password: string): Observable<any> {
    let utilisateur : UtilisateurDTO = {
      email: username,
      motDePasse: password
    }
    return this.http.post<any>(API.AUTH.LOGIN, utilisateur)
      .pipe(
        tap(response => {
          const token = JSON.parse(JSON.stringify(response)).data.token
          this.saveToken(token);
        })
      );
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    if (localStorage.getItem(this.tokenKey) == null) return null;
    if (this.isTokenExpired(localStorage.getItem(this.tokenKey)!)) {
      this.logout();
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token == null) return false;
    return !!this.getToken();
  }

  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const expiration = decoded.exp;
    if (!expiration) return true;
    const now = Math.floor(Date.now() / 1000);
    return expiration < now;
  }



  public getRole(): string{
    const token = this.getToken();
    if (!token) return "";
    const decoded: any = jwtDecode(token);
    return decoded.utilisateur.role[0].label;
  }

  public hasRole(role: string): boolean {
    return this.getRole() == role
  }


  public getUser() : Utilisateur | null{
    const token = this.getToken();
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.utilisateur;
  }
}
