'use strict';

var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Constants = require('../../../config/appConstants');

const Models = require('../../../models')
const sendResponse = require('../../sendResponse')
const RESPONSE_MESSAGES = require('../../../config/response-messages');
const { bcryptHash } = require('../../../utils/universal-functions');



module.exports = {

	login: async (req, res) => {

		try {
			console.log('==================hrere')

		
// Models.Contents.create({
// 	accessor: 'terms',
// 	value: "fsfsfs"
// }).then(res=> {
// 	console.log('http://localhost:5200user.png');
// })
// Models.Contents.create({
// 	accessor: 'privacy',
// 	value: "fsfsfs"
// }).then(res=> {
// 	console.log('http://localhost:5200user.png');
// })
// Models.Contents.create({
// 	accessor: 'about_us',
// 	value: "fsfsfs"
// }).then(res=> {
// 	console.log('http://localhost:5200user.png');
// })
			

//   Models.Orders.create({
// 	'orderedProduct': {
// 		product: '61ea8dfdac4195e3441add6b',
// 		name: 'String',
// 		price: 20,
// 	},
// 	// transaction_id: {},
// 	'location': {
// 		latitude: 'String',
// 		longitude: 'String',
// 		location: 'Mohali'
// 	},      
// 	'user': "61ea89a7ce99e6c8347f3741",
// 	'datetime': {
// 		from:  '2022-01-18T09:23:50.921Z',
// 		to: '2022-01-18T09:23:50.921Z'
// 	},
// }).then(result => {
//  console.log('RESULT', result);
// }).catch(err => {
//  console.log(err.message);
// })


//   Models.Products.create({
//     "title" : "Test",
//     "images" : [ 
//         {
//             "original" : "/uploads/placeholder.jpg",
//             "thumbnail" : "",
//             "_id" : ObjectId("61e68726efe3f694ef08dae8")
//         },
// 		{
//             "original" : "/uploads/placeholder.jpg",
//             "thumbnail" : "",
//             "_id" : ObjectId("61e68726efe3f694ef08dae8")
//         },
// 		{
//             "original" : "/uploads/placeholder.jpg",
//             "thumbnail" : "",
//             "_id" : ObjectId("61e68726efe3f694ef08dae8")
//         }
//     ],
//     "category" : ObjectId("61ea8a73068fcca453412a30"),
//     "subCategory" : "61ea8b1f068fcca453412a6c",
//     "rent" : {
//         "rentType" : 1,
//         "price" : 20
//     },
//     "description" : "Description",
//     "isDeleted" : false,
//     "status" : true,
//     "rating" : [ 
//         {
//             "ratedBy" : "61ea89a7ce99e6c8347f3741",
//             "rating" : 5,
//             "review" : "nyc",
//         },
// 		{
//             "ratedBy" : "61ea89bb068fcca4534129d7",
//             "rating" : 5,
//             "review" : "nyc",
//         },
// 		// {
//         //     "ratedBy" : "61ea89a7ce99e6c8347f3741",
//         //     "rating" : 5,
//         //     "review" : "nyc",
//         // }
//     ],
//     "location" : {
//         "latitude" : "Mohali",
//         "longitude" : "34.3",
//         "name" : "34.5"
//     },
//     "user" : ObjectId("61ea89948714ab5981766957"),
// }).then(result => {
//  console.log('RESULT', result);
// }).catch(err => {
//  console.log(err.message);
// })



//     Models.Users.create({
// 		'role': 1,     //0=>Admin   1=> User
// 		'name' : 'Ankush',
// 		'username' : 'user',
// 		'email' : 'ankush@gmail.com',
// 		'phone' : '8437576239',
// 		'password' : await bcryptHash('123'),
// 		'address' : 'String',
// 		'status' : 1,
	
// 		'wallet': 0,
// 		'cards': [],
// 		'location': {
// 			latitude: 'String',
// 			longitude: 'String',
// 			name: 'String'
// 		}
//    }).then(result => {
//      console.log('RESULT', result);
//    }).catch(err => {
//      console.log(err.message);
//    });

			var payload = req.body;

			console.log("payload =========== ", payload)

			let data = await Models.Users.findOne({ "email": payload.email })
		
console.log('data',data);
// return
			if (data) {
				data = data.toJSON()
				const match = await bcrypt.compare(payload.password, data.password)

				let userData = {
					_id: data._id,
					email: data.email
				};

				if (match) {

					let token = jwt.sign(userData, Constants.SERVER.JWT_SECRET_KEY_ADMIN, {
						expiresIn: Constants.SERVER.TOKEN_EXPIRATION
					});

					console.log('TOKEN,token', token)

					data.token = token
					data.password = undefined
					return sendResponse.sendSuccessData(data, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.LOGIN_SUCCESS, res);
				}
				else {
					return sendResponse.sendSuccessData({}, 403, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.LOGIN_ERROR, res);
				}
			}
			else {
				return sendResponse.sendSuccessData({}, 403, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.LOGIN_ERROR, res);
			}

		} catch (err) {
			console.log(err)
			return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
		}
	},

	edit_profile: (req, res) => {
		try {

			let payload = req.body
			payload.image = typeof payload.image === "string" ? JSON.parse(payload.image) : payload.image;

			Models.Users.findOneAndUpdate({ "_id": req.admin._id },
				payload, { new: true }, function (err, result) {
					if (err) {
						console.log("err --- ", err)
						return sendResponse.sendErrorMessage(403, req.headers.language, err, res);
					} else {
						return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
					}
				});


		} catch (err) {
			console.log("err ------------ ", err)
			//return res.status(500).json({status: 0, message: err.message});
			return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
		}
	},

	change_password: async (req, res) => {
		try {
			//console.log("1452638444 ............ criteria----------------");
			let data = await Models.Users.findOne({ "_id": req.admin._id })

			const match = await bcrypt.compare(req.body.password, data.password)
			if (match) {
				const salt = bcrypt.genSaltSync(10);
				let hash = bcrypt.hashSync(req.body.new_password, salt);
				console.log(hash, "==============data")
				if (req.body.confirm_password == req.body.new_password) {
					await Models.Users.updateOne({ "_id": req.admin._id }, {
						"password": hash
					})
					return sendResponse.sendSuccessData({}, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.CHANGE_PASSWORD_SUCCESS, res);
				}
				else {
					return sendResponse.sendSuccessData({}, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.INCORRECT_CONFIRM_PASSWORD, res);
				}
			}
			else {
				return sendResponse.sendSuccessData({}, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.INCORRECT_OLD_PASSWORD, res);
			}
		} catch (err) {
			//return res.status(500).json({status: 0, message: err.message});
			return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
		}
	},

	admin_counters: async (req, res) => {
		try {
			const totalUsers = await Models.Users.countDocuments({ role: { $ne: "1" } })
			const totalCategories = await Models.Category.countDocuments({status: 1})
			const totalBrands = await Models.Brands.countDocuments({status: 1})
			const ongoingOrders = await Models.Orders.countDocuments({ status: 2 })

			// const totalPosts = await Models.Posts.countDocuments()
			// const productsCount = await Models.Product.countDocuments()
			// const adminData = await Models.Users.findOne({role:1})
			// const pagesCount = await Models.Pages.countDocuments()
			var count = [
				{ totalUsers},
				{ ongoingOrders},
				{ totalCategories},
				{ totalBrands},
			]
			return sendResponse.sendSuccessData({count}, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
      

		} catch (err) {
			console.log("err ------------ ", err)
			//return res.status(500).json({status: 0, message: err.message});
			return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
		}
	},
	
};
