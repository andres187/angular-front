import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtDto } from '@app/models/jwt-dto';
import { LoginUser } from '@app/models/login-user';
import { NewUser } from '@app/models/new-user';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.api_server + 'auth/';

  constructor(private httpCliente: HttpClient) { }

  public newUser(newUser: NewUser): Observable<any> {
    return this.httpCliente.post<any>(this.authURL + 'new', newUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDto> {
    return this.httpCliente.post<JwtDto>(this.authURL + 'login', loginUser);
  }
}
