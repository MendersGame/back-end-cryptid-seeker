import { Router } from 'express'
import * as cryptidsCtrl from '../controllers/cryptids.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, cryptidsCtrl.create)
router.get('/', checkAuth, cryptidsCtrl.index)
router.get('/:cryptidId', checkAuth, cryptidsCtrl.show)
router.put('/:cryptidId', checkAuth, cryptidsCtrl.update)
//todo fix deleteCryptid controller
// router.delete('/:cryptidId', checkAuth, cryptidsCtrl.delete)

export { router }
