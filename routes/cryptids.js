import { Router } from 'express'
import * as cryptidsCtrl from '../controllers/cryptids.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', cryptidsCtrl.index)
router.get('/:cryptidId', cryptidsCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, cryptidsCtrl.create)
router.put('/:cryptidId', checkAuth, cryptidsCtrl.update)
router.delete('/:cryptidId', checkAuth, cryptidsCtrl.delete)
router.post('/:cryptidId/reviews' , checkAuth , cryptidsCtrl.createReview)
router.put('/:cryptidId/reviews/:reviewId' , checkAuth , cryptidsCtrl.updateReview)
router.delete('/:cryptidId/reviews/:reviewId' , checkAuth , cryptidsCtrl.deleteReview)

export { router }
