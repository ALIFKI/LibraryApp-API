module.exports = {
    response : function (res,status,data,statusCode){
        const result = {};
        result.status = status === 'success' ? true : false;
        result.data = data || '';
        result.statusCode = statusCode|| 200;

        if(result.data.affectedRows <= 0){
            const  kode = "error id not found"
            return res.status(200).json({
                success : false,
                data : kode
            });
        }

        return res.status(result.statusCode).json({
            success : result.status,
            data : result.data
        });
    }
}