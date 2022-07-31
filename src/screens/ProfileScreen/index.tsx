import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  AlertType,
  COLORS,
  DIMENS,
  FONT_SIZE,
  IMG_DEFAULT_AVATAR,
  Sex,
} from '../../common';
import ContainerView from '../../components/ContainerView';
import HairLine from '../../components/HairLine';
import {showAlert} from '../../components/HAlert';
import HIcon from '../../components/HIcon';
import {userAction} from '../../reduxSaga/slices/userSlice';
import {RootStateType, ScreenProps} from '../../type/type';
import {getPicture, getUri, takePicture} from '../../utils/picture';
import {showSuccessToast} from '../../utils/toast';

const Item = ({
  item,
  index,
  itemPress,
}: {
  item: ItemType;
  index: number;
  itemPress: (_id: string, value: any) => void;
}) => {
  const onPress = () => {
    itemPress(item._id, item.value);
  };
  const source = item?.value ? {uri: item?.value} : IMG_DEFAULT_AVATAR;

  return (
    <View>
      <TouchableOpacity style={styles.item_container} onPress={onPress}>
        <View style={{justifyContent: 'center'}}>
          <Text>{item?.title}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {item._id == 'avatar' ? (
            <Avatar.Image
              style={{backgroundColor: COLORS.WHITE}}
              source={source}
              size={36}
            />
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text_value}>
                {item._id == 'gender'
                  ? item.value == Sex.Male
                    ? 'Nam'
                    : 'Nữ'
                  : item?.value}
              </Text>
              <Text>{item._id == ' height' ? 'cm' : null}</Text>
            </View>
          )}
          {item._id == 'id' ? null : (
            <HIcon
              name="right"
              font="AntDesign"
              size={18}
              color={COLORS.GRAY_TEXT_1}
              style={{marginLeft: 6}}
            />
          )}
        </View>
      </TouchableOpacity>
      <HairLine />
    </View>
  );
};

interface ItemType {
  _id: string;
  title: string;
  value?: any;
}

const BUTTONS = Array<ItemType>(
  //   {
  //     _id: 'id',
  //     title: 'ID',
  //     value: 'asdf',
  //   },
  {
    _id: 'avatar',
    title: 'Ảnh hồ sơ',
    value: '',
  },
  {
    _id: 'nickname',
    title: 'Biệt danh',
    value: 'dfghdf',
  },
  {
    _id: 'gender',
    title: 'Giới tính',
    value: 'fghj',
  },
  {
    _id: 'dob',
    title: 'Ngày sinh',
    value: 'fghjfg',
  },
  {
    _id: 'height',
    title: 'Chiều cao',
    value: 'fghj',
  },
  {
    _id: 'weight',
    title: 'Cân nặng',
    value: 'jkhlhjk',
  },
  {
    _id: 'goalStep',
    title: 'Mục tiêu bước đi',
    value: 'jkhlhjk',
  },
);

