import React from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
    .select-input {
        display: block;
        width: 100%;
        height: 34px;
        padding: .220rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 3px;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        box-sizing: border-box;
    }
`;

interface ItemInterface {
    id: string,
    value: string
}

interface Props {
    data: Array<ItemInterface>;
    name: string;
    onChange: (name: string, value: any) =>  void;
}

export const Select = (props: Props) => {

    const onChange = (e: any) => {
        //let obj = {id: e.target.name, value: e.target.value};
        
        let obj = props.data[e.target.selectedIndex - 1];
        props.onChange(props.name, obj);
    }
    return (
        <SelectWrapper>
            <select name={props.name}  className="select-input" onChange={onChange}>
                <option>select</option>
                {
                    props.data.map((item: ItemInterface) => <option key={item.id} value={item.id}>{item.value}</option>)
                }
            </select>
        </SelectWrapper>
    )
}

export default Select;
