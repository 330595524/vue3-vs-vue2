/**
 * Created: xulimin
 * Date: 2023-01-31
 */
function constTize(obj) {
  if(Object.isFrozen(obj)) return obj
  Reflect.ownKeys(obj).forEach(key=>{
  //  深度冻结
    typeof obj[key] === 'object' && (obj[key] = constTize(obj[key]))
  })
  return  Object.freeze(obj)

}
