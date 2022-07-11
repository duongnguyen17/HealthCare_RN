import { useState, useEffect } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
/**thay đổi giá trị sau 1 khoảng thời gian
 * @param value giá trị
 * @param delay dừng trong khoảng thời gian, mặc định là 700ms
 */
export function useDebounceValue<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    let handler: NodeJS.Timeout;
    useEffect(
        () => {
            handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                !!handler && clearTimeout(handler);
            };
        },
        [value]
    );

    return debouncedValue;
}

/** trả về 1 state, setState, 1 hàm thay đổi LayoutAnimation */

// export function useLayoutAnimation(visible: boolean | undefined) {
//     if (Platform.OS === 'android') {
//         if (UIManager.setLayoutAnimationEnabledExperimental) {
//             UIManager.setLayoutAnimationEnabledExperimental(true);
//         }
//     }
//     const [s_visible, setS_visible] = useState<boolean | undefined>(visible)
//     const show = () => {
//         LayoutAnimation.configureNext(
//             LayoutAnimation.create(
//                 500,
//                 LayoutAnimation.Types.easeInEaseOut,
//                 LayoutAnimation.Properties.scaleY,
//             ),
//         );
//         setS_visible(!s_visible);
//     };
//     return [s_visible, setS_visible, show]
// }