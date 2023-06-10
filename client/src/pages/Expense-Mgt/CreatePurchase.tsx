import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { FlexRow, MobileFlexRow, Col, InputText, InputNumber, Button, Heading, FormLabel, Select, Loader } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { createExpense } from '../../redux/reducers/expense/actions';
import { fetchVendors } from '../../redux/reducers/vendor/actions';


export const RoundCard = styled.div`
    background-color: #f6f4f4;
    border-radius: 4px;
    margin-top: 20px;
`;
export const FormWrapper = styled.div`
    padding: 20px;
    .form-row {
        margin-bottom: 15px;
    }
    .new-cust-link{
        position: absolute;
        right: 0;
        top: 0;
        a{
            text-decoration: none;
        }
    }
`;

enum formEnum {
    exp_name= 'exp_name',
    exp_amount= 'exp_amount',
    vendor_id= 'vendor_id',
    vendor_name= 'vendor_name',
    exp_type= 'exp_type',
    exp_date= 'exp_date',
    no_of_days= 'no_of_days',
    note= 'note',
}

interface Props {
    title: string;
}

export const CreatePurchase = (props: Props) => {

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
        [formEnum.exp_type]: 'Material',
        [formEnum.exp_date]: new Date().toISOString(),
        [formEnum.no_of_days]: 0,
        [formEnum.note]: '',
    };

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initFormData);

    const {vendors, loading} = useSelector((state: any) => state.vendors);

    const onChange = (name: string, value: string) => {
        console.log(name, value);
        const newFormData = {
            ...formData,
            [name]: value
        };
        setFormData(newFormData);
    }

    const onSelectChange = (name: string, value: any) => {
        console.log(name, value);
        const newFormData = {
            ...formData,
            vendor_id: value.id,
            vendor_name: value.value,
        };
        setFormData(newFormData);
    }

    const onNumberChange = (name: string, value: number) => {
        console.log(name, value);
        const newFormData = {
            ...formData,
            [name]: value
        };
        setFormData(newFormData);
    }

    const onSubmit = () => {
        dispatch(createExpense(formData));
    }

    React.useEffect(() => {
        if (vendors.length === 0) {
            dispatch(fetchVendors());
        }
        
    }, []);

    const getVendorList = () => {
        const list: Array<{id: string, value: string}> = vendors.map((item: any) => {
            return {id: item._id, value: item.name};
        });
        return list;
    }

    return (
        <div>
            <RoundCard>
                <FormWrapper>
                    <Heading title="Create Purchase (Materials/Products)" />
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
                                <Col col={3}><InputNumber name={formEnum.exp_amount} onChange={onNumberChange} /></Col>
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
                                    <FormLabel title="Vendor/Supplier" />
                                    <div className="new-cust-link">
                                        <NavLink className="btn-link" activeClassName="active-tab"  to={`/vendor/vendorcreate`}>New +</NavLink>
                                    </div>
                                </Col>
                                <Col col={3}><Select data={getVendorList()} name={formEnum.vendor_name} onChange={onSelectChange} /></Col>
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
                            <Button title="Save" onClick={onSubmit} color="primary"/>
                        </div>
                    </div>
                </FormWrapper>
            </RoundCard>
        </div>
    )
}

export default CreatePurchase;
