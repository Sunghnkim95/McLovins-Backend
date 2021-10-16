const express = require('express');
const apiRouter = express.Router();


// attach other routers from files in this api directory (users, activities...)
// const { getUserById } = require('../db/users');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;


apiRouter.use(async (req, res, next) => {

  
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) { 
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

//   apiRouter.use((req, res, next) => {
//     if (req.user) {
//       console.log("User is set:", req.user);
//     }
//     next();
//   });

apiRouter.use((error, req, res, next) => {
  res.send(error);
});


// const usersRouter = require('./users');
// apiRouter.use('/users', usersRouter);

// const healthRouter = require('./health_check');
// apiRouter.use('/health', healthRouter);

// const activitiesRouter = require('./activities');
// apiRouter.use('/activities', activitiesRouter);

// const routinesRouter = require('./routines');
// apiRouter.use('/routines', routinesRouter);


// const routine_activityRouter = require('./routine_activities');
// apiRouter.use('/routine_activities', routine_activityRouter);

// export the api router
module.exports = apiRouter;