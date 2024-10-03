import React from "react";
import Image from "next/image";
import { getCategories } from "@/apis/graphql/categories";
import Link from "next/link";

const RecipesByCategory = async () => {
  const categories = await getCategories();

  return (
    <section className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mb-14" aria-label="Recipes by Category Section">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-violet-950 font-bold mb-5 text-3xl text-center">
          Recipes By{" "}
          <span className="bg-pink-700 rounded text-white px-2 py-0.5 pb-1.5">
            Category
          </span>
        </h2>
        <p className="text-slate-400 max-w-[600px] text-center mb-8">
          From breakfast to dinner, explore a variety of easy-to-follow recipes
          that bring bold flavors to your table without the hassle.
        </p>
      </div>
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((category) => (
            <Link href={`/${category.slug}`} key={category.slug} aria-label={`Explore recipes in ${category.name} category`}>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  className="w-full object-contain rounded-lg"
                  src={category.categoryImage}
                  alt={`Image of ${category.name} category`}
                  width={0}
                  height={0}
                  quality={100}
                  objectFit="cover"
                  layout="responsive"
                />
                <div className={`absolute inset-0 text-blue-950 transition-all hover:text-pink-700 bg-gradient-to-t from-slate-600/45 to-transparent flex justify-center items-center`}>
                  <h3 className="bg-white px-4 py-0.5 pb-1 rounded text-2xl font-semibold z-40 relative">
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
    </section>
  );
};

export default RecipesByCategory;