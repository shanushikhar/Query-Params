"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const imageUrls = {
  black:
    "https://png.pngtree.com/thumb_back/fh260/background/20230629/pngtree-d-render-of-a-black-t-shirt-closeup-with-space-for-image_3701003.jpg",
  white:
    "https://img.freepik.com/free-psd/white-tshirt-transparent-background_125540-4679.jpg",
  blue: "https://www.pngkey.com/png/detail/70-707381_10-blank-navy-blue-t-shirt-template-free.png",
};
const colourVarients = ["black", "white", "blue"];
const sizeVarients = ["xs", "s", "md", "l", "xl"];

export default function Home() {
  const searchParams = useSearchParams();
  const selectedColor = (searchParams.get("color") || "black") as string;
  const selectedSize = (searchParams.get("size") || "md") as string;

  return (
    <main className="flex text-black bg-black-200 min-h-screen items-center justify-between">
      <div className="bg-gray-500 flex items-center w-[96%] rounded min-h-[75vh]">
        <div className="flex-[2] flex justify-center">
          <Image
            src={imageUrls[selectedColor]}
            alt="Shirt varient"
            width={622}
            height={550}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-black">
            Acme Circles T-Shirt
          </h1>
          <section className="bg-blue-500 text-white inline-block px-2 py-2 rounded-full mt-3 mb-10">
            $20.00 USD
          </section>

          <div>
            <section className="mb-5">
              <h2 className="text-nd uppercase mb-2">COLOR</h2>
              <div className="flex gap-2">
                {colourVarients.map((color, index) => (
                  <Link
                    //href={`?color=${color}&size=${selectedSize}`}
                    href={`?${new URLSearchParams({
                      color,
                      size: selectedSize,
                    })}`}
                    key={index}
                    className={`bg-gray-100 text-black px-4 py-1 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Link>
                ))}
              </div>
            </section>
            <section className="mb-5">
              <h2 className="text-nd uppercase mb-2">SIZES</h2>
              <div className="flex gap-2">
                {sizeVarients.map((size, index) => (
                  <Link
                    href={`?color=${selectedColor}&size=${size}`}
                    key={index}
                    className={`bg-gray-100 text-black px-4 py-1 rounded-full border-2 ${
                      selectedSize === size
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    {size.toUpperCase()}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
