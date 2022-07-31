import RealmManager from '../';
import {SCHEMA} from '../common';

export const getUserProfile = async (_id: number | undefined) => {
  try {
    const realm = await RealmManager.getRealm();
    let user: any;
    if (_id === undefined) {
      const users = realm.objects(SCHEMA.USER);
      if (users.length == 0) {
        realm.write(() => {
          realm.create(SCHEMA.USER, {_id: Date.now(), gender: 1});
        });
      }
      user = realm.objects(SCHEMA.USER)[0];
    } else {
      user = realm.objectForPrimaryKey(SCHEMA.USER, _id);
    }
    return user;
  } catch (error) {
    console.log(
      '🚀 ~ file: user.controller.ts ~ line 13 ~ getUserProfile ~ error',
      error,
    );
    return null;
  }
};

export const updateUserProfile = async (custominfor: any) => {
  // console.log('custominfor', custominfor)
  try {
    const realm = await RealmManager.getRealm();
    realm.write(() => {
      let user = realm.objectForPrimaryKey(SCHEMA.USER, custominfor._id);
      //@ts-ignore
      user.nickname = custominfor.nickname ?? user.nickname;
      //@ts-ignore
      user.avatar = custominfor.avatar ?? user.avatar;
      //@ts-ignore
      user.gender = custominfor.gender ?? user.gender;
      //@ts-ignore
      user.height = custominfor.height ?? user.height;
      //@ts-ignore
      user.weight = custominfor.weight ?? user.weight;
      //@ts-ignore
      user.goalStep = custominfor.goalStep ?? user.goalStep;
    });
    return realm.objectForPrimaryKey(SCHEMA.USER, custominfor._id);
  } catch (error) {
    console.log(
      '🚀 ~ file: user.controller.ts ~ line 39 ~ updateUserProfile ~ error',
      error,
    );
    return false;
  }
};
