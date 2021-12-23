//tạm bỏ
import { SCHEMA } from "../common";

export const UserSchema = {
    name: SCHEMA.USER,
    properties: {
        _id: 'int',
        phoneNumber: 'string',
        password: 'string',
        thirdPartyId: '{}',
        customInfo: '{}',
    },
    primaryKey: '_id'
}