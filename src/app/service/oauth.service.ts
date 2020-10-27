import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from '@app/models/token-dto';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  oauthURL = environment.api_server + 'oauth/';

  constructor(private httpCliente: HttpClient) { }

  public google(tokenDto: TokenDto): Observable<TokenDto> {
    return this.httpCliente.post<TokenDto>(this.oauthURL + 'google', tokenDto, cabecera);
  }

  public facebook(tokenDto: TokenDto): Observable<TokenDto> {
    return this.httpCliente.post<TokenDto>(this.oauthURL + 'facebook', tokenDto, cabecera);
  }
}
