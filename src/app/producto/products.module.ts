import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdGuardService as guard } from '@app/guards/prod-guard.service';
import { ListaProductoComponent } from '@app/producto/lista-producto.component';
import { DetalleProductoComponent } from '@app/producto/detalle-producto.component';
import { NuevoProductoComponent } from '@app/producto/nuevo-producto.component';
import { EditarProductoComponent } from '@app/producto/editar-producto.component';

import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { productReducer } from '@app/producto/state/product.reducer';

import { ProductEffect } from '@app/producto/state/product.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const productRoutes: Routes = [
{path: '', component: ListaProductoComponent, canActivate: [guard], data: {expectedRole: ['admin', 'user']}},
{path: 'detalle/:id', component: DetalleProductoComponent, canActivate: [guard], data: {expectedRole: ['admin', 'user']}},
{path: 'nuevo', component: NuevoProductoComponent, canActivate: [guard], data: {expectedRole: ['admin', 'user']}},
{path: 'editar/:id', component: EditarProductoComponent, canActivate: [guard], data: {expectedRole: ['admin']}},]

@NgModule({
  declarations: [
    ListaProductoComponent,
    DetalleProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature("products", productReducer),
    EffectsModule.forFeature([ProductEffect])
  ]
})
export class ProductsModule { }
