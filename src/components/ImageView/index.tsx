import React, { memo, useEffect, useState } from 'react';
import { Touchable, TouchableOpacity, View } from 'react-native';
import ImageGrid from './ImageGrid';
import ImageView from 'react-native-image-viewing';
import HIcon from '../HIcon';
export const MAX_WIDTH_IMG_VIEW = 300
export const MAX_HEIGHT_IMG_VIEW = 500


export default ({ uris, deletePic }: { uris: Array<string | undefined>, deletePic: any }) => {

    const [imageURI, setImageURI] = useState<Array<any>>([]);
    const [visible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        let tempImages = uris.map(element => {
            return {
                uri: element,
            };
        });
        setImageURI(tempImages);
    }, [uris]);

    const choosedPhoto = (index: number) => {
        setIndex(index);
        setIsVisible(true);
    };

    return (
        <View>
            <ImageGrid
                uris={uris}
                maxWidth={MAX_WIDTH_IMG_VIEW}
                maxHeight={MAX_HEIGHT_IMG_VIEW}
                choosedPhoto={choosedPhoto}
            />
            <ImageView
                images={imageURI}
                imageIndex={index}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                FooterComponent={(index) => <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { deletePic(index) }}><HIcon name='trash' font='EvilIcons' color='white' size={40} /></TouchableOpacity>}
            />
        </View>
    )
}