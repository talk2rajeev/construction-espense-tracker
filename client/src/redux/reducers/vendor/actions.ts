import * as actionTypes from './actionTypes';
import { startPageLoad, stopPageLoad } from '../pageLoader/actions';
import { fetchData, postData } from '../../../services/httpService';
import { HOST } from '../../../config/constants';



const vendors = [{name: "some name", address: "address", contact: 9898787656},{name: "some name", address: "address", contact: 0}];

export function reqVendors() {
    return {
        type: actionTypes.FETCH_VENDOR_REQUEST,
    }
}
export function fetchVendors() {
    return (dispatch: any, getState: any) => {
        
        dispatch(requestVendorList());
        dispatch(startPageLoad('Please Wait...', 'Fetching Vendor List'));

        fetchData(`${HOST}/api/vendors`)
            .then((res: any) => {
                dispatch(setVendorList(res));
                dispatch(stopPageLoad());
            })
            .catch((err: any) => {
                alert('err in fetching vendors');
            });
    }
}

export function requestVendorList(){
    return (dispatch: any, getState: any) => {
        dispatch({type: actionTypes.FETCH_VENDOR_REQUEST});
    }
}

export function setVendorList(expList: Array<any>){
    return (dispatch: any, getState: any) => {
        dispatch({
            type: actionTypes.FETCH_VENDOR_SUCCESS,
            payload: expList,
        });
    }
}

export function createVendor(formData: any) {
    return (dispatch: any, getState: any) => {
        const vendors = [...getState().vendors.vendors];

        dispatch({type: actionTypes.CREATE_VENDOR_REQUEST});
        dispatch(startPageLoad('Please Wait...', 'Creating Vendor'));
        postData(`${HOST}/api/vendor`, formData).then((res: any) => {
            console.log('result ', res);
            vendors.push(res);
            dispatch(setVendorList(vendors));
            dispatch(stopPageLoad());
        }).catch((err: any) => {
            console.log(err);
        });
    }
}



