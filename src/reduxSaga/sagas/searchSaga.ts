import { takeLatest } from "redux-saga/effects";
import { Visited } from "../../common";
import { searchMedicine } from "../../realm/controllers/medicine.controller";
import { searchVisited } from "../../realm/controllers/visited.controller";
import { searchAction } from "../slices/searchSlice";



export default [
    takeLatest(searchAction.search.type, searchSaga),
]


function* searchSaga() {

}

/**Tìm kiếm các visited dựa theo tên hoặc id 
 * @param keyword Tên sự kiện khám hoặc _id hoặc địa điểm hoặc ghi chú
 * @returns Mảng các sự kiện khám
*/
const _searchVisited = async (keyword: String) => {
    // console.log("searchVisited")
    try {
        let result = await searchVisited(keyword)
        return result
    } catch (error) {
        console.log("🚀 ~ file: eventsSaga.ts ~ line 152 ~ searchMedicine ~ error", error)
    }
}

/** Tìm kiếm event thuốc dựa theo tên thuốc hoặc id
 * @param keyword Tên thuốc hoặc _id
 * @returns Mảng các thuốc
*/
const _searchMedicine = async (keyword: String) => {
    // console.log("searchMedicine")
    try {
        let result = await searchMedicine(keyword);

        return result
    } catch (error) {
        console.log("🚀 ~ file: eventsSaga.ts ~ line 152 ~ searchMedicine ~ error", error)
    }
}