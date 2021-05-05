// const Mock = require('mockjs')
// const Random = Mock.Random
// const { usersList } = Mock.mock({
//   'usersList|10-20': [
//     {
//       id: '@increment()',
//       r_id: 0,
//       username: '@name()',
//       date: '@date(yyyy-mm-dd hh:mm:ss)',
//       email: '@email'
//     }
//   ]
// })
// const { groundList } = Mock.mock({
//   'groundList|10': [
//     {
//       id: '@increment()',
//       status: 0,
//       groundName: '@cname(4)',
//       'price|20-40': 20
//     }
//   ]
// })
// Mock.mock('api/get/users', 'get', () => {
//   return {
//     data: { uses: usersList },
//     meta: {
//       msg: '获取成功',
//       status: 200
//     }
//   }
// })
// Mock.mock('api/get/ground', 'get', () => {
//   return {
//     data: { ground: groundList },
//     meta: {
//       msg: '获取成功',
//       status: 200
//     }
//   }
// })
// Mock.mock('course', 'get', () => {
//   return {
//     data: [
//       {type:'java',name:'java课'},
//       {type:'js',name:'js课'},
//       {type:'test',name:'test课'},
//       {type:'yunwei',name:'运维'},
//     ],
//     meta: {
//       msg: '获取成功',
//       status: 200
//     }
//   }
// })
