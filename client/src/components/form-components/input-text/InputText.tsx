import React, { useState } from 'react'

interface Props {
    onChange: (name: string, value: string) => void;
    name?: string;
    value?: string;
    placeholder?: string;
}

export const InputText = (props: Props) => {
    
    const initValue: string = props.value ? props.value : '';
    const [value, setValue] = useState(initValue);

    const onChange = (e: any) => {
        props.onChange(e.target.name, e.target.value);
        setValue(e.target.value);
    }
    return (
        <div>
            <input className="text-input" name={props.name} placeholder={props.placeholder} type="text" value={value} onChange={onChange} />
        </div>
    )
}

export default InputText;
