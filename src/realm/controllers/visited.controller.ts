import RealmManager from '../'
import { Visited } from "../../common";
import { SCHEMA } from "../common";

export const getAllVisited = async () => {
    try {
        const realm = await RealmManager.getRealm()
        let allVisited = realm.objects(SCHEMA.VISITED)
        // console.log(`allVisited-controller`, allVisited)
        return allVisited
    } catch (error) {
        console.log("🚀 ~ file: visited.controller.ts ~ line 12 ~ getAllVisited ~ error", error)
    }
}

/**get visited in a month */
export const getVisitedInMonth = async (date: Date) => {
    try {
        const realm = await RealmManager.getRealm()
        let allVisited = realm.objects(SCHEMA.VISITED)
        // console.log(`allVisited`, allVisited)
        return allVisited
    } catch (error) {
        console.log("🚀 ~ file: visited.controller.ts ~ line 24 ~ getVisitedInMonth ~ error", error)
    }
}

/**add new visited */
export const addVisited = async (newVisited: any) => {
    try {
        console.log(`addVisited`, newVisited)
        const realm = await RealmManager.getRealm()
        realm.write(() => {
            realm.create(SCHEMA.VISITED, newVisited)
        })
    } catch (error: any) {
        console.log("🚀 ~ file: visited.controller.ts ~ line 36 ~ addVisited ~ error", error.mesage)

    }
}

/**delele visited  */

export const deleteVisited = async (id: number) => {
    try {
        const realm = await RealmManager.getRealm()
        realm.write(() => {
            let visited = realm.objectForPrimaryKey(SCHEMA.VISITED, id)
            let medicines = realm.objects(SCHEMA.MEDICINE).filtered(`visitedId==${id}`)
            medicines.forEach((element) => {
                realm.delete(element)
            })
            realm.delete(visited)
        })
    } catch (error) {
        console.log("🚀 ~ file: visited.controller.ts ~ line 55 ~ deleteVisited ~ error", error)

    }
}
/**update visited */
export const updateVisited = async (visited: any) => {
    try {
        const realm = await RealmManager.getRealm()
        realm.write(() => {
            let editVisited = realm.objectForPrimaryKey<Visited>(SCHEMA.VISITED, visited._id)
            // @ts-ignore
            editVisited.title = visited.title
            // @ts-ignore
            editVisited.pre = visited.pre
            // @ts-ignore
            editVisited.location = visited.location
            // @ts-ignore
            editVisited.date = visited.date
            return editVisited
        })
    } catch (error) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 56 ~ updateMedicine ~ error", error)

    }
}


/**Tìm kiếm sự kiện khám theo từ khoá */
export const searchVisited = async (keyword: String) => {
    try {
        const realm = await RealmManager.getRealm()
        const visiteds = realm.objects(SCHEMA.VISITED)
        let searchResult = visiteds.filtered('title CONTAINS $0 || location CONTAINS $0 || descript CONTAINS $0', keyword)
        return searchResult
    } catch (error) {
        console.log("🚀 ~ file: visited.controller.ts ~ line 88 ~ searchVisited ~ error", error)

    }
}