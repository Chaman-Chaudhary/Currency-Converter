const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const msg = document.querySelector(".msg");

let from = "USD";
let to = "INR";

const getExchangeRate = async (from, to, amount) => {
    const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.toLowerCase()}/${to.toLowerCase()}.json`;
    let response = await fetch(URL);
    let rate = await response.json();
    let totalAmount = rate[to.toLowerCase()] * amount;
    console.log(totalAmount);
    msg.innerText = `${amount} ${from} = ${totalAmount} ${to}`;
};

const updateMessage = (amount, totalAmount) => {
    msg.innerText = `${amount} USD = ${totalAmount} INR`;
}

for(let select of dropdowns){
    for(currCode in countryList){
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        select.append(option);
        if(select.name === "from" && currCode === "USD")
            option.selected = "selected";
        else if(select.name === "to" && currCode === "INR")
            option.selected = "selected"; 
    }

    select.addEventListener("change", (evt) => {
        if(evt.target.name === 'from') 
            from = evt.target.value;
        else 
            to = evt.target.value;
        
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("input");
    getExchangeRate(from, to, amount.value);
    
})

// window.addEventListener("load", getExchangeRate);