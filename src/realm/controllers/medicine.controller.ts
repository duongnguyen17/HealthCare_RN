import {Medicine, MedicineItemDisplay, Schedule} from '../../common';
import {NUM_RESULT, SCHEMA} from '../common';
import RealmManager from '../';
import NotifiSchedule from '../../utils/Notifi';

/**get medicines in a month */
export const getMedicineInMonth = async (date: Date) => {
  try {
    const realm = await RealmManager.getRealm();
    let medicine = realm.objects(SCHEMA.MEDICINE);
    // console.log(`medicine`, medicine)
    return medicine;
  } catch (error: any) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 13 ~ getMedicineInMonth ~ error',
      error.message,
    );
  }
};

/**get all medicine */
export const getAllMedicine = async () => {
  try {
    const realm = await RealmManager.getRealm();
    let allMedicine = realm.objects(SCHEMA.MEDICINE);
    return allMedicine;
  } catch (error: any) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 25 ~ getAllMedicine ~ error',
      error.message,
    );
    return error;
  } finally {
  }
};
/**add new medicine */
export const addMedicine = async (medicine: any) => {
  try {
    const realm = await RealmManager.getRealm();
    const listMedicine = realm.objects(SCHEMA.MEDICINE);
    const result = listMedicine?.filter(value =>
      //@ts-ignore
      value?.title?.toLowerCase().startsWith(medicine?.title?.toLowerCase()),
    );
    if (result.length === 0) {
      realm.write(() => {
        realm.create(SCHEMA.MEDICINE, medicine);
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 54 ~ addMedicine ~ error',
      error,
    );
  }
};

/**delele medicine  */
export const deleteMedicine = async (_id: number) => {
  try {
    const realm = await RealmManager.getRealm();
    realm.write(() => {
      let medicine = realm.objectForPrimaryKey(SCHEMA.MEDICINE, _id);
      realm.delete(medicine);
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 40 ~ deleteMedicine ~ error',
      error,
    );
  }
};
/**update medicine */
export const updateMedicine = async (medicine: any) => {
  try {
    const realm = await RealmManager.getRealm();
    realm.write(() => {
      let editMedicine = realm.objectForPrimaryKey<Medicine>(
        SCHEMA.MEDICINE,
        medicine._id,
      );
      // @ts-ignore
      editMedicine.title = medicine.title;
      // // @ts-ignore
      // editMedicine.isDone = medicine.isDOne
      // @ts-ignore
      editMedicine.remind = medicine.remind;
      // @ts-ignore
      editMedicine.during = medicine.during;
      return editMedicine;
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 56 ~ updateMedicine ~ error',
      error,
    );
  }
};

export const updateMedicines = async (medicines: Array<Medicine>) => {
  // // console.log(`medicines - updateMedicines - medicinesController`, medicines)
  // try {
  //   const realm = await RealmManager.getRealm();
  //   let allMedicine = realm.objects<Medicine>(SCHEMA.MEDICINE);
  //   realm.write(() => {
  //     medicines.forEach(e1 => {
  //       let temp = allMedicine.find(e2 => e2._id == e1._id);
  //       if (temp !== undefined) {
  //         temp.title = e1.title;
  //         temp.during = e1.during;
  //         temp.remind = e1.remind;
  //         NotifiSchedule.update(e1);
  //       } else {
  //         // console.log('object')
  //         realm.create(SCHEMA.MEDICINE, e1);
  //         NotifiSchedule.genNotifiSchedule(e1);
  //       }
  //     });
  //   });
  // } catch (error: any) {
  //   console.log(
  //     '🚀 ~ file: medicine.controller.ts ~ line 99 ~ updateMedicine ~ error',
  //     error.message,
  //   );
  // }
};

/**Tìm kiếm thuốc theo từ khoá */
export const searchMedicine = async (keyword: string, index: number) => {
  try {
    const realm = await RealmManager.getRealm();
    const result = new Array<MedicineItemDisplay>();
    const allMedicines = realm.objects(SCHEMA.MEDICINE);
    const listMedicine = allMedicines?.filter(value =>
      //@ts-ignore
      value?.title?.toLowerCase().startsWith(keyword?.toLowerCase()),
    );
    console.log('listMedicine', JSON.stringify(listMedicine));
    listMedicine.slice(index, index + NUM_RESULT).forEach(value => {
      result.push({
        //@ts-ignore
        _id: value._id,
        //@ts-ignore
        title: value.title,
        //@ts-ignore
        infor: value.infor,
        //@ts-ignore
        shcedules: value.shcedules,
      });
    });
    return result;
  } catch (error) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 110 ~ searchMedicine ~ error',
      error,
    );
  }
};

/**
 * get medicine detail
 * @param _id id of medicine
 */
export const getMedicine = async (_id: number) => {
  try {
    const realm = await RealmManager.getRealm();
    const medicine = realm.objectForPrimaryKey(SCHEMA.MEDICINE, _id);
    return medicine;
  } catch (error) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 123 ~ getMedicine ~ error',
      error,
    );
  }
};

export const getListMedicines = async (medicineIds: Array<number>) => {
  try {
    const realm = await RealmManager.getRealm();
    const result = medicineIds.map(value =>
      realm.objectForPrimaryKey(SCHEMA.MEDICINE, value),
    );
    return result;
  } catch (error) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 182 ~ getListMedicines ~ error',
      error,
    );
  }
};

export const updateSchedule = async (_id: number, schedule: Schedule) => {
  try {
    const realm = await RealmManager.getRealm();
    realm.write(() => {
      const medicine = realm.objectForPrimaryKey(SCHEMA.MEDICINE, _id);
      //@ts-ignore
      const scheduleTemp = medicine?.schedules.find(
        (value: any) => value.visitedId == schedule.visitedId,
      );
      if (scheduleTemp == undefined) {
        //@ts-ignore
        medicine.schedules.push(schedule);
      } else {
        //@ts-ignore
        scheduleTemp = schedule;
      }
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 212 ~ updateSchedule ~ error',
      error,
    );
  }
};
