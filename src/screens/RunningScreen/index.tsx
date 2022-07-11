import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, DIMENS, ICON_SIZE, TOUCH_OPACITY } from "../../common";
import ContainerView from "../../components/ContainerView";
import HHeader from "../../components/HHeader";
import HIcon from "../../components/HIcon";
import { goBack } from "../../navigator/NavigationServices";


enum STATE {
    WAITING,
    RUNNING,
    PAUSE,
}

const INCON_SMALL_SIZE = 18

const RunningScreen = () => {

    const [canGoBack, setCanGoBack] = useState(true)
    const [state, setState] = useState(STATE.WAITING)
    const [isLocking, setIsLocking] = useState(true)

    useEffect(() => {
        switch (state) {
            case STATE.PAUSE:
                setCanGoBack(false)
                break;
            case STATE.RUNNING:
                setCanGoBack(false)
                break;
            default:
                setCanGoBack(true)
                break;
        }
    }, [state])

    const resume = () => {
        if (state !== STATE.RUNNING) {
            setState(STATE.RUNNING)
            setCanGoBack(false)
        }
        else {
            setState(STATE.PAUSE)
        }
    }



    const pause = () => {

    }

    return (
        <ContainerView>
            <LinearGradient
                style={{
                    height: DIMENS.SCREEN_HEIGHT,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 0,
                }}
                colors={[COLORS.LIGHT_BLUE, '#e6f2ff', '#ffffff']}
                start={{ x: 0.5, y: 0.25 }}
                end={{ x: 0, y: 1.0 }}
            />
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => {
                            goBack()
                        }}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            paddingStart: 20
                        }}>
                        <HIcon
                            color={COLORS.WHITE}
                            font="MaterialIcons"
                            name="arrow-back-ios"
                            size={ICON_SIZE.HEADER}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.WHITE }}>Chạy ngoài trời</Text>
                </View>
                <View style={{ flex: 1 }}>

                </View>
            </View>
            <View style={{
                flex: 6, justifyContent: 'space-around', alignItems: 'center'
            }}>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 70, color: COLORS.WHITE }}>0,00</Text>
                    <Text style={{ color: COLORS.WHITE }}>km</Text>
                </View>
                <View style={styles.horizontal}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text>
                            00:25:43
                        </Text>
                        <Text>Thời gian</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text>--</Text>
                        <Text>Tốc độ</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text>0</Text>
                        <Text>Calo</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.horizontal, { flex: 8 }]}>
                <TouchableOpacity
                    style={[styles.button_small, { backgroundColor: state != STATE.PAUSE ? COLORS.GRAY_DECOR : COLORS.ERROR_COLOR }]}
                    activeOpacity={TOUCH_OPACITY}
                    disabled={state != STATE.PAUSE}
                    onLongPress={() => { }}
                >
                    <HIcon name="stop" font="FontAwesome5" style={styles.icon_small} size={INCON_SMALL_SIZE} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_main} activeOpacity={TOUCH_OPACITY} onPress={resume}>
                    {state == STATE.RUNNING ?
                        <HIcon name="pause" font="FontAwesome5" size={30} color={COLORS.WHITE} />
                        : <HIcon name="caretright" font="AntDesign" size={30} color={COLORS.WHITE} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_small} activeOpacity={TOUCH_OPACITY}>
                    <HIcon name={isLocking ? "lock" : "unlock"} font="FontAwesome5" style={styles.icon_small} size={INCON_SMALL_SIZE} />
                </TouchableOpacity>
            </View>
        </ContainerView >
    )
}

export default RunningScreen

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button_main: {
        backgroundColor: '#ff6002',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
    },
    button_small: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
        backgroundColor: 'gray'
    },
    icon_small: {
        color: COLORS.WHITE
    }
})