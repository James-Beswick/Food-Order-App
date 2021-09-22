import { useState } from 'react';

const useCheckoutForm = valIsValidFn => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = valIsValidFn(enteredValue);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = event => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = event => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setEnteredValue('');
  };

  return {
    enteredValue,
    isValid,
    hasError,
    valueBlurHandler,
    valueChangeHandler,
    reset,
  };
};

export default useCheckoutForm;
