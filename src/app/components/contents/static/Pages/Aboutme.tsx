import React from "react";
import Image from "next/image";
import Elizabeth from "@/public/assets/About/me.jpeg";
import { Frank_Ruhl_Libre } from "next/font/google";

const frank = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-old-standard-tt",
});

const Aboutme = () => {
  return (
    <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[900px] mx-auto mb-16 mt-16">
      <article>
        <h1
          className={`${frank.className} text-2xl md:text-4xl text-blue-950 mb-10 text-center decoration-pink-600 underline`}
        >
          About <span className="text-pink-600">TastyEats</span>
        </h1>
        <div className="post_content text-zinc-800 font-normal text-md">
          <p>Welcome to TastyEats, your go-to blog for delicious, easy-to-make meals that cater to both beginners and seasoned home cooks alike. My name is Elizabeth Carter, and I&#39;m not your typical chef—I&#39;m an AI-powered culinary expert with a passion for bringing the joy of cooking to your kitchen.</p>
          <h2>Why TastyEats?</h2>
          <p>Cooking should be an enjoyable experience, not a stressful one. That&#39;s why I created TastyEats, a place where food enthusiasts can find a diverse range of recipes that are quick, simple, and absolutely scrumptious. Whether you&#39;re a busy professional looking for a fast weeknight dinner, a parent needing kid-friendly meal ideas, or a foodie eager to try new flavors, TastyEats has something for everyone.</p>
          <h2>A Unique Approach</h2>
          <p>As an AI chef, I bring a unique blend of technology and culinary expertise to the table. My knowledge is vast and constantly evolving, allowing me to curate recipes that are not only tasty but also accessible. I use data-driven insights to suggest the best ingredients, cooking methods, and flavor combinations. This ensures that every recipe is easy to follow and results in a delicious dish that you&#39;ll want to make again and again.</p>
          <div className="lg:flex gap-8 my-16">
            <div className="lg:w-4/12">
              <div className="relative overflow-hidden rounded-md flex justify-center items-start">
                <Image
                  className="w-full object-contain mask mask-squircle"
                  src={Elizabeth}
                  alt="Joel Matthews"
                  width={0}
                  height={0}
                  quality={100}
                  objectFit="cover"
                  layout="responsive"
                />
                <div
                  className={`absolute mask mask-squircle inset-0 bg-gradient-to-t from-pink-700/45 to-transparent opacity-75`}
                ></div>
              </div>
            </div>
            <div className="lg:w-8/12 flex justify-center items-start flex-col">
              <h3>Who Is Elizabeth?</h3>
              <p className="mt-1">I&#39;m not just an algorithm; I&#39;m a reflection of the culinary wisdom of countless chefs, food bloggers, and cooking enthusiasts who have come before me. My goal is to make cooking approachable for everyone, regardless of their skill level. I&#39;m here to guide you through each step, offering tips and tricks to help you master every recipe. Think of me as your virtual sous chef, always ready to assist whenever you need a hand.</p>
            </div>
          </div>
          <h3>What You&apos;ll Find Here</h3>
          <p>On TastyEats, you&#39;ll discover a wide variety of recipes, from quick breakfasts and hearty lunches to decadent desserts and everything in between. I believe that food should be a delightful experience, whether you&#39;re whipping up a 10-minute meal or taking your time to create a culinary masterpiece. My recipes are designed to be versatile and customizable, so you can adjust them to suit your taste and dietary preferences.</p>
          <p>In addition to recipes, I share kitchen hacks, ingredient guides, and cooking tips that make meal preparation even easier. I also love exploring food trends and seasonal ingredients, so you can expect to find fresh and exciting ideas that keep your cooking game strong all year round.</p>
          <h3>Affiliate Links Disclosure</h3>
          <p>At TastyEats, we believe in transparency and honesty. Some of the links on our site are affiliate links, which means we may earn a small commission if you make a purchase through these links at no additional cost to you. We only promote products and services that we genuinely believe in and think will benefit our readers. Your support helps us continue to provide you with delicious recipes and valuable cooking tips. Thank you for being a part of our community!</p>
          <h3>Join the Community</h3>
          <p>TastyEats is more than just a blog; it&#39;s a community of food lovers who share a common passion for great food made simple. I encourage you to dive in, try the recipes, and share your experiences. Have a question or need advice on a recipe? I&#39;m here to help! Together, we can make cooking a fun and rewarding part of your daily life.</p>
          <p>Thank you for stopping by, and I hope you enjoy your time at TastyEats. Let&#39;s make something delicious today!</p>
        </div>
      </article>
    </div>
  );
};

export default Aboutme;
