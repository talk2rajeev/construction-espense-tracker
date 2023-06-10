import * as actionTypes from './actionTypes';

export interface ExpenseInterface {
    loading: boolean,
    expenseList: Array<any>
}

export const initialExpenseState: ExpenseInterface = {
    loading: false,
    expenseList: [],
};

export default function expenses(state = initialExpenseState, action: any) {
    switch(action.type) {
        case actionTypes.FETCH_EXPENSE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_EXPENSE_SUCCESS:
            return {
                ...state,
                loading: false,
                expenseList: action.payload,
            }  
        default:
            return state;  
    }
}