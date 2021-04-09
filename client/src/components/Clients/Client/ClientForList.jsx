import React from 'react'
import { Link } from 'react-router-dom'

export default function ClientForList({ client }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <Link to={`/clients/${client._id}`}>{client.lastName} {client.name} {client.middleName}</Link>
      <span className="badge bg-primary rounded-pill">{client.orders.length}</span>
    </li>
  )
}

