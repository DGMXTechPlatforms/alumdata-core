import { validate } from './validators';

export const contextOnChange = (e, context, stateKey) => {
  context.setState({
    [stateKey]: {
      ...context.state[stateKey],
      [e.target.name]: e.target.value,
    },
  });
};

export const contextOnBlur = (e, validators, context, stateKey) => {
  context.setState({
    [stateKey]: {
      ...context.state[stateKey],
      [e.target.name]: validate(e.target.value, validators),
    },
  });
};
