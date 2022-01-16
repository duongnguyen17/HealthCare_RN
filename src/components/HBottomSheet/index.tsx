import React, { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, Pressable, PanResponder, TextInput, FlatList, SafeAreaView, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import HIcon from '../HIcon'



class FBottomsheetClass {
    static isAnimated = false
    static load = false
    static results = (animated: boolean) => { }

    static Open() {
        FBottomsheetClass.isAnimated = true
        FBottomsheetClass.results(FBottomsheetClass.isAnimated)
    }

    static Close() {
        FBottomsheetClass.isAnimated = false
        FBottomsheetClass.results(FBottomsheetClass.isAnimated)
        FBottomsheetClass.load = false
    }
}

export const OpenBottomsheet = () => {
    if (!FBottomsheetClass.load) {
        FBottomsheetClass.load = true
        FBottomsheetClass.Open()
    }
}

export const CloseBottomsheet = () => {
    FBottomsheetClass.Close()
}

const { width, height } = Dimensions.get('screen')


export default function FBottomsheet({
    headerTitle,
    rightIcon,
    cbRightIcon,
    placeholder,
    inputIcon,
    cbInputTextChange,
    inputValue,
    inputBottomsheet,
    renderItem,
    renderData,
    yourCallBack,
    yourCallBackTitle,
    yourCallBackIcon,
    backdropColor
}: HBottomSheetProps) {
    const [status, setStatus] = useState(false)
    const [dragable, setDragable] = useState(false)
    const [animated, setAnimated] = useState<boolean>(false)
    const animateValue = useRef(new Animated.Value(-height * 0.1)).current
    const animateOpacity = useRef(new Animated.Value(1)).current
    const animateOpacityLayer = useRef(new Animated.Value(0)).current
    const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => dragable ? true : false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                //@ts-ignore
                if (animatedPosition.y._value > height * 0.81) {
                    animatedPosition.setOffset({
    y: height * 0.81,
    x: 0
});
                }
                //@ts-ignore
                else if (animatedPosition.y._value < height * 0.3) {
                    animatedPosition.setOffset({
    y: height * 0.3,
    x: 0
});
                }
                else {
                    animatedPosition.setOffset({
                //@ts-ignore
    y: animatedPosition.y._value,
    x: 0
});
                }
            },
            onPanResponderMove: (...args) => {
                let dynamicHeight = args[1].y0 - args[1].moveY
                animatedPosition.y.setValue(dynamicHeight)
            },
            onPanResponderRelease: () => {
                animatedPosition.flattenOffset();
            }
        })
    ).current;

    FBottomsheetClass.results = (animated: boolean) => {
        setAnimated(animated)

    }

    useEffect(() => {
        return () => {
            FBottomsheetClass.isAnimated = false
            setStatus(false)
            FBottomsheetClass.load = false
        }
    }, [])

    useEffect(() => {
        if (status) {
            Animated.timing(animateOpacityLayer,
                {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: false
                }
            ).start()
            Animated.sequence([
                Animated.timing(animateOpacity, {
                    toValue: 1,
                    duration: 0,
                    useNativeDriver: false
                }).start(),
                Animated.spring(animateValue, {
                    toValue: 0,
                    speed: 12,
                    useNativeDriver: false
                }).start(() => setDragable(true))
            ])
        }
    }, [status])

    useEffect(() => {
        if (animated) {
            setStatus(true)
        }
        else {
            setDragable(false)
            CloseAnimated()
        }
    }, [animated])

    const CloseAnimated = () => {
        if (!FBottomsheetClass.isAnimated) {
            Animated.timing(animateOpacityLayer,
                {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false
                }
            ).start()
            Animated.sequence([
                Animated.timing(animateOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                }).start(() => setStatus(false)),
                Animated.spring(animateValue, {
                    toValue: -height * 0.1,
                    speed: 1,
                    bounciness: 0,
                    useNativeDriver: false
                }).start(() => { animatedPosition.y.setValue(height * 0.3) }),
            ])
        }
    }

    return (
        status ?
            <>
                <Pressable onPress={() => FBottomsheetClass.Close()} style={styles.layerContainer}>
                    <Animated.View
                        style={[styles.layerBackground,
                        {
                            opacity: animateOpacityLayer,
                            backgroundColor: typeof backdropColor === 'string' && backdropColor ? backdropColor : 'rgba(64, 66, 69, 0.5)'
                        }]}>

                    </Animated.View>
                </Pressable>
                <Animated.View
                    style={[styles.container,
                    {
                        bottom: animateValue,
                        opacity: animateOpacity,
                        height: animatedPosition.y
                    }]}>
                    {animated &&
                        <>
                        <KeyboardAvoidingView style={{ flex: 1 }}>
                            <SafeAreaView style={{ flex: 1 }}>
                                <View {...panResponder.panHandlers}>
                                    <View style={styles.header}>
                                        <Pressable style={styles.iconHeader} onPress={() => FBottomsheetClass.Close()}>
                                            <HIcon size={24} font='AntDesign' name='closecircle' color={themeValue.colors.icon.icon40} />
                                        </Pressable>
                                        <Text style={
                                            [styles.textHeader,
                                            { color: themeValue.colors.ink.ink100 }]}>
                                            {headerTitle ? headerTitle : 'BottomSheet'}
                                        </Text>
                                        {rightIcon &&
                                            <Pressable
                                                style={styles.iconHeaderRight}
                                                onPress={typeof cbRightIcon === 'function' && cbRightIcon}>
                                                {rightIcon}
                                            </Pressable>}

                                    </View>
                                    <View style={styles.content}>
                                        {inputBottomsheet &&
                                            <View style={styles.search}>
                                                {inputIcon &&
                                                    <View style={styles.inputIcon}>
                                                        {inputIcon}
                                                    </View>
                                                }
                                                {
                                                    cbInputTextChange ?
                                                        <View style={Platform.OS === 'ios' ? { flex: 1, paddingTop: 15, paddingBottom: 19 } : { flex: 1 }}>
                                                            <TextInput
                                                                onFocus={() => animatedPosition.y.setValue(height * 0.3)}
                                                                value={inputValue ? inputValue : ''}
                                                                onChangeText={typeof cbInputTextChange === 'function' && cbInputTextChange}
                                                                placeholder={
                                                                    typeof placeholder === 'string' &&
                                                                        placeholder &&
                                                                        placeholder.length > 0 ? placeholder : 'Text'} />
                                                        </View>
                                                        :
                                                        <View style={
                                                            Platform.OS === 'ios' ? { flex: 1, paddingTop: 15, paddingBottom: 19 } : { flex: 1 }}>
                                                            <TextInput
                                                                onFocus={() => animatedPosition.y.setValue(height * 0.3)}
                                                                value={inputValue ? inputValue : ''}
                                                                // onChangeText={typeof cbInput === 'function' && cbInput}
                                                                placeholder={
                                                                    typeof placeholder === 'string' &&
                                                                        placeholder &&
                                                                        placeholder.length > 0 ? placeholder : 'Text'} />
                                                        </View>
                                                }
                                            </View>
                                        }
                                        {
                                            typeof yourCallBack === 'function' && yourCallBack &&
                                            <View style={styles.yourCallBack} >
                                                <TouchableOpacity activeOpacity={0.7} onPress={yourCallBack} style={styles.innerCb}>
                                                    {yourCallBackIcon ?
                                                        <View style={styles.yourCallBackIcon}>
                                                            {yourCallBackIcon}
                                                        </View>
                                                        :
                                                        <View style={styles.yourCallBackIcon}>
                                                            <HIcon size={24}
                                                                font='AntDesign'
                                                                name='pluscircle'
                                                                color={themeValue.colors.primary.primary100} />
                                                        </View>
                                                    }
                                                    {yourCallBackTitle ?
                                                        <Text style={
                                                            [themeValue.fontSize.paragraph.p1,
                                                            { color: themeValue.colors.primary.primary100 }]}>{yourCallBackTitle}</Text> :
                                                        <Text style={
                                                            [themeValue.fontSize.paragraph.p1,
                                                            { color: themeValue.colors.primary.primary100 }]}>Item</Text>}
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginBottom: 34 }}>
                                    {
                                        renderData && renderItem && renderData.length > 0 &&
                                        <FlatList
                                            style={{ paddingHorizontal: 14 }}
                                            data={renderData}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.id}
                                            showsVerticalScrollIndicator={false}
                                        />
                                    }
                                </View>
                            </SafeAreaView>
                            </KeyboardAvoidingView>
                        </>
                    }
                </Animated.View>
                
            </>
            :
            <View style={{ position: 'absolute' }}></View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: width,
        minHeight: height * 0.3,
        maxHeight: height * 0.81,
        borderRadius: 8,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 50,
    },
    layerContainer: {
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 30,
    },
    layerBackground: {
        flex: 1,
    },
    yourCallBack: {
        // flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E3E5',
    },
    innerCb: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    yourCallBackIcon: {
        marginRight: 10
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: '#E1E3E5',
        paddingVertical: 15,
        paddingHorizontal: 14
    },
    inputIcon: {
        paddingRight: 10
    },
    input: {
        flex: 1,
    },
    search: {
        paddingLeft: 14,
        marginTop: 16,
        marginBottom: 22.5,
        borderColor: '#E1E3E5',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        paddingHorizontal: 14,
    },
    header: {
        // justifyContent: 'space-between',
        // flexDirection: 'row',
        paddingHorizontal: 14,
        paddingVertical: 18,
        alignItems: 'center',
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E3E5'
    },
    iconHeaderRight: {
        position: 'absolute',
        zIndex: 18,
        top: 0,
        right: 14,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconHeader: {
        position: 'absolute',
        zIndex: 18,
        top: 0,
        left: 14,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrapper: {
        zIndex: 1,
        paddingHorizontal: 14,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 18,
        textAlign: 'center'
    }
})

interface HBottomSheetProps {
    headerTitle: String,
    rightIcon: ReactNode,
    cbRightIcon:Function,
    placeholder: String,
    inputBottomsheet:boolean,
    cbInputTextChange: Dispatch<SetStateAction<string>>,
    inputValue: String,
    inputIcon: ReactNode,
    renderItem: () =>ReactNode,
    renderData: Array<any>,
    yourCallBack: Function,
    yourCallBackTitle :String,
    yourCallBackIcon : ReactNode,
    backdropColor: String
}