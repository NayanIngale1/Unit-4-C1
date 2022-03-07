const express = require("express");
const app = express();

app.use(logger);

app.get("/books", (req, res) => {
  res.send({ route: req.path });
});

app.get("/libraries", checkPermission("librarian"), (req, res) => {
  res.send({ route: req.path, permission: req.permission });
});

app.get("/authors", checkPermission("author"), (req, res) => {
  res.send({ route: req.path, permission: req.permission });
});

function logger(req, res, next) {
  console.log("request path", req.path);
  next();
}

function checkPermission(role) {
  return function check(req, res, next) {
    if (req.path == "/libraries") {
      req.permission = true;
    }
    if (req.path == "/authors") {
      req.permission = true;
    }
    next();
  };
}

app.listen(4000, () => {
  console.log("listening on port 4000");
});
