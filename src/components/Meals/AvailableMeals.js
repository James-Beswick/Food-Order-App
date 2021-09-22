import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';
import { useCallback, useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    try {
      const res = await fetch(
        'https://react-http-5de5b-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
      );
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const mealData = await res.json();

      const mealList = [];

      for (const key in mealData) {
        mealList.push({
          id: key,
          name: mealData[key].name,
          description: mealData[key].description,
          price: mealData[key].price,
        });
      }

      setMeals(mealList);
      setIsLoading(false);
    } catch (err) {
      setHttpError(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  if (isLoading) {
    return (
      <Card>
        <section className={classes.mealsloading}>
          <p>Loading...</p>
        </section>
      </Card>
    );
  }

  if (httpError) {
    return (
      <Card>
        <section className={classes.mealsloading}>
          <p>{httpError}</p>
        </section>
      </Card>
    );
  }

  const mealItemList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <Card>
      <section className={classes.meals}>
        <ul>{mealItemList}</ul>
      </section>
    </Card>
  );
};

export default AvailableMeals;
