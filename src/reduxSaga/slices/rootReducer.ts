
import { authReducer } from './authSlice'
import { eventsReducer } from './eventsSlice'
import { healthReducer } from './healthSlice'
import { medicinesReducer } from './medicinesSlice'
import { visitedsReducer } from './visitedsSlice'
const rootReducer = {
  authState: authReducer,
  healthState: healthReducer,
  medicineState: medicinesReducer,
  visitedState: visitedsReducer,
  eventState: eventsReducer
}

export default rootReducer