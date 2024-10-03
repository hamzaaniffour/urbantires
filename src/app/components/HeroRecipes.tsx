import React from "react";
import Image from "next/image";
import { getCategories } from "@/apis/graphql/categories";
import Link from "next/link";
import IMG1 from "@/public/assets/Hero/1.jpeg"
import IMG2 from "@/public/assets/Hero/2.jpeg"

const HeroRecipes = async () => {
  const categories = await getCategories();
  return (
    <section className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mb-10" aria-label="Hero Recipes Section">
      <div className="py-20">
        <div className="lg:flex gap-20">
          <div className="lg:w-7/12">
            <h1 className="text-xl md:text-3xl text-blue-950 font-bold mb-5">
              Cook Like a Pro: Discover Trending Recipes for Every Occasion
            </h1>
            <p className="text-blue-950 mb-7">
              Explore a world of flavors with easy-to-follow recipes, from quick
              weekday meals to impressive gourmet dishes that will delight your
              family and friends.
            </p>
            <p className="text-blue-950 font-semibold mb-2.5">
              Our expert research will help you find the best
            </p>
            {categories.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Link href={`/${category.slug}`} key={category.slug} aria-label={`Explore ${category.name} category`}>
                    <div className="relative overflow-hidden">
                      <Image
                        className="w-full object-contain"
                        src={category.categoryImage}
                        alt={`Image of ${category.name}`}
                        width={0}
                        height={0}
                        quality={100}
                        objectFit="cover"
                        layout="responsive"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/45 to-pink-400/45 flex justify-center items-center`}>
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
                  src={IMG1}
                  alt="Delicious dish by Elizabeth Carter"
                  width={0}
                  height={0}
                  quality={100}
                  objectFit="cover"
                  layout="responsive"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-pink/45 to-transparent flex justify-center items-center`}></div>
              </div>
              <div className="relative overflow-hidden rounded-lg mt-4 lg:mt-10">
                <Image
                  className="w-full object-contain rounded-lg"
                  src={IMG2}
                  alt="Gourmet dish by Elizabeth Carter"
                  width={0}
                  height={0}
                  quality={100}
                  objectFit="cover"
                  layout="responsive"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-pink-700/35 to-transparent flex justify-center items-center`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRecipes;