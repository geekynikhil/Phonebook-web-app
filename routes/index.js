const express = require('express');
const contactmodel=require("../models/contact");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.page)
    var page=req.query.page;
  else
    var page=1;
  contactmodel.find().sort({Name:1}).exec(function(err,data){
  if(data.length>=page*4){
    var new_data=data.slice(4*(page-1),4*page)
  }
  else{
    var new_data=data.slice(4*(page-1),data.length);
  }
  res.render('index', {
    contact:new_data,
    len:data.length,
    page:page,
  });
});
});
router.post('/add/contact',function(req,res,next){
  const{Name,DOB,numbers,emails}=req.body;
  contactmodel.findOne({numbers:{$in:numbers}},function(err,data){
    if(data){
      contactmodel.find().sort({Name:1}).exec(function(err,data){
        if(data.length>=4)
          new_data=data.slice(0,4);
        else
          new_data=data.slice(0,data.length);
        res.render('index', {
          contact:new_data,
          len:data.length,
          page:1,
          msg:"Number is already in your phonebook !!!...",
        });
      });
    }
    else{
      const addContact=new contactmodel({
        Name:Name,
        DOB:DOB,
        numbers:numbers,
        emails:emails,
      })
      addContact.save(function(err,succ){
        if(err)
          throw err;
        contactmodel.find().sort({Name:1}).exec(function(err,data){
        if(data.length>=4)
          new_data=data.slice(0,4);
        else
          new_data=data.slice(0,data.length);
          res.render('index', {
            contact:new_data,
            len:data.length,
            page:1,
            msg:" no Successfully added...",
          });
        });
      });
    }
  });
});
router.get("/remove/contact/:id",function(req,res,next){
  const id=req.params.id;
  contactmodel.deleteOne({_id:id},function(err,succ){
    if(succ){
      contactmodel.find().sort({Name:1}).exec(function(err,data){
        if(data.length>=4)
          new_data=data.slice(0,4);
        else
          new_data=data.slice(0,data.length);
        res.render('index', {
          contact:new_data,
          len:data.length,
          page:1,
          msg:"Successfully deleted...",
        });
      });
    }
  })
});
router.get("/edit/contact/:id",function(req,res,next){
  const id=req.params.id;
  contactmodel.findOne({_id:id},function(err,data){
    res.render("update",{
      data:data,
    })
  })
});
router.post("/update/contact",function(req,res,next){
  const {id,Name,DOB,numbers,emails}=req.body;
  contactmodel.updateOne({_id:id},{
    Name:Name,
    DOB:DOB,
    numbers:numbers,
    emails:emails,
  },function(err,succ){
    if(succ){
      res.redirect("/");
    }
  })
})

router.post("/search",function(req,res,next){
  const value=req.body.search;
  if(req.query.page)
    var page=req.query.page;
  else
    var page=1
  var exp=new RegExp("^"+value,"i");
  console.log(exp);
  contactmodel.find({Name:{$regex:exp}}).sort({Name:1}).exec(function(err,data){
    if(data.length>=page*4){
      var new_data=data.slice(4*(page-1),4*page)
    }
    else{
      var new_data=data.slice(4*(page-1),data.length);
    }
    res.render('index', {
      contact:new_data,
      len:data.length,
      page:page,
    });
  });
})
module.exports = router;
