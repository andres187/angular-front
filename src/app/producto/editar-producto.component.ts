import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '@app/models/producto';
import { ProductoService } from '@app/service/producto.service';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';

import * as productActions from '@app/producto/state/product.actions';
import * as fromProduct from '@app/producto/state/product.reducer';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  productForm: FormGroup;

  product$: Observable<Producto>;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromProduct.AppState>) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.productForm = this.fb.group({
      nombre: ["", Validators.required],
      precio: ["", Validators.required],
      id: null
    })
    
    this.store.dispatch(new productActions.LoadProduct(id));
    
    this.product$ = this.store.select(fromProduct.getCurrentProduct);

    this.product$.subscribe(currentProduct => {
      if (currentProduct) {
        this.productForm.patchValue({
          nombre: currentProduct.nombre,
          precio: currentProduct.precio,
          id: currentProduct.id
        });
      }
    })
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;

    const updatedProduct: Producto = {
      nombre: this.productForm.get("nombre").value,
      precio: this.productForm.get("precio").value,
      id: this.productForm.get("id").value
    };

    this.store.dispatch(new productActions.UpdateProduct(updatedProduct));

    this.router.navigate(['products']);

  }

}
