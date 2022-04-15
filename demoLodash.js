let {
    groupBy,
    unionBy,
    every
} = require('lodash')

const dataSource = [{
        id: 1,
        typeCode: 'code1',
        typeName: '类型1',
        kindCode: 'kind1',
        kindName: '种类1'
    },
    {
        id: 2,
        typeCode: 'code1',
        typeName: '类型1',
        kindCode: 'kind2',
        kindName: '种类2'
    },
    {
        id: 3,
        typeCode: 'code1',
        typeName: '类型1',
        kindCode: 'kind3',
        kindName: '种类3'
    },
    {
        id: 4,
        typeCode: 'code1',
        typeName: '类型1',
        kindCode: 'kind4',
        kindName: '种类5'
    },
    {
        id: 5,
        typeCode: 'code2',
        typeName: '类型2',
        kindCode: 'kind21',
        kindName: '种类21'
    },
    {
        id: 6,
        typeCode: 'code2',
        typeName: '类型2',
        kindCode: 'kind22',
        kindName: '种类22'
    },

    {
        id: 7,
        typeCode: 'code3',
        typeName: '类型3',
        kindCode: 'kind31',
        kindName: '种类31'
    },
    {
        id: 8,
        typeCode: 'code4',
        typeName: '类型4',
        kindCode: 'kind41',
        kindName: '种类41'
    },
]

const typeGroup = groupBy(dataSource, 'typeCode')
console.log(typeGroup)
const types = unionBy(dataSource, 'typeCode')
console.log('types:', types)


console.log(('type11s:', types || []).map(m => ({
    text: m.typeCode,
    value: m.typeName
})))

console.log('kind11s:', (typeGroup['code1'] || []).map(m => ({
    text: m.kindName,
    value: m.kindCode
})))


const arr=[
    {
        type:1
    }, {
        type:2
    }, {
        type:3
    }, {
        type:4
    }, {
        type:5
    }, {
        type:6
    }, {
        type:7
    },
]
console.log(arr.every(item=> item.type!==7))

