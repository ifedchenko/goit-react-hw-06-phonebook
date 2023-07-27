import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { FormBody, Label, Input, AddContactBtn } from './Form.styled';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const submitHandler = evt => {
    evt.preventDefault();
    const id = nanoid();
    onSubmit(id, name, number);
    setName('');
    setNumber('');
  };

  const onInputChange = evt => {
    const { name, value } = evt.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <>
      <FormBody onSubmit={submitHandler}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onInputChange}
          />
        </Label>

        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={number.trim()}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onInputChange}
          />
        </Label>
        <AddContactBtn type="submit">Add contact</AddContactBtn>
      </FormBody>
    </>
  );
}

Form.propTypes = { onSubmit: PropTypes.func.isRequired };
