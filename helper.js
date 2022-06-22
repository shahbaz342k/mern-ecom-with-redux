const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    //   cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      console.log(file);
    //   let filetype = '';
    //   if(file.mimetype === 'image/gif') {
    //     filetype = 'gif';
    //   }
    //   if(file.mimetype === 'image/png') {
    //     filetype = 'png';
    //   }
    //   if(file.mimetype === 'image/jpeg') {
    //     filetype = 'jpg';
    //   }
    //   cb(null, 'image-' + Date.now() + '.' + filetype);
        cb(null, new Date().toISOString().replace(/:/g,'-') + '-' + file.originalname)
    }
});
const filFilter = (req, file, cb) => {
    if( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
        cb(null, true)
    }else{
        cb(null, false);
    }
}
const upload = multer({storage: storage, fileFilter: filFilter});
module.exports = {upload}