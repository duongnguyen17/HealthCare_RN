import React from 'react';

import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export const OneImage = ({
    uris,
    imgWidth,
    imgHeight,
    maxWidth,
    choosedPhoto,
}: {
    uris: Array<string>,
    imgWidth: number,
    imgHeight: number,
    maxWidth: number,
    choosedPhoto: any,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={() => {
                choosedPhoto(0);
            }}>
            <Image
                source={{ uri: uris[0] }}
                style={{ width: imgWidth, height: imgHeight }}
            />
        </TouchableOpacity>
    );
};
export const TwoImages = ({
    uris,
    imgWidth,
    imgHeight,
    maxWidth,
    choosedPhoto,
}: {
    uris: Array<string>,
    imgWidth: number,
    imgHeight: number,
    maxWidth: number,
    choosedPhoto: any,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                { flexDirection: 'row', justifyContent: 'space-between' },
            ]}
            onPress={() => {
                choosedPhoto(0);
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    choosedPhoto(0);
                }}>
                <Image
                    source={{ uri: uris[0] }}
                    style={{ width: imgWidth, height: imgHeight }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    choosedPhoto(1);
                }}>
                <Image
                    source={{ uri: uris[1] }}
                    style={{ width: imgWidth, height: imgHeight }}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};
export const ThreeImages = ({
    uris,
    imgWidth,
    imgHeight,
    maxWidth,
    choosedPhoto,
}: {
    uris: Array<string>,
    imgWidth: number,
    imgHeight: number,
    maxWidth: number,
    choosedPhoto: any,
}

) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.container,
                { flexDirection: 'row', justifyContent: 'space-between' },
            ]}
            onPress={() => {
                choosedPhoto(0);
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    choosedPhoto(0);
                }}>
                <Image
                    source={{ uri: uris[0] }}
                    style={{ width: imgWidth, height: imgHeight }}
                />
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'column',
                    height: maxWidth,
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        choosedPhoto(1);
                    }}>
                    <Image
                        source={{ uri: uris[1] }}
                        style={{ width: imgWidth, height: imgWidth }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        choosedPhoto(2);
                    }}>
                    <Image
                        source={{ uri: uris[2] }}
                        style={{ width: imgWidth, height: imgWidth }}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};
export const MoreImages = ({
    uris,
    imgWidth,
    imgHeight,
    maxWidth,
    choosedPhoto,
}: {
    uris: Array<string>,
    imgWidth: number,
    imgHeight: number,
    maxWidth: number,
    choosedPhoto: any,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.container,
                { flexDirection: 'row', justifyContent: 'space-between' },
            ]}
            onPress={() => {
                choosedPhoto(0);
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    choosedPhoto(0);
                }}>
                <Image
                    source={{ uri: uris[0] }}
                    style={{ width: imgWidth, height: imgHeight }}
                />
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: 'column',
                    height: maxWidth,
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        choosedPhoto(1);
                    }}>
                    <Image
                        source={{ uri: uris[1] }}
                        style={{ width: imgWidth, height: imgWidth }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        choosedPhoto(2);
                    }}>
                    <Image
                        source={{ uri: uris[2] }}
                        style={{ width: imgWidth, height: imgWidth, opacity: 0.8 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 20,
                            position: 'absolute',
                        }}>
                        +{uris.length - 2}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
