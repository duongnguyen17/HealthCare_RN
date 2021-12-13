import { CommonActions, NavigationContainerRef, StackActions } from '@react-navigation/native'
import { RefObject } from 'react'
import { NavigationServiceConfig } from '../type/type'

const config: NavigationServiceConfig = {}

export function setNavigator(nav: RefObject<NavigationContainerRef<{}>>) {
    if (nav.current) {
        config.navigator = nav.current
    }
}

export function navigate(routeName: string, params?: object) {
    if (config.navigator && routeName) {
        let action = CommonActions.navigate({ name: routeName, params })
        config.navigator.dispatch(action)
    }
}

export function replace(routeName: string, params?: object) {
    if (config.navigator && routeName) {
        config.navigator.dispatch(StackActions.replace(routeName, params))
    }
}

export function push(routeName: string, params?: object) {
    if (config.navigator && routeName) {
        config.navigator.dispatch(StackActions.push(routeName, params))
    }
}

export function goBack() {
    if (config.navigator) {
        let action = CommonActions.goBack()
        config.navigator.dispatch(action)
    }
}

export const navigationAvailbe = () => {
    return config?.navigator?.getCurrentRoute()?.name !== 'Login'
}

export const routeParam = (route: any, paramKey: string, defaultValue?: any) => {
    if (!route || !route.params || route.params[`${paramKey}`] === undefined || route.params[`${paramKey}`] === null) return defaultValue
    return route.params[`${paramKey}`]
}