import {ref,onMounted,onUnmounted} from 'vue'
export default function useScroll (){
    const top =ref(0)
    function updata() {
        top.value = window.scrollY
    }
    onMounted(()=>{
        window.addEventListener('scroll',updata)
    })
    onUnmounted(()=>{
        window.removeEventListener('scroll',updata)
    })
    return {top}
}