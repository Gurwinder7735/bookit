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

        filter(){

            const queryCopy = { ...this.queryStr }

            // remove fields from query
            const removeFields = ['location']

            removeFields.forEach(e => delete queryCopy[e]);

            this.query = this.query.find(queryCopy);
            return this

        }

        pagination(resPerPage){

            const currentPage = Number(this.queryStr.page) || 1
            const skip = resPerPage * (currentPage - 1)

            console.log('currentPage', currentPage)
            this.query.limit(resPerPage).skip(skip);

            return this
        }cl

    }
 
;