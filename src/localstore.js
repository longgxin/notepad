export default{
  fetch(id){
    return JSON.parse(
      window.localStorage.getItem(id)||'[]')
  },
  save(id,item){
      window.localStorage.setItem(
        id,JSON.stringify(item))
  }
}