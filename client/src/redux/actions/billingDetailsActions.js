
import { BILLING_DETAIL_FILLS } from './../constants/billingConstants';

export const addBillingDetails = (data) => {

    return {
        type:BILLING_DETAIL_FILLS,
        payload:data
    }
}