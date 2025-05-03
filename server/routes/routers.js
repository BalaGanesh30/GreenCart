import express from "express";

import userRouter from "./userRoute.js";
import sellerRouter from "./sellerRoute.js";
import productRouter from "./productRoute.js";
import cartRouter from "./cartRoute.js";
import addressRouter from "./addressRoute.js";
import orderRouter from "./orderRoute.js";
import contactRouter from "./contactRoute.js";

const router = express.Router();

const routes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/seller",
    route: sellerRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/cart",
    route: cartRouter,
  },
  {
    path: "/address",
    route: addressRouter,
  },
  {
    path: "/order",
    route: orderRouter,
  },
  {
    path: "/contact",
    route: contactRouter,
  },
];

routes.forEach((r) => {
  router.use(r.path, r.route);
});

export default router;
