export function checkArray(key) {
    // 权限数组
    let arr =['1','3','5','7']
    let index = arr.indexOf(key)
    if (index>-1) {
        return true
    } else {
        return false
    }
}


// vue  main.js
import {checkArray} from 'array.js'
Vue.directive('display-key',{
    inserted(el,binding){
        let displayKey = binding.value
        if(displayKey){
            let hasPermission = checkArray(displayKey)
            if(!hasPermission){
                el.parentNode && el.parentNode.removeChild(el);
            }
        }else{
            throw new Error('need key ! Like v-display-key="'displayKey'")
        }
    }
   
})

// hellword.vue
<button v-display-key="'3'" ></button>