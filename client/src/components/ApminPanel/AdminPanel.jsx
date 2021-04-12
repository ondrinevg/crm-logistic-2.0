import React from 'react'
import AddUser from './AddUser/AddUser'

export default function AdminPanel() {
  return (
    <div>
      <AddUser />
      <ManagerList />
    </div>
  )
}

