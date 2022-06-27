const url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
let data;

async function fetchHandler() {
    try {
        const response = await fetch(url);
        data = await response.json();
        render_Currency(data);
    } catch (error) {
        console.log(error);
    }
}

fetchHandler();

function render_Currency(data){
    let EUR_buy = document.querySelector("#EUR_buy");
    let EUR_sale = document.querySelector("#EUR_sale");
    let USD_buy = document.querySelector("#USD_buy");
    let USD_sale = document.querySelector("#USD_sale");

    EUR_buy.innerHTML = +data[1].buy;
    EUR_sale.innerHTML = +data[1].sale;
    USD_buy.innerHTML = +data[0].buy;
    USD_sale.innerHTML = +data[0].sale;
}
