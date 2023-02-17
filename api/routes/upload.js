const express = require( 'express' );
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require('path');

const router = express.Router();

const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.APP_AWS_SECRET_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});

function checkFileType( file, cb ){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    const mimetype = filetypes.test( file.mimetype );
    if( mimetype && extname ){
        return cb( null, true );
    } else {
        cb( 'Error: Images Only!' );
    }
}   

const uploadImages = multer({
    storage: multerS3({
     s3: s3,
     bucket: process.env.APP_AWS_BUCKET_NAME,
     acl: 'public-read',
     key: function (req, file, cb) {
      cb( null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
}).array( 'userImages', 2 );

router.post('/upload', ( req, res ) => {
    uploadImages( req, res, ( error ) => {
        if( error ){
            console.log( 'errors', error );
            res.status(500).json( { msg: error.message } );
        } else {
            if( req.files === undefined ){
                res.status(202).json({msg: 'No File Selected'} );
            } else {
                let fileArray = req.files,
                    fileLocation;
                const galleryImgLocationArray = [];
                for ( let i = 0; i < fileArray.length; i++ ) {
                    fileLocation = fileArray[ i ].location;
                    galleryImgLocationArray.push( fileLocation )
                }
                res.status(200).json({
                    filesArray: fileArray,
                    locationArray: galleryImgLocationArray
                });
            }
        }
    });
});

module.exports = router;