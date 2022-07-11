
import { authReducer } from './authSlice'
import { deviceReducer } from './deviceSlice'
import { eventsReducer } from './eventsSlice'
import { healthReducer } from './healthSlice'
import { locationReducer } from './locationSlice'
import { medicinesReducer } from './medicinesSlice'
import { searchReducer } from './searchSlice'
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
  searchState: searchReducer,
  locationState: locationReducer,
}

export default rootReducer