var express = require('express');
var app = express();
var PORT =process.env.PORT || 3000;
var bodyParser =  require('body-parser');
var todos = [];
var todoNextId = 1;
var _= require('underscore');

app.use(bodyParser.json());

/*var todos= [{
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
}]; */  

  app.get ('/',function(req,res){
    res.send('Todo API Root');
  }
);   

/*
app.get ('/todos',function(req,res){
  res.json(todos);
}  ); */

app.get('/todos',function(req,res){
    res.json(todos);
} );

//GET /todos /ID

app.get ('/todos/:id', function(req,res
){
  var todoid = parseInt(req.params.id,10);
  console.log('todos array=' +  todos);
  console.log('todoid=' + todoid);
  var matchedtodo = _.findWhere(todos,{id:todoid});
  console.log('matchedtodo=' + matchedtodo);
  
  // todos.forEach(function(todo){
  //   if (todoid == todo.id)
  //   {
  //     matchedtodo= todo;
  //   }
 

    if (matchedtodo)
    {
      console.log('in matched todo'); 
      res.json(matchedtodo);
    }
     else
       {
         console.log('in else');
         res.status(404).send(); 
      }

  }) ;
  
  // res.send ('Asking for  todo with Id of ' + req.params.id )


app.post('/todos', function (req,res){
  console.log("in Post");
  var body = req.body;
  //console.log('todos array=',  todos);
  //console.log('description:' + body.description);
  var body = _.pick (req.body,'description','completed');



if (!_.isBoolean(body.completed ) || !_.isString(body.description) || (body.description.trim().length == 0) ) 
  {
    console.log('in status 400');
    return res.status(400).send();
  }
  body.description= body.description.trim();

  body.id = todoNextId++;

  todos.push(body);
   console.log('todos array=', todos);
  // console.log('todos array=' +  todos[0].id +  ' ' + todos[0].description);
    res.json(body);
});

app.delete('/todos/:id',function(req,res
){
  var todoid = parseInt(req.params.id,10);
  var matchedtodo = _.findWhere(todos,{id:todoid});
  console.log('matchedtodo=' + matchedtodo);
  if (!matchedtodo)
  {
    res.status(404).json({"Error":"No todo item found by the Id"});
  }
  else
  {
     todos = _.without(todos,matchedtodo);
     res.json(matchedtodo);
  }
 });

 //PUT  /todos/:id

 app.put('/todos/:id', function (req, res)
 {
   var todoId = parseInt(req.params.id,10);
   var matchedtodo = _.findWhere(todos, {id:todoId});
   var body = _.pick (req.body,'description','completed');
   var validAttributes = {};
      
   if (!matchedtodo){
      return  res.status(404).send;
   }
   //validation for completed property

    if (body.hasOwnProperty('completed') &&  _.isBoolean(body.completed))
        {
            validAttributes.completed= body.completed;
        }
                else if (body.hasOwnProperty('completed') )
        {
           res.status(400).send();
        }

      //validation for description property
      
      if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0)
        {
          validAttributes.description = body.description;
        }
        else if (body.hasOwnProperty('description'))
        {
              res.status(400).send();
        }

         //update the matched todo to valid attributes semd by user

        _.extend(matchedtodo,validAttributes);
        res.send(matchedtodo);


    });

 




app.listen(PORT,function(){
  console.log('Express Listening on Port ' + PORT + '!');

});





