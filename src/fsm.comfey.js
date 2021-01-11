export default function fsm(app, state, config, watcher) {
  const [getState, setState] = app.useState(state, config.start, watcher);

  const getTransitions = () => {
    return Object.keys(config[getState()]);
  };

  const transition = (key) => {
    if (!config[getState()].hasOwnProperty(key))
      throw new Error("Invalid transition key");
    setState(config[getState()][key]);
  };

  return [getState, getTransitions, transition];
}
