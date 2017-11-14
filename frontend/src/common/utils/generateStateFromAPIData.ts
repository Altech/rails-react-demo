import { normalize } from "./normalizer";

export type APIData = {
  global: any;
  controller: string;
  action: string;
  body: any;
};

export function generateState(initial: APIData) {
  const { result: currentState, entities } = normalize(initial.body);
  const state = {
    ...initial.global,
    entities
  };
  if (!state[initial.controller]) {
    state[initial.controller] = {};
  }
  state[initial.controller][initial.action] = currentState;
  return state;
}
