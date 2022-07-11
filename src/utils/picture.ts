import { Platform } from "react-native";
import { Asset, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { AlertType } from "../common";
import { showAlert } from "../components/HAlert";

export const getPicture = async () => {
    try {
        const res = await launchImageLibrary({ mediaType: 'photo' }); //default 1 image
        if (res.assets != undefined) {
            return res.assets[0]
        }
        else {
            showAlert(AlertType.FAIL, "Không thể lấy ảnh")
            return null
        }
    } catch (error) {
        console.log("🚀 ~ file: picture.ts ~ line 15 ~ getPicture ~ error", error)
    }

}

export const getPictures = async () => {
    try {
        const res = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 10 }); //multi pic
        if (res.assets != undefined) {
            return res.assets
        }
        else {
            showAlert(AlertType.FAIL, "Không thể lấy ảnh")
            return null
        }
    } catch (error) {
        console.log("🚀 ~ file: picture.ts ~ line 33 ~ getPictures ~ error", error)
    }
}

export const takePicture = async () => {
    try {
        const res = await launchCamera({ saveToPhotos: true, mediaType: 'photo' });
        if (res.assets != undefined) {
            return res.assets
        }
    } catch (error) {
        console.log("🚀 ~ file: picture.ts ~ line 44 ~ takePicture ~ error", error)
    }
}

export const createFormData = (photo: Asset, body = {}) => {
    const data = new FormData();

    data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri?.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
        //@ts-ignore
        data.append(key, body[key]);
    });

    return data;
};