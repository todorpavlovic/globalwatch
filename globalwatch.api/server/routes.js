import express from 'express';
import basicController from './controllers/basicController';
import sportController from './controllers/sportController';
import matchController from './controllers/matchController';
import teamController from './controllers/teamController';

const routes = express();

//SPORT ROUTES
routes.get('/sports', sportController.getSportsOnly)
// routes.get('/sports', sportController.getAll)
routes.get('/sports/:id', sportController.getOne)
routes.post('/sport', sportController.post)
routes.delete('/sport/:id', sportController.delete)
routes.put('/sport/:id', sportController.update)

//MATCH ROUTES
routes.post('/match', matchController.post)
routes.get('/matches/:id', matchController.getOne)
routes.get('/matches', matchController.getAll)
routes.put('/matches/:id', matchController.update)
routes.delete('/matches/:id/:sportId', matchController.delete)

//TEAMS ROUTES
routes.post('/team', teamController.post)
routes.get('/teams', teamController.getAll)
routes.delete('/teams/:id', teamController.delete)
export default routes;