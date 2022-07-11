import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { AlertType, COLORS, DIMENS, FONT_SIZE, IMG_DEFAULT_AVATAR, Sex } from '../../common';
import { launchImageLibrary } from 'react-native-image-picker';
import ContainerView from '../../components/ContainerView';
import HairLine from '../../components/HairLine';
import { showAlert } from '../../components/HAlert';
import HIcon from '../../components/HIcon';
import { userAction } from '../../reduxSaga/slices/userSlice';
import { RootStateType } from '../../type/type';
import { showSuccessToast } from '../../utils/toast';
import { createFormData, getPicture } from '../../utils/picture';



const Item = ({ item, index, itemPress }: { item: ItemType, index: number, itemPress: (_id: string, value: any) => void }) => {

    const onPress = () => {
        itemPress(item._id, item.value)
    }

    return (
        <View>
            <TouchableOpacity style={styles.item_container} onPress={onPress}>
                <View style={{ justifyContent: 'center' }}>
                    <Text>{item?.title}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                    {item._id == "avatar" ?
                        <Avatar.Image style={{ backgroundColor: COLORS.WHITE }} source={(item?.value == "" || item?.value == null) ? IMG_DEFAULT_AVATAR : { uri: item?.value }} size={36} />
                        :
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text_value}>{item._id == "sex" ? (item.value == Sex.Male ? "Nam" : 'Nữ') : item?.value}</Text>
                            <Text>{item._id == " height" ? "cm" : null}</Text>
                        </View>
                    }
                    {item._id == "id" ? null : <HIcon name='right' font='AntDesign' size={18} color={COLORS.GRAY_TEXT_1} style={{ marginLeft: 6 }} />
                    }
                </View>
            </TouchableOpacity>
            <HairLine />
        </View>
    )
}

interface ItemType { _id: string, title: string, value?: any }

const BUTTONS =
    Array<ItemType>(
        {
            _id: "id",
            title: "ID",
            value: "asdf",
        },
        {
            _id: "avatar",
            title: "Ảnh hồ sơ",
            value: "",
        },
        {
            _id: "username",
            title: "Biệt danh",
            value: "dfghdf",
        },
        {
            _id: "sex",
            title: "Giới tính",
            value: "fghj",
        },
        {
            _id: "dob",
            title: "Ngày sinh",
            value: "fghjfg",
        },
        {
            _id: "height",
            title: "Chiều cao",
            value: "fghj",
        },
        {
            _id: "weight",
            title: "Cân nặng",
            value: "jkhlhjk",
        },
    )


