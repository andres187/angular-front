import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/auth/login.component';
import { RegisterComponent } from '@app/auth/register.component';
import { ProdGuardService as guard } from '@app/guards/prod-guard.service';
import { IndexComponent } from '@app/index/index.component';
import { DetalleProductoComponent } from '@app/producto/detalle-producto.component';
import { EditarProductoComponent } from '@app/producto/editar-producto.component';
import { ListaProductoComponent } from '@app/producto/lista-producto.component';
import { NuevoProductoComponent } from '@app/producto/nuevo-producto.component';

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
