import React from "react";
import Image from "next/image";
import SweetTreats from "../../public/assets/SweetTreats.jpeg";
import SavoryDishes from "../../public/assets/SavoryDishes.jpeg";
import Miscellaneous from "../../public/assets/Miscellaneous.jpeg";
import Img1 from "../../public/assets/Hero/1.jpeg";
import Img2 from "../../public/assets/Hero/2.jpeg";
import { getCategories } from "@/apis/graphql/categories";
import Link from "next/link";

const HeroRecipes = async () => {
  const categories = await getCategories();
  return (
    <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mb-10">
      <div className="py-20">
        <div className="lg:flex gap-20">
          <div className="lg:w-7/12">
            <h1 className="text-xl md:text-3xl text-black font-bold mb-5">
              Cook Like a Pro: Discover Trending Recipes for Every Occasion
            </h1>
            <p className="text-black mb-7">
              Explore a world of flavors with easy-to-follow recipes, from quick
              weekday meals to impressive gourmet dishes that will delight your
              family and friends.
            </p>
            <p className="text-black font-semibold mb-2.5">
              Our expert research will help you find the best
            </p>
            {categories.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Link href={`/${category.slug}`} key={category.slug}>
                    <div className="relative overflow-hidden">
                      <Image
                        className="w-full object-contain"
                        src={category.categoryImage}
                        alt={category.name}
                        width={0}
                        height={0}
                        quality={100}
                        objectFit="cover"
                        layout="responsive"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/45 to-orange-400/45 flex justify-center items-center`}
                      >
                        <h3 className="text-white text-xl font-semibold z-40 relative">
                          {category.name}
                        </h3>
                      </div>
                    </div>
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
                  src={Img1}
                  alt="Elizabeth Carter"
                  width={0}
                  height={0}
                  quality={100}
                  objectFit="cover"
                  layout="responsive"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-slate-orange/45 to-transparent flex justify-center items-center`}
                ></div>
              </div>
              <div className="relative overflow-hidden rounded-lg mt-4 lg:mt-10">
                <Image
                  className="w-full object-contain rounded-lg"
                  src={Img2}
                  alt="Elizabeth Carter"
                  width={0}
                  height={0}
                  quality={100}
                  objectFit="cover"
                  layout="responsive"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-amber-600/45 to-transparent flex justify-center items-center`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRecipes;
