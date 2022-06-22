import { Medicine } from "../../common";
import { SCHEMA } from "../common";
import RealmManager from '../'
import NotifiSchedule from "../../utils/Notifi";

/**get medicines in a month */
export const getMedicineInMonth = async (date: Date) => {
    try {
        const realm = await RealmManager.getRealm()
        let medicine = realm.objects(SCHEMA.MEDICINE)
        // console.log(`medicine`, medicine)
        return medicine
    } catch (error: any) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 13 ~ getMedicineInMonth ~ error", error.message)
    }
}

/**get all medicine */
export const getAllMedicine = async () => {
    try {
        const realm = await RealmManager.getRealm()
        let allMedicine = realm.objects(SCHEMA.MEDICINE)
        return allMedicine
    } catch (error: any) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 25 ~ getAllMedicine ~ error", error.message)
        return error
    } finally {
    }
}
/**add new medicine */
export const addMedicine = async (medicine: any) => {
    try {
        const realm = await RealmManager.getRealm()
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
        const realm = await RealmManager.getRealm()
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
        const realm = await RealmManager.getRealm()
        realm.write(() => {
            let editMedicine = realm.objectForPrimaryKey<Medicine>(SCHEMA.MEDICINE, medicine._id)
            // @ts-ignore
            editMedicine.title = medicine.title
            // // @ts-ignore
            // editMedicine.isDone = medicine.isDOne
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

export const updateMedicines = async (medicines: Array<Medicine>) => {
    // console.log(`medicines - updateMedicines - medicinesController`, medicines)
    try {
        const realm = await RealmManager.getRealm()
        let allMedicine = realm.objects<Medicine>(SCHEMA.MEDICINE)
        realm.write(() => {
            medicines.forEach((e1) => {
                let temp = allMedicine.find((e2) => e2._id == e1._id)
                if (temp !== undefined) {
                    temp.title = e1.title
                    temp.during = e1.during
                    temp.remind = e1.remind
                    NotifiSchedule.update(e1)
                }
                else {
                    // console.log('object')
                    realm.create(SCHEMA.MEDICINE, e1)
                    NotifiSchedule.genNotifiMedicine(e1)
                }
            })
        })
    } catch (error: any) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 99 ~ updateMedicine ~ error", error.message)
    }
}

/**Tìm kiếm thuốc theo từ khoá */
export const searchMedicine = async (keyword: String) => {
    try {
        const realm = await RealmManager.getRealm()
        const medicines = realm.objects(SCHEMA.MEDICINE)
        let searchResult = medicines.filtered('title CONTAINS $0', keyword)
        return searchResult
    } catch (error) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 110 ~ searchMedicine ~ error", error)
    }
}

/**
 * get medicine detail
 * @param _id id of medicine
 */
export const getMedicine = async (_id: number) => {
    try {
        const realm = await RealmManager.getRealm()
        const medicine = realm.objectForPrimaryKey(SCHEMA.MEDICINE, _id)
        console.log('medicine', medicine)
        return medicine
    } catch (error) {
        console.log("🚀 ~ file: medicine.controller.ts ~ line 123 ~ getMedicine ~ error", error)
    }
}