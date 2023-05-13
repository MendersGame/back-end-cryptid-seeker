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


export { router }
