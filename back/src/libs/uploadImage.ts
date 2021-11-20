import multer from 'multer'
import path from 'path'
import {v4 as uuid} from 'uuid'

// Settings
const storage = multer.diskStorage({
    
    destination: path.join(__dirname, '../../public'),
    filename: (req,file,cb) => {
        // cb(null, Date.now() + '.' + file.mimetype.split('/')[1])
        cb(null, Date.now() + uuid() + path.extname(file.originalname))
    }
});
export default multer({storage});