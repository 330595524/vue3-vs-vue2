function bucket_sort(A) {
    const a = A.length
    // 桶 - a项的二维数组
    const B = [...Array[a]].map(()=>[])
    //  下标算法
    const indexFunc = (val)=>{
        return val -1
    }
    A.forEach(val => {
        const idx = Math.floor(indexFunc(val))
        if(!B[idx]){
            throw new Error("桶脚标没有命中")
       } 
       B[idx].push(val)
    });

    return B.reduce((res,bucket)=>{
        return res.concat(bucket)  //o(n)
    },[])

    // return [].concat(...B.map((bucket)=>{
    //     return bucket.sort((a,b)=>a-b)
    // }))

    // return eval(`[${B + ''}]`)

}