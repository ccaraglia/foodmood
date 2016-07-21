
import {User, DishModel} from './models/models'
import DISH_STORE from './store'
import toastr from 'toastr'


//STEP 6 (CREATE ACTIONS MODULE)

const ACTIONS = {

    //WE WANT TO LOG THE USER IN IMMEDIATELY AFTER THEY REGISTER (AS LONG AS THEY REGISTER SUCCESFULLY) THE FIRST METHOD REGISTERS AND THE SECOND LOGS THEM IN
    //.then takes two callback functions, both of these methods use that to create either a 'success' function or a 'failure' function
    registerUser: function(userObj) { //input name doesn't actually matter, we just named it the same as the object that is getting passsed in for our own peace of mind
        User.register(userObj).then( () => ACTIONS.logUserIn(userObj.email, userObj.password),
            (error) => {
                alert('FAILURE TO REGISTER')
                console.log(error)
            }
        )

    },

    logUserIn: function(email, password) {
        User.login(email, password).then(
            (responseData) => {
                if (!responseData) {
                    throw new Error()
                }
                toastr.success(`user ${email} logged in!`)
                console.log(responseData)
                location.hash = 'home' //want the page to re-route to the home page after successfull login
            },
            (error) => {
                alert('FAILURE LOGGING IN')
                toastr.error(error)
            }
        ).fail((err) => {
            console.log(err)
            toastr.error(err)
        })
    },

    logUserOut: function(){
        User.logout().then(
            ()=>{location.hash = "login"})

    },


    saveDish: function(dishObj){
        var dish = new DishModel(dishObj)
        dish.save().then(
            (responseData)=>{
                alert("Thanks for submitting!!!")
                location.hash='home'
                console.log(responseData)
            },
            (error)=>{
                alert('FAILURE')
                console.log(error)
            }
        )

    },

    fetchDishes: function(){

        DISH_STORE.data.collection.fetch()
    }

}

export default ACTIONS