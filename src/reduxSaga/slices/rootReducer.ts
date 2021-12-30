
import { eventsReducer } from './eventsSlice'
import { medicinesReducer } from './medicinesSlice'
import { visitedsReducer } from './visitedsSlice'
const rootReducer = {
  medicineState: medicinesReducer,
  visitedState: visitedsReducer,
  eventState: eventsReducer
}

export default rootReducer