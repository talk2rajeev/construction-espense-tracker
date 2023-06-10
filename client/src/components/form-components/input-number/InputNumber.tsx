import React, { useState } from 'react';

interface Props {
    onChange: (name: string, value: number) => void;
    value?: string;
    name: string;
    placeholder?: string;
}

export const InputNumber = (props: Props) => {
    
    const initValue: string = props.value ? props.value : '';
    const [value, setValue] = useState(initValue);

    const onChange = (e: any) => {
        let val = parseInt(e.target.value);
        props.onChange(e.target.name, val);
        setValue(e.target.value);
    }
    return (
        <div>
            <input className="text-input" name={props.name} placeholder={props.placeholder} type="number" value={value} onChange={onChange} />
        </div>
    )
}

export default InputNumber;
