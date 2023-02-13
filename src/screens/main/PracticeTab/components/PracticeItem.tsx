import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IMG_SOURCE } from "../../../../common";
import HIcon from "../../../../components/HIcon";


const PracticeItem = ({ onPress }: { onPress: () => void }) => {

    return (
        <View style={styles.contaner}>
            <View style={styles.data_container}>
                <Text style={{ color: 'white', fontSize: 50 }}>2,46<Text style={{ color: 'white', fontSize: 12 }}>  km</Text></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>Tổng quãng đường đi bộ thể dục</Text>
                    <HIcon name="right" font="AntDesign" color="white" size={14} style={{ marginLeft: 2 }} />
                </View>
                <View style={{ width: '100%', paddingHorizontal: 10 }}>
                    <View style={{
                        zIndex: 1,
                        backgroundColor: 'white',
                        width: 60,
                        height: 60,
                        padding: 2,
                        position: 'absolute',
                        bottom: 0,
                        alignSelf: 'center',
                        borderRadius: 50,
                        shadowOffset: {
                            width: 10,
                            height: 20,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 8,
                        shadowColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#ff6002',
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            activeOpacity={0.7}
                            onPress={onPress}
                        >
                            <Text style={{ textTransform: 'uppercase', fontSize: 20, fontWeight: '700', color: 'white' }}>go</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.map_container}>
                        <ImageBackground source={IMG_SOURCE.IMG_MAP} style={{ flex: 1 }} resizeMode={"contain"} />
                    </View>

                </View>
            </View>
        </View>
    )
}

export default PracticeItem;

const styles = StyleSheet.create({
    contaner: {
        height: 500,
        marginTop: 10,
    },
    data_container: {
        alignItems: 'center',
    },
    map_container: {
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        width: '100%',
        height: 340,
        marginTop: 20,
        borderWidth: 4,
        borderColor: 'white',
        shadowOffset: {
            width: 10,
            height: 20,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
        shadowColor: 'black',
        marginBottom: 20,
    },
})