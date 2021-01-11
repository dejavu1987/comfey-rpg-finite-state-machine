import fsm from "./fsm.comfey";
import Comfey from "comfey";
import config from "./location.fsm";

const app = new Comfey();
const { getState, getTransitions, transition } = fsm(
  app,
  "location",
  config,
  watcher
);

let watcherUpdatedVar = "";

function watcher(newState, oldState) {
  watcherUpdatedVar = oldState + "->" + newState;
}

test("It should initialize fsm", () => {
  expect(getState()).toBeDefined();
});

test("Initial state should match configuration", () => {
  expect(getState()).toBe(config.start);
});

test("It should have transitions", () => {
  expect(getTransitions().length).toBeGreaterThan(0);
});

test("Watcher should be updating watcherUpdatedVar", () => {
  transition("enterBath");
  expect(watcherUpdatedVar).toBe("livingRoom->bath");
  transition("exitBath");
  expect(watcherUpdatedVar).toBe("bath->livingRoom");
});

test("It should fail for invalid transition", () => {
  expect(() => {
    transition("fooBar");
  }).toThrow("Invalid transition key");
});

test("It should transition on valid transition", () => {
  transition("exitApartment");
  expect(getState()).toBe("street");
});

test("It should have transitions", () => {
  expect(getTransitions().length).toBeGreaterThan(0);
});

test("Murder should transition to Jail", () => {
  transition("murder");
  expect(getState()).toBe("jail");
});

test("It should have no transitions out of Jail", () => {
  expect(getTransitions().length).toBe(0);
});
