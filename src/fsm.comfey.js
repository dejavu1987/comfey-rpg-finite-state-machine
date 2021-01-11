export default class fsm {
  constructor(app, state, config, watcher) {
    const [getState, setState] = app.useState(state, config.start, watcher);
    this.config = config;
    this.getState = getState;
    this.setState = setState;
  }

  getTransitions() {
    return Object.keys(this.config[this.getState()]);
  }

  transition(key) {
    if (!this.config[this.getState()].hasOwnProperty(key))
      throw new Error("Invalid transition key");
    this.setState(this.config[this.getState()][key]);
  }
}
