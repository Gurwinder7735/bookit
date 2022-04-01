'use strict';

const fileExtension   =     require('file-extension')
const sharp           =     require('sharp') //for image thumbnail
const Thumbler        =     require('thumbler');//for video thumbnail
const util            =     require('util')
const fs              =     require('fs-extra')
const path            =     require('path');

// export controllersutil functions
module.exports = {
    // convert [10:00 AM] -> [600] (minutes)
    
    fileUpload: async function (FILE, FOLDER, FILE_TYPE) {
    //async function fileUpload(FILE, FOLDER, FILE_TYPE) {
        try {
            var FILENAME = FILE.name; // actual filename of file
            var FILEPATH = FILE.path; // will be put into a temp directory
        
            var THUMBNAIL_IMAGE_SIZE = 300
            var THUMBNAIL_IMAGE_QUALITY = 100
        
            let EXT = fileExtension(FILENAME); //get extension
            EXT = EXT ? EXT : 'jpg';
            var FOLDER_PATH = FOLDER ? (FOLDER + "/") : ""; // if folder name then add following "/" 
            var ORIGINAL_FILE_UPLOAD_PATH = "/public/uploads/" + FOLDER_PATH;
            var THUMBNAIL_FILE_UPLOAD_PATH = "/uploads/" + FOLDER_PATH;
            var NEW_FILE_NAME = (new Date()).getTime()  +  "-" + "file." + EXT;
            var NEW_THUMBNAIL_NAME = (new Date()).getTime() + "-" + "thumbnail"  + "-"  + "file." + ((FILE_TYPE=="video") ? "jpg" : EXT);
        
            let NEWPATH = path.join(__dirname, '../../../', ORIGINAL_FILE_UPLOAD_PATH, NEW_FILE_NAME);
            let THUMBNAIL_PATH = path.join(__dirname, '../../../', ORIGINAL_FILE_UPLOAD_PATH, NEW_THUMBNAIL_NAME);
        
            let FILE_OBJECT = {
                "image": '',
                "thumbnail": '',
                "fileName": FILENAME,
                "folder": FOLDER,
                "file_type": FILE_TYPE
            } 
        
            let BUFFER = await this.readFile(FILEPATH);//read file from temp path
            await this.writeFile(NEWPATH, BUFFER);//write file to destination
        
            FILE_OBJECT.original =  THUMBNAIL_FILE_UPLOAD_PATH + NEW_FILE_NAME;
        
            let THUMB_BUFFER = "";
        
            if(FILE_TYPE == 'image') { // image thumbnail code
                var THUMB_IMAGE_TYPE = (EXT == "png") ? "png" : "jpeg";
                THUMB_BUFFER = await sharp(BUFFER)
                    .resize(THUMBNAIL_IMAGE_SIZE)
                    .toFormat(THUMB_IMAGE_TYPE, {quality: THUMBNAIL_IMAGE_QUALITY})
                    .toBuffer();
                
                FILE_OBJECT.thumbnail = THUMBNAIL_FILE_UPLOAD_PATH + NEW_THUMBNAIL_NAME;
                await this.writeFile(THUMBNAIL_PATH, THUMB_BUFFER);
            }
            else if (FILE_TYPE=="video") { // video thumbnail code
                await this.createVideoThumb(NEWPATH,THUMBNAIL_PATH, NEW_THUMBNAIL_NAME);
                FILE_OBJECT.thumbnail = THUMBNAIL_FILE_UPLOAD_PATH + NEW_THUMBNAIL_NAME;
            }
            return FILE_OBJECT;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },


    readFile: async function (path) {
        console.log("  ************ readFile *******************")
        return new Promise((resolve, reject) => {
            const readFile = util.promisify(fs.readFile);
            readFile(path).then((buffer) => {
                resolve(buffer);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    
    writeFile: async function (path, buffer) {
        console.log("  ************ write file *******************")
        return new Promise((resolve, reject) => {
            const writeFile1 = util.promisify(fs.writeFile);
            writeFile1(path, buffer).then((buffer) => {
                resolve(buffer);
            }).catch((error) => {
                reject(error);
            });
        });
    },
        
    createVideoThumb: async function (fileData, thumbnailPath) {
        var VIDEO_THUMBNAIL_TIME = '00:00:02'
        var VIDEO_THUMBNAIL_SIZE = '300x200'
        var VIDEO_THUMBNAIL_TYPE = 'video'
        return new Promise(async (resolve, reject) => {
            Thumbler({
                type: VIDEO_THUMBNAIL_TYPE,
                input: fileData,
                output: thumbnailPath,
                time: VIDEO_THUMBNAIL_TIME,
                size: VIDEO_THUMBNAIL_SIZE // this optional if null will use the desimention of the video
            }, function(err, path){
                if (err) reject(err);
                resolve(path);
            });
        });      
    }
};