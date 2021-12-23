import Realm from "realm";
import { configureRealm } from "..";
import { Medicine } from "../../common";
import { SCHEMA } from "../common";

/**get medicines in a month */
export const getMedicineInMonth = async (date: Date) => {
    try {
        const realm = await Realm.open(configureRealm)
        let medicine = realm.objects(SCHEMA.MEDICINE)
        // console.log(`medicine`, medicine)
        return medicine
    } catch (error) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 13 ~ getMedicineInMonth ~ error", error)
    }
}

/**get all medicine */
export const getAllMedicine = async () => {
    try {
        const realm = await Realm.open(configureRealm)
        let allMedicine = realm.objects(SCHEMA.MEDICINE)
        return allMedicine
    } catch (error) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 25 ~ getAllMedicine ~ error", error)
        return error
    }
}
/**add new medicine */
export const addMedicine = async (medicine: any) => {
    try {
        const realm = await Realm.open(configureRealm)
        realm.write(() => {
            realm.create(SCHEMA.MEDICINE, medicine)
        })

    } catch (error) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 22 ~ addMedicine ~ error", error)
    }
}

/**delele medicine  */

export const deleteMedicine = async (id: number) => {
    try {
        const realm = await Realm.open(configureRealm)
        realm.write(() => {
            let medicine = realm.objectForPrimaryKey(SCHEMA.MEDICINE, id)
            realm.delete(medicine)
        })
    } catch (error) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 40 ~ deleteMedicine ~ error", error)
    }
}
/**update medicine */
export const updateMedicine = async (medicine: any) => {
    try {
        const realm = await Realm.open(configureRealm)
        realm.write(() => {
            let editMedicine = realm.objectForPrimaryKey<Medicine>(SCHEMA.MEDICINE, medicine._id)
            // @ts-ignore
            editMedicine.title = medicine.title
            // @ts-ignore
            editMedicine.isDone = medicine.isDOne
            // @ts-ignore
            editMedicine.remind = medicine.remind
            // @ts-ignore
            editMedicine.during = medicine.during
            return editMedicine
        })
    } catch (error) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 56 ~ updateMedicine ~ error", error)

    }
}