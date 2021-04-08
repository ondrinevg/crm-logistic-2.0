import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderForList({ order }) {
  return (
    <li className="list-group-item ">
      <Link to={`/orders/${order._id}`} >{order.title}</Link>
    </li>
  )
}

