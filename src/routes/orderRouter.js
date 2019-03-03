'use strict';

import express from 'express';
import ordersResource from '../app/interfaces/api/ordersResource';

var router = express.Router();

router.get('/', ordersResource.all);
router.post('/', ordersResource.create);
router.put('/:id', ordersResource.update);
router.delete('/:id', ordersResource.archive);
router.get('/:id', ordersResource.get);

module.exports = router;