var wilddog = require('wilddog')
var config = {
  authDomain: "wd8583937433xbbdeb.wilddog.com",
  syncURL: "https://wd8583937433xbbdeb.wilddogio.com"
}
wilddog.initializeApp(config)
var ref = wilddog.sync().ref()
export default{
  wilddog,
  ref,
  register(email,password){
    wilddog.auth().createUserWithEmailAndPassword(email,password).then(function(user){
    console.log(user)
    //wilddog.auth().currentUser.sendEmailVerification()
    }).catch(function (error) {
     console.log(error)
    })
  },
}