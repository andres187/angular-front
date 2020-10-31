import { Component, OnInit } from '@angular/core';
import { Producto } from '@app/models/producto';
import { TokenService } from '@app/service/token.service';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as productActions  from '@app/producto/state/product.actions';
import * as fromProduct from '@app/producto/state/product.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  products$: Observable<Producto[]>;
  error$: Observable<String>;

  isAdmin = false;
  roles: string[];

  constructor(
    private tokenService: TokenService,    
    private router: Router,
    private store: Store<fromProduct.AppState>) { }

  ngOnInit(): void {
    this.products();
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

  products(): void {
    this.store.dispatch(new productActions.LoadProducts());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.error$ = this.store.pipe(select(fromProduct.getError));
  }

  deleteProduct(id: number) {    
    if (confirm("¿Seguro quieres eliminar este producto?")){
      this.store.dispatch(new productActions.DeleteProduct(id));
    }
  }

  update(id: number){    
    this.router.navigate(['/products/editar', id]);
  }

}
