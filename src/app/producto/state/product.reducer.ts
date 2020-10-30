import { Producto } from '@app/models/producto';
import * as fromRoot from '@app/state/app-state';
import * as productActions  from './product.actions';

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