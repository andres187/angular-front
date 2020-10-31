import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '@app/models/producto';
import { ProductoService } from '@app/service/producto.service';
import { ToastrService } from 'ngx-toastr';

import * as productActions from '@app/producto/state/product.actions';
import * as fromProduct from '@app/producto/state/product.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  nombre: string = '';
  precio: number = null;
  lyric: string = '';
  composers: string = '';
  producers: string = '';
  language: number = null;
  gender: number = null;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<fromProduct.AppState>
    ) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const producto = new Producto(this.nombre, this.precio);

    //this.store.dispatch(new productActions.CreateProduct(producto));

    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto creado.', 'Ok', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
      }
    );
  }

}
