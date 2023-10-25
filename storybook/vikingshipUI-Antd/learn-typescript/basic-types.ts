let isDone: boolean = false

let age: number = 20
let binaryNumber: number = 0b1111

let firstName: string = 'viking'
let message: string = `Hello, ${firstName}, age is ${age}`

let u: undefined = undefined
let n: null = null

let num: number = undefined  // 不能将类型“undefined”分配给类型“number”


let notSure: any = 4
notSure = 'maybe it is a string'
notSure = true

notSure.myName
notSure.getName()


let numberOrString: number | string = 234
numberOrString = 'abc'

let arrOfNumbers: number[] = [1, 2, 3, 4]
arrOfNumbers.push(5)

function test() {
  console.log(arguments)
}

let user: [string, number] = ['viking', 1]


let userName: [string, undefined] = [ '222', undefined,]