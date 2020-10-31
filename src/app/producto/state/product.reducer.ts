import { Producto } from '@app/models/producto';
import * as fromRoot from '@app/state/app-state';
import * as productActions  from './product.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ProductState extends EntityState<Producto> {
    selectedProductId: number | null;
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState {
    products: ProductState
}

export const productAdapter: EntityAdapter<Producto> = createEntityAdapter<Producto>();

export const defaultProduct: ProductState = {
    ids: [],
    entities: {},
    selectedProductId: null,
    loading: false,
    loaded: false,
    error: ""
}

export const initialState = productAdapter.getInitialState(defaultProduct);

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
            return productAdapter.setAll(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                products: action.payload
            })
        }
        case productActions.ProductActionTypes.LOAD_PRODUCTS_FAIL: {
            return {
                ...state,
                entities: {},
                loading: false,
                loaded: false,
                error: action.payload
            }
        }
        
        case productActions.ProductActionTypes.LOAD_PRODUCT_SUCCESS: {
            return productAdapter.addOne(action.payload, {
                ...state,
                selectedProductId: action.payload.id
            })
        }
        case productActions.ProductActionTypes.LOAD_PRODUCT_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case productActions.ProductActionTypes.CREATE_PRODUCT_SUCCESS: {
            return productAdapter.addOne(action.payload, state);
        }
        case productActions.ProductActionTypes.CREATE_PRODUCT_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case productActions.ProductActionTypes.UPDATE_PRODUCT_SUCCESS: {
            return productAdapter.updateOne(action.payload, state);
        }
        case productActions.ProductActionTypes.UPDATE_PRODUCT_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case productActions.ProductActionTypes.DELETE_PRODUCT_SUCCESS: {
            return productAdapter.removeOne(action.payload, state);
        }
        case productActions.ProductActionTypes.DELETE_PRODUCT_FAIL: {
            return {
                ...state,
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
    productAdapter.getSelectors().selectAll
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

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    (state: ProductState) => state.selectedProductId
)

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    state => state.entities[state.selectedProductId]
)