import * as actionTypes from './actionTypes';

export interface VendorInterface {
    loading: boolean,
    vendors: Array<any>
}

export const initialVendorState: VendorInterface = {
    loading: false,
    vendors: [],
};

export default function vendors(state = initialVendorState, action: any) {
    switch(action.type) {
        case actionTypes.FETCH_VENDOR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_VENDOR_SUCCESS:
            return {
                ...state,
                loading: false,
                vendors: action.payload,
            }  
        default:
            return state;  
    }
}