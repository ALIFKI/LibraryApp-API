const helper = require('../helpers/res')
const Joi = require('@hapi/joi');
const HasPass = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/global')
const tokenList = {}
const transactions = require('../models/transactions');
const books = require('../models/books')
const moment = require('moment');
const queryString = require('querystring')

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

module.exports = {
    postTransaction : async function (request,response) {
        const userCredentials = jwt.verify(request.headers.authorization, config.app.secret_key);
        const setData = request.body
        setData.borrowing_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        setData.id_users = userCredentials.data.id
        setData.id_books = request.params.id
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
                    const booksBorrow = await transactions.editBook(status,setData.id_books)
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
            const IsExistBook = await books.getDetails(transaction.id_books)
            if (IsExistBook.msg == 'Data books not found!!') {
                return helper.response(response,'false',IsExistBook,500)
            } else {
                if (IsExistBook.data.status === 'Borrowed') {
                    const status = {
                        status : 'Available'
                    }
                    const result = await transactions.editTransaksi(setData,id)
                    const book = await transactions.editBook(status,transaction.id_books)
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
    },
    getAllTransactions : async function (request,response) {
        try {
                const query = request.query;
                const rule = {
                    search : query.search,
                    sort   : query.sort,
                    by : query.by,
                    order : query.order
                }
                const totalPage = Math.ceil(await transactions.getCount()/getPage(query.limit))
                const current_page = query.page
                const startAt = (getPage(query.page) * getPerPage(query.limit)) - getPerPage(query.limit);
                const endAt = parseInt(query.limit)
                const nextLink = getNextLink(query.page,totalPage,query)
                const prevLink = getPrevLink(query.page,totalPage,query)
                const first_page = goFirstLink(query.page,totalPage,query)
                const last_page  = goLastPage(query.page,totalPage,query)
        
                const result = await transactions.index(startAt,endAt,rule)
                    result.msg = 'List Transactions';
                    result.pageInfo = {
                        nextLink : nextLink && `/api/transactions?${nextLink}`,
                        prevLink : prevLink && `/api/transactions?${prevLink}`,
                        current_page : current_page,
                        firstPage : first_page && `/api/transactions?${first_page}`,
                        lastPage : last_page && `/api/transactions?${last_page}`,
                    }
                return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,200)
        }
    },
    deleteTransaction : async function (request,response) {
        const id = request.params.id
        try {
            const result = await transactions.destroy(id)
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,200)
            
        }
    },
    getUserHistory : async function (request,response) {
        try {
            const userCredentials = jwt.verify(request.headers.authorization, config.app.secret_key);
                const id = userCredentials.data.id
                const query = request.query;
                const rule = {
                    search : query.search,
                    sort   : query.sort,
                    by : query.by,
                    order : query.order
                }
                const totalPage = Math.ceil(await transactions.getCount()/getPage(query.limit))
                const current_page = query.page
                const startAt = (getPage(query.page) * getPerPage(query.limit)) - getPerPage(query.limit);
                const endAt = parseInt(query.limit)
                const nextLink = getNextLink(query.page,totalPage,query)
                const prevLink = getPrevLink(query.page,totalPage,query)
                const first_page = goFirstLink(query.page,totalPage,query)
                const last_page  = goLastPage(query.page,totalPage,query)
        
                const result = await transactions.indexUser(startAt,endAt,rule,id)
                    result.msg = 'List Transactions';
                    result.pageInfo = {
                        nextLink : nextLink && `/api/transactions?${nextLink}`,
                        prevLink : prevLink && `/api/transactions?${prevLink}`,
                        current_page : current_page,
                        firstPage : first_page && `/api/transactions?${first_page}`,
                        lastPage : last_page && `/api/transactions?${last_page}`,
                    }
                return helper.response(response,'success',result,200)
        } catch (error) {
            // console.log(error)
            return helper.response(response,'fail',error,500)
        }
    },
}