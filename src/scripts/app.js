import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LoginView from './views/loginView'
import Dashboard from './views/dashboard'
import DishesView from './views/dishesView'
import ComposeView from './views/composeView'
import {User} from './models/models'


//STEP 5 (build your client side api routes)
const app = function() {


var AppRouter = Backbone.Router.extend({
    routes: {
        'home': 'homeHandler',
        'dish/postDishes': 'postDishHandler',
        'dish/myDishes':'myDishesHandler',
        'login':'loginHandler',
        '*catchall':'redirectHandler'
    },

    homeHandler: function(){
        ReactDOM.render(<Dashboard />, document.querySelector('.container'))
    },
    postDishHandler: function(){
         ReactDOM.render(<ComposeView />, document.querySelector('.container'))
    },
    myDishesHandler: function(){
        ReactDOM.render(<Dashboard />, document.querySelector('.container'))
    },
    loginHandler: function(){
        ReactDOM.render(<LoginView />, document.querySelector('.container'))
    },
    redirectHandler:function(){
        location.hash = 'home'
    },
    initialize: function(){
        Backbone.history.start()
        this.on('route', function(handlerName){
            if(!User.getCurrentUser()) {

                    location.hash = 'login'
                }


        })
    }


})

    new AppRouter()



}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE.
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..