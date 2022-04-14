import {Emiter} from './Emiter';

type StateTransferFunction = (...args:Array<any>)=> void
export class StateMachine<
S extends string | number,
A extends string | number,
Topic extends string | number,
> extends Emiter<Topic> {
	
}
