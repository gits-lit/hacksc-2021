import { useNode } from '@craftjs/core';
import {
    Button as MaterialButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';

export const RadioOption = ({ text, option1, option2, option3 }) => {
    const {
        connectors: { connect, drag },
        selected,
    } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (selected) {
            return;
        }

        setEditable(false);
    }, [selected]);

    return (
        <div
            ref={(ref) => connect(drag(ref))}
            onClick={() => selected && setEditable(true)}
        >
            <FormControl component="fieldset">
                <FormLabel component="legend">{text}</FormLabel>
                <RadioGroup>
                    <FormControlLabel control={<Radio />} label={option1} />
                    <FormControlLabel control={<Radio />} label={option2} />
                    <FormControlLabel control={<Radio />} label={option3} />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

const RadioSettings = () => {
    const {
        actions: { setProp },
        props,
    } = useNode((node) => ({
        props: node.data.props,
    }));

    return (
        <>
            <FormControl size="small" component="fieldset">
                <FormLabel component="legend">Label</FormLabel>
                <TextField onChange={(e) => setProp((props) => (props.text = e.target.value))} />
                <FormLabel component="legend">Option 1</FormLabel>
                <TextField onChange={(e) => setProp((props) => (props.option1 = e.target.value))} />
                <FormLabel component="legend">Option 2</FormLabel>
                <TextField onChange={(e) => setProp((props) => (props.option2 = e.target.value))} />
                <FormLabel component="legend">Option 3</FormLabel>
                <TextField onChange={(e) => setProp((props) => (props.option3 = e.target.value))} />
            </FormControl>
        </>
    );
};

export const RadioDefaultProps = {
    text: 'Radio',
    option1: 'One',
    option2: 'Two',
    option3: 'Three'
};

RadioOption.craft = {
    displayName: 'Radio Option',
    props: RadioDefaultProps,
    related: {
        settings: RadioSettings,
    },
};