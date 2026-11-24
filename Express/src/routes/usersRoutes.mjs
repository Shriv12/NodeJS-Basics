import { Router } from "express";
import { users } from "../utlis/Constants.mjs";
import { hashPassword } from "../utlis/Helper.mjs";
import { createUserValidationSchema } from "../utlis/ValidationSchema.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { getUserIndexById } from "../middleware/middleware.mjs";
import { User } from "../models/User.mjs";
const router = Router();

// GET req
router.get("/api/users", async (req, res) => {
  // console.log("req.cookies", req.cookies);
  // console.log("req.signedCookies", req.signedCookies);
  if (req.signedCookies.user && req.signedCookies.user === "Admin") {
    const { filter, value } = req.query;

    if (filter && value) {
      return res.send(
        users.filter((user) =>
          user[filter].toLowerCase().includes(value.toLowerCase()),
        ),
      );
      // return res.send(users); 
    }

    // get users from mongoDB
    const users = await User.find()
    return res.send(users); 
  } else {
    return res.send({ msg: "You are not an Admin" });
  }
});

router.get("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  console.log("userIndex", userIndex);
  if (userIndex !== -1) {
    return res.status(200).send(users[userIndex]);
  }
});

// POST req
router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    const body = matchedData(req);
    // const newUser = { id: users[users.length - 1].id + 1, ...body };
    // users.push(newUser);

    // hashing password for security concerns
    body.password = hashPassword(body.password)
    // creating user based on mongoDB schema
    const newUser = new User(body)
    try{
      const savedUser = await newUser.save()
      return res.status(200).send(savedUser)
    }
    catch(err){
      console.log(err);
      return res.status(400).send({msg: 'User not saved'})
      
    }
    // return res.status(201).send(newUser);
  },
);

// PUT req
router.put("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  const { body } = req;
  users[userIndex] = { id: users[userIndex].id, ...body };
  return res.status(200).send("User updated");
});

// PATCH req
router.patch("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  const { body } = req;
  users[userIndex] = { ...users[userIndex], ...body };
  return res.status(200).send("User updated");
});

// DELETE req
router.delete("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  users.splice(userIndex, 1);
  return res.status(200).send("User deleted");
});

export default router;
