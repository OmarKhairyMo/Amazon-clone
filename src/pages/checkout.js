import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, totalPrice } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);
const Checkout = () => {
  const currentProduct = useSelector(selectItems);
  const total = useSelector(totalPrice);
  const [session] = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    console.log(stripe);
    // Call the Backend to create checkout Stripe
    const checkoutSession = await axios.post("./api/create-checkout-seassion", {
      items: currentProduct,
      email: session.user.email,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error.message);
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1
              className={
                currentProduct.length === 0
                  ? `text-3xl self-center border-b pb-4`
                  : `text-3xl border-b pb-4`
              }
            >
              {currentProduct.length === 0
                ? "Your Amazon Basket Is Empty"
                : "Shopping Basket"}
            </h1>
            {currentProduct.map((product) => (
              <CheckoutProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
        {/* Right */}
        {currentProduct.length !== 0 ? (
          <div className="flex flex-col bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal ({currentProduct.length}) items:
              <span className="font-bold p-2">
                <Currency quantity={total} currency="USD" />
              </span>
            </h2>
            <button
              onClick={createCheckoutSession}
              role="link"
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                " from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              {!session ? "Sign in to checkout" : "Proceed tocheckout"}
            </button>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Checkout;
