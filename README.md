# personal utils

def: this is a repo with utils backend tools, like validators, errors-handlers, etc... motivated for a lazy spirit to rebuild code

## 1 req.body validator

### dependencies:

- express-validator

### how to use: 

- check validators/route-validatior

### example:

```
import { authValidations, authValidationsTypes } from '../validations/auth-validation';

const router = express.Router();

type SignUpRequest = {
  email: string;
  password: string;
};

router.post(
  '/api/users/signup',
  authValidations(authValidationsTypes.VALIDATE_SIGNUP),
  (req, res) => {
    ...
  }
);

```

## 2 Error Handler

### dependencies:

- express-async-errors

### how to use: 

- check errors/custom-error.ts

### example:

in index.ts

````
import express from 'express';
import 'express-async-errors';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

.
.
.

// after the app routes

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
````