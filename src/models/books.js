const connection = require('../helpers/mysql');

module.exports = {
    index : function(){
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM books",function(error,result) {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    store : function (setData) {
        return new Promise((resolve,reject)=>{
            connection.query("INSERT INTO books SET?",setData,function (error,result) {
                if (error) {
                    reject(error)
                }
                else{
                    if(result.affectedRows <=0){
                        resolve(result)
                    }
                    const newRes = {
                        msg : 'Data Has been Inserted!',
                        ...setData
                    }
                    resolve(newRes)
                }
            })
        })
    },
    destroy : function (id) {
        return new Promise((resolve,reject)=>{
            connection.query("DELETE FROM books WHERE id=?",id,function(error,result) {
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
    edit : function(setData,id){
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE books SET ? WHERE id= ?",[setData,id],function (error,result) {
                if (error) {
                    reject(error)
                }
                else{
                    if(result.affectedRows <=0){
                        resolve(result)
                    }
                    const newRes = {
                        msg : 'Data Has been Change!',
                        ...setData
                    }
                    resolve(newRes)
                }
            })
        })
    },
    indexSearch : function(rule) {
        return new Promise((resolve,reject)=>{
            console.log(rule.search)
            connection.query("SELECT * FROM books WHERE title LIKE ? ORDER BY created_at DESC",rule.search+'%',function (error,result) {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
        
    }
}