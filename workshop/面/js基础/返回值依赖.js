const func1 = (t)=>Promise.resolve(t+ '结果1');
const func2 = (t)=>Promise.resolve(t+ '结果2');
const func3 = (t)=>Promise.resolve(t+ '结果3');
async function fetchAll(safeArray) {
    let p ;
    for (const fn of safeArray) {
        p = fn(p)
    }
    return p
}
fetchAll([func1,func2,func3]).then(res=>{console.log(res);})