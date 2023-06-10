import * as actionTypes from './actionTypes';

export interface LaborInterface {
    loading: boolean,
    labors: Array<any>
}

export const initialLaborState: LaborInterface = {
    loading: false,
    labors: [],
};

export default function labors(state = initialLaborState, action: any) {
    switch(action.type) {
        case actionTypes.FETCH_LABOR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_LABOR_SUCCESS:
            return {
                ...state,
                loading: false,
                labors: action.payload,
            }  
        default:
            return state;  
    }
}