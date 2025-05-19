import { useEffect, useState } from "react";
import "../App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router";

function Admin() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://idcekbx-m4.wsr.ru:3000/tickets", {
      method: "GET",
    })
      .then((e) => e.json())
      .then((e) => {
        console.log(e);
        setApps(e);
      });
  }, []);

  function change(el, ticket_id) {
    fetch(
      `http://idcekbx-m4.wsr.ru:3000/tickets?ticket_id=${ticket_id}&status_id=${el.target.value}`,
      {
        method: "PATCH",
      }
    ).then((e) => {
      console.log(e);
      const newApps = JSON.copy(JSON.stringify(apps)).map((el) =>
        el.id === ticket_id ? { ...el, status: el.target.value } : el
      );
      console.log(newApps);
      setApps(newApps);
    })
  }

  return (
    <div>
      <h2>Заявки</h2>
      <div className="apps">
        {apps.map((el) => (
          <div className="app">
            <span>ФИО: {el.fio}</span>
            <span>Телефон: {el.phone}</span>
            <span>
              Дата и время: {el.date} {el.time}
            </span>
            <span>Яхта: {el.yacht}</span>
            <span className="status">
              Статус:
              <select
                value={`${el.status}`}
                onChange={(e) => change(e, el.id)}
                name=""
                id=""
              >
                <option value="1">новое</option>
                <option value="3">подтвеждено</option>
                <option value="4">отклонено</option>
              </select>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
