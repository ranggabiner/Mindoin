import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Heart, Star } from "lucide-react";
import foods from "../data/FoodData";
import { useNavigate } from "react-router-dom"; 

const FoodDetail = () => {
  const [data, setData] = useState();
  const params = useParams();
  const navigate = useNavigate(); 
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tempData = foods.filter((food) => food.idMeal === params.id)[0];
    setData(tempData);
    setIsFavorite(
      JSON.parse(localStorage.getItem("favoriteFoods")).filter(
        (food) => food.idMeal === tempData.idMeal
      ).length > 0
    );
  };

  const handleFavorite = () => {
    const favoriteData =
      JSON.parse(localStorage.getItem("favoriteFoods")) || [];

    if (!isFavorite) {
      localStorage.setItem(
        "favoriteFoods",
        JSON.stringify([...favoriteData, data])
      );
    } else {
      localStorage.setItem(
        "favoriteFoods",
        JSON.stringify([
          ...favoriteData.filter((food) => food.idMeal !== data.idMeal),
        ])
      );
    }

    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="pt-[124px] pb-12">
      <Navbar />
      {data && (
        <div className="w-[85%] mx-auto max-w-[600px] rounded-3xl overflow-hidden bg-white shadow-lg">
          <div className="relative">
            <img
              src={data.strMealThumb}
              className="h-[250px] object-cover w-full"
            />
            <p className="block absolute bg-primary text-white rounded-full p-2 text-xs font-semibold bottom-2 left-6">
              {data.strArea}
            </p>
          </div>

          <div className="px-8 py-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl">{data.strMeal}</h1>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-semibold ">Description</h2>
              <p className="text-gray-500">{data.strDescription}</p>
            </div>

            <div className="flex flex-col gap-1 ">
              <h2 className="font-semibold ">Ingredients</h2>
              <div className="flex gap-2 items-center flex-wrap">
                {data.strIngredients.map((ingredient) => (
                  <div
                    key={ingredient}
                    className="w-fit border hover:cursor-pointer hover:border-primary duration-500 rounded-lg py-2 px-4"
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>

            <h2 className="font-bold">Instructions</h2>
            <div className="flex gap-2 items-center flex-wrap">
              <p>{data.strInstructions}</p>
            </div>
          </div>
        </div>
      )}{" "}
      <button
        onClick={() => handleFavorite()}
        className="bg-red-500 fixed bottom-12 right-12 p-4 rounded-full"
      >
        <Heart
          size={32}
          fill={isFavorite ? "white" : "transparent"}
          className="text-white duration-500"
        />
      </button>
    </div>
  );
};

export default FoodDetail;
