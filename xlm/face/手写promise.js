/**
 * Created: xulimin
 * Date: 2023-02-02
 */
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

let a = new Promise((resolve, reject) => {
})

class PromiseMy {
  constructor(fn) {
    this.status = PENDING
    this.resList = []
    this.rejectList = []
    fn(this.resList.bind(this), this.rejectList.bind(this))
    return this;
  }

  resolve(props) {
    setTimeout(() => {
      this.status = RESOLVED
      const handler = this.resList.shift()
      if (!handler) return
      const result = handler(props)
      if (result && result instanceof PromiseMy) {
        result.then(...this.resList)
      }
    })
  }

  reject(error) {
    setTimeout(() => {
      this.status = REJECTED
      const handler = this.rejectList.shift()
      if (!handler) return
      const result = handler(error)
      if (result && result instanceof PromiseMy) {
        result.catch(...this.rejectList)
      }
    })
  }

  then(headers) {
    this.resList = [...this.resList, ...headers]
    return this;
  }

  catch(headers) {
    this.rejectList = [...this.rejectList, ...headers]
    return this;
  }
}

PromiseMy.all = function (promiseArr) {
    return new PromiseMy((resolve, reject)=>{
      let result = []
      let curNum = 0;
      for (let i = 0; i < promiseArr.length; i++) {
        const item = promiseArr[i]
        item.then((data)=>{
          curNum++;
          result[i] = data
          if(curNum == promiseArr.length){
            resolve(result)
          }
        }).catch(reject)
      }

    })

}
