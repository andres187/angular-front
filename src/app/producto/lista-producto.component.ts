import { Component, OnInit } from '@angular/core';
import { Producto } from '@app/models/producto';
import { ProductoService } from '@app/service/producto.service';
import { TokenService } from '@app/service/token.service';
import { ToastrService } from 'ngx-toastr';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as productActions  from '@app/producto/state/product.actions';
import * as fromProduct from '@app/producto/state/product.reducer';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  products$: Observable<Producto[]>;

  isAdmin = false;
  roles: string[];

  constructor(private productoService: ProductoService,
    private tokenService: TokenService,    
    private toastr: ToastrService,
    private store: Store<fromProduct.AppState>) { }

  ngOnInit(): void {
    this.cargarProductos();
    if(this.tokenService.getToken()){
      this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(
        role => {
          if(role === 'ROLE_ADMIN' ){
            this.isAdmin = true;
          }
        }
      );
    }
  }

  cargarProductos(): void {
    this.store.dispatch(new productActions.LoadProducts());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto eliminado.', 'Ok', {
          timeOut: 3000
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.success(err.error.mensaje, 'Error', {
          timeOut: 3000
        });
        this.cargarProductos();
      }
    )
  }

}
