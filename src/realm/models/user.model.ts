import {SCHEMA} from '../common';

export const UserSchema = {
  name: SCHEMA.USER,
  properties: {
    _id: 'int',
    // phoneNumber: 'string',
    // password: 'string',
    // thirdPartyId: '{}',
    // customInfo: '{}',
    nickname: 'string?',
    avatar: 'string?',
    gender: 'int?',
    dob: 'double?',
    height: 'double?',
    weight: 'double?',
    goalStep: 'int?',
  },
  primaryKey: '_id',
};
