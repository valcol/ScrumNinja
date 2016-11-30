let stateTask = 'None';
let observer = null;

function emitChange() {
  observer(state);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();

  return () => {
    observer = null;
  };
}

export function moveTask(toState) {
  state = toState;
  emitChange();
}
