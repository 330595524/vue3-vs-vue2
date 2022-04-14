import { StateMachine } from "./StateMachine"
import { Actions, Meta, States } from '../types/editor.types'
import {Node} from './Node'
import { Topics } from "./Topics"

export class Editor extends StateMachine<States, Actions, Topics>{
	private root: Node
	constructor(){
		super(States.Start)
		this.root = new Node('root', 0,0, 800, 800)
		console.log(111111111);
		
	}
	private describeDrag(){

	}
	private describeAddComponent(){

	}
	public getRoot(){
		return  this.root
	}
}