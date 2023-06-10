import * as actionTypes from './actionTypes';

export function startPageLoad(title: string, msg: string): any {
    return (dispatch: any, getState: any) => {
        dispatch({
            type: actionTypes.START_PAGE_LOAD,
            title,
            msg,
        });
    }
}

export function stopPageLoad(): any {
    return (dispatch: any, getState: any) => {
        dispatch({
            type: actionTypes.STOP_PAGE_LOAD,
            title: '',
            msg: '',
        });
    }
}