
import { eventReducer } from './eventSlice'
import { medicineReducer } from './medicineSlice'
import { visitedReducer } from './visitedSlice'
const rootReducer = {
  medicineState: medicineReducer,
  visitedState: visitedReducer,
  eventState: eventReducer
}

export default rootReducer