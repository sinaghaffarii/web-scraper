const PORT = process.env.PORT || 4000;
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();
const url =
  "https://www.paytakhteketab.com/product-category/%D8%B2%D8%A8%D8%A7%D9%86-%D8%AA%D8%AE%D8%B5%D8%B5%DB%8C/";

// ------------- برای پاک کردن /n که باعث میشه خط بشکنه در html
// replace(/\s\s+/g, '')

const href = "https://www.paytakhteketab.com";

axios
  .get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".child").each((index, element) => {
      const img = $(element).find("img").attr("src");
      const title = $(element).find(".card-title").text();
      const url = $(element).find("a").attr("href");
      const discount = $(element).find(".line").text();
      const percentage = $(element).find(".percentage").text();
      articles.push({
        img,
        title,
        url,
        discount,
        percentage,
      });
    });
    const mapData = articles.map((item) => {
      if (item.url !== undefined && item.title !== "") {
        return item;
      }
    });
    const filteredData = articles.filter((item) => {
      return item.title !== "";
    });
    console.log(filteredData);
    console.log(filteredData.length);
  })
  .catch();

app.listen(PORT, () => console.log(`Server Established and  running on Port ⚡${PORT}`));

// $("*") — selects all elements
// $("#first") — selects the element with id="first"
// $(".intro") — selects all elements with class="intro"
// $("div") — selects all <div> elements
// $("h2, div, p") — selects all <h2>, <div>, <p> elements
// $("li:first") — selects the first <li> element
// $("li:last") — selects the last <li> element
// $("li:even") — selects all even <li> elements
// $("li:odd") — selects all odd <li> elements
// $(":empty") — selects all elements that are empty
// $(":focus") — selects the element that currently has focus
