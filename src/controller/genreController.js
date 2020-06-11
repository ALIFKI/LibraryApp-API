const connection = require('../helpers/mysql')
const helper = require('../helpers/res')
const multer = require('multer');
const path   = require('path');
const genre  = require('../models/genres')
const queryString = require('querystring');
const moment = require('moment');
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

const genreSchema = Joi.object({
    genre : Joi.string()
    .alphanum()
    .required()
})


module.exports = {
    getAllGenre : async function(request,response){
        const query = request.query
        const rule = {
            search : query.search,
            sort   : query.sort
        }
        const totalPage = Math.ceil(await genre.getCount()/getPage(query.limit))
        const current_page = query.page
        const startAt = (getPage(query.page) * getPerPage(query.limit)) - getPerPage(query.limit);
        const endAt = parseInt(query.limit)
        const nextLink = getNextLink(query.page,totalPage,query)
        const prevLink = getPrevLink(query.page,totalPage,query)
        const first_page = goFirstLink(query.page,totalPage,query)
        const last_page  = goLastPage(query.page,totalPage,query)

        try {
            const result = await genre.index(startAt,endAt,rule)
            result.msg = 'List Genre';
            result.pageInfo = {
                nextLink : nextLink && `/api/genres?${nextLink}`,
                prevLink : prevLink && `/api/genres?${prevLink}`,
                current_page : current_page,
                firstPage : first_page && `/api/genres?${first_page}`,
                lastPage : last_page && `/api/genres?${last_page}`,
            }
            return helper.response(response,'success',result,200)
        } catch (error) { 
            return helper.response(response,'fail',error,500)
        }
    },
    postGenre : async function(request,response) {
        const setData = request.body
        try {
            const valid = await genreSchema.validateAsync(setData)
            const result = await genre.store(setData)
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },
    deleteGenre : async function(request,response) {
        const id = request.params.id
        try {
            const result = await genre.destroy(id)
            return helper.response(response,'success',result,200)            
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },
    putUpdateGenre : async function(request,response){
        const setData = request.body;
        setData.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const id = request.params.id
        try {
            const value = await genreSchema.validateAsync(setData)
            const result = await genre.edit(setData,id);
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    }
}