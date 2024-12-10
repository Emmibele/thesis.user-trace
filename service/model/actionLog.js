
module.exports = class actionLog {
  /**
   * 
   * @param {number} timestamp when the action was logged in the frontend
   * @param {string} message rudimentary info to be logged
   */
  constructor(timestamp = '-1', message = '') {
    this.timestamp = timestamp;
    this.message = message;
  }
}

class inputState {
  /**
   * 
   * @param {string} stateVariant the state of the input (ie. error, warning, ...)
   * @param {string} message the message displayed to the user
   * @param {object} metadata additional info about what caused the state
   */
  constructor(stateVariant = inputStateVariant.ok, message = '', metadata = '') {
    this.inputStateVariant = stateVariant;
    this.message = message;
    this.metadata = metadata;
  }
}

const inputStateVariant = {
  error: 'error',
  warning: 'warning',
  ok: 'ok',
}

module.exports = class action {
  /**
   * 
   * @param {string} appComponent the component (ie. plantstate, timeline, ...) that the action was logged from
   * @param {number} elementSelector the element that the action was logged from
   * @param {string} action what action was logged (ie. click, hover, ...)
   * @param {string} input if data was input, what was it (ie. text, number, ...)
   */
  constructor(appComponent = 'plantstate', elementSelector = '#root', action = 'click', input = '') {
    this.appComponent = appComponent;
    this.elementSelector = elementSelector; 
    this.action = action;
    this.input = input;
  }
}