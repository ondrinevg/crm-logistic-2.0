import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderForList() {
  return (
    <li className="list-group-item ">
      <Link to="/orders/:id" >заказ</Link>
    </li>
  )
}

