import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONT_SIZE, STRINGS} from '../../../common';
import HIcon from '../../../components/HIcon';
import {navigateTo} from '../../../navigator/NavigationServices';
import {getVisited} from '../../../realm/controllers/visited.controller';
import {showDateTime} from '../../../utils/dateutils';

export const PreItem = ({_id, onPress}: any) => {
  const [visited, setVisited] = useState();

  useEffect(() => {
    if (_id != undefined) _getVisited(_id);
  }, [_id]);

  const _getVisited = async (_id: number) => {
    const visitedTemp = await getVisited(_id);
    //@ts-ignore
    setVisited(visitedTemp);
  };

  const gotoListVisitedScreen = () => {
    navigateTo(STRINGS.ROUTE.LIST_VISITED_SCREEN, {onPress});
  };
  //@ts-ignore
  const colorText = visited?.title ? COLORS.BLACK : COLORS.GRAY_DECOR;
  return (
    <TouchableOpacity style={styles.container} onPress={gotoListVisitedScreen}>
      <Text>Lần khám trước</Text>
      <View style={styles.containerName}>
        {/* @ts-ignore */}
        {!!visited?.title ? (
          <View>
            {/* @ts-ignore */}
            <Text style={{color: colorText}}>{visited?.title}</Text>
            <Text style={{color: COLORS.GRAY_DECOR, fontSize: FONT_SIZE.TINY}}>
              {/* @ts-ignore */}
              {showDateTime(visited?.date)}
            </Text>
          </View>
        ) : (
          <Text style={{color: colorText}}>Không có</Text>
        )}
      </View>
      <HIcon font="MaterialIcons" name="arrow-forward-ios" size={18} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerName: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});
