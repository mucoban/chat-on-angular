import {createAction} from "@ngrx/store";

export const emtpyMessages = createAction('emtpyMessages')
export const newMessage = createAction('newMessage',
  (value: any) => ({ payload: value }))

export const setCustomerState = createAction('setCustomerState',
  (value: any) => ({ payload: value }))

export const callAction = createAction('callAction',
  (value: any) => ({ payload: value }))

