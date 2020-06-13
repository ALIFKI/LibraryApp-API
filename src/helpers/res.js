module.exports = {
    response : function (res,status,data,statusCode){
        const result = {};
        result.status = status === 'success' ? true : false;
        result.data = data || '';
        result.statusCode = statusCode|| 200;

        if(result.data.affectedRows <= 0){
            const  msg = "Error id is not found"
            return res.status(200).json({
                success : false,
                msg : msg
            });
        }
        else{
            if(result.status == false) {
                let message = '';
                if(result.data.details ){
                    const message = result.data.details[0].message
                    return res.status(result.statusCode).json({
                        success : result.status,
                        msg : message
                    }); 
                }
                return res.status(result.statusCode).json({
                    success : result.status,
                    msg : result.data.sqlMessage || result.data.msg|| message
                });
            }
            else{
                return res.status(result.statusCode).json({
                    success : result.status,
                    msg : result.data.msg,
                    data : result.data.data,
                    pageInfo : result.data.pageInfo
                });
            }
        }
    }
}