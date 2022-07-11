import { Location } from "../../common";
import { SCHEMA } from "../common";
import RealmManager from '../'
import NotifiSchedule from "../../utils/Notifi";

/**Tìm kiếm thuốc theo từ khoá */
export const searchLocation = async (keyword: String) => {
    try {
        const realm = await RealmManager.getRealm()
        const locations = realm.objects(SCHEMA.LOCATION)
        let searchResult = locations.filtered('name CONTAINS $0', keyword)
        return searchResult
    } catch (error) {
        console.log("🚀 ~ file: location.controller.ts ~ line 14 ~ searchLocation ~ error", error)
    }
}

/**add new location */
export const addLocation = async (location: any) => {
    try {
        const realm = await RealmManager.getRealm()
        realm.write(() => {
            realm.create(SCHEMA.LOCATION, location)
        })

    } catch (error) {
        console.log("🚀 ~ file: location.controller.ts ~ line 27 ~ addLocation ~ error", error)
    }
}

/**
 * get location detail
 * @param _id id of location
 */
export const getLocation = async (_id: number) => {
    try {
        const realm = await RealmManager.getRealm()
        const location = realm.objectForPrimaryKey(SCHEMA.LOCATION, _id)
        return location
    } catch (error) {
        console.log("🚀 ~ file: location.controller.ts ~ line 41 ~ getLocation ~ error", error)
    }
}