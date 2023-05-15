import { Router } from "express"
import * as memberCtrl from '../controllers/teamMembers.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, memberCtrl.create)
router.get('/', checkAuth, memberCtrl.index)
router.delete('/:teamMemberId', checkAuth, memberCtrl.delete)

export { router }