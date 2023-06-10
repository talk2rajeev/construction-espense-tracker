import * as actionTypes from './actionTypes';
import { fetchData, postData } from '../../../services/httpService';
import { startPageLoad, stopPageLoad } from '../pageLoader/actions';
import { HOST } from '../../../config/constants';


export function createExpense(formData: any): any {
    
    return (dispatch: any, getState: any) => {

        const { expenseList } = getState().expenses;
        const newExpList = [...expenseList];
        
        dispatch(startPageLoad('Please Wait...', 'Fetching Expense List'));
        //  dispatch(requestExpenseList());

        postData(`${HOST}/api/expense`, formData)
            .then((res: any) => {
                newExpList.push(res);
                dispatch(setExpenseList(newExpList));
                dispatch(stopPageLoad());
            })
            .catch((err: any) => {
                alert('err in creating expenses');
            });
    }
}

export function fetchExpenses(): any {
    return (dispatch: any, getState: any) => {
        
        dispatch(requestExpenseList());
        dispatch(startPageLoad('Please Wait...', 'Fetching Expense List'));

        fetchData(`${HOST}/api/expenses`)
            .then((res: any) => {
                dispatch(setExpenseList(res));
                dispatch(stopPageLoad());
            })
            .catch((err: any) => {
                dispatch(stopPageLoad());
                alert('err in fetching expenses');
            });
    }
}

export function setExpenseList(expList: Array<any>){
    return (dispatch: any, getState: any) => {
        dispatch({
            type: actionTypes.FETCH_EXPENSE_SUCCESS,
            payload: expList,
        });
    }
}

export function requestExpenseList(){
    return (dispatch: any, getState: any) => {
        dispatch({type: actionTypes.FETCH_EXPENSE_REQUEST});
    }
}

export function advanceSeach(formData: any) {
    
    return (dispatch: any, getState: any) => {
        
        dispatch(startPageLoad('Please Wait!', 'Getting expense list'));

        postData(`${HOST}/api/expensebydate`, formData)
            .then((res: any) => {
                
                dispatch(setExpenseList(res));
                dispatch(stopPageLoad());
            })
            .catch((err: any) => {
                alert('err in creating expenses');
            });
    }
}


