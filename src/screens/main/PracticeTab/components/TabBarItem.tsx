function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PlatformPressable from './PlatformPressable';
const DEFAULT_ACTIVE_COLOR = 'rgba(255, 255, 255, 1)';
const DEFAULT_INACTIVE_COLOR = 'rgba(255, 255, 255, 0.7)';
const DEFAULT_ACTIVE_FONT_SIZE = 15
const DEFAULT_INACTIVE_FONT_SIZE = 14
const DEFAULT_ACTIVE_FONT_WEIGHT = '600'
const DEFAULT_INACTIVE_FONT_WEIGHT = '500'

export default class TabBarItem extends React.Component {
    constructor(...args) {
        super(...args);

        _defineProperty(this, "getActiveOpacity", (position, routes, tabIndex) => {
            if (routes.length > 1) {
                const inputRange = routes.map((_, i) => i);
                return position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => i === tabIndex ? 1 : 0)
                });
            } else {
                return 1;
            }
        });

        _defineProperty(this, "getInactiveOpacity", (position, routes, tabIndex) => {
            if (routes.length > 1) {
                const inputRange = routes.map((_, i) => i);
                return position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => i === tabIndex ? 0 : 1)
                });
            } else {
                return 0;
            }
        });
    }

    render() {
        const {
            route,
            position,
            navigationState,
            renderLabel: renderLabelCustom,
            renderIcon,
            renderBadge,
            getLabelText,
            getTestID,
            getAccessibilityLabel,
            getAccessible,
            activeColor: activeColorCustom,
            inactiveColor: inactiveColorCustom,
            pressColor,
            pressOpacity,
            labelStyle,
            style,
            onLayout,
            onPress,
            onLongPress,
            activeFontSize: activeFontSizeCustom,
            inActiveFontSize: inActiveFontSizeCustom,
            activeFontWeight: activeFontWeightCustom,
            inActiveFontWeight: inActiveFontWeightCustom,
        } = this.props;
        const tabIndex = navigationState.routes.indexOf(route);
        const isFocused = navigationState.index === tabIndex;
        const labelColorFromStyle = StyleSheet.flatten(labelStyle || {}).color;
        const activeColor = activeColorCustom !== undefined ? activeColorCustom : typeof labelColorFromStyle === 'string' ? labelColorFromStyle : DEFAULT_ACTIVE_COLOR;
        const inactiveColor = inactiveColorCustom !== undefined ? inactiveColorCustom : typeof labelColorFromStyle === 'string' ? labelColorFromStyle : DEFAULT_INACTIVE_COLOR;
        const activeOpacity = this.getActiveOpacity(position, navigationState.routes, tabIndex);
        const inactiveOpacity = this.getInactiveOpacity(position, navigationState.routes, tabIndex);
        const activeFontSize = activeFontSizeCustom ?? DEFAULT_ACTIVE_FONT_SIZE;
        const inActiveFontSize = inActiveFontSizeCustom ?? DEFAULT_INACTIVE_FONT_SIZE;
        const activeFontWeight = activeFontWeightCustom ?? DEFAULT_ACTIVE_FONT_WEIGHT;
        const inActiveFontWeight = inActiveFontWeightCustom ?? DEFAULT_INACTIVE_FONT_WEIGHT;
        let icon = null;
        let label = null;

        if (renderIcon) {
            const activeIcon = renderIcon({
                route,
                focused: true,
                color: activeColor
            });
            const inactiveIcon = renderIcon({
                route,
                focused: false,
                color: inactiveColor
            });

            if (inactiveIcon != null && activeIcon != null) {
                icon = /*#__PURE__*/React.createElement(View, {
                    style: styles.icon
                }, /*#__PURE__*/React.createElement(Animated.View, {
                    style: {
                        opacity: inactiveOpacity
                    }
                }, inactiveIcon), /*#__PURE__*/React.createElement(Animated.View, {
                    style: [StyleSheet.absoluteFill, {
                        opacity: activeOpacity
                    }]
                }, activeIcon));
            }
        }

        const renderLabel = renderLabelCustom !== undefined ? renderLabelCustom : ({
            route,
            color,
            fontSize,
            fontWeight,
        }) => {
            const labelText = getLabelText({
                route
            });

            if (typeof labelText === 'string') {
                return /*#__PURE__*/React.createElement(Animated.Text, {
                    style: [styles.label, icon ? {
                        marginTop: 0
                    } : null, labelStyle, {
                        color,
                        // fontSize,
                        fontWeight,
                    }]
                }, labelText);
            }

            return labelText;
        };

        if (renderLabel) {
            const activeLabel = renderLabel({
                route,
                focused: true,
                color: activeColor,
                fontSize: activeFontSize,
                fontWeight: activeFontWeight,
            });
            const inactiveLabel = renderLabel({
                route,
                focused: false,
                color: inactiveColor,
                fontSize: inActiveFontSize,
                fontWeight: inActiveFontWeight,
            });
            label = /*#__PURE__*/React.createElement(View, null,
                /*#__PURE__*/React.createElement(Animated.View, {
                style: {
                    opacity: inactiveOpacity,
                }
            }, inactiveLabel),
            /*#__PURE__*/React.createElement(Animated.View, {
                style: [StyleSheet.absoluteFill, {
                    opacity: activeOpacity
                }]
            }, activeLabel));
        }

        const tabStyle = StyleSheet.flatten(style);
        const isWidthSet = (tabStyle === null || tabStyle === void 0 ? void 0 : tabStyle.width) !== undefined;
        const tabContainerStyle = isWidthSet ? null : {
            flex: 1
        };
        const scene = {
            route
        };
        let accessibilityLabel = getAccessibilityLabel(scene);
        accessibilityLabel = typeof accessibilityLabel !== 'undefined' ? accessibilityLabel : getLabelText(scene);
        const badge = renderBadge ? renderBadge(scene) : null;
        return /*#__PURE__*/React.createElement(PlatformPressable, {
            android_ripple: {
                borderless: true
            },
            testID: getTestID(scene),
            accessible: getAccessible(scene),
            accessibilityLabel: accessibilityLabel,
            accessibilityRole: "tab",
            accessibilityState: {
                selected: isFocused
            } // @ts-ignore: this is to support older React Native versions
            ,
            accessibilityStates: isFocused ? ['selected'] : [],
            pressColor: pressColor,
            pressOpacity: pressOpacity,
            delayPressIn: 0,
            onLayout: onLayout,
            onPress: onPress,
            onLongPress: onLongPress,
            style: [styles.pressable, tabContainerStyle]
        }, /*#__PURE__*/React.createElement(View, {
            pointerEvents: "none",
            style: [styles.item, tabStyle]
        }, icon, label, badge != null ? /*#__PURE__*/React.createElement(View, {
            style: styles.badge
        }, badge) : null));
    }

}
const styles = StyleSheet.create({
    label: {
        margin: 4,
        backgroundColor: 'transparent',
    },
    icon: {
        margin: 2
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        minHeight: 48
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    pressable: {
        // The label is not pressable on Windows
        // Adding backgroundColor: 'transparent' seems to fix it
        backgroundColor: 'transparent'
    }
});
//# sourceMappingURL=TabBarItem.js.map