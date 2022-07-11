import { LocationSchema } from "./models/location.model";
import { MedicineSchema, RemindSchema, ScheduleSchema } from "./models/medicine.model";
// import { UserSchema } from "./models/user.model";
import { PicNoteSchema, VisitedSchema } from "./models/visited.model";

export const configureRealm = {
    path: 'HealthCare',
    schema: [
        // UserSchema,
        VisitedSchema,
        MedicineSchema,
        RemindSchema,
        PicNoteSchema,
        ScheduleSchema,
        LocationSchema,
    ],
    schemaVersion: 1,
};

