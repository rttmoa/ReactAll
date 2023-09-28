


export default function filter(state = 'all', action) {
  // console.log(action) // {type: 'CHANGE_FILTER', payload: 'completed'}
  
  if(action.type === "CHANGE_FILTER"){
    return action.payload
  }
  return state
    
}
