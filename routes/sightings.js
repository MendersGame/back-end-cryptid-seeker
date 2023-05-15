import { Router } from 'express'
import * as sightingsCtrl from '../controllers/sightings.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, sightingsCtrl.create)
router.get('/', checkAuth, sightingsCtrl.index)
router.get('/:sightingId', checkAuth, sightingsCtrl.show)
router.put('/:sightingId', checkAuth, sightingsCtrl.update)
router.delete('/:sightingId', checkAuth, sightingsCtrl.delete)
router.post('/:sightingId/comments' , checkAuth , sightingsCtrl.createComment)
router.put('/:sightingId/comments/:commentId', checkAuth, sightingsCtrl.updateComment)
router.delete('/:sightingId/comments/:commentId', checkAuth, sightingsCtrl.deleteComment)

export { router }
