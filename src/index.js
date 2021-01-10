import Comfey from "comfey";
import camelCaseToTitleCase from "./camelCaseHelper";
import "comfey/comfey.css";
import "./styles.css";
import journey from "./journey";
const DEBUG = false;

const app = new Comfey(document.getElementById("app"), DEBUG);
const $buttons = document.getElementById("buttons");
const $inventory = document.getElementById("inventory");
const $cashChange = document.getElementById("cash-update");
// Initialize states
const [, setLocation] = app.useState(
  "location",
  journey.start,
  locationWatcher
);

const [getCash, setCash] = app.useState("cash", 500, cashWatcher);
const [getInventory, setInventory] = app.useState(
  "inventory",
  [],
  inventoryWatcher
);

setLocation(journey.start);

// Watchers
function cashWatcher(newCash, oldCash) {
  $cashChange.innerText = newCash - oldCash;
  $cashChange.classList.remove("animate__fadeOutUp");
  $cashChange.classList.add("animate__fadeInUp");

  setTimeout(() => {
    $cashChange.classList.remove("animate__fadeInUp");
    $cashChange.classList.add("animate__fadeOutUp");
  }, 800);
}

function inventoryWatcher(newInv) {
  updateInventory(newInv);
}

function locationWatcher(newLoc, oldLoc) {
  updateButtons(newLoc);
}

// UI Updates
function updateInventory(inventory) {
  $inventory.innerHTML = inventory
    .sort()
    .map((inv) => {
      return `<div class="item">${inv}</div>`;
    })
    .join("");
}

function updateButtons(location) {
  $buttons.innerHTML = ""; // reset
  for (const key in journey[location]) {
    if (journey[location].hasOwnProperty(key)) {
      const action = key;
      const result = journey[location][key];
      if (typeof result === "string") {
        // String result means simply move to different location
        addMoveButton(action, result);
      } else {
        addActionButton(action, result);
      }
    }
  }
}

function addMoveButton(action, location) {
  const btn = document.createElement("button");
  btn.innerText = "➡️ " + camelCaseToTitleCase(action);
  btn.dataset.action = action;
  btn.className = "move";
  btn.dataset.location = location;
  btn.onclick = moveButtonClick;
  $buttons.appendChild(btn);
}

function addActionButton(action, results) {
  const btn = document.createElement("button");
  btn.innerText = "🎬 " + camelCaseToTitleCase(action);
  btn.dataset.action = action;
  btn.className = "action";
  btn.onclick = actionButtonClick;

  for (const key in results) {
    if (results.hasOwnProperty(key)) {
      const amount = results[key];
      btn.dataset[key] = amount;
    }
  }
  $buttons.appendChild(btn);
}

// Button handlers
function actionButtonClick(e) {
  const target = e.target;
  if (target.dataset.cash) {
    setCash(getCash() + parseInt(target.dataset.cash));
  }
  if (target.dataset.inventory) {
    if (target.dataset.inventory.substring(0, 1) === "+") {
      const item = target.dataset.inventory.replace("+", "");

      setInventory([...getInventory(), item]);
    }
  }
}

function moveButtonClick(e) {
  const target = e.target;
  setLocation(target.dataset.location);
}
