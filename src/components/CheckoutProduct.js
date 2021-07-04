import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
const CheckoutProduct = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-5">
      <Image src={product.image} width={200} height={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{product.title}</p>
        <div className="flex">
          {Array(product.raiting)
            .fill()
            .map((_, index) => (
              <StarIcon className="h-5 text-yellow-500 " key={index} />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>
        <Currency quantity={product.price} currency="USD" />
        {product.hasPrime && (
          <div className="flex items-center space-x-2 ">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button
          onClick={() => dispatch(addToBasket(product))}
          className="button mt-auto"
        >
          Add to Basket
        </button>
        <button
          onClick={() => dispatch(removeFromBasket(product.id))}
          className="button mt-auto"
        >
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
