import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});
  
const APIkey = "0dd1034c8e967340f8423d82f9bb39ba";
app.post("/weather", async (req, res) => {
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    console.log(req.body);
    try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`);
        console.log (result.data);
        res.render("index.ejs", { results: result.data });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }

});

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });