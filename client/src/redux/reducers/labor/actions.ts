import * as actionTypes from './actionTypes';
import { startPageLoad, stopPageLoad } from '../pageLoader/actions';
import { fetchData, postData } from '../../../services/httpService';
import { HOST } from '../../../config/constants';


export function fetchLabors() {
    return (dispatch: any, getState: any) => {
        
        dispatch(requestLaborList());
        dispatch(startPageLoad('Please Wait...', 'Fetching Vendor List'));

        fetchData(`${HOST}/api/workers`)
            .then((res: any) => {
                dispatch(setLaborList(res));
                dispatch(stopPageLoad());
            })
            .catch((err: any) => {
                alert('err in fetching vendors');
            });
    }
}

export function requestLaborList(){
    return (dispatch: any, getState: any) => {
        dispatch({type: actionTypes.FETCH_LABOR_REQUEST});
    }
}

export function setLaborList(expList: Array<any>){
    return (dispatch: any, getState: any) => {
        dispatch({
            type: actionTypes.FETCH_LABOR_SUCCESS,
            payload: expList,
        });
    }
}

export function createLabor(labor: any) {
    return (dispatch: any, getState: any) => {
        const labors = [...getState().labors.labors];

        dispatch({type: actionTypes.CREATE_LABOR_REQUEST});
        dispatch(startPageLoad('Please Wait...', ''));
        postData(`${HOST}/api/worker`, labor).then((res: any) => {
            console.log('result ', res);
            labors.push(res);
            dispatch(setLaborList(labors));
            dispatch(stopPageLoad());
        }).catch((err: any) => {
            console.log(err);
        });
    }
}

