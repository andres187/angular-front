import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { ListaProductoComponent } from '@app/producto/lista-producto.component';
import { DetalleProductoComponent } from '@app/producto/detalle-producto.component';
import { NuevoProductoComponent } from '@app/producto/nuevo-producto.component';
import { EditarProductoComponent } from '@app/producto/editar-producto.component';
import { interceptorProvider } from '@app/interceptors/prod-interceptor.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from '@app/auth/login.component';
import { RegisterComponent } from '@app/auth/register.component';
import { MenuComponent } from '@app/menu/menu.component';
import { IndexComponent } from '@app/index/index.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductoComponent,
    DetalleProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    interceptorProvider,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '609546117576-s47ql8dcujeo7f50ftqpgaekvom927o2.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('335496677713223'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
