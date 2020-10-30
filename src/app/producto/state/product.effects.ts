import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ProductoService } from '@app/service/producto.service';
import * as productActions from '@app/producto/state/product.actions';
import { Producto } from '@app/models/producto';

@Injectable()
export  class ProductEffect {
    constructor(
        private actions$: Actions,
        private productService: ProductoService
    ) {}

    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.LoadProducts>(
            productActions.ProductActionTypes.LOAD_PRODUCTS
        ),
        mergeMap((actions: productActions.LoadProducts) => 
        this.productService.lista().pipe(
            map(
                (products: Producto[]) =>
                new productActions.LoadProductsSuccess(products)
            ),
            catchError(err => of(new productActions.LoadProductsFail(err)))
        ))
    )
}