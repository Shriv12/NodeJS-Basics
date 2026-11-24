import express from "express";
import { createUserValidationSchema } from "./utlis/ValidationSchema.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import userRouter from "./routes/usersRoutes.mjs";
import productRouter from "./routes/productRoutes.mjs";
import { users } from "./utlis/Constants.mjs";
import { getUserIndexById } from "./middleware/middleware.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import mongoose from "mongoose";
import { User } from "./models/User.mjs";
import { comparePassword } from "./utlis/Helper.mjs";

const app = express();

app.use(express.json()); // this is mandatory to convert the req to json format
app.use(cookieParser("secret")); // this is to retrieve the cookie in json format.. provide any value for signed value

// mongoDB connection
mongoose
  .connect("mongodb://localhost/express")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`Error: ${err.message}`));

// to create a session for a particular time
app.use(
  session({
    secret: "secret-session",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  }),
);

// package for user authentication based on the user credentials
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      // const user = users.find((user) => user.username === username);
      // if (!user) {
      //   return done(null, false, { message: "Invalid username" });
      // }
      // if (user.password !== password) {
      //   return done(null, false, { message: "Incorrect password" });
      // }
      // return done(null, user);

      // authentication based on mongoDB
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Invalid username" });
        }
        // if (user.password !== password) {
        //   return done(null, false, { message: "Incorrect password" });
        // }

        // comparing plain and hashed password on login
        if (comparePassword(password, user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err, false);
      }
    },
  ),
);

app.use(userRouter); // using the router corresponding to User
app.use(productRouter);

// this is middleware

const PORT = 3000;

// Optimise the redundant code using middleware
// const getUserIndexById = (req, res, next) => {
//   const id = parseInt(req.params.id);
//   if (isNaN(id)) {
//     return res.status(400).send({ msg: "Bad request, Invalid ID" });
//   }
//   const userIndex = users.findIndex((user) => user.id === id);
//   if (userIndex === -1) {
//     return res.status(404).send({ msg: "User not found" });
//   }

//   req.userIndex = userIndex;
//   next();
// };

app.get("/", (req, res) => {
  // cookie
  // small chunk of data sent from the server to the browser
  res.cookie("user", "Admin", { minAge: 60000, signed: true });
  console.log(req.session);
  console.log(req.session.id);

  res.send({ msg: "Root" }); // sending an object
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  // const user = users.find((u) => (u.id = id));
  // done(null, user || false);

  // based on mongoDB
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log(err);
    return done(err, false);
  }
});

// *********** USERS **************

// best practice to provide /api/...
// app.get("/api/users", (req, res) => {
//   // Query params: localhost:3000/users?filter=username&value=shri
//   console.log(req.query); //{ filter: 'username', value: 'sh' }

//   const { filter, value } = req.query;
//   if (filter && value) {
//     return res.send(
//       users.filter((user) =>
//         user[filter].toLowerCase().includes(value.toLowerCase()),
//       ),
//     );
//   }

//   res.send(users);
// });

// filter user based on id
// app.get("/api/users/:id", (req, res) => {
//   // console.log(req.params); // { id: '1' }

//   const id = parseInt(req.params.id);
//   if (isNaN(id)) {
//     return res.status(400).send({ msg: "Bad request, Invalid ID" });
//   }
//   const user = users.find((user) => user.id === id);
//   if (user) {
//     return res.send(user);
//   }
//   res.status(404).send({ msg: "User not found" });
// });

// app.post("/api/users", (req, res) => {
//   // console.log(req.body);
//   const { body } = req;
//   const newUser = { id: users[users.length - 1].id + 1, ...body };
//   users.push(newUser);
//   return res.status(201).send(newUser);
// });

// optimsed code using validation of the body
// app.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
//     const result = validationResult(req)
//     // console.log(result);

//     if(!result.isEmpty()){
//         return res.status(400).send({error: result.array()})
//     }
//     // console.log(req);
//     // The function internally identifies and extracts the request fields that have passed through Express Validator's validation
//     const body = matchedData(req)
//     const newUser = { id: users[users.length - 1].id + 1, ...body };
//   users.push(newUser);
//   return res.status(201).send(newUser);
// });

// app.put("/api/users/:id", getUserIndexById, (req, res) => {
//   //   const id = parseInt(req.params.id);
//   //   if (isNaN(id)) {
//   //     return res.status(400).send({ msg: "Bad request, Invalid ID" });
//   //   }
//   //   const userIndex = users.findIndex((user) => user.id === id);
//   //   if (userIndex === -1) {
//   //     return res.status(404).send({ msg: "User not found" });
//   //   }

//   // optimised code
//   // calling this from middleware
//   const userIndex = req.userIndex;
//   const { body } = req;
//   users[userIndex] = { id: id, ...body };
//   return res.status(200).send("User updated");
// });

// app.patch("/api/users/:id", getUserIndexById, (req, res) => {
//   //   const id = parseInt(req.params.id);
//   //   if (isNaN(id)) {
//   //     return res.status(400).send({ msg: "Bad request, invalid ID" });
//   //   }

//   //   const userIndex = users.findIndex((user) => user.id === id);
//   //   if (userIndex === -1) {
//   //     return res.status(404).send({ msg: "User not found" });
//   //   }

//   // optimised code
//   // calling this from middleware
//   const userIndex = req.userIndex;
//   const { body } = req;
//   users[userIndex] = { ...users[userIndex], ...body };
//   return res.status(200).send("User updated");
// });

// app.delete("/api/users/:id", getUserIndexById, (req, res) => {
//   //   const id = parseInt(req.params.id);
//   //   if (isNaN(id)) {
//   //     return res.status(400).send({ msg: "Bad request, invalid ID" });
//   //   }

//   //   const userIndex = users.findIndex((user) => user.id === id);
//   //   if (userIndex === -1) {
//   //     return res.status(404).send({ msg: "User not found" });
//   //   }

//   // optimised code
//   // calling this from middleware
//   const userIndex = req.userIndex;
//   users.splice(userIndex, 1);
//   return res.status(200).send("User deleted");
// });

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});

// Query params: localhost:3000/users?filter=username&value=shri
