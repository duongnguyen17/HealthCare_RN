import React, {useState, useEffect, Component} from 'react';
import {ColorValue, ImageSourcePropType, ViewProps} from 'react-native';
import {AlertType, COLORS, TIMING} from '../../common';
import AlertManager from './AlertManager';

import AlertView from './AlertView';
export const showAlert = (
  type: AlertType,
  message: string,
  hideAfter: number = TIMING.HEADER_ALERT_ALIVE_DEFAULT,
  cancelable = false,
) => {
  const ref = AlertManager.getDefault();
  if (!!ref) {
    ref.showAlert(type, message, cancelable);
  }
  if (hideAfter && hideAfter > 0) {
    setTimeout(() => {
      slideOutAlert();
    }, hideAfter);
  }
};

export const hideAlert = () => {
  const ref = AlertManager.getDefault();
  if (!!ref) {
    ref.hideAlert();
  }
};

export const slideOutAlert = () => {
  const ref = AlertManager.getDefault();
  if (!!ref) {
    ref.slideOut();
  }
};

export class HAlert extends Component<AlertProps, AlertState> {
  _id: String = 'Alert';
  cancelable: boolean = false;
  color: ColorValue = COLORS.LIGHT_GREEN;
  icon: ImageSourcePropType | null = null;
  type: AlertType = AlertType.WARN;
  message: string = '';
  constructor(props: AlertProps) {
    super(props);
    this.state = {isShow: false, slide: true};
  }
  componentDidMount() {
    this._id = this.props._id ?? 'Loading';
    AlertManager.register(this);
  }
  componentWillUnmount() {
    AlertManager.unregister(this);
  }
  showAlert(type: AlertType, message: string, cancelable: boolean) {
    this.cancelable = cancelable;
    this.type = type;
    this.message = message;
    this.setState({isShow: true, slide: true});
    switch (type) {
      case AlertType.SUCCESS:
        this.icon = require('./assets/short_right.png');
        this.color = COLORS.LIGHT_GREEN;
        break;
      case AlertType.WARN:
        this.icon = require('./assets/short_right1.png');
        this.color = COLORS.LIGHT_ORANGE;
        break;
      case AlertType.FAIL:
        this.icon = require('./assets/short_down.png');
        this.color = COLORS.ERROR_COLOR;
        break;
      default:
        break;
    }
  }

  hideAlert() {
    this.setState({isShow: false});
  }
  slideOut() {
    this.setState({slide: false});
  }

  render(): React.ReactNode {
    const isShow = this.state.isShow;
    return isShow ? (
      <AlertView
        slide={this.state.slide}
        color={this.color}
        icon={this.icon}
        type={this.type}
        message={this.message}
        cancelable={this.cancelable}
      />
    ) : null;
  }
}

interface AlertProps extends ViewProps {
  _id?: String;
  cancelable?: Boolean;
  type?: AlertType;
  message?: String;
}
interface AlertState {
  isShow?: Boolean;
  slide: Boolean;
}
