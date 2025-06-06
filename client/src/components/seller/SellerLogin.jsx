import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { IsSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      console.log(data, "this is from data");
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Request failed"
      );
    }
    // // Simulate login check (you can replace with actual API call)
    // if (email && password) {
    //   setIsSeller(true);
    // }
  };

  useEffect(() => {
    if (IsSeller) {
      navigate("/seller");
    }
  }, [IsSeller]);

  return (
    !IsSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter Password..."
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
