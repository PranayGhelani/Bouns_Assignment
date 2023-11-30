var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Games = require('../models/Games');
let GamesController = require('../controllers/Games')
let mongoose = require('mongoose');
// helper function
function requireAuth(req,res,next){
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}
/* Get route for the Games Games list */
// Read Operation
router.get('/', GamesController.DislayGameslist);
/* Get route for Add Games page --> Create */
router.get('/add', requireAuth, GamesController.AddGames); 
/* Post route for Add Games page --> Create */
router.post('/add', requireAuth, GamesController.ProcessGames);
/* Get route for displaying the Edit Games page --> Update */
router.get('/edit/:id', requireAuth, GamesController.EditGames);
/* Post route for processing the Edit Games page --> Update */
router.post('/edit/:id', requireAuth, GamesController.ProcessEditGames);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', requireAuth, GamesController.DeleteGames);
 module.exports = router;