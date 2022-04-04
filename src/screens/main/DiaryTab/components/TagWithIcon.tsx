import React from 'react';
import {View} from 'react-native';
import HIcon, { HIconProps } from '../../../../components/HIcon';
import Tag, {TagProps} from './Tag';
const TagWithIcon = ({
  children,
  styles,
  iconName,
  iconFont,
  iconColor,
  iconSize = 28,
}: TagWithIconProps) => (
  <Tag styles={styles}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        {iconName && iconFont && (
          <HIcon
            name={iconName}
            font={iconFont}
            color={iconColor}
            size={iconSize}
          />
        )}
      </View>
      <View style={{flex: 6}}>{children}</View>
    </View>
  </Tag>
);

export default TagWithIcon;

interface TagWithIconProps extends TagProps {
  iconName?: string;
  iconFont?: HIconProps['font'];
  iconColor?: string;
  iconSize?: number;
}
