import  express  from "express"
import notesclass from "../controller/control.js"

const router = express.Router();

router.get('/',notesclass.getdoc);
router.post('/',notesclass.createdoc);
router.get('/edit/:id',notesclass.editdoc);
router.post('/update/:id',notesclass.updatedoc);
router.post('/delete/:id',notesclass.deletedoc);
router.post('/isfav/:id',notesclass.isfavdoc);
router.get('/myfav',notesclass.myfavdoc);

export default router;