const ProfileScreen = (props: ScreenProps) => {
  const customInfor = useSelector(
    (state: RootStateType) => state.userState.customInfor,
  );
  const userID = useSelector((state: RootStateType) => state.userState._id);
  const dispatch = useDispatch();
  const RBSheetAvatar = useRef<any>();
  const RBSheetUsername = useRef<any>();
  const RBSheetHeight = useRef<any>();
  const RBSheetWeight = useRef<any>();
  const RBSheetSex = useRef<any>();
  const RBSheetGoalSteps = useRef<any>();
  const [data, setData] = useState(BUTTONS);
  const [nickname, setUsername] = useState(customInfor?.nickname);
  const [height, setHeight] = useState(customInfor?.height?.toString());
  const [weight, setWeight] = useState(customInfor?.weight?.toString());
  const [goalStep, setGoalSteps] = useState(customInfor?.goalStep?.toString());

  useEffect(() => {
    setData(
      BUTTONS.map((item, index) => {
        switch (item._id) {
          //   case 'id':
          //     item.value = _id ?? '';
          //     break;
          case 'avatar':
            item.value = customInfor?.avatar;
            break;
          case 'nickname':
            item.value = customInfor?.nickname;
            break;
          case 'gender':
            item.value = customInfor?.gender;
            break;
          case 'dob':
            item.value = customInfor?.dob;
            break;
          case 'height':
            item.value = customInfor?.height?.toString();
            break;
          case 'weight':
            item.value = customInfor?.weight?.toString();
            break;
          case 'goalStep':
            item.value = customInfor?.goalStep?.toString();
            break;
          default:
            console.log('genValue default');
            break;
        }
        return item;
      }),
    );
  }, [
    customInfor.nickname,
    customInfor.dob,
    customInfor.height,
    customInfor.gender,
    customInfor.weight,
    customInfor.avatar,
    customInfor.goalStep,
  ]);

  const itemPress = (_id: any, value: any) => {
    if (_id == 'id') {
      Clipboard.setString(value);
      showSuccessToast('Copy success');
    } else {
      switch (_id) {
        case 'avatar':
          RBSheetAvatar.current.open();
          break;
        case 'nickname':
          RBSheetUsername.current.open();
          break;
        case 'gender':
          RBSheetSex.current.open();
          break;
        case 'height':
          RBSheetHeight.current.open();
          break;
        case 'weight':
          RBSheetWeight.current.open();
          break;
        case 'goalStep':
          RBSheetGoalSteps.current.open();
          break;
        default:
          console.log('Item press default');
          break;
      }
    }
  };

  const onChangeItem = (_id: string, value: any) => {
    let customInforTemp = {};
    customInforTemp._id = customInfor._id;
    customInforTemp.nickname = customInfor.nickname;
    customInforTemp.avatar = customInfor.avatar;
    customInforTemp.gender = customInfor.gender;
    customInforTemp.dob = customInfor.dob;
    customInforTemp.height = customInfor.height;
    customInforTemp.weight = customInfor.weight;
    customInforTemp.goalStep = customInfor.goalStep;
    let isChanged = false;
    if (value != undefined)
      switch (_id) {
        case 'avatar':
          if (value != customInforTemp?.avatar) {
            customInforTemp.avatar = value;
            isChanged = true;
          }
          RBSheetAvatar.current.close();
          break;
        case 'nickname':
          if (value.trim() != customInforTemp?.nickname && value.trim() != '') {
            customInforTemp.nickname = value.trim();
            isChanged = true;
          } else {
            showAlert(AlertType.WARN, 'Không được đặt tên trống');
          }
          RBSheetUsername.current.close();
          break;
        case 'gender':
          if (value != customInforTemp.gender) {
            customInforTemp.gender = value;
            isChanged = true;
          }
          RBSheetSex.current.close();
          break;
        case 'dob':
          if (value != customInforTemp.dob) {
            customInforTemp.dob = value;
            isChanged = true;
          }
          break;
        case 'height':
          if (parseInt(value) != customInforTemp.height) {
            customInforTemp.height = parseInt(value);
            isChanged = true;
          }
          RBSheetHeight.current.close();
          break;
        case 'weight':
          if (parseInt(value) != customInforTemp.weight) {
            customInforTemp.weight = parseInt(value);
            isChanged = true;
          }
          RBSheetWeight.current.close();
          break;
        case 'goalStep':
          if (parseInt(value) != customInforTemp.goalStep) {
            customInforTemp.goalStep = parseInt(value);
            isChanged = true;
          }
          RBSheetGoalSteps.current.close();
          break;
        default:
          console.log('genValue default');
          break;
      }
    if (isChanged) {
      dispatch(userAction.updateUserProfile({customInfor: customInforTemp}));
      dispatch(userAction.getUserProfile(userID));
    }
  };

  const renderItem = ({item, index}: {item: ItemType; index: number}) => (
    <Item item={item} index={index} itemPress={itemPress} />
  );

  const getPic = async () => {
    RBSheetAvatar.current.close();
    const photo = await getPicture();
    if (photo != null && photo != undefined) {
      onChangeItem('avatar', photo);
    }
  };

  const takePic = async () => {
    RBSheetAvatar.current.close();
    const photo = await takePicture();
    if (photo != null && photo != undefined) {
      const arrayUri = getUri(photo);
      onChangeItem('avatar', arrayUri[0]);
    }
  };

  return (
    <ContainerView>
      <View style={styles.container}>
        <FlatList
          style={{backgroundColor: COLORS.WHITE}}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: any, index: number) => `${item._id}`}
          contentContainerStyle={{paddingHorizontal: 16, marginTop: 6}}
        />
        <RBSheet ref={RBSheetAvatar} height={2 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
          <TouchableOpacity style={styles.option_container} onPress={takePic}>
            <Text style={styles.title_option}>Chụp ảnh</Text>
          </TouchableOpacity>
          <HairLine style={styles.hairline_option} />
          <TouchableOpacity style={styles.option_container} onPress={getPic}>
            <Text style={styles.title_option}>Thư viện</Text>
          </TouchableOpacity>
        </RBSheet>
        <RBSheet
          ref={RBSheetUsername}
          height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
          <View style={{flex: 1}}>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text>Sửa tên người dùng</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput
                value={nickname}
                onChangeText={setUsername}
                style={{
                  borderWidth: 1,
                  borderRadius: 6,
                  marginHorizontal: 16,
                  borderColor: COLORS.GRAY_DECOR,
                  height: 36,
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <HairLine style={{marginTop: 10}} />
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: COLORS.GRAY_DECOR,
                  alignItems: 'center',
                }}
                onPress={() => {
                  onChangeItem('nickname', nickname);
                }}>
                <Text>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
        <RBSheet ref={RBSheetSex} height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
          <View style={{flex: 1}}>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text>Giới tính</Text>
            </View>
            <View style={{flex: 2}}>
              <View
                style={{
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: COLORS.GRAY_TEXT_1,
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: COLORS.GRAY_DECOR,
                    paddingLeft: 10,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    onChangeItem('gender', Sex.Male);
                  }}>
                  {customInfor?.gender == Sex.Male ? (
                    <HIcon
                      name="right"
                      font="AntDesign"
                      size={18}
                      color={COLORS.BLUE}
                      style={{marginLeft: 6}}
                    />
                  ) : null}
                  <Text>Nam</Text>
                </TouchableOpacity>
                <HairLine />
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: COLORS.GRAY_DECOR,
                    paddingLeft: 10,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    onChangeItem('gender', Sex.FeMail);
                  }}>
                  {customInfor?.gender == Sex.FeMail ? (
                    <HIcon
                      name="right"
                      font="AntDesign"
                      size={18}
                      color={COLORS.BLUE}
                      style={{marginRight: 6}}
                    />
                  ) : null}
                  <Text>Nữ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>
        <RBSheet ref={RBSheetHeight} height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
          <View style={{flex: 1}}>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text>Nhập chiều cao</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput
                keyboardType="number-pad"
                onChangeText={setHeight}
                value={height}
                style={{
                  borderWidth: 1,
                  borderRadius: 6,
                  marginHorizontal: 16,
                  borderColor: COLORS.GRAY_DECOR,
                  height: 36,
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <HairLine style={{marginTop: 10}} />
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: COLORS.GRAY_DECOR,
                  alignItems: 'center',
                }}
                onPress={() => {
                  onChangeItem('height', height);
                }}>
                <Text>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
        <RBSheet ref={RBSheetWeight} height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
          <View style={{flex: 1}}>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text>Nhập cân nặng</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput
                keyboardType="number-pad"
                onChangeText={setWeight}
                value={weight}
                style={{
                  borderWidth: 1,
                  borderRadius: 6,
                  marginHorizontal: 16,
                  borderColor: COLORS.GRAY_DECOR,
                  height: 36,
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <HairLine style={{marginTop: 10}} />
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: COLORS.GRAY_DECOR,
                  alignItems: 'center',
                }}
                onPress={() => {
                  onChangeItem('weight', weight);
                }}>
                <Text>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
        <RBSheet
          ref={RBSheetGoalSteps}
          height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
          <View style={{flex: 1}}>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text>Nhập mục tiêu bước đi</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput
                keyboardType="number-pad"
                onChangeText={setGoalSteps}
                value={goalStep}
                style={{
                  borderWidth: 1,
                  borderRadius: 6,
                  marginHorizontal: 16,
                  borderColor: COLORS.GRAY_DECOR,
                  height: 36,
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <HairLine style={{marginTop: 10}} />
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: COLORS.GRAY_DECOR,
                  alignItems: 'center',
                }}
                onPress={() => {
                  onChangeItem('goalStep', goalStep);
                }}>
                <Text>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    </ContainerView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_container: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
  },
  text_value: {
    color: COLORS.GRAY_TEXT_2,
  },
  option_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_option: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.HEADER_TAG,
  },
  hairline_option: {
    width: '90%',
    backgroundColor: COLORS.GRAY_DECOR,
  },
});
