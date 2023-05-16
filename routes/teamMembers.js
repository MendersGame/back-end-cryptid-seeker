import { Router } from "express"
import * as memberCtrl from '../controllers/teamMembers.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', memberCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, memberCtrl.create)
router.delete('/:teamMemberId', checkAuth, memberCtrl.delete)
router.put('/:teamMemberId', checkAuth, memberCtrl.update)

export { router }