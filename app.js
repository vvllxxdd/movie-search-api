const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
})

app.get("/results", (req, res) => {
    const searchedTerm = (req.query.search);
    const searchResults = `http://www.omdbapi.com/?s=${searchedTerm}&apikey=57d5a873`
    request(searchResults, (error, response, body) => {
        if(!error & response.statusCode === 200){
            let data = JSON.parse(body);
            res.render("results", { data: data });
        }
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));