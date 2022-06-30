import GoogleFit, { AuthorizeResponse, BucketOptions, BucketUnit, DistanceResponse, Scopes, StartAndEndDate, StepsResponse } from 'react-native-google-fit';

const options = {
    scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_LOCATION_READ,
        Scopes.FITNESS_LOCATION_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
        Scopes.FITNESS_NUTRITION_READ,
        Scopes.FITNESS_NUTRITION_WRITE,
        Scopes.FITNESS_BLOOD_PRESSURE_READ,
        Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
        Scopes.FITNESS_BLOOD_GLUCOSE_READ,
        Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
        Scopes.FITNESS_OXYGEN_SATURATION_READ,
        Scopes.FITNESS_OXYGEN_SATURATION_WRITE,
        Scopes.FITNESS_BODY_TEMPERATURE_READ,
        Scopes.FITNESS_BODY_TEMPERATURE_WRITE,
        Scopes.FITNESS_REPRODUCTIVE_HEALTH_READ,
        Scopes.FITNESS_REPRODUCTIVE_HEALTH_WRITE,
        Scopes.FITNESS_SLEEP_READ,
        Scopes.FITNESS_SLEEP_WRITE,
        Scopes.FITNESS_HEART_RATE_READ,
        Scopes.FITNESS_HEART_RATE_WRITE,
    ],
}

