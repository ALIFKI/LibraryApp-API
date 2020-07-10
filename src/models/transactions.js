const connection = require('../helpers/mysql')
const helper = require('../helpers/res')
const multer = require('multer');
const path     = require('path');
const moment = require('moment');
const res = require('../helpers/res');

module.exports = {
    store : function (setData) {
        return new Promise((resolve,reject)=>{
            connection.query("INSERT INTO transactions SET ?",setData,function (error,result) {
                if (error) {
                    reject(error)
                }
                const newRes = {
                    msg : "Transaction Data has been created Succesfully",
                    data : setData
                }
                resolve(newRes)
            })
        })
    },
    editBook : function(setData,id){
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE books SET ? WHERE id= ?",[setData,id],function (error,result) {
                if (error) {
                    reject(error)
                }
                else{
                    if(result.affectedRows <=0){
                        reject(result)
                    }
                    const newRes = {
                        msg : 'Book Has been Change',
                        data : setData
                         }
                    resolve(newRes)
                }
            })
        })
    },
    editTransaksi : function(setData,id){
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE transactions SET ? WHERE id= ?",[setData,id],function (error,result) {
                if (error) {
                    reject(error)
                }
                else{
                    if(result.affectedRows <=0){
                        resolve(result)
                    }
                    const newRes = {
                        msg : 'Succesfully Change data',
                        data : setData
                         }
                    resolve(newRes)
                }
            })
        })
    },
    getDetails : function (id) {
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM transactions WHERE id = ?",id,function (error,result) {
                if (error) {
                    reject(error)
                }
                resolve(result[0])
            })
        })
        
    },
    index : function(startAt,endAt,rule) {
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT transactions.id,users.name,books.title,transactions.periode_of_time,transactions.borrowing_date,transactions.return_date,transactions.created_at,transactions.updated_at FROM transactions INNER JOIN books ON books.id = transactions.id_books INNER JOIN users ON users.id = transactions.id_users WHERE ${rule.by} LIKE ? ORDER BY ${rule.order} ${parseInt(rule.sort) ? 'DESC' : 'ASC'} LIMIT ? OFFSET ?`,['%'+rule.search+'%',endAt,startAt],function (error,result) {
                if (error) {
                    reject(error)
                }
                const resData = {
                    msg : "List transactions",
                    data : result
                }
                resolve(resData)
            })
        })
    },
    getCount : function () {
        return new Promise((resolve,reject)=>{
            connection.query("SELECT COUNT(*) as total FROM transactions",function(error,result) {
                if (error) {
                    reject(error)
                }
                resolve(result[0].total)       
            })
        })
    },
    destroy : function (id) {
        return new Promise((resolve,reject)=>{
            connection.query("DELETE FROM transactions WHERE id=?",id,function(error,result) {
                if (error) {
                    reject(error)
                }
                if (result.affectedRows <= 0) {
                    resolve(result)
                }
                const newRes = {
                    msg : "Delete Success!"
                }
                resolve(newRes)
            })
        })
    },
    indexUser : function(startAt,endAt,rule,id) {
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT transactions.id,transactions.id_users,users.name,books.title,transactions.periode_of_time,transactions.borrowing_date,transactions.return_date,transactions.created_at,transactions.updated_at FROM transactions INNER JOIN books ON books.id = transactions.id_books INNER JOIN users ON users.id = transactions.id_users WHERE id_users = ? ORDER BY ${rule.order} ${parseInt(rule.sort) ? 'DESC' : 'ASC'} LIMIT ? OFFSET ?`,[id,endAt,startAt],function (error,result) {
                if (error) {
                    reject(error)
                }
                const resData = {
                    msg : "List transactions",
                    data : result
                }
                console.log(result)
                resolve(resData)
            })
        })
    },
}