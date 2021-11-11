import React, { Component } from 'react'
import { View, ViewProps, TouchableOpacity, StyleSheet } from 'react-native'
import Indicator from '../ActivityIndicator';
import LoadingManager from './LoadingManager';

export const showLoading = (cancelable = false, hideAfter: number) => {
  const ref = LoadingManager.getDefault()
  if (!!ref) {
    ref.showLoading(cancelable)
  }
  if (hideAfter && hideAfter > 0) {
    setTimeout(() => {
      hideLoading()
    }, hideAfter);
  }
}
export const hideLoading = () => {
  const ref = LoadingManager.getDefault()
  if (!!ref) {
    ref.hideLoading()
  }
}

export class Loading extends Component<LoadingProps, LoadingState> {
  _id: string = 'Loading';
  // type: string = '';
  cancelable: boolean = false;
  constructor(props: LoadingProps) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }
  componentDidMount() {
    this._id = this.props._id ?? "Loading"
    LoadingManager.register(this)
  }
  componentWillUnmount() {
    LoadingManager.unregister(this)
  }
  showLoading(cancelable: boolean) {
    this.cancelable = cancelable
    this.setState({ modalVisible: true })
  }
  hideLoading() {
    this.setState({ modalVisible: false })
  }
  render() {
    const modalVisible = this.state.modalVisible

    return modalVisible ? (
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.touch}
          onPress={() => this.cancelable && this.hideLoading()}
        >
          <Indicator size={48} />
        </TouchableOpacity>
      </View>
    ) : null
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000044',
    zIndex: 99999
  },
  touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
interface LoadingProps extends ViewProps {
  _id?: string,
  // type?: string,
  cancelable?: boolean,
}
interface LoadingState {
  modalVisible: boolean,
}