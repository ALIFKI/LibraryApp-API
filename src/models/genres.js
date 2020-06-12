const connection = require('../helpers/mysql')
const helper = require('../helpers/res')
const multer = require('multer');
const path     = require('path');
const moment = require('moment')

module.exports = {
    index : function (startAt,endAt,rule) {
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM genres WHERE ${rule.by} LIKE ? ORDER BY ${rule.by} ${parseInt(rule.sort) ? 'DESC' : 'ASC'} LIMIT ? OFFSET ?`,['%'+rule.search+'%',endAt,startAt],function (error,result) {
                if (error) {
                    reject(error)
                }
                const newResult = {
                    data : result
                }             
                resolve(newResult)
            })
        })
    },
    store : function (setData) {
        return new Promise((resolve,reject)=>{
            connection.query("INSERT INTO genres SET ?",setData,function(error,result) {
                if (error) {
                    reject(error)
                }
                const response = {
                    msg : 'Genre Has been inserted!',
                    data : setData
                }

                resolve(response)
            })
        })
    },
    getCount : function () {
        return new Promise((resolve,reject)=>{
            connection.query("SELECT COUNT(*) as total FROM genres",function (error,result) {
                if(error){
                    reject(error)
                }
                resolve(result[0].total)
                
            })
        })
    },
    destroy : function (_id) {
        return new Promise((resolve,reject)=>{
            connection.query("DELETE FROM genres WHERE id_genre=?",_id,function (error,result) {
                if(error){
                    reject(error)
                }
                else{
                    if (result.affectedRows <= 0) {
                        reject(result)
                    } else {
                        const newRes ={
                            msg : "Genres has Been Deleted!"
                        }
                        resolve(newRes)   
                    }
                }
            })
        })
    },
    edit : function (setData,id) {
        return new Promise((resolve,reject)=>{
            connection.query('UPDATE genres SET ? WHERE id_genre= ?',[setData,id],function(error,result) {
                if (error) {
                    reject(error)
                }
                else{
                    if (result.affectedRows <= 0) {
                        reject(result)
                    } else {
                        const newRes ={
                            msg : "Update Success!!",
                            data : setData
                        }
                        resolve(newRes)   
                    }
                }
            })
        })
    }
}