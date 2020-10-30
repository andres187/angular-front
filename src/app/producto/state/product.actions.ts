import { Action } from '@ngrx/store';

import { Producto } from '@app/models/producto';

export enum ProductActionTypes {
    LOAD_PRODUCTS = "[Product] Load Products",
    LOAD_PRODUCTS_SUCCESS = "[Product] Load Products Success",
    LOAD_PRODUCTS_FAIL = "[Product] Load Products Fail"
}

export class LoadProducts implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS
}

export class LoadProductsSuccess implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS

    constructor(public payload: Producto[]){}
}

export class LoadProductsFail implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_FAIL

    constructor(public payload: string) {}
}

export type ProductAction = LoadProducts | LoadProductsSuccess | LoadProductsFail;