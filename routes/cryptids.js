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
router.delete('/:cryptidId', checkAuth, cryptidsCtrl.delete)
router.post('/:cryptidId/reviews' , checkAuth , cryptidsCtrl.createReview)
router.put('/:cryptidId/reviews/:reviewId' , checkAuth , cryptidsCtrl.updateReview)

export { router }
