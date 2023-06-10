import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { FlexRow, MobileFlexRow, Col, InputText, InputNumber, Button, Heading, FormLabel, Select, Loader } from '../../components';
import { RoundCard, FormWrapper } from './CreatePurchase';
import { useSelector, useDispatch } from 'react-redux';
import { createExpense } from '../../redux/reducers/expense/actions';
import { fetchLabors } from '../../redux/reducers/labor/actions';


interface Props {
    title: string;

}

enum formEnum {
    exp_name= 'exp_name',
    exp_amount= 'exp_amount',
    vendor_id= 'vendor_id',
    vendor_name= 'vendor_name',
    exp_type= 'exp_type',
    exp_date= 'exp_date',
    no_of_days= 'no_of_days',
    date='date',
    note= 'note',
}

export const CreateServicePaid = (props: Props) => {

    interface FormDataInterface {
        [formEnum.exp_name]: string,
        [formEnum.exp_amount]: number,
        [formEnum.no_of_days]: number,
        [formEnum.vendor_id]: string,
        [formEnum.vendor_name]: string,
        [formEnum.exp_type]: string,
        [formEnum.exp_date]: string,
        [formEnum.note]: string;
    }
    const initFormData: FormDataInterface = {
        [formEnum.exp_name]: '',
        [formEnum.exp_amount]: 0,
        [formEnum.vendor_id]: '',
        [formEnum.vendor_name]: '',
        [formEnum.exp_type]: 'Labor',
        [formEnum.exp_date]: new Date().toISOString(),
        [formEnum.no_of_days]: 0,
        [formEnum.note]: '',
    };

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initFormData);
    
    const {labors, loading} = useSelector((state: any) => state.labors);

    const onSelectChange = (name: string, value: any) => {
        console.log(name, value);
        const newFormData: FormDataInterface = {
            ...formData,
            vendor_id: value.id,
            vendor_name: value.value,
        };
        setFormData(newFormData);
    }

    const onChange = (name: string, value: any) => {
        const newFormData: FormDataInterface = {
            ...formData,
            [name]: value,
        };
        setFormData(newFormData);
    }

    const submit = () => {
        console.log(formData);
        dispatch(createExpense(formData));
    }

    React.useEffect(() => {
        if (labors.length === 0) {
            dispatch(fetchLabors());
        }
        
    }, []);

    const getLaborList = () => {
        const list: Array<{id: string, value: string}> = labors.map((item: any) => {
            return {id: item._id, value: item.name};
        });
        return list;
    }

    return (
        <div>
            <RoundCard>
                <FormWrapper>
                    <Heading title="Paid for Services (labor cost etc...)" />
                    <div>
                        <div className="form-row">
                            <MobileFlexRow>
                                <Col col={1}>
                                    <FormLabel title="Expennse Name *" />
                                </Col>
                                <Col col={3}><InputText name={formEnum.exp_name} onChange={onChange} /></Col>
                            </MobileFlexRow>
                        </div>
                        <div className="form-row">
                            <MobileFlexRow>
                                <Col col={1}>
                                    <FormLabel title="Amount *" />
                                </Col>
                                <Col col={3}><InputNumber  name={formEnum.exp_amount} onChange={onChange} /></Col>
                            </MobileFlexRow>
                        </div>
                        <div className="form-row">
                            <MobileFlexRow>
                                <Col col={1}>
                                    <FormLabel title="Date" />
                                </Col>
                                <Col col={3}><input className="text-input" type="date" name={formEnum.exp_date} onChange={(e) => onChange(formEnum.exp_date, new Date(e.target.value).toISOString())} /></Col>
                            </MobileFlexRow>
                        </div>
                        <div className="form-row">
                            <MobileFlexRow>
                                <Col col={1}>
                                    <FormLabel title="No Of Days" />
                                </Col>
                                <Col col={3}><InputNumber  name={formEnum.no_of_days} onChange={onChange} /></Col>
                            </MobileFlexRow>
                        </div>
                        <div className="form-row">
                            <MobileFlexRow>
                                <Col col={1}>
                                    <FormLabel title="Labor/Contractor" />
                                    <div className="new-cust-link">
                                        <NavLink className="btn-link" activeClassName="active-tab"  to={`/vendor/servicecreate`}>New +</NavLink>
                                    </div>
                                </Col>
                                <Col col={3}><Select data={getLaborList()}  name={formEnum.vendor_name} onChange={onSelectChange} /></Col>
                            </MobileFlexRow>
                        </div>
                        <div className="form-row">
                            <MobileFlexRow>
                                <Col col={1}>
                                    <FormLabel title="Note" />
                                </Col>
                                <Col col={3}><InputText name={formEnum.note} onChange={onChange} /></Col>
                            </MobileFlexRow>
                        </div>
                        <div className="form-row">
                            <Button title="Save" onClick={submit} color="primary"/>
                        </div>
                    </div>
                </FormWrapper>
            </RoundCard>
        </div>
    )
}

export default CreateServicePaid;
