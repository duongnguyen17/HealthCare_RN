import React from 'react';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Intro = () => {
  return (
    <View>
      <LinearGradient colors={["#66ccff", "#80d4ff", "#99ddff"]} style={{}}>
        {/* <Image source={{uri: ''}} /> */}
      </LinearGradient>
    </View>
  );
};

export default Intro;
