import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AppLayout from '../App-Layout';
import { Switch, Route, Link } from "react-router-dom";
import MobileAppAHeader from '../../components/app-header';
import {MobileFlexRow, Col, Select, Button} from '../../components';
import {Auth} from '../Login/Auth';
import ExpList from '../Dashboard/ExpList';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenseList, advanceSeach } from '../../redux/reducers/expense/actions';
import { fetchVendors } from '../../redux/reducers/vendor/actions';
import { fetchLabors } from '../../redux/reducers/labor/actions';
import { InputText } from '../../components';
import { fetchExpenses } from '../../redux/reducers/expense/actions';
import Visualize from './Visualize';

const AdvanceFilter = styled.div`
    padding: 10px;
    background: #f0f0f0;
    margin-top: 17px;
    overflow: auto;
    .input-label{
        margin: 10px 0 5px;
    }
`;
const SearchBtn = styled.span`
    position: absolute;
    top: 2px;
    right: 0px;
    border: 1px solid #cdcdcd;
    padding: 0 5px;
    border-radius: 4px;
    cursor: pointer;
    touch-action: manipulation;
`;
const RefreshBtn = styled.span`
    position: absolute;
    top: 2px;
    right: 31px;
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    padding: 5px 12px;
    background: #f44336;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    touch-action: manipulation;
`;

enum SerachReqEnum {
    startDate= 'startDate',
    endDate= 'endDate',
    exp_type= 'exp_type',
    vendor_id= 'vendor_id',
}
interface FormDataInterface {
    [SerachReqEnum.startDate]?: string,
    [SerachReqEnum.endDate]?: string,
    [SerachReqEnum.exp_type]?: string,
    [SerachReqEnum.vendor_id]?: string,
}
const initialFormData: FormDataInterface = {
    [SerachReqEnum.startDate]: '',
    [SerachReqEnum.endDate]: '',
    [SerachReqEnum.exp_type]: '',
    [SerachReqEnum.vendor_id]: '',
}


interface Props {
    
}


