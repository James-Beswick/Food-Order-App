import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountToNumber = +enteredAmount; //converts to number

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountToNumber < 1 ||
      enteredAmountToNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountToNumber);
  };

  const removeMessageHandler = () => {
    setAmountIsValid(true);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && (
        <p onClick={removeMessageHandler}>
          Please enter a valid amount between 1 and 5.
        </p>
      )}
    </form>
  );
};

export default MealItemForm;
