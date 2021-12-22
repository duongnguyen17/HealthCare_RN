import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import {height, width} from '../../common';
const ModalInnerScreen = ({children, visible}: ModalInnerScreenProps) => {
  let transY = useRef(new Animated.Value(height)).current;
  useEffect(() => {
    visible ? show() : hide();
  }, [visible]);

  const show = () => {
    Animated.timing(transY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const hide = () => {
    Animated.timing(transY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={{
        width: width,
        height: height,
        backgroundColor: '#fff',
        transform: [
          {
            translateY: transY,
          },
        ],
        position: 'absolute',
        zIndex: 1,
      }}>
      {children}
    </Animated.View>
  );
};
export default ModalInnerScreen;
interface ModalInnerScreenProps {
  children: React.ReactNode;
  /**true : show modal, false: hide modal */
  visible: boolean;
}
