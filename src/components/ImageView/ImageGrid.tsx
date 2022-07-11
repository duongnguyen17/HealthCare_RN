import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { OneImage, TwoImages, ThreeImages, MoreImages } from './ViewImage';

const ImageGrid = ({ uris, maxWidth, maxHeight, choosedPhoto }: { uris: Array<string | undefined>, maxWidth: number, maxHeight: number, choosedPhoto: any }) => {
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    const update = useRef(false);

    useEffect(() => {
        update.current = true;
        calView();
        return () => {
            update.current = false;
        };
    }, [uris]);

    const calView = () => {
        switch (uris.length) {
            case 0:
                break;
            case 1:
                Image.getSize(uris[0], (width, height) => {
                    if (width / height < maxWidth / maxHeight) {
                        if (update.current) {
                            setImgWidth(maxWidth);
                            setImgHeight(maxHeight);
                        }
                    } else {
                        if (update.current) {
                            setImgHeight(Math.floor(maxWidth * (height / width)));
                            setImgWidth(maxWidth);
                        }
                    }
                });
                break;
            case 2:
                if (update.current) {
                    setImgWidth(Math.floor(maxWidth / 2 - 1));
                }

                Image.getSize(uris[0], (width1, height1) => {
                    Image.getSize(uris[1], (width2, height2) => {
                        if (height1 < height2) {
                            // console.log(`height2`, height2);
                            if (update.current) {
                                if (height2 > maxHeight) setImgHeight(maxHeight);
                                else {
                                    setImgHeight(height2);
                                }
                            }
                        } else {
                            // console.log(`height1`, height1);
                            if (update.current) {
                                if (height1 > maxHeight) setImgHeight(maxHeight);
                                else {
                                    setImgHeight(height1);
                                }
                            }
                        }
                    });
                });
                break;
            case 3:
                if (update.current) {
                    setImgWidth(Math.floor(maxWidth / 2 - 1));
                    setImgHeight(maxWidth);
                }
                break;
            default:
                if (update.current) {
                    setImgWidth(Math.floor(maxWidth / 2 - 1));
                    setImgHeight(maxWidth);
                }
                break;
        }
    };

    return (
        <View>
            {uris.length === 0 ? null : uris.length === 1 ? (
                <OneImage
                    uris={uris}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    maxWidth={maxWidth}
                    choosedPhoto={choosedPhoto}
                />
            ) : uris.length === 2 ? (
                <TwoImages
                    uris={uris}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    maxWidth={maxWidth}
                    choosedPhoto={choosedPhoto}
                />
            ) : uris.length === 3 ? (
                <ThreeImages
                    uris={uris}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    maxWidth={maxWidth}
                    choosedPhoto={choosedPhoto}
                />
            ) : (
                <MoreImages
                    uris={uris}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    maxWidth={maxWidth}
                    choosedPhoto={choosedPhoto}
                />
            )}
        </View>
    );
};

export default ImageGrid;
