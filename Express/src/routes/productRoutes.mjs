import Router from "express";
import { products } from "../utlis/Constants.mjs";
import { getUserIndexById } from "../middleware/middleware.mjs";

const router = Router();

// *********** PRODUCTS **************
router.get("/api/products", (req, res) => {
    req.session.visited = true;
    console.log(req.session.id);
  const { filter, value } = req.query;
  if (filter && value) {
    return res.send(
      products.filter((product) =>
        product[filter].toLowerCase().includes(value.toLowerCase()),
      ),
    );
  }
  return res.send(products);
});

router.get("/api/products/:id", getUserIndexById, (req, res) => {   
  const userIndex = req.userIndex;
  if (userIndex !== -1) {
    return res.status(200).send(products[userIndex]);
  }
  return res.status(404).send({ msg: "Product not found" });
});

router.delete("/api/products/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  products.splice(userIndex, 1)
  return res.status(200).send("User deleted")
  
});

export default router;
