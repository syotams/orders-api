'use strict';

import express from 'express';
import usersResource from '../app/interfaces/api/usersResource';
import userOrdersController from '../app/interfaces/api/userOrdersController';
import adminAuthorization from '../app/middlewares/adminAuthorizationMiddleware';

var router = express.Router();

/* GET users listing. */
router.get('/', adminAuthorization.authorize, usersResource.all);
router.post('/', adminAuthorization.authorize, usersResource.create);
router.get('/:id/orders', adminAuthorization.authorize, userOrdersController.orders);
router.put('/:id', adminAuthorization.authorize, usersResource.update);
router.delete('/:id', adminAuthorization.authorize, usersResource.archive);
router.get('/:id', adminAuthorization.authorize, usersResource.get);

module.exports = router;
