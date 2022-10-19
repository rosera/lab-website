let inputText = '[{"name": "user_0"}, {"name": "user_1"}, {"name": "user_3"}]'

const obj = JSON.parse(inputText);

console.log(obj)
console.log(obj[0].name)

// console.log(inputText)
// 
// const outputArray = inputText.split(',')
// 
// console.log(outputArray)
// 
// const {...obj} = outputArray
// 
// console.log(obj)
// 
// const result = outputArray.reduce((a, v) => ({...a, [v.name]: v}), {})
// 
// console.log(result)
