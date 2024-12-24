import { Router } from 'express';
import { createValue, getValues, deleteStaleValues } from '../controllers/speedometer-controller';

const speedRouter = Router();

speedRouter.post('/create', createValue);
speedRouter.get('/getvalues', getValues);
speedRouter.delete('/delete-stale', deleteStaleValues);

export default speedRouter;