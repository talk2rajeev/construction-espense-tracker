import React, { useState } from 'react';
import { MobileFlexRow, Col, InputText, InputNumber, Button, Heading, FormLabel, Select } from '../../components';
import { RoundCard, FormWrapper } from '../Expense-Mgt/CreatePurchase';
import { fetchData, postData } from '../../services/httpService';
import { HOST } from '../../config/constants';

enum vendorEnum {
    name = 'name',
    address = 'address',
    contact = 'contact',
}

interface Props {
    createLabor: (labor: any) => void;
}

export const CreateProvider = (props: Props) => {

    interface FormDataInterface {
        [vendorEnum.name]: string,
        [vendorEnum.address]: string,
        [vendorEnum.contact]: number | undefined,
    };

    const initFormData: FormDataInterface = {
        [vendorEnum.name]: '',
        [vendorEnum.address]: '',
        [vendorEnum.contact]: undefined,
    };


    //const initFormData: {labor_name: string, address: string, contact: Number | undefined} = {labor_name: '', address: '', contact: undefined};
    const [formData, setFormData] = useState(initFormData);

    const onChange = (name: string, value: string) => {
        console.log(name, value);
        const newFormData = {
            ...formData,
            [name]: value
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
        props.createLabor(formData);
        // postData(`${HOST}/ap`, formData).then((res: any) => {
        //     console.log('result ', res);
        //     alert('vendor created');
        // }).catch((err: any) => {
        //     console.log(err);
        // });
    }


    return (
        <div>
            <RoundCard>
                <FormWrapper>
                    <Heading title="Create Labor" />
                    <div>
                        <div className="form-row">
                            <MobileFlexRow>
                                <Col col={1}>
                                    <FormLabel title="Labor/Contractor *" />
                                </Col>
                                <Col col={3}><InputText name={vendorEnum.name} onChange={onChange} /></Col>
                            </MobileFlexRow>
                        </div>
                        <div className="form-row">
                            <MobileFlexRow>
                                <Col col={1}>
                                    <FormLabel title="Address" />
                                </Col>
                                <Col col={3}><InputText name={vendorEnum.address} onChange={onChange} /></Col>
                            </MobileFlexRow>
                        </div>
                        <div className="form-row">
                            <MobileFlexRow>
                                <Col col={1}>
                                    <FormLabel title="Contact" />
                                </Col>
                                <Col col={3}><InputNumber name={vendorEnum.contact} onChange={onNumberChange} /></Col>
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

export default CreateProvider;
