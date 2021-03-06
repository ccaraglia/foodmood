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

    getInitialState: function(){
        return {
            currentDishRating: 0

        }

    },

    _handleCompose: function(e){
        e.preventDefault()
        ACTIONS.saveDish({
            title: e.currentTarget.title.value,
            description: e.currentTarget.description.value,
            location: e.currentTarget.location.value,
            rating: this.state.currentDishRating,
            authorId: User.getCurrentUser()._id,
            authorEmail: User.getCurrentUser().email,
            tags: e.currentTarget.tags.value.split(','),
            imageUrl: this.url ? this.url : "empty.plate.jpg"

        })
    },

    _handleImage: function(result){
        console.log(result.url)
        this.url = result.url
    },


    _handleStar: function(evt){
        this.setState({
            currentDishRating:parseInt(evt.target.dataset.rating)
        })

    },

    _generateStarsJsx: function(ratingVal){
        var JsxStars = []
        for (var i=1; i<=5; i++){
            let starStyle = {fontSize : 30}
            if(i <= ratingVal){
                starStyle.color = 'yellow'


            }
            let JsxStar = <span style={starStyle} data-rating={i} onClick={this._handleStar}>&#9734;</span>
            JsxStars.push(JsxStar)
        }
        return JsxStars

    },


    render: function() {
		return (
			<div className="dishPostingForm">
                <form onSubmit={this._handleCompose} >
                    <input type="text" name="title" placeholder="Enter the dish title"/>
                    <textarea type="text" name="description" placeholder="Enter the description"></textarea>
                    <input type="text" name="location" placeholder="Enter the location"/>
                    {this._generateStarsJsx(this.state.currentDishRating)}
                    <input type="text" name="tags" placeholder="Enter the tags"/>
                    <ReactFilepicker apikey="As5zYYoX5Rue7kPqcGGvcz" onSuccess={this._handleImage}/>
                    <button type="submit">SUBMIT</button>



                </form>
			</div>
			)
	}
})

export default ComposeView
