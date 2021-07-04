import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/client";
const Checkout = () => {
  const currentProduct = useSelector(selectItems);
  const session = useSession();
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
              <span className="font-bold"></span>
            </h2>
            <button
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
