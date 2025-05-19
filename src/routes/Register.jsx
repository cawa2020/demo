import { useState } from "react";
import "../App.css";
import { HashRouter as Router, Routes, Route } from "react-router";

function Register() {
  const [form, setForm] = useState();
  function submit(e) {
    e.preventDefault();
    console.log(form);
    fetch(
      `http://idcekbx-m4.wsr.ru:3000/register?full_name=${form.full_name}&phone=${form.phone}&password=${form.password}&login=${form.login}`,
      {
        method: "POST",
      }
    ).then((e) => console.log(e));
  }

  function onChange(e) {
    const name = e.target.name;

    setForm((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }

  return (
    <form onSubmit={submit}>
      <h2>Регистрация</h2>
      <input type="text" placeholder="ФИО" onChange={onChange} name="full_name" />
      <input
        type="text"
        placeholder="телефон"
        onChange={onChange}
        name="phone"
      />
      <input type="text" placeholder="логин" onChange={onChange} name="login" />
      <input
        type="password"
        placeholder="пароль"
        onChange={onChange}
        name="password"
      />
      <button>Подтвердить</button>
    </form>
  );
}

export default Register;
