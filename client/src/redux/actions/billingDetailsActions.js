
import { BILLING_DETAIL_FILLS, BILLING_DETAIL_ERROR } from './../constants/billingConstants';


export const errorBillingDetails = (data) => {

    return {
        type:BILLING_DETAIL_ERROR,
        payload:data
    }
}

export const addBillingDetails = (data) => {

    return {
        type:BILLING_DETAIL_FILLS,
        payload:data
    }
}

