import React from 'react';

const List = ({ items, onClickHandler }) => {
  console.log('List rendered ... ');
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onClickHandler(item.id)}>
          { item.name }
        </li>
      ))}
    </ul>
  );
}
 
export { List };