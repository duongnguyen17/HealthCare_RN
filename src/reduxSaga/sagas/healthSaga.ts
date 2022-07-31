import {
  BucketOptions,
  BucketUnit,
  StartAndEndDate,
} from 'react-native-google-fit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {hideLoading, showLoading} from '../../components/Loading';
import {getUserProfile} from '../../realm/controllers/user.controller';
import {addDays} from '../../utils/dateutils';
import {HGoogleFit} from '../../utils/HGoogleFit';
import {healthAction} from '../slices/healthSlice';

export default [
  takeLatest(healthAction.onAuthorize.type, onAuthorizeSaga),
  takeLatest(healthAction.checkAuthorize.type, checkAuthorizeSaga),
  takeLatest(healthAction.getOverviewToday.type, getOverviewTodaySaga),
];

function* onAuthorizeSaga() {
  try {
    //@ts-ignore
    const result = yield HGoogleFit.authorize();
    if (result?.success) {
      yield put(healthAction.onAuthorizeSuccess({isAuthorized: true}));
    } else {
      yield put(healthAction.onAuthorizeSuccess({isAuthorized: false}));
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: healthSaga.ts ~ line 14 ~ function*onAuthorize ~ error',
      error,
    );
  }
}

function* checkAuthorizeSaga() {
  try {
    //@ts-ignore
    const result = yield HGoogleFit.checkIsAuthorized();
    yield put(healthAction.checkAuthSuccess({isAuthorized: result}));
  } catch (error) {}
}

function* getOverviewTodaySaga() {
  const today = new Date();

  const opt: StartAndEndDate & {
    basalCalculation?: boolean;
  } & Partial<BucketOptions> = {
    startDate: addDays(today, -1).toISOString(), // required
    endDate: today.toISOString(), // required
    bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  try {
    showLoading();
    //@ts-ignore
    let today = yield call(_getIndexPeriod, opt);
    //@ts-ignore
    const user = yield call(getUserProfile);
    let processSteps = today?.steps[2]?.steps[0]?.value / user.goalStep;
    today.processSteps = processSteps;

    yield put(
      healthAction.getOverviewTodaySuccess({today, goalStep: user.goalStep}),
    );
  } catch (error) {
    console.log('getOverviewTodaySaga', error);
  } finally {
    hideLoading();
  }
}

const _getIndexPeriod = async (
  opt: StartAndEndDate & {basalCalculation?: boolean} & Partial<BucketOptions>,
) => {
  try {
    //@ts-ignore
    let distances = await HGoogleFit.getDailyDistanceSamples(opt);
    //@ts-ignore
    let calories = await HGoogleFit.getDailyCalorieSamples(opt);
    //@ts-ignore
    let steps = await HGoogleFit.getDailyStepCountSamples(opt);
    // //@ts-ignore
    // let sleep = await HGoogleFit.getSleepSamples(opt)
    //@ts -ignore
    let heartbeat = await HGoogleFit.getHeartRateSamples(opt);
    return {distances, calories, steps, heartbeat};
  } catch (error) {
    console.log('_getDailyIndex ERROR', error);
  }
};
