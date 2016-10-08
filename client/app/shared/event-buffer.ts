import { Event } from './event';

export interface EventBuffer {

	[ ISO8601date: string ] : Event[];

}