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
                return res.status(result.statusCode).json({
                    success : result.status,
                    msg : result.data.sqlMessage || result.data.details[0].message
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