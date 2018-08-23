var express = require('express');
var app = express();
var PORT =process.env.PORT || 3000;
var bodyParser =  require('body-parser');
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());
/*
var todos= [{
  id:1,
  description : 'Meet Mom for Lunch',
  completed : false
},
{
  id : 2,
  description : 'Go to market',
  completed : false
},{
   id : 3,
   description : 'Feed the cat',
   completed: true
}];  

  app.get ('/',function(req,res){
    res.send('Todo API Root');
  }
);   */

/*
app.get ('/todos',function(req,res){
  res.json(todos);
}  ); */

app.get('/todos',function(req,res){
    res.json(todos);
} );

//GET /todos /ID

app.get ('/todos/:id', function(req,res){
  var todoid = parseInt(req.params.id,10);
  var matchedtodo ;
  
  todos.forEach(function(todo){
    if (todoid == todo.id)
    {
      matchedtodo= todo;
    }
 

    if (matchedtodo)
    {
      res.json(todo);
    }
     else
       {
         res.status(404).send(); 
      }

  }) ;
  
  // res.send ('Asking for  todo with Id of ' + req.params.id )
});

app.post('/todos', function (req,res){
  var body = req.body;
  console.log('description:' + body.description);
  res.json(body.description);
});

app.listen(PORT,function(){
  console.log('Express Listening on Port ' + PORT + '!');
});





