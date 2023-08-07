import {createReducer, on} from "@ngrx/store";
import {emtpyMessages, callAction, newMessage, setCustomerState} from "./actions";
import {MessageModel} from "../shared/models/message.model";
import {state} from "@angular/animations";

const initialStateNewMessages: MessageModel[] = []

const initialStateCustomerState: string = 'waiting'

export const MessagesReducer = createReducer(initialStateNewMessages,
  on(emtpyMessages, (state) => []),
  on(newMessage, (state, action: any) => [...state, action.payload]),
)

export const CustomerStateReducer = createReducer(initialStateCustomerState,
  on(setCustomerState, (state, action: any) => state = action.payload),
)


export const AgentReducer = createReducer(null,
  on(callAction, (state, action: any) => { return action.payload } ),
)
