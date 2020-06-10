const connection = require('../helpers/mysql')
const helper = require('../helpers/res')
const books = require('../models/books')
const multer = require('multer');
const path     = require('path');
const moment = require('moment')
module.exports = {
    getAllBooks : async function(request,response){
        try {
            if(request.query.search){
                const result = await books.indexSearch(request.query)
                return helper.response(response,'success',result,200)
            }
            else{
                const result = await books.index()
                return helper.response(response,'success',result,200)
            }
        } catch (error) {
            return helper.response(response,'fail',error,200)
        }
    },
    postAddBook : async function(request,response){
        const setData = request.body
        setData.image = request.file.path
        try {
            const result = await books.store(setData);
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },
    deleteBook : async function(request,response){
        const id = request.params.id
        try {
            const result = await books.destroy(id)
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },
    putBooks : async function(request,response){
        const setData = request.body
        setData.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const id = request.params.id
        if(request.file){
            setData.image = request.file.path
        }
        try {
            const result = await books.edit(setData,id);
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },
}