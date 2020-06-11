const connection = require('../helpers/mysql')
const helper = require('../helpers/res')
const books = require('../models/books')
const multer = require('multer');
const path     = require('path');
const moment = require('moment')
const queryString = require('querystring')
const Joi = require('@hapi/joi');

const getPage = (_page) =>{
    var page = parseInt(_page)
    if (page && page > 0) {
        return page
    } else {
        return 1
    }
}
const getPerPage = (_limit) =>{
    const limit = parseInt(_limit)
    if (limit && limit >0) {
        return limit
    } else {
        return 5
    }

}
const getNextLink = (_page, _totalPage, _current) => {
    page = parseInt(_page)
    if (page < _totalPage) {
      const generatedPage = {
        page : page + 1
      }
      return queryString.stringify({ ..._current, ...generatedPage })
    } else {

    }
}

const getPrevLink = (_page,_totalPage,_current)=>{
    var page = parseInt(_page)
    if (page > 1 ) {
        const generatedPage = {
            page : page - 1
        }
        return queryString.stringify({..._current,...generatedPage})
    } else {
        
    }
}

const goFirstLink = (_page,_totalPage,_current)=>{
    var page = parseInt(_page)
    if (page > 1 ) {
        const generatedPage = {
            page : 1
        }
        return queryString.stringify({..._current,...generatedPage})
    } else {
        
    }
}

const goLastPage = (_page,_totalPage,_current)=>{
    var page = parseInt(_page)
    if (page < _totalPage ) {
        const generatedPage = {
            page : _totalPage
        }
        return queryString.stringify({..._current,...generatedPage})
    } else {
        
    }
}

const booksSchema = Joi.object({
    image : Joi.string()
            .required(),
    title : Joi.string()
            .required(),
    description : Joi.string()
                    .required(),
    id_author : Joi.number()
                .required(),
    id_genre : Joi.number()
                .required(),
    status : Joi.string()
            .required()
})

const booksSchemaUpdate = Joi.object({
    image : Joi.string(),
    title : Joi.string()
    .required(),
    description : Joi.string()
            .required(),
    id_author : Joi.number()
        .required(),
    id_genre : Joi.number()
        .required(),
    status : Joi.string()
    .required(),
    updated_at : Joi.date().required()
})

module.exports = {
    getAllBooks : async function(request,response){
        try {
                const query = request.query;
                const rule = {
                    search : query.search,
                    sort   : query.sort 
                }
                const totalPage = Math.ceil(await books.getCount()/getPage(query.limit))
                const current_page = query.page
                const startAt = (getPage(query.page) * getPerPage(query.limit)) - getPerPage(query.limit);
                const endAt = parseInt(query.limit)
                const nextLink = getNextLink(query.page,totalPage,query)
                const prevLink = getPrevLink(query.page,totalPage,query)
                const first_page = goFirstLink(query.page,totalPage,query)
                const last_page  = goLastPage(query.page,totalPage,query)
        
                const result = await books.indexSearch(startAt,endAt,rule)
                    result.msg = 'List Books';
                    result.pageInfo = {
                        nextLink : nextLink && `/api/books?${nextLink}`,
                        prevLink : prevLink && `/api/books?${prevLink}`,
                        current_page : current_page,
                        firstPage : first_page && `/api/books?${first_page}`,
                        lastPage : last_page && `/api/books?${last_page}`,
                    }
                    return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,200)
        }
    },
    postAddBook : async function(request,response){
        const setData = request.body
        setData.image = request.file.path
        try {
            await booksSchema.validateAsync(setData)
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
            await booksSchemaUpdate.validateAsync(setData)
            const result = await books.edit(setData,id);
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },
}