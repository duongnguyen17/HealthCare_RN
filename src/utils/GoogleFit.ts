import GoogleFit, { Scopes } from 'react-native-google-fit';

const options = {
    scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
    ],
}

export const HGoogleFit = {
    authorize: async () => {
        try {
            let test = await GoogleFit.authorize(options)
            return test
        } catch (error: any) {
            console.log("🚀 ~ file: GoogleFit.ts ~ line 18 ~ authorize: ~ error", error)
        }
    },

    checkIsAuthorized: async () => {
        try {
            await GoogleFit.checkIsAuthorized()
            return GoogleFit.isAuthorized
        } catch (error: any) {
            console.log("🚀 ~ file: GoogleFit.ts ~ line 32 ~ checkIsAuthorized: ~ error", error)
        }

    },
    startRecording: () => {

    }
}