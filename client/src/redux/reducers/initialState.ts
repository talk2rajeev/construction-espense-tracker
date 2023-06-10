import { initialExpenseState, ExpenseInterface } from './expense';
import { initialVendorState, VendorInterface } from './vendor';
import { initialLaborState, LaborInterface } from './labor';
import { PageLoaderInterface, initialPageLoadState } from './pageLoader';



interface StateInerface {
    expenses: ExpenseInterface,
    labors: LaborInterface,
    vendors: VendorInterface,
    pageLoader: PageLoaderInterface,
}


const initialState: StateInerface =  {
    vendors: initialVendorState,
    labors: initialLaborState,
    expenses: initialExpenseState,
    pageLoader: initialPageLoadState,
}

export default initialState;
