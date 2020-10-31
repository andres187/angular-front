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

    //Cargar productos
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
    );

    //Cargar un producto
    @Effect()
    loadProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.LoadProduct>(
            productActions.ProductActionTypes.LOAD_PRODUCT
        ),
        mergeMap((action: productActions.LoadProduct) => 
        this.productService.detail(action.payload).pipe(
            map(
                (product: Producto) =>
                new productActions.LoadProductSuccess(product)
            ),
            catchError(err => of(new productActions.LoadProductFail(err)))
        ))
    );

    //Crear un producto
    @Effect()
    createProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.CreateProduct>(
            productActions.ProductActionTypes.CREATE_PRODUCT
        ),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: Producto) => 
            this.productService.save(product).pipe(
                map(
                    (newProduct: Producto) =>
                    new productActions.CreateProductSuccess(newProduct)
                ),
                catchError(err => of(new productActions.CreateProductFail(err)))
            )
        )
    );

    //actualizar un producto
    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.UpdateProduct>(
            productActions.ProductActionTypes.UPDATE_PRODUCT
        ),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Producto) => 
            this.productService.update(product.id, product).pipe(
                map(
                    (updateProduct: Producto) =>
                    new productActions.UpdateProductSuccess({
                        id: updateProduct.id,
                        changes: updateProduct
                    })
                ),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    );

    //Eliminar un producto
    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.DeleteProduct>(
            productActions.ProductActionTypes.DELETE_PRODUCT
        ),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((id: number) => 
            this.productService.delete(id).pipe(
                map(() => new productActions.DeleteProductSuccess(id)
                ),
                catchError(err => of(new productActions.DeleteProductFail(err)))
            )
        )
    );
    
}