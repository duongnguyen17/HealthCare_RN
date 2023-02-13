import RealmManager from '../';
import {NUM_RESULT, SCHEMA} from '../common';

/**Tìm kiếm thuốc theo từ khoá */
export const searchLocation = async (keyword: string, index: number) => {
  try {
    const realm = await RealmManager.getRealm();
    const listLocation = realm.objects(SCHEMA.LOCATION);
    const result = listLocation?.filter(value =>
      //@ts-ignore
      value?.name?.toLowerCase().includes(keyword?.toLowerCase()),
    );
    return result.slice(index, index + NUM_RESULT);
  } catch (error) {
    console.log(
      '🚀 ~ file: location.controller.ts ~ line 14 ~ searchLocation ~ error',
      error,
    );
  }
};

/**add new location */
export const addLocation = async (location: any) => {
  try {
    const realm = await RealmManager.getRealm();
    const listLocation = realm.objects(SCHEMA.LOCATION);
    const result = listLocation?.filter(value =>
      //@ts-ignore
      value?.name?.toLowerCase().includes(location?.name?.toLowerCase()),
    );
    if (result.length === 0) {
      realm.write(() => {
        realm.create(SCHEMA.LOCATION, location);
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: location.controller.ts ~ line 27 ~ addLocation ~ error',
      error,
    );
  }
};

/**
 * get location detail
 * @param _id id of location
 */
export const getLocation = async (_id: number) => {
  try {
    const realm = await RealmManager.getRealm();
    const location = realm.objectForPrimaryKey(SCHEMA.LOCATION, _id);
    return location;
  } catch (error) {
    console.log(
      '🚀 ~ file: location.controller.ts ~ line 59 ~ getLocation ~ error',
      error,
    );
  }
};

export const deleteLocation = async (_id: number) => {
  try {
    const realm = await RealmManager.getRealm();
    realm.write(() => {
      let location = realm.objectForPrimaryKey(SCHEMA.LOCATION, _id);
      realm.delete(location);
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: location.controller.ts ~ line 74 ~ deleteLocation ~ error',
      error,
    );
  }
};
