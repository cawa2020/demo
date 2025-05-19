import { useState } from "react";
import "../App.css";
import { HashRouter as Router, Routes, Route } from "react-router";

function Main() {
  const [form, setForm] = useState();
  function submit(e) {
    e.preventDefault();
    console.log(form);
    fetch("http://hriymxn-m1.wsr.ru:3000/", {
      method: "POST",
      body: JSON.stringify(form),
    }).then((e) => console.log(e));
  }

  function onChange(e) {
    const name = e.target.name;

    setForm((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }

  return (
    <h2>Приветстувуем на нашем сайте! :)</h2>
  );
}

export default Main;
