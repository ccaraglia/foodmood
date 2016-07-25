import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'

const Dashboard = React.createClass({

    getInitialState: function(){
        return DISH_STORE.getData()

    },

    componentWillMount: function(){  //LISTENING TO THE STORE

        ACTIONS.fetchDishes()

        DISH_STORE.on('updateContent', ()=>{

            this.setState(DISH_STORE.getData())
        })

    },

    componentWillUnmount: function(){

        DISH_STORE.off('updateContent')

    },

    handleSearch: function(evt){
        if (evt.keyCode === 13){
        ACTIONS.fetchDishes(evt.target.value)
        evt.target.value = ''
        }
    },

	 render: function() {
        let collData = this.state.collection
        if(location.hash === "#dish/myDishes"){
            collData = this.state.collection.where({authorId: User.getCurrentUser()._id})
        }
	 	return (
	 		<div className='dashboard' >
	 			<Header />
                <input onKeyDown = {this.handleSearch} type='text' placeholder = 'enter a tag' />
	 			<h3>dashboard</h3>
	 			<DishContainer dishColl = {collData} />
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({
	render: function() {
		return (
			<div className="dishContainer">

            {this.props.dishColl.map( (model)=> <Dish dishModel = {model} key = {model.id} /> )}

			</div>
			)
	}
})

const Dish = React.createClass({

    handleLikes: function(){
        ACTIONS.likeDish(this.props.dishModel, User.getCurrentUser())

    },


	render: function() {
		return (
			<div className="dish">
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
                <p>tags:{this.props.dishModel.get('tags')}</p>
                <img src={this.props.dishModel.get('imageUrl')} />
                <button onClick={this.handleLikes}> LIKE </button>
                <p>likes: {this.props.dishModel.get('likes').length}</p>
			</div>
			)
	}
})

export default Dashboard
