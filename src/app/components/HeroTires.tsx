import React from "react";
import Image from "next/image";
import { getCategories } from "@/apis/graphql/categories";
import Link from "next/link";
import IMG1 from "@/public/assets/Hero/1.jpeg";
import IMG2 from "@/public/assets/Hero/2.jpeg";

const HeroTires = async () => {
  const categories = await getCategories();
  return (
    <section
      className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mb-10"
      aria-label="Hero Recipes Section"
    >
      <div className="py-20">
        <div className="lg:flex gap-20">
          <div className="lg:w-7/12">
            <h1 className="text-xl md:text-3xl text-blue-950 font-bold mb-5">
              Tread Like a Pro: Unveil Top-Rated Tires for Every Terrain
            </h1>
            <p className="text-blue-950 mb-7">
              Navigate the open road with confidence, from smooth city drives to rugged off-road adventures. Discover our handpicked selection of high-performance tires that deliver exceptional grip, durability, and comfort.
            </p>
            <p className="text-blue-950 font-semibold mb-2.5">
              Our expert research will help you find the best
            </p>
            {categories.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className={`text-white hover:text-blue-300 transition-all`}
              >
                <article className="bg-white border-2 rounded border-slate-200 h-24 flex justify-center items-center flex-col">
                  <Image
                    src={`${category.categoryImage}`}
                    alt={category.name}
                    width={500}
                    height={500}
                    className="w-12 mb-0.5"
                    quality={100}
                  />
                  <p className="text-black font-semibold text-[15px]">
                    {category.name}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p>No categories available</p>
        )}
          </div>
          <div className="lg:w-5/12 flex justify-center items-center">
            <div className="grid grid-cols-2 gap-4 mt-10 lg:mt-0">
              <div className="relative overflow-hidden rounded-lg mb-4 lg:mb-10">
                <Image
                  className="w-full object-contain rounded-lg"
                  src={IMG1}
                  alt="Delicious dish by Easton Boehm"
                  width={0}
                  height={0}
                  quality={100}
                  objectFit="cover"
                  layout="responsive"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-slate-pink/45 to-transparent flex justify-center items-center`}
                ></div>
              </div>
              <div className="relative overflow-hidden rounded-lg mt-4 lg:mt-10">
                <Image
                  className="w-full object-contain rounded-lg"
                  src={IMG2}
                  alt="Gourmet dish by Easton Boehm"
                  width={0}
                  height={0}
                  quality={100}
                  objectFit="cover"
                  layout="responsive"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-blue-800/35 to-transparent flex justify-center items-center`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroTires;
