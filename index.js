const http = require("http");
const mysql = require("mysql2");
const path = require("path");
const { parse } = require("querystring");
const fs = require("fs");
const url = require("url");

const db = mysql.createConnection({
  host: "192.168.10.251",
  user: "gkizkgxi",
  password: "rFvMRT",
  database: "gkizkgxi_m4",
  insecureAuth: true,
});
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения: " + err.stack);
    return;
  }
  console.log("Успешное подключение к БД с ID " + db.threadId);
});

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { pathname, query } = url.parse(req.url, true);

  try {
    if (req.method == "POST" && pathname == "/register") {
      if (!query.full_name || !query.phone || !query.login || !query.password) {
        res.writeHead(400);
        return res.end("Missing params");
      }

      db.query(
        "INSERT INTO user (id_role, full_name, login, phone, password) VALUES (1, ?, ?, ?, ?)",
        [query.full_name, query.login, query.phone, query.password],
        (err, result) => {
          if (err) {
            console.error(err);
            res.writeHead(500);
            return res.end("DB error");
          }
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ id: result.insertId }));
        }
      );
    }

    if (req.method == "POST" && pathname == "/auth") {
      if (!query.login || !query.password) {
        res.writeHead(400);
        return res.end("Missing params");
      }

      db.query(
        "SELECT * FROM `user` WHERE `login` = ? AND `password` = ?",
        [query.login, query.password],
        (err, result) => {
          if (err) {
            console.error(err);
            res.writeHead(500);
            return res.end("DB error");
          }

          res.writeHead(201, { "Content-Type": "application/json" });
          console.log(result[0]);
          if (result.length > 0) {
            console.log("Пользователь найден:", result[0]);
            res.end(JSON.stringify({ success: true, user: result[0] }));
          } else {
            res.end(JSON.stringify({ err: "Пользователь не найден" }));
          }
        }
      );
    }

    if (req.method == "POST" && pathname == "/tickets") {
      if (
        !query.fio ||
        !query.phone ||
        !query.user_id ||
        !query.date ||
        !query.time ||
        !query.yacht
      ) {
        res.writeHead(400);
        return res.end("Missing params");
      }

      db.query(
        "INSERT INTO tickets (status, user_id, date, time, yacht, phone, fio) VALUES (1, ?, ?, ?, ?, ?, ?)",
        [
          query.user_id,
          query.date,
          query.time,
          query.yacht,
          query.phone,
          query.fio,
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            res.writeHead(500);
            return res.end("DB error");
          }

          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: true,
              message: "заявка успешно создлана",
            })
          );
        }
      );
    }

    if (req.method == "OPTIONS" && pathname == "/tickets") {
      console.log(1);
      if (!query.ticket_id || !query.status_id) {
        res.writeHead(400);
        return res.end("Missing params");
      }

      db.query(
        "UPDATE tickets SET status = ? WHERE id = ?",
        [+query.status_id, +query.ticket_id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.writeHead(500);
            return res.end("DB error");
          }

          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
        }
      );
    }

    if (req.method == "GET" && pathname == "/tickets") {
      db.query("SELECT * FROM `tickets`", (err, result) => {
        res.end(JSON.stringify(result));
      });
    }

    if (req.method == "GET" && pathname == "/yacht") {
      db.query("SELECT * FROM `yacht`", (err, result) => {
        res.end(JSON.stringify(result));
      });
    }

    // db.query("SELECT * FROM `user`", (err, result) => {
    //   console.log(result[0]);
    //   res.end(JSON.stringify(result[0]));
    // });
  } catch (err) {
    console.log(err);
  }
});

server.listen(3000);
