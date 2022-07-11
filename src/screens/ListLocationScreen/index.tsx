import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, DIMENS, FONT_SIZE, SearchType, STRINGS } from '../../common';
import ContainerView from '../../components/ContainerView';
import HairLine from '../../components/HairLine';
import HButton from '../../components/HButton';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import HIcon from '../../components/HIcon';
import LocationTag from '../../components/LocationTag';
import MedicineTag from '../../components/MedicineTag';
import { useDebounceValue } from '../../customHooks';
import { navigateTo, routeParam } from '../../navigator/NavigationServices';
import { locationAction } from '../../reduxSaga/slices/locationSlice';
import { searchAction } from '../../reduxSaga/slices/searchSlice';
import { RootStateType, ScreenProps } from '../../type/type';

export default (props: ScreenProps) => {
    const searchResult = useSelector(
        (state: RootStateType) => state.searchState.searchResult,
    );
    const onPress = routeParam(props.route, "onPress")
    const RBSheetName = useRef<any>()
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState('');
    const keyword = useDebounceValue<string>(textInput);
    const [name, setName] = useState("")

    useEffect(() => {
        search(keyword);
    }, [keyword]);

    const renderItem = ({ item }: any) => <LocationTag data={item} onPressItem={onPress} />


    const search = (keyword: String, type = SearchType.LOCATION) => {
        dispatch(searchAction.search({ keyword, searchType: type }));
    };

    const RenderxIcon = useCallback(() => {
        if (textInput != '') return (
            <TouchableOpacity
                onPress={() => {
                    setTextInput('');
                }}
                style={styles.containerIcon}>
                <HIcon
                    font="Octicons"
                    name="x"
                    size={16}
                    color={COLORS.WHITE}
                />
            </TouchableOpacity>
        )
        else return null
    }
        , [textInput])

    const RenderList = useCallback(() => searchResult?.length == 0 ? (
        <Text
            style={{
                color: COLORS.GRAY_TEXT_1,
                fontSize: FONT_SIZE.TITLE,
                alignSelf: 'center',
                marginTop: 50,
            }}>
            {STRINGS.SEARCH_SCREEN.NO_DATA}
        </Text>
    ) : (
        <FlatList data={searchResult} renderItem={renderItem} />
    ), [searchResult])

    const create = () => {
        RBSheetName.current.open()
    }

    const save = () => {
        if (name.trim() != "") {
            dispatch(locationAction.addLocation({ _id: Date.now(), name: name }))
        }
        RBSheetName.current.close()
    }

    return (
        <ContainerView>
            <HeaderCommon
                hasLinear
                renderTitle={() => (
                    <View
                        style={styles.editTextContainer}>
                        <TextInput
                            style={{ paddingVertical: 0, flex: 1 }}
                            value={textInput}
                            onChangeText={setTextInput}
                            placeholder={STRINGS.SEARCH_SCREEN.INPUT_SEARCH_KEY_WORD}
                        />
                        <View
                            style={styles.containerIconX}>
                            <RenderxIcon />
                        </View>
                    </View>
                )}

            />
            <View
                style={styles.containerList}>
                <RenderList />
            </View>
            <HButton
                style={styles.button}
                title="Tạo địa điểm mới"
                textStyle={styles.textBtnLogin}
                type={'normal'}
                onPress={create}
            />
            <RBSheet ref={RBSheetName} height={3 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text>Thêm địa điểm</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput autoFocus value={name} onChangeText={setName} style={{ borderWidth: 1, borderRadius: 6, marginHorizontal: 16, borderColor: COLORS.GRAY_DECOR, height: 36, paddingVertical: 2, paddingHorizontal: 8 }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <HairLine style={{ marginTop: 10 }} />
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.GRAY_DECOR, alignItems: 'center' }}
                            onPress={save}
                        >
                            <Text>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </ContainerView>
    );
};


const styles = StyleSheet.create({
    editTextContainer: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        // height: (4 * DIMENS.HEADER_HEIGHT) / 5,
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.GRAY_DECOR,
    },
    containerIconX: {
        borderRadius: 10,
        marginLeft: 10,
        width: 20,
        height: 20,
    },
    containerIcon: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: COLORS.GRAY_DECOR,
    },
    containerList: {
        flex: 1,
        zIndex: 1,
        marginHorizontal: DIMENS.MARGIN_HORIZONTAL,
    },
    button: {
        marginBottom: 10,
        marginHorizontal: 40
    },
    textBtnLogin: {
        fontSize: 16,
    },
})