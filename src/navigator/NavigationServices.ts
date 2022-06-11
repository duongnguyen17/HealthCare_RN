import { CommonActions, NavigationContainerRef, StackActions } from '@react-navigation/native'
import React, { RefObject } from 'react'
import { STRINGS } from '../common'
import { NavigationServiceConfig } from '../type/type'

const config: NavigationServiceConfig = {}

export const setNavigator = (nav: React.MutableRefObject<NavigationContainerRef<ReactNavigation.RootParamList> | undefined>) => {
    if (nav.current) {
        config.navigator = nav.current
    }
}

export const navigateTo = (routeName: string, params?: object) => {
    if (config.navigator && routeName) {
        let action = CommonActions.navigate({ name: routeName, params })
        config.navigator.dispatch(action)
    }
}

export const replace = (routeName: string, params?: object) => {
    if (config.navigator && routeName) {
        config.navigator.dispatch(StackActions.replace(routeName, params))
    }
}

export const push = (routeName: string, params?: object) => {
    if (config.navigator && routeName) {
        config.navigator.dispatch(StackActions.push(routeName, params))
    }
}

export const goBack = () => {
    if (config.navigator) {
        let action = CommonActions.goBack()
        config.navigator.dispatch(action)
    }
}

export const navigationAvailbe = () => {
    return config?.navigator?.getCurrentRoute()?.name !== STRINGS.ROUTE.AUTH.LOGIN
}

export const routeParam = (route: any, paramKey: string, defaultValue?: any) => {
    if (!route || !route.params || route.params[`${paramKey}`] === undefined || route.params[`${paramKey}`] === null) return defaultValue
    return route.params[`${paramKey}`]
}