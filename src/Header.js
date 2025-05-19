import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useRoutes,
  useNavigate,
} from "react-router";

function Header() {
  const route = useNavigate();
  const [auth, setAuth] = useState(localStorage.getItem("user"));
  const [admin, setAdmin] = useState(!localStorage.getItem("admin")?.length);
  function routeTo(path) {
    route(path);
  }

  function logout() {
    localStorage.removeItem("user");
    setAuth(false);
    route("register");
  }

  return (
    <header>
      <div className="logo" onClick={() => routeTo("")}>
        Морские легенды
      </div>
      <div className="btns">
        {auth ? (
          <>
            {admin && <button onClick={() => routeTo("admin")}>Админ панель</button>}
            <button onClick={() => routeTo("app")}>Заявки</button>
            <button onClick={() => routeTo("create-app")}>
              Создать заявку
            </button>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <button onClick={() => routeTo("register")}>Регистрация</button>
            <button onClick={() => routeTo("login")}>Вход</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
