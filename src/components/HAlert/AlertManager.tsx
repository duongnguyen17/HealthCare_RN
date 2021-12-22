import {HAlert} from '.';
class AlertManager {
  _defaultAlert: HAlert | null = null;

  register(_ref: any) {
    if (!this._defaultAlert) {
      this._defaultAlert = _ref;
    }
  }

  unregister(_ref: any) {
    if (!!this._defaultAlert && this._defaultAlert._id === _ref._id) {
      this._defaultAlert = null;
    }
  }

  getDefault() {
    return this._defaultAlert;
  }
}

export default new AlertManager();
