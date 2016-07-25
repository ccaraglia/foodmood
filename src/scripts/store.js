import Backbone from 'backbone'
import _ from 'underscore'
import {DishCollection} from './models/models'

const DISH_STORE = _.extend(Backbone.Events, {


    data:{
        collection:  new DishCollection()
    },

    emitChange: function(){
        this.trigger('updateContent')

    },
//get initial state of the app
    getData: function(){
        return _.clone(this.data)
    },

    setStore: function(storeProp, payload){
        if( typeof this.data[storeProp] === 'undefined'){
            throw Error(`${storeProp} prop not on store`)
        }
        this.data[storeProp] = payload
        this.emitChange

    },

    initialize: function(){
        this.data.collection.on('sync update', this.emitChange.bind(this))
    }

})
DISH_STORE.initialize()

export default DISH_STORE