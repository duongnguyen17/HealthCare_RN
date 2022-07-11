import Toast from 'react-native-tiny-toast';

// let toast;

export function showToast(message: string, type: string, duration = 3000) {
    Toast.show(message, {
        position: -1,
        duration: duration,
        textColor: 'white',

        containerStyle: {
            backgroundColor:
                type === 'success'
                    ? '#54D62C'
                    : type === 'error'
                        ? '#FF4842'
                        : type === 'info'
                            ? '#1890FF'
                            : 'white',

            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 15,
            marginHorizontal: 25,
            marginBottom: 30,
        },
    });
}

// export function hideLoading() {
//     Toast.hide(toast);
// }

// export function showLoading(message = '') {
//     toast = Toast.showLoading(message, {
//         position: Toast.position.CENTER,
//         containerStyle: {
//             padding: 30,
//             backgroundColor: 'rgba(0,0,0, 0.7)',
//         },
//         textColor: 'white',
//         textstyle: { fontSize: 14 },
//     });
// }

export function showErrorToast(message: string) {
    showToast(message, 'error');
}

export function showSuccessToast(message: string) {
    showToast(message, 'success');
}

export function showInfoToast(message: string) {
    showToast(message, 'info');
}
