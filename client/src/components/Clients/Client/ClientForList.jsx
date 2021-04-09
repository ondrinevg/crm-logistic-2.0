import React from 'react'
import { Link } from 'react-router-dom'

export default function ClientForList({ client }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <Link to={`/clients/${client._id}`}>{client.lastname} {client.name} {client.middlname}</Link>
      <span className="badge bg-primary rounded-pill"></span>
    </li>
  )
}

