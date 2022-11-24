'use strict'

const addAsync = async (a,b) => {
    if(typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą miec typ number!')
    }
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 100)
    })
}

const checkPerformace = async (...nums) => {
    performance.mark('start')
    await addMultipleAsync(...nums)
    performance.mark('end')
    return performance.measure('addAsyncPerformance', 'start', 'end')
}

const addMultipleAsync = async (...nums) => {
    console.log('nums',nums)
    if(nums.length === 1) return nums[0]
    if(nums.length === 2) return await addAsync(nums[0], nums[1])
    
    if(nums.length % 2 === 0) {
        const resultArr = []
        const firsthalf = nums.splice(0, nums.length/2)
        const secondhalf = nums

        for (let i = 0; i < firsthalf.length; i++) 
            resultArr.push(addAsync(firsthalf[i], secondhalf[i]))

        const allPromises = await Promise.all(resultArr)
        const result = await addMultipleAsync(...allPromises)
        return result
    } else {
        const oddElement = nums.pop()
        const result = await addMultipleAsync(...nums)
        return await addAsync(oddElement, result) 
    }    
}

performance.mark('start')
const sum = await addMultipleAsync(1,2,3,4,5,6,7,8,9,10)
performance.mark('end')
const dur = performance.measure('uwu', 'start', 'end')

checkPerformace(1,2,3,4,5,6,7,8,9,10)
document.querySelector('#sum').textContent = `SUM: ${sum} DURATION: ${dur.duration} `