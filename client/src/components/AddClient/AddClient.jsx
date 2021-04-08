import React from 'react'

export default function AddClient() {
  return (
    <>
      <div className="container d-flex justify-content-center aling-items-center">
        Добавление клиента
      </div>
      <div className="container-fluid d-flex justify-content-center aling-items-center vh-100 mt-3">
        <form id="registerForm" action="/clients/new" method="POST">
          <div className="mb-3">
            <input placeholder="Имя" type="text" name="name" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Отчество" type="text" name="middlename" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Фамилия" type="text" name="lastname" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Телефон" type="text" name="phone" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Email адрес" type="email" name="email" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
      </div>
    </>
  )
}

