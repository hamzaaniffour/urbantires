import HeroRecipes from "./components/HeroRecipes";
import RecipesByCategory from "./components/contents/dynamic/HomePage/Block1";
import PopularRecipes from "./components/contents/dynamic/HomePage/Block2";
import TrendingRecipes from "./components/contents/dynamic/HomePage/Block3";
import About from "./components/contents/static/HomePage/About";
import Newsletter from "./components/contents/static/HomePage/Newsletter";

export default function Home() {
  return (
    <>
    
    <HeroRecipes />
    <RecipesByCategory />
    <About />
    <PopularRecipes />
    <Newsletter />
    <TrendingRecipes />
    
    </>
  );
}