const ProfileScreen = () => {

    const user = useSelector((state: RootStateType) => state.userState)
    const dispatch = useDispatch()
    const RBSheetAvatar = useRef<any>()
    const RBSheetUsername = useRef<any>()
    const RBSheetHeight = useRef<any>()
    const RBSheetWeight = useRef<any>()
    const RBSheetSex = useRef<any>()
    const [data, setData] = useState(BUTTONS)
    const [username, setUsername] = useState(user?.customInfor?.username)
    const [height, setHeight] = useState(user?.customInfor?.height?.toString())
    const [weight, setWeight] = useState(user?.customInfor?.weight?.toString())
    const [avatar, setAvatar] = useState<any>()

    useEffect(() => {
        setData(
            BUTTONS.map((item, index) => {
                switch (item._id) {
                    case "id":
                        item.value = user?._id ?? ""
                        break;
                    case "avatar":
                        item.value = user?.customInfor?.avatar
                        break
                    case "username":
                        item.value = user?.customInfor?.username
                        break
                    case "sex":
                        item.value = user?.customInfor?.sex
                        break
                    case "dob":
                        item.value = user?.customInfor?.dob
                        break
                    case "height":
                        item.value = user?.customInfor?.height?.toString()
                        break
                    case "weight":
                        item.value = user?.customInfor?.weight?.toString()
                        break
                    default:
                        console.log("genValue default")
                        break;
                }
                return item

            })
        )
    }, [user?.customInfor?.username, user?.customInfor.dob, user?.customInfor?.height, user?.customInfor?.sex, user?.customInfor?.weight])



    const itemPress = (_id: any, value: any) => {
        if (_id == "id") {
            Clipboard.setString(value)
            showSuccessToast("Copy success")
        } else {
            switch (_id) {
                case "avatar":
                    RBSheetAvatar.current.open()
                    break;
                case "username":
                    RBSheetUsername.current.open()
                    break;
                case "sex":
                    RBSheetSex.current.open()
                    break;
                case "height":
                    RBSheetHeight.current.open()
                    break;
                case "weight":
                    RBSheetWeight.current.open()
                    break;
                default:
                    console.log("Item press default")
                    break;
            }
        }

    }

    const onChangeItem = (_id: string, value: any) => {
        let customInforTemp = { ...user?.customInfor }
        let isChanged = false
        if (value != undefined)
            switch (_id) {
                case "avatar":
                    if (value != customInforTemp?.avatar) {
                        customInforTemp.avatar = value
                        isChanged = true
                    }
                    RBSheetAvatar.current.close()
                    break
                case "username":
                    if (value.trim() != customInforTemp?.username && value.trim() != "") {
                        customInforTemp.username = value.trim()
                        isChanged = true
                    }
                    else {
                        showAlert(AlertType.WARN, "Không được đặt tên trống")
                    }
                    RBSheetUsername.current.close()
                    break
                case "sex":
                    if (value != customInforTemp.sex) {
                        customInforTemp.sex = value
                        isChanged = true
                    }
                    RBSheetSex.current.close()
                    break
                case "dob":
                    if (value != customInforTemp.dob) {
                        customInforTemp.dob = value
                        isChanged = true
                    }
                    break
                case "height":
                    if (parseInt(value) != customInforTemp.height) {
                        customInforTemp.height = parseInt(value)
                        isChanged = true
                    }
                    RBSheetHeight.current.close()
                    break
                case "weight":
                    if (parseInt(value) != customInforTemp.weight) {
                        customInforTemp.weight = parseInt(value)
                        isChanged = true
                    }
                    RBSheetWeight.current.close()
                    break
                default:
                    console.log("genValue default")
                    break;
            }
        if (isChanged) {
            dispatch(userAction.updateUserProfile({ customInfor: customInforTemp }))
            dispatch(userAction.getUserProfile())
        }

    }

    const renderItem = ({ item, index }: { item: ItemType, index: number }) => <Item item={item} index={index} itemPress={itemPress} />

    const takePicture = () => {
        RBSheetAvatar.current.close()
    }
    const getAvatar = async () => {
        RBSheetAvatar.current.close()
        let customInforTemp = { ...user?.customInfor }
        const photo = await getPicture()

        if (photo != null && photo != undefined) {
            const formData = createFormData(photo, customInforTemp)
            dispatch(userAction.updateUserProfile({ customInfor: formData }))
        }
    }

    return (
        <ContainerView>
            <View style={styles.container}>
                <FlatList
                    style={{ backgroundColor: COLORS.WHITE }}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item: any, index: number) => `${item._id}`}
                    contentContainerStyle={{ paddingHorizontal: 16, marginTop: 6 }}
                />
                <RBSheet ref={RBSheetAvatar} height={2 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
                    <TouchableOpacity style={styles.option_container} onPress={takePicture}>
                        <Text style={styles.title_option}>Chụp ảnh</Text>
                    </TouchableOpacity>
                    <HairLine style={styles.hairline_option} />
                    <TouchableOpacity style={styles.option_container} onPress={getAvatar}>
                        <Text style={styles.title_option}>Thư viện</Text>
                    </TouchableOpacity>
                </RBSheet>
                <RBSheet ref={RBSheetUsername} height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text>Sửa tên người dùng</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, borderRadius: 6, marginHorizontal: 16, borderColor: COLORS.GRAY_DECOR, height: 36, paddingVertical: 2, paddingHorizontal: 8 }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <HairLine style={{ marginTop: 10 }} />
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.GRAY_DECOR, alignItems: 'center' }}
                                onPress={() => {
                                    onChangeItem("username", username)
                                }}
                            >
                                <Text>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>
                <RBSheet ref={RBSheetSex} height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text>Giới tính</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: COLORS.GRAY_TEXT_1, flex: 1, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ alignItems: 'center', flex: 1, backgroundColor: COLORS.GRAY_DECOR, paddingLeft: 10, flexDirection: 'row' }} onPress={() => {
                                    onChangeItem("sex", Sex.Male)
                                }}>
                                    {user?.customInfor?.sex == Sex.Male ? <HIcon name='right' font='AntDesign' size={18} color={COLORS.BLUE} style={{ marginLeft: 6 }} /> : null}<Text>Nam</Text>
                                </TouchableOpacity>
                                <HairLine />
                                <TouchableOpacity style={{ alignItems: 'center', flex: 1, backgroundColor: COLORS.GRAY_DECOR, paddingLeft: 10, flexDirection: 'row' }}
                                    onPress={() => {
                                        onChangeItem("sex", Sex.FeMail)
                                    }}>
                                    {user?.customInfor?.sex == Sex.FeMail ? <HIcon name='right' font='AntDesign' size={18} color={COLORS.BLUE} style={{ marginRight: 6 }} /> : null}<Text>Nữ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </RBSheet>
                <RBSheet ref={RBSheetHeight} height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text>Nhập chiều cao</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TextInput keyboardType='number-pad' onChangeText={setHeight} value={height} style={{ borderWidth: 1, borderRadius: 6, marginHorizontal: 16, borderColor: COLORS.GRAY_DECOR, height: 36, paddingVertical: 2, paddingHorizontal: 8 }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <HairLine style={{ marginTop: 10 }} />
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.GRAY_DECOR, alignItems: 'center' }}
                                onPress={() => {
                                    onChangeItem("height", height)
                                }}>
                                <Text>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>
                <RBSheet ref={RBSheetWeight} height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text>Nhập cân nặng</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TextInput keyboardType='number-pad' onChangeText={setWeight} value={weight} style={{ borderWidth: 1, borderRadius: 6, marginHorizontal: 16, borderColor: COLORS.GRAY_DECOR, height: 36, paddingVertical: 2, paddingHorizontal: 8 }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <HairLine style={{ marginTop: 10 }} />
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.GRAY_DECOR, alignItems: 'center' }}
                                onPress={() => {
                                    onChangeItem("weight", weight)
                                }}
                            >
                                <Text>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>
            </View >
        </ContainerView >
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item_container: {
        height: 56,
        width: '100%',
        flexDirection: "row",

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
        fontSize: FONT_SIZE.HEADER_TAG
    },
    hairline_option: {
        width: '90%',
        backgroundColor: COLORS.GRAY_DECOR,
    }
})