interface UssdRequest {
    "Msisdn": string,
    "SessionId": string,
    "Message": string,
    "SessionType": number
}

const SessionTypes = {
    NewRequest: 1,
    Continuation: 2,
    Ended: 3
}

export { SessionTypes };
export type { UssdRequest };
