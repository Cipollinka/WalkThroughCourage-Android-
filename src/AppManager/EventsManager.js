import Params from './Params';
export default class EventManager {
  static eventList = {
    firstOpen: 'uniq_visit',
    push: 'push_subscribe',
    web: 'webview_open',
    web_push: 'push_open_webview',
    browser: 'push_open_browser',
  };

  bodyLink = '';
  userId = '';

  static setParams(userID) {
    this.bodyLink = Params.bodyLin;
    this.userId = userID;
  }

  static sendEvent(eventName) {
    fetch(
        `${this.bodyLink}?event=${eventName}&timestamp=` + this.userId,
    );
  }
}
