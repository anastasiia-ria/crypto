import $ from "jquery";
import "./css/styles.css";
import Crypto from "./js/crypto.js";

function getElements(response) {
  if (response) {
    // const rankArray = [];
    // const currArray = [];
    const multArray = [];
    $("ul#rank").append(`<li>Rank</li>`);
    $("ul#currency").append(`<li>Currency</li>`);
    $("ul#market_cap").append(`<li>Market Cap</li>`);
    for (let i = 0; i < 50; i++) {
      const currency = response[i].currency;
      const rank = response[i].rank;
      const market_cap = response[i].market_cap;
      $("ul#rank").append(`<li>${rank}</li>`);
      $("ul#currency").append(`<li>${currency}</li>`);
      $("ul#market_cap").append(`<li>$ ${market_cap}.00</li>`);
      multArray.push([currency, rank]);
    }
    multArray.sort();
    console.log(multArray);
    for (let i = 0; i < multArray.length; i++) {
      $("select.currencies-list").append(`<option value=${multArray[i][1] - 1}>${multArray[i][0]}</option>`);
    }
  } else {
    $(".showErrors").text(`There was an error: ${response}`);
  }
}

async function makeApiCall(id, interval) {
  const response = await Crypto.getCrypto(id, interval);
  getElements(response);
}

$(document).ready(function () {
  let id = "";
  let interval = "";
  const dateObj = new Date();
  makeApiCall(id, interval);
  $("#date").html(dateObj);

  $("#convert").click(function () {});
});
