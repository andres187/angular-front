import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgPaymentCardModule } from 'ng-payment-card';
import { SubscribeComponent } from '@app/subscribe/subscribe.component';

import { ProdGuardService as guard } from '@app/guards/prod-guard.service';

const subscribeRoutes: Routes = [
    {path: '', component: SubscribeComponent, canActivate: [guard], data: {expectedRole: ['user']}},
]
    
@NgModule({
    declarations: [
      SubscribeComponent,
    ],
    imports: [
      CommonModule, 
      NgPaymentCardModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule.forChild(subscribeRoutes)
    ]
  })

export class SubscribeModule {
}
