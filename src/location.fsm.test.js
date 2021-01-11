import fsm from "./fsm.comfey";
import Comfey from "comfey";
import config from "./location.fsm";

const app = new Comfey();
const [getState, getTransitions, transition] = fsm(app, "location", config);

test("It should initialize fsm", () => {
  expect(getState()).toBeDefined();
});

test("It should have transitions", () => {
  expect(getTransitions().length).toBeGreaterThan(0);
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
  console.log(getTransitions());
  expect(getTransitions().length).toBeGreaterThan(0);
});

test("Murder should transition to Jail", () => {
  transition("murder");
  expect(getState()).toBe("jail");
});

test("It should have no transitions out of Jail", () => {
  console.log(getTransitions());
  expect(getTransitions().length).toBe(0);
});
