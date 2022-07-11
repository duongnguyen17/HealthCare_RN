import React, { memo, useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, STRINGS } from '../../../common'
import HIcon from '../../../components/HIcon'
import { navigateTo } from '../../../navigator/NavigationServices'
import { locationAction } from '../../../reduxSaga/slices/locationSlice'
import { RootStateType } from '../../../type/type'

export const LocationItem = memo(({ _id, onPress }: any) => {
    const temp = useSelector((state: RootStateType) => state.locationState.temp)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (_id != undefined)
            dispatch(locationAction.getLocation(_id))
    }, [_id])

    const gotoListLocationScreen = () => {
        navigateTo(STRINGS.ROUTE.LIST_LOCATION_SCREEN, { onPress })
    }
    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={gotoListLocationScreen}>
            <Text>Địa điểm</Text>
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 5,
                    alignItems: 'center',
                }}>
                <Text>
                    <Text style={{ color: COLORS.BLACK }}>
                        {temp?.name ?? "Không có"}
                    </Text>
                </Text>
            </View>
            <HIcon font="MaterialIcons" name="arrow-forward-ios" size={18} />
        </TouchableOpacity>
    )
})