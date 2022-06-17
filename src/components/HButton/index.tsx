import React, {useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Platform,
  Text,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONT_SIZE} from '../../common';
import {HButtonProps} from '../../type/type';

interface AnimatebleType extends Animatable.View {
  animate(config: any): Promise<void>;
}
export default function HButton(props: HButtonProps) {
  const {title, textStyle, type, disabled, loading = false} = props;
  const refButton = useRef<AnimatebleType & View>(null);
  const refOverlay = useRef<AnimatebleType & View>(null);
  const [enableOverlay, setEnableOverlay] = useState(false);
  return (
    <Animatable.View
      ref={refButton}
      duration={120}
      style={[styles.container, props.style]}>
      <Pressable
        {...props}
        style={[
          styles.buttonNomal,
          type === 'white' && styles.buttonWhite,
          (type === 'disabled' || loading) && styles.button_disable,
        ]}
        disabled={disabled || loading}
        android_ripple={{
          color: '#00000019',
          radius: 8,
        }}
        onPressIn={() => {
          setEnableOverlay(true);
          if (Platform.OS === 'ios') {
            refButton?.current?.animate({from: {scale: 1}, to: {scale: 0.96}});
            refOverlay?.current?.animate({
              from: {opacity: 0},
              to: {opacity: 1},
            });
          }
        }}
        onPressOut={() => {
          if (Platform.OS === 'ios') {
            refButton?.current?.animate({from: {scale: 0.96}, to: {scale: 1}});
            refOverlay?.current
              ?.animate({from: {opacity: 1}, to: {opacity: 0}})
              .then(() => setEnableOverlay(false));
          } else {
            setEnableOverlay(false);
          }
        }}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={'white'}
            style={{marginRight: 8}}
          />
        ) : null}
        <Text
          style={[
            styles.textNomal,
            type === 'white' && styles.textWhite,
            (type === 'disabled' || loading) && styles.text_disable,
            ,
            textStyle,
          ]}>
          {title}
        </Text>
        {enableOverlay && Platform.OS === 'ios' ? (
          <Animatable.View
            ref={refOverlay}
            style={styles.overlay}
            duration={150}>
            <View style={styles.overlay} />
          </Animatable.View>
        ) : null}
      </Pressable>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
  },
  buttonNomal: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#3DBBED',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#3DBBED',
    borderWidth: 1,
  },
  textNomal: {
    color: 'white',
    fontWeight: '500',
    fontSize: FONT_SIZE.CONTENT,
  },
  textWhite: {
    color: COLORS.PRIMARY_COLOR,
  },
  buttonWhite: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_COLOR,
  },
  button_disable: {
    backgroundColor: '#F3F2F1',
    borderColor: '#F3F2F1',
    borderWidth: 1,
  },
  text_disable: {
    color: '#BEBBB8',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 8,
    backgroundColor: '#00000019',
  },
});
