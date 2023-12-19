import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));

const API_key = "18be3f49710edcec33ef7c793fe40686";


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    let marginBottom ="marginBottom";
    res.render("index.ejs", { content: "Waiting for data...", marginBottom: marginBottom });
});



app.post("/", async (req, res) => {
    const lat1 = req.body.lat;
    const lon1 = req.body.lon;


    try {
        const hidden = "hidden";
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=${API_key}`);
        let description = result.data.weather[0].description;
        let temp = Math.round(result.data.main.temp - 273.15);
        let feels_like = Math.round(result.data.main.feels_like - 273.15);
        let temp_min = Math.round(result.data.main.temp_min - 273.15);
        let temp_max = Math.round(result.data.main.temp_max - 273.15);
        let pressure = result.data.main.pressure;
        let humidity = result.data.main.humidity;


        res.render("index.ejs", {
            content: "Here you go!",
            wDescription: description,
            wTemp: temp,
            wFeels_like: feels_like,
            wTemp_min: temp_min,
            wTemp_max: temp_max,
            wPressure: pressure,
            wHumidity: humidity,
            hidden:hidden,
        });

    } catch (error) {
        console.log(error);
        res.status(500);

    }

});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
