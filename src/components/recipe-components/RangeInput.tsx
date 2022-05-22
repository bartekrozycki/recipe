import React from "react";

interface IRangeInputProps {
    // %n will be replaced by picked value
    label: string;
    min: number;
    max: number;
    // state
    value: number;
    step: number;
    setValue: (value: number) => void;
}

export const RangeInput: React.FC<IRangeInputProps> = (props) => {
    const label = props.label.replace("%n", props.value.toString());

    return (
        <>
            <label className="form-label">
                {label}
            </label>
            <input type="range"
                   className="form-range"
                   value={props.value}
                   onChange={event => {
                       event.preventDefault();
                       props.setValue(Number(event.target.value))
                   }}
                   min={props.min}
                   step={props.step}
                   max={props.max}/>
        </>
    )
};