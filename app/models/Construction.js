var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;
// var bcrypt 		= require('bcrypt');
var async 		= require('async');
var uuid 		= require('node-uuid');
var cache 		= require('../utils/cacheHandler');
var utilities	= require('../utils/utilities');

var constructionSchema = new Schema({	
	name: {
		type: String,
		required: true
	},
    type: {
		type: String,
		enum: ['wall','floor','roof','window']
	},
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    materials: [{ type: mongoose.Schema.ObjectId, ref: 'Material' }],
	shared: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});


module.exports = mongoose.model('Construction', constructionSchema);
