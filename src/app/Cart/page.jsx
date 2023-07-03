"use client";
import React, { useEffect, useContext, useRef, useState } from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import CartContextProvider from "../context/cartContext";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Counter from "../components/Counter";

const Cart = () => {
  const { cart } = useContext(CartContextProvider);
  const [cartValue, setCartValue] = cart;
  const [uniqueCart, setUniqueCart] = useState([]);
  const counterRef = useRef(null);

  const deleteItem = () => {
    try {
      setCartValue([]);
      setUniqueCart([]);

      toast.success("Cart is empty");
    } catch (error) {
      toast.error("Can't perform the operation.");
    }
  };
  const fetchUniqueCart = () => {
    const uniqueItem = new Set(cartValue.map(JSON.stringify));
    const uniqueProduct = Array.from(uniqueItem).map(JSON.parse);
    setUniqueCart((prevItem) => [...prevItem, ...uniqueProduct]);
  };
  useEffect(() => {
    fetchUniqueCart();
  }, []);

  const total = uniqueCart
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <div className="cartHeight bg-lime-100 py-16">
      <div className="container p-4 md:p-0 ">
        <div className="mb-8 flex items-center justify-between gap-4 sm:gap-20">
          <h2 className="cartTitle text-left font-mono text-4xl font-bold capitalize text-lime-700 ">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={deleteItem}
            className="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-lime-400 px-4 py-2 capitalize"
          >
            Delete All{" "}
            <HiArchiveBoxXMark className="hover:animate-shake text-xl text-red-500" />
          </button>
        </div>
        <div className="grid grid-cols-homepageLayoutHero place-items-center gap-24 sm:place-items-stretch">
          <div>
            {uniqueCart.map((item) => {
              const { id, title, price, image, category } = item;

              return (
                <div
                  key={id}
                  className="mb-2 flex items-center justify-between gap-8 rounded-md border-b border-gray-400 bg-lime-200 p-3 drop-shadow-md"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 overflow-hidden rounded-md">
                      <Image
                        className="h-20 object-cover object-center"
                        src={image}
                        alt="image"
                        width={60}
                        height={40}
                      />
                    </div>
                    <div>
                      <h2 className="text-left text-xs font-medium capitalize md:text-base">
                        {title}
                      </h2>
                      <h2 className="text-left text-xs font-medium capitalize text-lime-900 md:text-base">
                        {category}
                      </h2>
                      <h2 className="text-left text-xs font-medium capitalize md:text-base">
                        ${price} USD
                      </h2>
                    </div>
                  </div>
                  <div>
                    <div>
                      <Counter id={id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex max-h-max flex-col items-start">
            <div className="mb-2 w-full border-b border-gray-500 pb-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-left text-base font-medium capitalize">
                  subtotal
                </h2>
                <h2 className="text-left text-base font-medium capitalize">
                  ${total}
                </h2>
              </div>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-left text-base font-medium capitalize">
                  shipping
                </h2>
                <h2 className="text-left text-base font-medium capitalize">
                  $3.45
                </h2>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <h2 className="text-left text-base font-medium capitalize">
                total
              </h2>
              <h2 className="text-left text-base font-medium capitalize">
                ${(+total + 3.45).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
