import React, { ChangeEvent, useEffect, useRef } from 'react';
import { isEmpty } from 'util/validation';
import styled from 'styled-components';
import { Colors } from 'sefer/types/Colors';

interface Props {
  value: string[],
  char : string,
  showErrors? : boolean,
  index : number,
  onChange : (input : string, index : number) => void,
  onBackSpace : () => void,
  focus : number
}

/**
 * A single input field for the two-factor auth (one-time access key)
 */
export const NumberInput = (props : Props) => {
  const { index, value, char, onChange, onBackSpace, showErrors, focus, } = props;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus === index) ref.current?.focus();
    else ref.current?.blur();
  }, [focus, index]);

  const onKeyUp = (event : React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.keyCode || event.charCode;
    if (key !== 8 && key !== 46) return;
    const fire = index === 5 || value[index + 1] === ' ';
    if (fire) onBackSpace();
  };

  const onValueChange = (event : ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (!isEmpty(input) && Number.isNaN(parseInt(input))) return;
    if (input.length !== 1) onChange(' ', index);
    else onChange(input, index);
  };

  return (
    <Input
      $showErrors={showErrors}
      ref={ref}
      type="text"
      value={char}
      onKeyUp={onKeyUp}
      onChange={onValueChange}
    />
  );
};

const Input = styled.input<{ $showErrors? : boolean}>`
  height: 37px;
  width: 32px;
  border: 1px solid ${p => (p.$showErrors ? Colors.Red : Colors.Blue)};
  padding: 8px;
  font-size: 20px;
  display: inline-block;
  margin-right: 7px;

  &:focus {
    outline-style: none;
    border: 1px solid ${p => (p.$showErrors ? Colors.Red : Colors.Blue)}
}
`;
