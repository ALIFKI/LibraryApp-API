const connection = require('../helpers/mysql');

module.exports ={
    getCount : function () {
        return new Promise((resolve,reject)=>{
            connection.query("SELECT COUNT(*) as total FROM authors",function (error,result){
                if (error) {
                    reject(error)
                }
                resolve(result[0].total)
                
            })
        })
    },
    index : function (startAt,endAt,rule) {
        return new Promise((resolve,reject)=>{ 
            connection.query(`SELECT * FROM authors WHERE ${rule.by} LIKE ? ORDER BY ${rule.by} ${parseInt(rule.sort) ? 'DESC' : 'ASC'} LIMIT ? OFFSET ?`,['%'+rule.search+'%',endAt,startAt],function(error,result){
                if (error) {
                    reject(error)
                }
                const newRes = {
                    msg : "List Author",
                    data : result 
                }
                resolve(newRes)
                
            })
        })
        
    },
    store : function (setData) {
        return new Promise((resolve,reject)=>{
            connection.query("INSERT INTO authors SET ?",setData,function (error,result) {
                if (error) {
                    reject(error)
                }
                const newRes = {
                    msg : "Author has been Inserted!",
                    data : setData
                }
                resolve(newRes)
                
            })
        })
    },
    destroy : function (_id) {
        return new Promise((resolve,reject)=>{
            connection.query("DELETE FROM authors WHERE id_author = ?",_id,function(error,result){
                if (error) {
                    reject(error)
                }
                else{
                    if (result.affectedRows <= 0) {
                        reject(result)
                    } else {
                        const newRes ={
                            msg : "Author has Been Deleted!"
                        }
                        resolve(newRes)   
                    }
                }
            })
        })
    },
    edite : function (setData,id) {
        const _id = parseInt(id)
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE authors SET ? WHERE id_author = ?",[setData,_id],function(error,result){
                if (error) {
                    reject(error)
                }
                else{
                    if (result.affectedRows <= 0) {
                        reject(result)
                    } else {
                        const newRes ={
                            msg : "Author has Been Updated!",
                            data : setData
                        }
                        resolve(newRes)   
                    }
                }
            })
        })
        
    }
}