import { Component, OnInit } from '@angular/core';
import { TokenService } from '@app/service/token.service';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  userName = '';
  userLogged: SocialUser;

  constructor(private tokenService: TokenService,
    private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
    }
  }

}
