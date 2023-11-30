import {createReducer, on} from "@ngrx/store";
import {emtpyMessages, callAction, newMessage, setCustomerState} from "./actions";
import {MessageModel} from "../shared/models/message.model";
import {customerStates} from "../shared/models/customer-states";

const initialStateNewMessages: MessageModel[] = []

const initialStateCustomerState: number = customerStates.willInit

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
