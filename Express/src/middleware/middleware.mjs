import {users} from '../utlis/Constants.mjs'

export const getUserIndexById = (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log('id', id);
  
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad request, Invalid ID" });
  }
  const userIndex = users.findIndex((user) => user.id === id);
  console.log('userindex', userIndex);
  
  if (userIndex === -1) {
    return res.status(404).send({ msg: "User not found" });
  }

  req.userIndex = userIndex;
  next();
};