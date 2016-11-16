import { EmEvent } from './event';


export interface EventBuffer {

	[ ISO8601date: string ] : EmEvent[];

}


//export type EventBuffer = EmEvent[];