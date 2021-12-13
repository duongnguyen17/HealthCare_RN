import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TextStyle} from 'react-native';

const HIcon = ({font, name, style, color = 'black', size = 24}: HIconProps) => {
  switch (font) {
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} style={style} />;
    case 'AntDesign':
      return <AntDesign name={name} size={size} color={color} style={style} />;
    case 'Entypo':
      return <Entypo name={name} size={size} color={color} style={style} />;
    case 'EvilIcons':
      return <EvilIcons name={name} size={size} color={color} style={style} />;
    case 'Feather':
      return <Feather name={name} size={size} color={color} style={style} />;
    case 'FontAwesome':
      return (
        <FontAwesome name={name} size={size} color={color} style={style} />
      );
    case 'FontAwesome5':
      return (
        <FontAwesome5 name={name} size={size} color={color} style={style} />
      );
    case 'Fontisto':
      return <Fontisto name={name} size={size} color={color} style={style} />;
    case 'Foundation':
      return <Foundation name={name} size={size} color={color} style={style} />;
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case 'Octicons':
      return <Octicons name={name} size={size} color={color} style={style} />;
    case 'Zocial':
      return <Zocial name={name} size={size} color={color} style={style} />;
    case 'SimpleLineIcons':
      return (
        <SimpleLineIcons name={name} size={size} color={color} style={style} />
      );
    default:
      return (
        <MaterialIcons name={name} size={size} color={color} style={style} />
      );
  }
};

export default HIcon;
interface HIconProps {
  font:
    | 'MaterialIcons'
    | 'Ionicons'
    | 'AntDesign'
    | 'SimpleLineIcons'
    | 'Entypo'
    | 'EvilIcons'
    | 'Octicons'
    | 'Zocial'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Fontisto'
    | 'Foundation'
    | 'MaterialCommunityIcons';
  name: string;
  color?: string;
  style?: TextStyle;
  size?: number;
}
export const HIconFont = {
  MaterialIcons: 'MaterialIcons',
  Ionicons: 'Ionicons',
  AntDesign: 'AntDesign',
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  Fontisto: 'Fontisto',
  Foundation: 'Foundation',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Octicons: 'Octicons',
  Zocial: 'Zocial',
  SimpleLineIcons: 'SimpleLineIcons',
};
