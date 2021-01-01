import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '@app/service/subscribe.service';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  cardNumber: string;
  cardHolder: string;
  expirationMonth: string;
  expirationYear: string;
  ccv: number;
  merchantId: number = 694565;
  constructor(private subscribeService: SubscribeService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.subscribeService.save().subscribe(res => {
      window.alert(res);
    });
  }


}
