import * as actionTypes from './actionTypes';

export interface PageLoaderInterface {
    pageLoading: boolean,
    title: string,
    msg: string,
}

export const initialPageLoadState: PageLoaderInterface = {
    pageLoading: false,
    title: '',
    msg: '',
};

export default function pageLoader(state = initialPageLoadState, action: any) {
    switch(action.type) {
        case actionTypes.START_PAGE_LOAD:
            return {
                ...state,
                pageLoading: true,
                title: action.title,
                msg: action.msg,
            }
        case actionTypes.STOP_PAGE_LOAD:
            return {
                ...state,
                pageLoading: false,
                title: '',
                msg: '',
            }  
        default:
            return state;  
    }
}