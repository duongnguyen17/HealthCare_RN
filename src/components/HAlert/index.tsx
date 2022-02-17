import React, {useState, useEffect, Component} from 'react';
import {ColorValue, ImageSourcePropType, ViewProps} from 'react-native';
import {AlertType, COLORS} from '../../common';
import AlertManager from './AlertManager';

import AlertView from './AlertView';
export const showAlert = (
  type: AlertType,
  message: string,
  hideAfter: number = 1200,
  cancelable = false,
) => {
  const ref = AlertManager.getDefault();
  if (!!ref) {
    ref.showAlert(type, message, cancelable);
  }
  if (hideAfter && hideAfter > 0) {
    setTimeout(() => {
      hideAlert();
    }, hideAfter);
  }
};

export const hideAlert = () => {
  const ref = AlertManager.getDefault();
  if (!!ref) {
    ref.hideAlert();
  }
};

export class HAlert extends Component<AlertProps, AlertState> {
  _id: string = 'Alert';
  cancelable: boolean = false;
  color: ColorValue = COLORS.LIGHT_GREEN;
  icon: ImageSourcePropType | null = null;
  type: AlertType = AlertType.WARN;
  message: string = '';
  constructor(props: AlertProps) {
    super(props);
    this.state = {isShow: false};
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

    this.setState({isShow: true});
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
  render(): React.ReactNode {
    const isShow = this.state.isShow;
    return isShow ? (
      <AlertView
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
  _id?: string;
  cancelable?: boolean;
  type?: AlertType;
  message?: string;
}
interface AlertState {
  isShow?: boolean;
}
