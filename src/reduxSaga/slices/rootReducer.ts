
import { authReducer } from './authSlice'
import { deviceReducer } from './deviceSlice'
import { eventsReducer } from './eventsSlice'
import { healthReducer } from './healthSlice'
import { medicinesReducer } from './medicinesSlice'
import { userReducer } from './userSlice'
import { visitedsReducer } from './visitedsSlice'
const rootReducer = {
  authState: authReducer,
  healthState: healthReducer,
  medicineState: medicinesReducer,
  visitedState: visitedsReducer,
  userState: userReducer,
  eventState: eventsReducer,
  deviceState: deviceReducer,
}

export default rootReducer