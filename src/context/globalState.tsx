import React from 'react'
import { ViewProps } from 'react-native'
import Context from './context'
const GlobalState = ({ children }: ViewProps | any) => {
    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}

export default GlobalState