export const HGoogleFit = {
    authorize: async (): Promise<AuthorizeResponse | undefined> => {
        try {
            let test = await GoogleFit.authorize(options)
            // console.log('GoogleFit.authorize', test)
            return test
        } catch (error: any) {
            console.log("🚀 ~ file: GoogleFit.ts ~ line 18 ~ authorize: ~ error", error)
        }
    },

    checkIsAuthorized: async (): Promise<boolean | undefined> => {
        try {
            await GoogleFit.checkIsAuthorized()
            let result = GoogleFit.isAuthorized
            // console.log('GoogleFit.isAuthorized', result)
            return result
        } catch (error: any) {
            console.log("🚀 ~ file: GoogleFit.ts ~ line 32 ~ checkIsAuthorized: ~ error", error)
        }

    },
    disconnect: (): void => { GoogleFit.disconnect() },
    removeListeners: (): void => {
        GoogleFit.removeListeners()
    },

    /**
    * Start recording fitness data (steps, distance)
    * This function relies on sending events to signal the RecordingAPI status
    * Simply create an event listener for the {DATA_TYPE}_RECORDING (ex. STEP_RECORDING)
    * and check for {recording: true} as the event data
    * return DeviceEventEmitter.addListener(eventName, event => callback(event))
    */
    startRecording: (callback: (param: any) => void, dataTypes: Array<'step' | 'distance' | 'activity'>): void => {

        GoogleFit.startRecording(callback, dataTypes)
    },

    /**
    * A shortcut to get the total steps of a given day by using getDailyStepCountSamples
    * @param {Date} date optional param, new Date() will be used if date is not provided
    */
    getDailySteps: async (date?: Date): Promise<StepsResponse[] | undefined> => {
        try {
            let res = await GoogleFit.getDailySteps(date)
            // console.log('getDailySteps', res)
            return res
        } catch (error) {
            console.log("🚀 ~ file: HGoogleFit.ts ~ line 77 ~ getDailySteps: ~ error", error)
        }
    },

    /**
    * A shortcut to get the weekly steps of a given day by using getDailyStepCountSamples
    * @param {Date} date optional param, new Date() will be used if date is not provided
    * @param {number} adjustment, optional param, use to adjust the default start day of week, 0 = Sunday, 1 = Monday, etc.
    */
    getWeeklySteps: async (date?: Date, adjustment?: number): Promise<StepsResponse[] | undefined> => {
        try {
            let res = await GoogleFit.getWeeklySteps(date, adjustment)
            // console.log('getWeeklySteps', JSON.stringify(res))
            return res
        } catch (error) {
            console.log("🚀 ~ file: HGoogleFit.ts ~ line 88 ~ getWeeklySteps: ~ error", error)
        }
    },


    /**
     * Get the total steps per day over a specified date range.
     * @param {Object} options getDailyStepCountSamples accepts an options object containing optional startDate: ISO8601Timestamp and endDate: ISO8601Timestamp.
     */
    getDailyStepCountSamples: async (
        options: StartAndEndDate & Partial<BucketOptions>
    ): Promise<StepsResponse[] | undefined> => {
        try {
            let res = await GoogleFit.getDailyStepCountSamples(options)
            // console.log('getDailyStepCountSamples', JSON.stringify(res))
            return res
        } catch (error) {
            console.log("🚀 ~ file: HGoogleFit.ts ~ line 101 ~ error", error)
        }

    },

    /**
    * Get the total distance per day over a specified date range.
    * @param {Object} options getDailyDistanceSamples accepts an options object containing optional startDate: ISO8601Timestamp and endDate: ISO8601Timestamp.
    */
    getDailyDistanceSamples: async (
        options: StartAndEndDate & Partial<BucketOptions>
    ): Promise<DistanceResponse[] | undefined> => {
        try {
            let res = await GoogleFit.getDailyDistanceSamples(options)
            // console.log('getDailyDistanceSamples', res)
            return res
        } catch (error) {
            console.log("🚀 ~ file: HGoogleFit.ts ~ line 126 ~ error", error)
        }
    },
    /**
     * get overview infor of all activities
     */
    getAllActivities: async () => {
        let opt = {
            startDate: "2022-06-01T00:00:17.971Z", // required
            endDate: new Date().toISOString(), // required
            bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
            bucketInterval: 1, // optional - default 1. 
        };

        const res = await GoogleFit.getActivitySamples(opt)
        // console.log(res);
        return res

    },
    observeSteps: async () => {
        GoogleFit.observeSteps((result) => { { console.log("observeSteps", result) } })

        // console.log("test")
    }
    ,
    /**
     * open app Fit if user has install
     */
    openFit: () => {
        GoogleFit.openFit()
    },
    /**
     * total time move
     * @param options 
     * @returns 
     */
    getMoveMinutes: async (options: StartAndEndDate & Partial<BucketOptions>) => {
        try {
            const res = await GoogleFit.getMoveMinutes(options)
            // console.log('getMoveMinutes', res.length)
            return res
        } catch (error) {
            console.log("🚀 ~ file: HGoogleFit.ts ~ line 170 ~ error", error)
        }
    },
    /**
    * Get the total calories per day over a specified date range.
    * @param {Object} options getDailyCalorieSamples accepts an options object containing required startDate: ISO8601Timestamp and endDate: ISO8601Timestamp. optional basalCalculation - {true || false} should we substract the basal metabolic rate averaged over a week
    */
    getDailyCalorieSamples: async (
        options: StartAndEndDate & { basalCalculation?: boolean } & Partial<BucketOptions>
    ) => {
        try {
            const res = await GoogleFit.getDailyCalorieSamples(options)
            // console.log('getDailyCalorieSamples', res)
            return res
        } catch (error) {
            console.log("🚀 ~ file: HGoogleFit.ts ~ line 185 ~ error", error)
        }
    },
    /**
    * Get the sleep sessions over a specified date range.
    * @param {Object} options getSleepData accepts an options object containing required startDate: ISO8601Timestamp and endDate: ISO8601Timestamp.
    */
    getSleepSamples: async (
        options: Partial<StartAndEndDate>
    ) => {

        try {
            const res = await GoogleFit.getSleepSamples(options)
            console.log('getSleepSamples', res)
            return res
        } catch (error) {
            console.log("🚀 ~ file: HGoogleFit.ts ~ line 201 ~ error", error)
        }
    },
    getHeartRateSamples: async (options: StartAndEndDate & Partial<BucketOptions>) => {
        try {
            let res = await GoogleFit.getHeartRateSamples(options)
            console.log('getHeartRateSamples', res)
            return res
        } catch (error) {
            console.log("🚀 ~ file: HGoogleFit.ts ~ line 210 ~ getHeartRateSamples: ~ error", error)
        }
    }


}