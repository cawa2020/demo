import { useState } from "react";
import "../App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: "test",
    password: "test",
  });
  const [error, setError] = useState(null);
  function submit(e) {
    e.preventDefault();
    fetch(
      `http://idcekbx-m4.wsr.ru:3000/auth?login=${form.login}&password=${form.password}`,
      {
        method: "POST",
      }
    )
      .then((e) => e.json())
      .then((e) => {
        if (!e?.success) {
          setError(true);
        } else {
          localStorage.setItem("user", JSON.stringify(e.user));
          navigate("/apps");
          window.location.reload()
        }
      });
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
      <h2>Вход</h2>
      <input type="text" placeholder="логин" onChange={onChange} name="login" />
      <input
        type="password"
        placeholder="пароль"
        onChange={onChange}
        name="password"
      />
      {error && (
        <span style={{ color: "red" }}>Неверно введен логин или пароль</span>
      )}
      <button>Подтвердить</button>
    </form>
  );
}

export default Login;
