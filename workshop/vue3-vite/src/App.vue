<template>
    <div>
        <div :class="{fixed:top>100}">
            <input type="text" v-model="state.newTodo" @keyup.enter="addNewTodo">
       
        </div>
         <ul><li :key="todo.id" v-for="todo in state.todos">{{todo.title}}</li></ul>
       <!--  <h1>count is {{count}}</h1>
        <h2>double is {{double}}</h1>
        <button @click="add">add</button> -->
    </div>
</template>

<script>
import {ref, computed, onMounted, watchEffect, reactive} from 'vue'
import useScroll from './components/scroll2.js'
// 支持tree-shaking
/* export default {
    setup(){
        let count = ref(0)
        function add(params) {
            count.value ++
        }
        const double = computed(()=>count.value*2)
        return {count,double,add}
    }
} */

// 类似mixin
/* export default {
    setup(){
        const  {count,double,add} = useCount(1)
        return {count,double,add}
    }
}
function useCount(init) {
    let count = ref(0)
        function add(params) {
            count.value ++
        }
        const double = computed(()=>count.value*2)
        onMounted(()=>{
            console.log('onMounted')
        })
        watchEffect(()=>{
            console.log('watchEffect',count.value)
        })
        return {count,double,add}
} */

export default {
    setup(){
        const state = reactive({
            newTodo:'',
            todos:[
                {id:'1',title:'吃西瓜',computed:false},
                {id:'2',title:'吃麻辣烫',computed:false},
                {id:'3',title:'学习vue3',computed:false},
                {id:'4',title:'学习vue3',computed:false},
                {id:'5',title:'学习vue3',computed:false},
                {id:'6',title:'学习vue3',computed:false},
                {id:'7',title:'学习vue3',computed:false},
                {id:'8',title:'学习vue3',computed:false},
                {id:'9',title:'学习vue3',computed:false},
            ]   
        })
        function addNewTodo() {
            const val = state.newTodo;
            if(!val) return
            state.todos.push({
                id:state.todos.length-1,
                title:val,
                computed:false
            })
        }
        watchEffect(()=>{
            console.log('state is ',state)
        })
        const {top} =useScroll()
        return {state, addNewTodo,top}
    }
}

</script>
<style >
li{
    height: 200px;
}
.fixed{
    position: fixed;
    top: 20px;
    left: 20px;
}
</style>