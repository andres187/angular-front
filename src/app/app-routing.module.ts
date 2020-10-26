import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';
import { IndexComponent } from './index/index.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'lista', component: ListaProductoComponent, canActivate: [guard], data: {expectedRole: ['admin', 'user']}},
  {path: 'detalle/:id', component: DetalleProductoComponent, canActivate: [guard], data: {expectedRole: ['admin', 'user']}},
  {path: 'nuevo', component: NuevoProductoComponent, canActivate: [guard], data: {expectedRole: ['admin', 'user']}},
  {path: 'editar/:id', component: EditarProductoComponent, canActivate: [guard], data: {expectedRole: ['admin']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
