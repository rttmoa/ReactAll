import { useContext, createContext } from 'react'
import cart from './Cart'
import counter from './Counter'

// console.log(cart) // Cart {list: 123}
// console.log(counter)

class RootStore {
  cart = cart
  counter = counter
}
const store = new RootStore()
// console.log(store) // RootStore {cart: Cart, counter: Counter}

const Context = createContext(store)
// console.log(Context)


export const useStore = () => {
  return useContext(Context)
}