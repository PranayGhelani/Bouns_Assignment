var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Games = require('../models/Games');

module.exports.DislayGameslist = async (req,res,next)=>{ //< Mark function as async
    try{
       const GamesList = await Games.find(); //< Use of await keyword
       res.render('Games/list', {
          title: 'Games List', 
          GamesList: GamesList,
          displayName: req.user ? req.user.displayName:''
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('Games/list', {
          error: 'Error on server'
       });
    }
 };

 module.exports.AddGames = async (req,res,next)=>{
    try{
        res.render('Games/add',
        {
            title:'Add Games',
            displayName: req.user ? req.user.displayName:'',
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Games/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.ProcessGames = async (req,res,next)=>{
    try{
        let newGames = Games({
            "Name":req.body.Name,
            "Platform": req.body.Platform,
            "Year": req.body.Year,
            "Description": req.body.Description,
            "Price": req.body.Price
        });
        Games.create(newGames).then(() =>{
            res.redirect('/Gameslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Games/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.EditGames = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const GamesToEdit = await Games.findById(id);
    res.render('Games/edit',
    {
        title:'Edit Games',
        displayName: req.user ? req.user.displayName:'',
        Games:GamesToEdit
    })
}
catch(error){
    console.error(err);
    res.render('Games/list',
    {
        error: 'Error on the server'
    });
}
}

module.exports.ProcessEditGames = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedGames = Games({
            "_id":id,
            "Name":req.body.Name,
            "Platform": req.body.Platform,
            "Year": req.body.Year,
            "Description": req.body.Description,
            "Price": req.body.Price
        });
        Games.findByIdAndUpdate(id,updatedGames).then(()=>{
            res.redirect('/Gameslist')
        });
    }
    catch(error){
        console.error(err);
        res.render('Games/list',
        {
            error: 'Error on the server'
        });
    }
}

module.exports.DeleteGames = (req,res,next)=>{
    try{
        let id = req.params.id;
        Games.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/Gameslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Games/list',
        {
            error: 'Error on the server'
        });
    }
}