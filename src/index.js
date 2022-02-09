import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Crypto from "./js/crypto.js";

function getElements(response) {
  if (response.main) {
    const body = JSON.parse(response);
    for (let i = 0; i < 50; i++) {
      const currency = body[i].currency;
      const rank = body[i].rank;
      const market_cap = body[i].market_cap;
      $("ul#rank").append(`<li>${rank}</li>`);
      $("ul#currency").append(`<li>${currency}</li>`);
      $("ul#market_cap").append(`<li>$ ${market_cap}.00</li>`);
    }
  } else {
    $(".showErrors").text(`There was an error processing your request: ${error}`);
  }
}

async function makeApiCall(id, interval) {
  const response = await Crypto.getCrypto(id, interval);
  getElements(response);
}

$(document).ready(function () {
  let id = "";
  let interval = "";

  makeApiCall(id, interval);
});
