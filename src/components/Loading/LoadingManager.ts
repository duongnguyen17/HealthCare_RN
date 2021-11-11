import { Loading } from ".";


class LoadingManager {
  defaultLoading: Loading | null = null;

  register(_ref: Loading) {
    if (!this.defaultLoading) {
      this.defaultLoading = _ref;
    }
  }

  unregister(_ref: Loading) {
    if (!!this.defaultLoading && this.defaultLoading._id === _ref._id) {
      this.defaultLoading = null;
    }
  }

  getDefault() {
    return this.defaultLoading;
  }
}

export default new LoadingManager()