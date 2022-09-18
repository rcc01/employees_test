import express from "express"; //server
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
const port = 3005;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`I'm working on port ${port}`);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//port 3005 ?
//port 8080 already in use!
