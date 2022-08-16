import RealmManager from '../';
import {Visited, VisitedItemDisplay} from '../../common';
import {isNextMonth, isPreMonth, isThisMonth} from '../../utils/dateutils';
import {NUM_RESULT, SCHEMA} from '../common';

export const searchVisited = async (
  keyword: string = '',
  index?: number,
  date?: Date,
) => {
  try {
    const realm = await RealmManager.getRealm();
    let result = new Array<VisitedItemDisplay>();
    const allVisited = realm.objects(SCHEMA.VISITED);
    let listVisited = allVisited?.filter(value =>
      //@ts-ignore
      // value?.title?.toLowerCase().startsWith(keyword?.toLowerCase()),
      value?.title?.toLowerCase().includes(keyword?.toLowerCase()),
    );
    if (index != null && index != undefined) {
      listVisited = listVisited?.slice(index, index + NUM_RESULT);
    }
    listVisited.forEach(value => {
      //@ts-ignore
      const location = value.location
        ? realm.objectForPrimaryKey(
            SCHEMA.LOCATION,
            //@ts-ignore
            value.location,
          )
        : null;
      result.push({
        //@ts-ignore
        _id: value._id,
        //@ts-ignore
        title: value.title,
        //@ts-ignore
        pre: value.pre,
        //@ts-ignore
        location,
        //@ts-ignore
        descript: value.descript,
        //@ts-ignore
        date: value.date,
        //@ts-ignore
        medicines: value.medicines,
        //@ts-ignore
        prescription: value.prescription,
        //@ts-ignore
        xRay: value.xRay,
        //@ts-ignore
        test: value.test,
      });
    });

    if (date != null && date != undefined) {
      result = result.filter(
        value =>
          isThisMonth(value.date, date) ||
          isNextMonth(value.date, date) ||
          isPreMonth(value.date, date),
      );
    }
    return result;
  } catch (error) {
    console.log(
      '🚀 ~ file: visited.controller.ts ~ line 46 ~ searchVisited ~ error',
      error,
    );
    return [];
  }
};

/**get visited in a month */
export const getVisitedInMonth = async (date: Date) => {
  try {
    const realm = await RealmManager.getRealm();
    let allVisited = realm.objects(SCHEMA.VISITED);
    // console.log(`allVisited`, allVisited)
    return allVisited;
  } catch (error) {
    console.log(
      '🚀 ~ file: visited.controller.ts ~ line 24 ~ getVisitedInMonth ~ error',
      error,
    );
  }
};

/**add new visited */
export const addVisited = async (newVisited: any) => {
  try {
    console.log(`addVisited`, newVisited);
    const realm = await RealmManager.getRealm();
    realm.write(() => {
      realm.create(SCHEMA.VISITED, newVisited);
    });
  } catch (error: any) {
    console.log(
      '🚀 ~ file: visited.controller.ts ~ line 78 ~ addVisited ~ error',
      error,
    );
  }
};

/**delele visited  */
export const deleteVisited = async (_id: number) => {
  try {
    const realm = await RealmManager.getRealm();
    realm.write(() => {
      let visited = realm.objectForPrimaryKey(SCHEMA.VISITED, _id);
      realm.delete(visited);
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: visited.controller.ts ~ line 81 ~ deleteVisited ~ error',
      error,
    );
  }
};
/**update visited */
export const updateVisited = async (visited: any) => {
  try {
    const realm = await RealmManager.getRealm();
    realm.write(() => {
      let editVisited = realm.objectForPrimaryKey<Visited>(
        SCHEMA.VISITED,
        visited._id,
      );
      // @ts-ignore
      editVisited.title = visited.title;
      // @ts-ignore
      editVisited.pre = visited.pre;
      // @ts-ignore
      editVisited.location = visited.location;
      // @ts-ignore
      editVisited.date = visited.date;
      return editVisited;
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: medicine.controller.ts ~ line 56 ~ updateMedicine ~ error',
      error,
    );
  }
};

// /**Tìm kiếm sự kiện khám theo từ khoá */
// export const searchVisited = async (keyword: String) => {
//   try {
//     const realm = await RealmManager.getRealm();
//     const visiteds = realm.objects(SCHEMA.VISITED);
//     let searchResult = visiteds.filtered(
//       'title CONTAINS $0 || location CONTAINS $0 || descript CONTAINS $0',
//       keyword,
//     );
//     return searchResult;
//   } catch (error) {
//     console.log(
//       '🚀 ~ file: visited.controller.ts ~ line 88 ~ searchVisited ~ error',
//       error,
//     );
//   }
// };

export const getVisited = async (_id: number) => {
  try {
    const realm = await RealmManager.getRealm();
    const visited = realm.objectForPrimaryKey(SCHEMA.VISITED, _id);
    return visited;
  } catch (error) {
    console.log(
      '🚀 ~ file: visited.controller.ts ~ line 102 ~ getVisited ~ error',
      error,
    );
  }
};
