import { Injectable } from '@angular/core';

// wrapper for browser console api
@Injectable()
export class Logger {
	log(msg: any) { console.log(msg);}
	error(msg: any) { console.error(msg);}
	warn(msg: any) { console.warn(msg);}
}