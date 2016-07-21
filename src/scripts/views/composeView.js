import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from '../models/models'
import ReactFilepicker from 'react-filepicker'

const ComposeView = React.createClass({
	 render: function() {
	 	return (

	 		<div className="composeView" >

            	<Header />
	 			<h3>post a dish!</h3>
	 			<DishPostingForm />
	 		</div>
	 	)
 	}
})

/*SCHEMA
description: {type: String, required: true},
    rating: {type: Number},

    likes: {type: Number, default: 0},
    location: {type: String, required: true},
    title: {type: String, required: true},
    authorEmail: {type: String, required: true},

    authorId: {type: String, required: true},
    imageUrl: {type: String, required: true},
    tags: {type: [String]}
 */

const DishPostingForm = React.createClass({

    _handleCompose: function(e){
        e.preventDefault()
        ACTIONS.saveDish({
            title: e.currentTarget.title.value,
            description: e.currentTarget.description.value,
            location: e.currentTarget.location.value,
            rating: e.currentTarget.rating.value,
            authorId: User.getCurrentUser()._id,
            authorEmail: User.getCurrentUser().email,
            imageUrl: this.url ? this.url : "empty.plate.jpg"

        })
    },

    _handleImage: function(result){
        console.log(result.url)
        this.url = result.url


    },


    render: function() {
		return (
			<div className="dishPostingForm">
                <form onSubmit={this._handleCompose} >
                    <input type="text" name="title" placeholder="Enter the dish title"/>
                    <textarea type="text" name="description" placeholder="Enter the description"></textarea>
                    <input type="text" name="location" placeholder="Enter the location"/>
                    <input type="text" name="rating" />
                    <ReactFilepicker apikey="As5zYYoX5Rue7kPqcGGvcz" onSuccess={this._handleImage}/>
                    <button type="submit">SUBMIT</button>



                </form>
			</div>
			)
	}
})

export default ComposeView
