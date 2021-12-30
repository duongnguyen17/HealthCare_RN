import Realm from "realm";
import { configureRealm } from "./config";

class RealmManager {
    //@ts-ignorets-ignore
    private _refRealm: Realm;
    constructor() {
        Realm.open(configureRealm).then((realm) => {
            this._refRealm = realm
        })
    }
    async getRealm() {

        if (this._refRealm.isClosed) {
            Realm.open(configureRealm).then((realm) => {
                this._refRealm = realm
            })
        }
        return this._refRealm
    }
}

export default new RealmManager()