"use strict";

const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const { port, host, store } = require("./serverConfig.json");

const CarStore = require(path.join(
  __dirname,
  store.storePath,
  store.dataLayer
));

const carStore = new CarStore();
const server = http.createServer(app);

const sendErrorPage = (res, error, title = "Error", header = "Error") => {
  sendStatusPage(res, error, title, header);
};

const sendStatusPage = (res, status, title, header) => {
  return res.render("statusPage", { title, header, status });
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pageViews"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const menuPath = path.join(__dirname, "/public/menu.html");

app.get("/", (req, res) => res.sendFile(menuPath));

app.get("/all", (req, res) =>
  carStore.getAll().then((data) => res.render("allCars", { result: data }))
);

app.get("/getOneCar", (req, res) =>
  res.render("updateOneCar", {
    title: "Find one car",
    header: "Find one car",
    action: "/getOneCar",
    options: "show",
  })
);

app.post("/getOneCar", (req, res) => {
  if (!req.body) res.sendStatus(500);
  carStore
    .getOne(req.body.searchKey, req.body.searchValue)
    .then((car) => res.render("carPage", { result: car }))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/add", (req, res) =>
  res.render("form", {
    title: "Add a car",
    header: "Add a car",
    action: "/insert",
    car: "[]",
  })
);

app.post("/insert", (req, res) => {
  if (!req.body) res.sendStatus(500);
  carStore
    .insert(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/update", (req, res) =>
  res.render("updateOneCar", {
    title: "Change car's information",
    header: "Change car's information",
    action: "/updateInfo",
    car: "[]",
    options: " ",
  })
);

app.post("/updateInfo", (req, res) => {
  if (!req.body) res.sendStatus(500);
  carStore
    .getOne("productNumber", req.body.searchValue)
    .then((car) =>
      res.render("form", {
        title: "Change car's information",
        header: "Change car's information",
        action: "/updatedinformation",
        car: car,
      })
    )
    .catch((error) => sendErrorPage(res, error));
});

app.post("/updatedinformation", (req, res) => {
  if (!req.body) res.sendStatus(500);
  carStore
    .update(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/removecar", (req, res) =>
  res.render("updateOneCar", {
    title: "Remove",
    header: "Remove car",
    action: "/removecar",
    options: " ",
  })
);

app.post("/removecar", (req, res) => {
  if (!req.body) res.sendStatus(500);
  carStore
    .remove(req.body.searchValue)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

server.listen(port, host, () => console.log(`${host}:${port} serving...`));
