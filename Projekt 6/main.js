'use strict'

const addAsync = async (a,b) => {
    if(typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą miec typ number!')
    }
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 10)
    })
}

const checkPerformace = async (...nums) => {
    performance.mark('start')
    await addMultipleAsync(...nums)
    performance.mark('end')
    return performance.measure('addAsyncPerformance', 'start', 'end')
}


const addMultipleAsync = async (...nums) => {
    if(nums.every(num => typeof num !== 'number'))
        return Promise.reject('Argumenty muszą miec typ number!')   
    
    
}

console.log('sum mult', await addMultipleAsync(1,2,3,4,5,6,7,8,9,10))

const arr = [1,2,3]
const arr2 = [3,2,1]
console.log(arr.every(x => arr2.includes(x)))