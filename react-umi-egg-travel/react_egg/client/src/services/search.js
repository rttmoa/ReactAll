






export function getLists(value){

  return fetch('/api/getListsAsync?value='+value)
    .then(res=>res.json())
    // .then(res2 => console.log(res2))
    .catch(err=>{
      console.log(err)
    })
}
