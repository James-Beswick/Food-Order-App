import { useState } from 'react';

import Cart from './components/Cart/Cart';
import CartCheckoutForm from './components/Cart/CheckoutForm/CartCheckoutForm';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

const App = () => {
  const [isCartModalShowing, setIsCartModalShowing] = useState(false);
  const [isOrderFormModalShowing, setIsOrderFormModalShowing] = useState(false);

  const cartOpenButtonHandler = () => {
    setIsCartModalShowing(true);
  };

  const cartCloseButtonHandler = () => {
    setIsCartModalShowing(false);
  };

  const cartOrderButtonHandler = () => {
    setIsCartModalShowing(false);
    setIsOrderFormModalShowing(true);
  };

  const orderCancelButtonHandler = () => {
    setIsOrderFormModalShowing(false);
    setIsCartModalShowing(true);
  };
  const postEnteredDetailsHandler = async enteredDetails => {
    try {
      const detailsList = {
        ...enteredDetails,
      };

      const res = await fetch(
        'https://react-http-5de5b-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify(detailsList),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartProvider>
      {isCartModalShowing && (
        <Cart
          onOrder={cartOrderButtonHandler}
          onClose={cartCloseButtonHandler}
        />
      )}
      {isOrderFormModalShowing && (
        <CartCheckoutForm
          onCancelForm={orderCancelButtonHandler}
          enteredDetails={postEnteredDetailsHandler}
        />
      )}
      <Header onShowCart={cartOpenButtonHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