const Dashboard = (props: any) => {

    const dispatch = useDispatch();
    const {vendors, loading} = useSelector((state: any) => state.vendors);
    const labors = useSelector((state: any) => state.labors);
    const [formData, setFormData] = useState(initialFormData);
    const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);

    
    useEffect(() => {
        if (vendors.length === 0) {
            dispatch(fetchVendors());
        }
        if (labors.labors.length === 0) {
            dispatch(fetchLabors());
        }
    }, []);
    /*
    const getVendors = () => {
        const token = Auth.getToken();
        const URL ='http://localhost:5000/api/expenses';

        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorizarion': 'Bearer '+token.access_token
            }
        };

        fetch(URL, getOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.json());
            }
        }).then((result: any) => {
            console.log(result)
        }).catch((err: any) =>{
            console.log('failed to get vendors')
        });
    }

    const getUsers = () => {
        const token = Auth.getToken();
        const URL ='http://localhost:5000/api/users';

        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorizarion': 'Bearer '+token.access_token
            }
        };

        fetch(URL, getOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.json());
            }
        }).then((result: any) => {
            console.log(result)
        }).catch((err: any) =>{
            console.log('failed to get vendors')
        });
    }

    const getExpByDate = () => {
        

        const token = Auth.getToken();
        const URL ='http://localhost:5000/api/expensebydate';

        const data = {
            "startDate": "2020-09-10T18:30:00.000Z",
            "endDate": "2020-09-20T18:30:00.000Z"
        };

        const getOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorizarion': 'Bearer '+token.access_token
            },
            body: JSON.stringify(data)
        };

        fetch(URL, getOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.json());
            }
        }).then((result: any) => {
            console.log(result)
        }).catch((err: any) =>{
            console.log('failed to get espenses');
        });
    }
    */


    const onPageRefresh = () => {
        dispatch(fetchExpenses());
    }

    const onChange = (name: string, value: string) => {
        const newFomData = {...formData};
        setFormData({
            ...newFomData,
            [name]: value,
        });
    }


    const search = () => {
        let newFomData = {...formData};
        if (newFomData.startDate==='' && newFomData.endDate==='' && newFomData.exp_type==='' && newFomData.vendor_id==='') {
            alert('No search criteria Selrcted');
            return;
        }
        if (newFomData.startDate==='' && newFomData.endDate===''){
            delete newFomData['startDate'];
            delete newFomData['endDate']
        }
        if (newFomData.startDate==='' && newFomData.endDate!==''){
            alert('startDate is empty');
            return;
        }
        if (newFomData.startDate!=='' && newFomData.endDate===''){
            newFomData['endDate'] = new Date().toISOString();
        }
        if (newFomData.exp_type==='') {
            delete newFomData['exp_type'];
        }
        if (newFomData.vendor_id==='') {
            delete newFomData['vendor_id'];
        }
        if (newFomData.vendor_id === "Select") {
            delete newFomData.vendor_id;
        }

        console.log(newFomData);
        dispatch(advanceSeach(newFomData));
        

    }

    const getVendorList = () => {
        const list: Array<{id: string, value: string}> = vendors.map((item: any) => {
            return {id: item._id, value: item.name};
        });
        return list;
    }

    const getLaborList = () => {
        const list: Array<{id: string, value: string}> = labors.labors.map((item: any) => {
            return {id: item._id, value: item.name};
        });
        return list;
    }
    
    const vendorLabors = [...getVendorList(), ...getLaborList()];
    console.log(vendorLabors);


    return (
        <AppLayout>
            <div>
                <MobileAppAHeader />
                <div style={{padding: '0 10px'}}>
                    <div style={{position: 'relative'}}>
                        <div style={{marginBottom: 10}}>
                            <Link to={`/dashboard/list`}>Expense-List</Link>&nbsp;&nbsp;&nbsp;
                            <Link to={`/dashboard/detail`}>Visualize</Link>
                        </div>
                        <SearchBtn onClick={()=>setShowAdvanceSearch(!showAdvanceSearch)}>&#128269;</SearchBtn>
                        <RefreshBtn onClick={onPageRefresh}>Refresh Page</RefreshBtn>
                        {
                            showAdvanceSearch ? (
                                <AdvanceFilter>
                                    <div>
                                        <MobileFlexRow>
                                            <Col >
                                                <p className="input-label">Start Date</p>
                                                <input className="text-input" type="date" name={SerachReqEnum.startDate} onChange={(e) => onChange("startDate", new Date(e.target.value).toISOString())} />
                                            </Col>
                                            <Col >
                                                <p className="input-label">End Date</p>
                                                <input className="text-input" type="date" name={SerachReqEnum.endDate} onChange={(e) => onChange("endDate", new Date(e.target.value).toISOString())} />
                                            </Col>
                                        </MobileFlexRow>
                                    </div>
                                    <div>
                                        <MobileFlexRow>
                                            <Col >
                                                <p className="input-label">Expense Type</p>
                                                <select className="text-input" name="exp_type" onChange={(e: any) => {onChange('exp_type', e.target.value)}}>
                                                    <option>Select</option>
                                                    <option value="Material">Material</option>
                                                    <option value="Labor">Labor</option>
                                                </select>
                                            </Col>
                                            <Col >
                                                <p className="input-label">Vendor/Labor/Contractor</p>
                                                <select className="text-input" name={SerachReqEnum.vendor_id} onChange={(e: any) => {onChange(SerachReqEnum.vendor_id, e.target.value)}}>
                                                    <option>Select</option>
                                                    {
                                                        vendorLabors.map((item: any) => {
                                                            return <option value={item.id}>{item.value}</option>
                                                        })
                                                    }
                                                </select>
                                            </Col>
                                            <Col>
                                                <p className="input-label">Expense Name</p>
                                                <InputText name="exp_name" onChange={onChange} />
                                            </Col>
                                        </MobileFlexRow>
                                    </div>
                                    <div style={{margin: '10px 0'}}>
                                        <Button title="Search" color="primary" onClick={search} />
                                    </div>
                                </AdvanceFilter>
                            ) : null
                        }

                        <div>
                            <Switch>
                                <Route path={'/dashboard/list'} component={() => <ExpList />} />
                                <Route path={'/dashboard/detail'} component={() => <Visualize />} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard;
