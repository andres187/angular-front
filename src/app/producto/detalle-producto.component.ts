import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '@app/models/producto';
import { ProductoService } from '@app/service/producto.service';
import { AppState } from '@app/state/app-state';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import * as productActions from '@app/producto/state/product.actions';
import * as fromProduct from '@app/producto/state/product.reducer';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  product$: Observable<Producto>;
  producto: Producto = null;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.store.dispatch(new productActions.LoadProduct(id));
    
    this.product$ = this.store.select(fromProduct.getCurrentProduct);

    this.product$.subscribe(currentProduct => {
      if (currentProduct) {
        this.producto = currentProduct;
      }
    })
  }

  back(): void{
    this.router.navigate(['/products']);
  }

}
