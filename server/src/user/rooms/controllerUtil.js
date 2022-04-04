'use strict';


// export controllersutil functions
module.exports = 

    class APIFeatures {
        constructor(query, queryStr){
            this.query = query;
            this.queryStr = queryStr
        }

        search(){

            const location = this.queryStr.location ? {
                address:{ $regex: ".*" + this.queryStr.location + ".*" },
 
            }: {}

            console.log('this.query',location)

            this.query = this.query.find({ ...location})

            return this


        }
    }
 
;