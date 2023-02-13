import { call, put, takeLatest } from "redux-saga/effects";
import { AlertType, Medicine, SearchType, Visited } from "../../common";
import { showAlert } from "../../components/HAlert";
import { hideLoading, showLoading } from "../../components/Loading";
import { searchLocation } from "../../realm/controllers/location.controller";
import { searchMedicine } from "../../realm/controllers/medicine.controller";
import { searchVisited } from "../../realm/controllers/visited.controller";
import { searchAction } from "../slices/searchSlice";



export default [
    takeLatest(searchAction.search.type, searchSaga),
]


function* searchSaga({ payload }: any) {
    try {
        showLoading()
        const keyword: String = payload.keyword
        const searchType: SearchType = payload.searchType
        let searchResult: Array<Medicine | Visited> = []
        switch (searchType) {
            case SearchType.MEDICINE:
                searchResult = yield call(_searchMedicine, keyword)
                break;
            case SearchType.VISITED:
                searchResult = yield call(_searchVisited, keyword)
                break;
            case SearchType.LOCATION:
                searchResult = yield call(_searchLocation, keyword)
                break;
            default:
                console.log("Chưa truyền searchtype")
                // searchResult = yield call(_searchAll, keyword)
                break;
        }
        console.log('searchResult', searchResult)
        yield put(searchAction.searchSuccess({ searchResult }))
    } catch (error) {
        console.log("🚀 ~ file: eventsSaga.ts ~ line 134 ~ function*searchEventSaga ~ error", error)
        showAlert(AlertType.FAIL, 'Chức năng tìm kiếm tạm thời bị lỗi, vui lòng thử lại sau!')
    } finally {
        hideLoading()
    }
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

/** Tìm kiếm địa điểm dựa theo tên thuốc hoặc id
 * @param keyword Tên địa điểm hoặc _id
 * @returns Mảng các địa điểm
*/
const _searchLocation = async (keyword: String) => {
    // console.log("searchMedicine")
    try {
        let result = await searchLocation(keyword);
        return result
    } catch (error) {
        console.log("🚀 ~ file: eventsSaga.ts ~ line 152 ~ searchMedicine ~ error", error)
    }
}