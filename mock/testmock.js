const Mock = require('mockjs')
let id = Mock.mock('@id')
console.log(id)
let obj = Mock.mock({
    id: '@id()',
    r_id: 0,
    username: '@name()',
    date: '@date()',
    email: '@email',
})
console.log(obj);