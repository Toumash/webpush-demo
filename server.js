var push = require("web-push");
var express = require("express");
var app = express();

app.use(express.json());
app.use(express.static("."));

let vapidkey = {
  publicKey:
    "BI7LW2X89ktIdSZbdF22m0o-ZWjjeQjqCugSmsOvuHirkTOcmG_a4wNKub4uPa0hNR9ojn54BxN4gJqzTbHcKJI",
  privateKey: "oDVn6QITDungWJis_BPh11ihiFrgfBghlG1W1ewDoog"
};
push.setVapidDetails(
  "mailto:hello@example.com",
  vapidkey.publicKey,
  vapidkey.privateKey
);

let subscription = [];
app.get("/subscription", (_req, res) => res.json(subscription));
app.post("/subscription", (req, res) => {
  subscription.push(req.body);
  res.status(201).end();
});

app.post("/notification", (req, res) => {
  subscription.forEach(s => push.sendNotification(s));
  res.status(200).end();
});

app.listen(8080, () =>
  console.log("Server stared at http://localhost:8080")
);
