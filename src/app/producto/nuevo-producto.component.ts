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
  selectedFile: File;

  constructor(
    private router: Router,
    private store: Store<fromProduct.AppState>
    ) { }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onCreate(): void{
    const productForm = new FormData();

    productForm.append('product', new Blob(
      [
        JSON.stringify({
          "nombre": this.nombre,
          "precio": this.precio
        })
      ], {
        type: "application/json"
      }
    ));
    productForm.append('imageFile', this.selectedFile);

    const producto = new Producto(this.nombre, this.precio);

    this.store.dispatch(new productActions.CreateProduct(productForm));

    this.router.navigate(['/products']);
  }

}
