import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './CartCheckoutForm.module.css';
import useCheckoutForm from '../../../hooks/use-checkout-form';
import Modal from '../../UI/Modal';

const validateEmail = enteredEmail => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(enteredEmail);
};

const validatePhoneNumber = enteredPhoneNumber => {
  // eslint-disable-next-line
  const re = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
  return re.test(enteredPhoneNumber);
};

const CartCheckoutForm = props => {
  const {
    enteredValue: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueBlurHandler: firstNameBlurHandler,
    valueChangeHandler: firstNameChangeHandler,
    reset: firstNameReset,
  } = useCheckoutForm(val => val.trim() !== '');

  const {
    enteredValue: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
    reset: lastNameReset,
  } = useCheckoutForm(val => val.trim() !== '');

  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    reset: emailReset,
  } = useCheckoutForm(val => validateEmail(val));

  const {
    enteredValue: enteredPhoneNumber,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueBlurHandler: phoneNumberBlurHandler,
    valueChangeHandler: phoneNumberChangeHandler,
    reset: phoneNumberReset,
  } = useCheckoutForm(val => validatePhoneNumber(val));

  const cartCtx = useContext(CartContext);
  const { items: cartItems } = cartCtx;

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    phoneNumberIsValid
  ) {
    formIsValid = true;
  }

  const firstNameClasses = firstNameHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const lastNameClasses = lastNameHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const emailClasses = emailHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const phoneNumberClasses = phoneNumberHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control']; // would prefer to have classes in the hook but css-modules isnt having it...

  const formSubmitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.enteredDetails({
      id: Math.random(),
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      phoneNumber: enteredPhoneNumber,
      items: cartItems,
    });

    firstNameReset();
    lastNameReset();
    emailReset();
    phoneNumberReset();
  };

  return (
    <Modal onClose={props.onCancelForm}>
      <div>
        <p className={classes.orderTag}>
          Please fill in all the details below, verify that your details are
          correct and submit your order. Thank you for choosing us!
        </p>
      </div>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <div className={firstNameClasses}>
          <label>First Name</label>
          <input
            type="text"
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className={classes.errorText}>
              Please enter a valid first name.
            </p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label>Last Name</label>
          <input
            type="text"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className={classes.errorText}>Please enter a valid last name.</p>
          )}
        </div>
        <div className={emailClasses}>
          <label>Email</label>
          <input
            type="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className={classes.errorText}>Please enter a valid email.</p>
          )}
        </div>
        <div className={phoneNumberClasses}>
          <label>Phone Number</label>
          <input
            type="number"
            value={enteredPhoneNumber}
            onChange={phoneNumberChangeHandler}
            onBlur={phoneNumberBlurHandler}
          />
          {phoneNumberHasError && (
            <p className={classes.errorText}>
              Please enter a valid phone number.
            </p>
          )}
        </div>
        <div className={classes['form-actions']}>
          <button type="button" onClick={props.onCancelForm}>
            Cancel
          </button>
          <button
            className={classes.submit}
            type="submit"
            disabled={!formIsValid}
          >
            Order
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CartCheckoutForm;
