const express = require("express");
const app = express();

var requisitions = 0;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`requisitions: ${++requisitions}`);
  return next();
});

app.use(require("./routes"));

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
