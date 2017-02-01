import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './client/app/routes.jsx';
import bodyParser from 'body-parser';
import {NotFoundPage} from './client/app/components/NotFoundPage.jsx';

//Temporary account store until we use a persisting database
var tempAccountMap = {};

//Temporary hash function until we find a password hash solution
function tempHash(username, password) {
  return username + password;
}

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client/views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'client/public')));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/account', (req, res)=> {
  var hashed = tempHash(req.body.username, req.body.password);
  if(tempAccountMap[hashed]) {
    res.status(200);
    res.send({hashed: tempHash(req.body.username, req.body.password), 
      favorited: tempAccountMap[hashed].favorited});
  } else {
    res.status(400);
    res.send({status: 400});
  }
  
});

app.post('/newAccount', (req, res) => {
  var hashed = tempHash(req.body.username, req.body.password);
  if(tempAccountMap[hashed]) {
    res.status(400);
    res.send({status: 400});
  } else {
    tempAccountMap[hashed] = {
      favorited:[]
    }
    console.log("made an account with" + hashed);
    res.status(200);
    res.send({status:200});
  }
});

function indexOfPost(accountHash, post) {
  let list = tempAccountMap[accountHash].favorited;
  
  for(let i = 0; i < list.length; i++) {
      let listId = list[i].data.id;
      if(listId == post.data.id) return i;
  }
  return -1;
}

app.post('/favorite', (req, res) => {
  var accountHash = req.body.hashId;
  var post = req.body.newFavorite;
  
  var index = indexOfPost(accountHash, post);
  if(index == -1) {
    tempAccountMap[accountHash].favorited.push(post);
  } else {
    tempAccountMap[accountHash].favorited.splice(index, 1);
  }
  res.status(200);
  res.send({status: 200});
});


// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        console.log(err);
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});