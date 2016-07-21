import {User} from './models/models'
const ACTIONS = {

    registerUser: function(userObj){
        User.register(userObj).then(()=>this.logUserin(userObj.email, userObj.password))

    },

    logUserIn: function(email, password){
    User.login(email, password).then(
        (response)=> {
            alert(`user ${email} logged in`)
            console.log(reponse)
            location.hash = "home"
        },
        (err)=>{
                alert('FAILURE')
            }
        )
    },

    logUserOut: function(){
        User.logout().then(
            ()=>{location.hash = "login"})

    }




}


export default ACTIONS