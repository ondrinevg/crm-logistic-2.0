import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">CRM Logistics</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" tabIndex="-1" aria-disabled="true" to="/users/adminPanel">Панель администратора</Link>
            <Link className="nav-link" aria-current="page" to="/">Главная страница</Link>
            <Link className="nav-link" to="/clients">Клиенты</Link>
            <Link className="nav-link" to="/orders">Заказы</Link>
            <Link className="nav-link" to="/users/logout">Выйти</Link>
            <Link className="nav-link" aria-current="page" to="/users/login">Войти</Link>
          </div>
            <a href="http://localhost:3001/api/v1/auth/google">Google</a>
        </div>
      </div>
    </nav>
  )
}

