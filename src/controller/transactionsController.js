const helper = require('../helpers/res')
const Joi = require('@hapi/joi');
const HasPass = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/global')
const secretPas = require('../helpers/bcrypt')
const tokenList = {}
const transactions = require('../models/transactions');
const books = require('../models/books')
const moment = require('moment');

module.exports = {
    postTransaction : async function (request,response) {
        const userCredentials = jwt.verify(request.headers.authorization, config.app.secret_key);
        const setData = request.body
        setData.borrowing_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        setData.id_user = userCredentials.data.id
        setData.id_book = request.params.id
        try {
            const IsExistBook = await books.getDetails(request.params.id)
            if (IsExistBook.msg == 'Data books not found!!') {
                return helper.response(response,'false',IsExistBook,500)
            } else {
                if (IsExistBook.data.status === 'Borrowed') {
                    const newRes = {
                        msg : 'Cannot Borrow the book because The book is ' + IsExistBook.data.status
                    }
                    return helper.response(response,'false',newRes,300)
                } else {
                    const status = {
                        status :  "Borrowed"
                    }
                    const booksBorrow = await transactions.editBook(status,setData.id_book)
                    const result = await transactions.store(setData)
                    return helper.response(response,'success',result,200)
                }
            }
        } catch (error) {
            return helper.response(response,'fail',error,200)
            
        }
    },
    returnBooks : async function (request,response) {
        const setData = request.body
        setData.return_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        setData.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const id = request.params.id
        console.log(setData)
        try {
            const transaction = await transactions.getDetails(id)
            const IsExistBook = await books.getDetails(transaction.id_book)
            if (IsExistBook.msg == 'Data books not found!!') {
                return helper.response(response,'false',IsExistBook,500)
            } else {
                if (IsExistBook.data.status === 'Borrowed') {
                    const status = {
                        status : 'Available'
                    }
                    const result = await transactions.editTransaksi(setData,id)
                    const book = await transactions.editBook(status,transaction.id_book)
                    return helper.response(response,'success',result,200)
                } else {
                    const newRes = {
                        msg : 'Cannot return the book'
                    }
                    return helper.response(response,'false',newRes,500)           
                }
            }
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    }
}