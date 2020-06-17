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
        
    }
}