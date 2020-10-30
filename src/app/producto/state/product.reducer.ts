import { Producto } from '@app/models/producto';
import * as fromRoot from '@app/state/app-state';
import * as productActions  from './product.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { state } from '@angular/animations';

export interface ProductState {
    products: Producto[],
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState {
    products: ProductState
}

export const initialState: ProductState = {
    products: [],
    loading: false,
    loaded: false,
    error: ""
}

export function productReducer(
    state = initialState, 
    action: productActions.ProductAction
): ProductState {
    switch(action.type) {
        case productActions.ProductActionTypes.LOAD_PRODUCTS: {
            return {
                ...state,
                loading: true
            }
        }
        case productActions.ProductActionTypes.LOAD_PRODUCTS_SUCCESS: {
            return {
                ...state,
                loading: true,
                products: action.payload
            }
        }
        case productActions.ProductActionTypes.LOAD_PRODUCTS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

const getProductFeatureState = createFeatureSelector<ProductState>(
    "products"
)

export const getProducts = createSelector(
    getProductFeatureState,
    (state: ProductState) => state.products
)

export const getProductsLoading = createSelector(
    getProductFeatureState,
    (state: ProductState) => state.loading
)


export const getProductsLoaded = createSelector(
    getProductFeatureState,
    (state: ProductState) => state.loaded
)


export const getError = createSelector(
    getProductFeatureState,
    (state: ProductState) => state.error
)