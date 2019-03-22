import { useState } from 'react';

//* Custom Hook
export const useFormInput = () => {
  const [value, setValue] = useState('');
  const [validity, setValidity] = useState(false);

  const inputChangeHandler = ({ target }) => {
    setValue(target.value);
    target.value ?
      setValidity(true) :
      setValidity(false);
  };

  return { value, validity, onChange: inputChangeHandler };
};
