import fsm from "./fsm.comfey";
import Comfey from "comfey";
import config from "./location.fsm";

const app = new Comfey();
const locationState = new fsm(app, "location", config);

test("It should initialize fsm", () => {
  expect(locationState).toBeDefined();
});

test("It should have transitions", () => {
  const transitions = locationState.getTransitions();
  expect(transitions.length).toBeGreaterThan(0);
});

test("It should fail for invalid transition", () => {
  expect(() => {
    locationState.transition("fooBar");
  }).toThrow("Invalid transition key");
});

test("It should transition on valid transition", () => {
  locationState.transition("exitApartment");
  expect(locationState.getState()).toBe("street");
});

test("It should have transitions", () => {
  const transitions = locationState.getTransitions();
  expect(transitions.length).toBeGreaterThan(0);
});
