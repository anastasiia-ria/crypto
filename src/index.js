import $ from "jquery";
import "./css/styles.css";
import Crypto from "./js/crypto.js";

const ratesArray = [];
const currenciesArray = [];

function getElements(response) {
  if (response) {
    const multArray = [];
    $("ul#rank").append(`<li>Rank</li>`);
    $("ul#currency").append(`<li>Currency</li>`);
    $("ul#market_cap").append(`<li>Market Cap</li>`);
    $("ul#rate").append(`<li>Price in USD</li>`);
    for (let i = 0; i < 50; i++) {
      const currency = response[i].currency;
      const rank = response[i].rank;
      const market_cap = response[i].market_cap;
      const rate = Math.round(response[i].price * 100) / 100;
      $("ul#rank").append(`<li>${rank}</li>`);
      $("ul#currency").append(`<li>${currency}</li>`);
      $("ul#market_cap").append(`<li>$ ${market_cap}.00</li>`);
      $("ul#rate").append(`<li>$ ${rate}</li>`);
      multArray.push([currency, rank]);
      ratesArray.push(rate);
      currenciesArray.push(currency);
    }
    multArray.sort();
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
  $(".date").html(dateObj);

  $("#convert").click(function () {
    const currencyFrom = $("select#curr-from > option:selected").val();
    const currencyTo = $("select#curr-to > option:selected").val();
    const convertFromValue = parseInt($("input#convert-value").val());
    let convertToValue = 0;

    convertToValue = Math.round(((convertFromValue * ratesArray[currencyFrom]) / ratesArray[currencyTo]) * 100) / 100;

    console.log(currencyFrom);
    console.log(currencyTo);
    console.log(convertFromValue);
    console.log(convertToValue);
    $("#convert-from-value").html(convertFromValue);
    $("#convert-to-value").html(convertToValue);
    $("#convert-from-currency").html(currenciesArray[currencyFrom]);
    $("#convert-to-currency").html(currenciesArray[currencyTo]);
  });
});
