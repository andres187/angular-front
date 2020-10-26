import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private tokenService: TokenService,
    private socialAuthService: SocialAuthService,
    private router: Router) { }

  isLogged = false;
  roles: string[];
  isAdmin = false;
  
  socialUser: SocialUser;
  userLogged: SocialUser;

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(role => {
        if (role === 'ROLE_ADMIN'){
          this.isAdmin = true;
        }
      })
    }
  }

  onLogout(): void{
    this.tokenService.logOut();
    this.socialAuthService.signOut();
    window.location.reload();
  }

}
