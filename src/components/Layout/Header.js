import { Fragment } from 'react';

import mealsImage from '../../assets/background-meal.jpeg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>MealApp</h1>
        <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of food" />
      </div>
    </Fragment>
  );
};

export default Header;
