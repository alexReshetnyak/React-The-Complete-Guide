import React from 'react';

import classes from './Order.css';

const order = ({ ingredients, price }) => {
  const transformedIngredients = Object.keys(ingredients || {})
   .reduce((sum, key) => {
     const transformed = {
       name: key,
       amount: ingredients[key]
     };
     sum.push(transformed);
     return sum;
   }, []);

   const ingredintOutput = transformedIngredients.map((ig, index) => {
     return <span 
              key={index} 
              style={{ 
                textTransform: 'capitalize', 
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
              }}>
              {ig.name} ({ig.amount}), 
            </span>;
   });
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredintOutput}</p>
      <p>Price: <strong>USD {price}</strong></p>
    </div>
  );
}
 
export default order;