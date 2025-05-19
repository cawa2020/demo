import { useEffect, useState } from "react";
import "../App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router";

function ViewApp() {
  const [load, setLoad] = useState(true);
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch("http://hriymxn-m1.wsr.ru:3000//apps")
    //   .then((e) => console.log(e))
    //   .then((e) => {
    //     setApps(e);
    //     setLoad(false);
    //   });
  }, []);

  return (
    <div>
      <h2>Заявки</h2>
      <button onClick={() => navigate("/create-app")}>Создать заявку</button>
      <div className="apps">
        {apps.map((el) => (
          <div className="app">
            <span>Авто: {el.car}</span>
            <span>Проблема: {el.problem}</span>
            <span className="status">Статус: {el.status}</span>
            <span>Дата: {el.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewApp;
