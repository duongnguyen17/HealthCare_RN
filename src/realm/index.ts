import { MedicineSchema, RemindSchema } from "./models/medicine.model";
// import { UserSchema } from "./models/user.model";
import { VisitedSchema } from "./models/visited.model";

export const configureRealm = {
    path: 'HealthCare',
    schema: [
        // UserSchema,
        VisitedSchema,
        MedicineSchema,
        RemindSchema,
    ],
    schemaVersion: 3,
};