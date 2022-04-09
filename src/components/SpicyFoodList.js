import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    console.log(newFood);

    let newFoodArray = [...foods,newFood]
    setFoods(() => newFoodArray)
  }

  function updateFoodHeat(foodId) {
    let updatedArray = foods.map(food => {
    if (food.id === foodId) {
      return {...food , heatLevel : food.heatLevel + 1}
    } else {return food}
    })
    setFoods(updatedArray)
  }
  
  
  function handleFilter(eventValue){
    setFilterBy(eventValue)
    }

  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => updateFoodHeat(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <div>
        <select name="filter" onChange={(event) => handleFilter(event.target.value)}>
          <option value="All">All</option>
          <option value="American">American</option>
          <option value="Sichuan">Sichuan</option>
          <option value="Thai">Thai</option>
          <option value="Mexican">Mexican</option>
        </select>
      </div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
