import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { LoginUser } from '../models/login-user';
import { TokenDto } from '../models/token-dto';
import { AuthService } from '../service/auth.service';
import { OauthService } from '../service/oauth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

isLogged = false;
isLoginFail = false;
loginUser: LoginUser;
userName: string;
password: string;
roles: string[] = [];
errMsj: string;

socialUser: SocialUser;
userLogged: SocialUser;

  constructor( private tokenService: TokenService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.userName, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;
        
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.message;
      }
    )
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.idToken);
        this.oauthService.google(tokenGoogle).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.tokenService.setUserName(this.socialUser.name);
            this.isLogged = true;
            this.router.navigate(['/'])
          }
        ),
          (err: any) => {
          console.log(err);
          this.logOut();
        };
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }
 
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenFacebook = new TokenDto(this.socialUser.authToken);
        this.oauthService.facebook(tokenFacebook).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.tokenService.setUserName(this.socialUser.name);
            this.isLogged = true;
            this.router.navigate(['/']);
          }
        ),
          (err: any) => {
          console.log(err);
          this.logOut();
        };
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  logOut(): void{
    this.tokenService.logOut();
    this.socialAuthService.signOut();
  }

}
