import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const Currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [User, setUser] = useState(null);
  const [IsSeller, setIsSeller] = useState(false);
  const [ShowUserLogin, setShowUserLogin] = useState(false);
  const [Products, setProducts] = useState([]);
  const [cartItems, setcartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  //fetch user auth status ,user data and Cart Items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setcartItems(data.user.cartItems);
      }
    } catch (error) {
      setUser(null);
    }
  };

  //fetch seller auth status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  //fetch all products...
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.product);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Request failed"
      );
    }
  };

  //add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setcartItems(cartData);
    toast.success("Added to Cart");
  };

  //update cart items quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setcartItems(cartData);
    toast.success("Cart Updated");
  };

  //remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Removed from Cart");
    setcartItems(cartData);
  };

  //get cart item count

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  //get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = Products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  //Update the DataBase cart Items
  useEffect(() => {
    const updateCart = async () => {
      try {
        console.log(cartItems, "this from cartitem");
        // console.log(cartItems, "this from cartitem 222");
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) {
          toast.error(data.message || "Something went wrong");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || error.message || "Request failed"
        );
      }
    };
    if (User) {
      updateCart();
    }
  }, [cartItems]);
  const value = {
    navigate,
    User,
    setUser,
    IsSeller,
    setIsSeller,
    ShowUserLogin,
    setShowUserLogin,
    Products,
    Currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    setcartItems,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
