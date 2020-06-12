const fs = require('fs');


module.exports = {
    delete : function (filepath) {
        fs.unlink(filepath, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("Successfully deleted the file.")
            }
          })
    }
}