const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calcultaeWealthBtn = document.getElementById("calculate-wealth");

//Array of objects that contains names and money values
let data = [];

//call function
getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1_000_000),
  };

  addData(newUser);
}

// Double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  //update DOM
  updateDOM();
}

//Filter only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1_000_000);

  //update DOM
  updateDOM();
}

//Calculate the total wealth
function calcultaeWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  //create element
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth,
  )}</strong></h3>`;

  //append to display in DOM
  main.appendChild(wealthEl);
}

//Add new obj to data array
function addData(obj) {
  data.push(obj);

  //display perons in DOM
  updateDOM();
}

//update DOM
function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money,
    )}`;

    // Insert into DOM
    main.appendChild(element);
  });
}

// format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calcultaeWealthBtn.addEventListener("click", calcultaeWealth);
