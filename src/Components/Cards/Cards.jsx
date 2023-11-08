import React from 'react'
import style from './Cards.module.css'
import Card from "../Card/Card"

export default function Cards(props) {
  return (
    <div className={style.card_list}>
    {props.allFoods.msg ? <Card msg={props.allFoods.msg} /> : props.allFoods.map((food) => {
      return <Card
        key={food.id}
        id={food.id}
        title={food.title}
        image={food.image}
        diets={food.diets}
      />
    })}
  </div>
  )
}
