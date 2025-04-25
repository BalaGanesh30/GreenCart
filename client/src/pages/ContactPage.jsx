import React, { useState } from "react";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const ContactPage = () => {
  const { axios } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/contact", formData); // Change URL if needed
      if (data.success) {
        toast.success(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Request failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium text-gray-800">Contact Us</h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mt-1"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dull"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dull"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dull"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dull transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Store Info */}
          <div className="bg-white p-8 rounded-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-4">
              We’re happy to hear from you! Reach out anytime:
            </p>
            <ul className="space-y-4 text-gray-700">
              <li>
                <strong>Address:</strong> 123 Fresh Street, Greencity, GK 56789
              </li>
              <li>
                <strong>Phone:</strong> +91 98765 43210
              </li>
              <li>
                <strong>Email:</strong> support@greencart.com
              </li>
              <li>
                <strong>Working Hours:</strong> Mon - Sat: 9am - 6pm
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
