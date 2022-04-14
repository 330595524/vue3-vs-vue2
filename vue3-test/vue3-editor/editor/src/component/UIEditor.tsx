import { defineComponent } from "vue";
import "./index.scss"
import classes from "./drag-drop.module.scss"
import ItemList from './ItemList';
import {Editor} from '../object/Editor';

export default defineComponent({
	setup(){

		const editor = new Editor()

		return ()=>{
			return (
				<div class={classes.page}>
					55555
					<ItemList></ItemList>


				</div>
			)
		}
	}
})