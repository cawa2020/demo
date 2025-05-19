import { useEffect, useState } from "react";
import "../App.css";
import { HashRouter as Router, Routes, Route } from "react-router";

function CreateApp() {
  const [form, setForm] = useState();
  const [yacht, setYacht] = useState([]);
  function submit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(
      `http://idcekbx-m4.wsr.ru:3000/tickets?fio=${user.full_name}&phone=${user.phone}&user_id=${user.id}&date=${form.date}&time=${form.time}&yacht=${form.yacht}`,
      {
        method: "POST",
      }
    )
      .then((e) => e.json())
      .then(console.log);
  }

  useEffect(() => {
    fetch("http://idcekbx-m4.wsr.ru:3000/yacht", {
      method: "GET",
    })
      .then((e) => e.json())
      .then((e) => {
        setYacht(e);
        setForm({ yacht: e[0].id });
      });
  }, []);

  function onChange(e) {
    const name = e.target.name;

    setForm((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
    console.log(form);
  }

  return (
    <form onSubmit={submit}>
      <h2>Создать заявку бронирования</h2>
      <select name="yacht" onChange={onChange} id="">
        {yacht.map((e) => (
          <option value={e.id}>{e.model}</option>
        ))}
      </select>
      <input type="date" placeholder="дата" onChange={onChange} name="date" />
      <input type="time" placeholder="время" onChange={onChange} name="time" />
      <button>Подтвердить</button>
    </form>
  );
}

export default CreateApp;
