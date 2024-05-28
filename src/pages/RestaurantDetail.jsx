import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Heart, Star } from "lucide-react";
import restaurants from "../data/RestaurantData";
import { useNavigate } from "react-router-dom"; 

const RestaurantDetail = () => {
  const [data, setData] = useState();
  const params = useParams();
  const navigate = useNavigate(); 
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tempData = restaurants.filter((restaurant) => restaurant.idRestaurant === params.id)[0];
    setData(tempData);
    setIsFavorite(
      JSON.parse(localStorage.getItem("favoriteRestaurants")).filter(
        (restaurant) => restaurant.idRestaurant === tempData.idRestaurant
      ).length > 0
    );
  };

  const handleFavorite = () => {
    const favoriteData =
      JSON.parse(localStorage.getItem("favoriteRestaurants")) || [];

    if (!isFavorite) {
      localStorage.setItem(
        "favoriteRestaurants",
        JSON.stringify([...favoriteData, data])
      );
    } else {
      localStorage.setItem(
        "favoriteRestaurants",
        JSON.stringify([
          ...favoriteData.filter((restaurant) => restaurant.idRestaurant !== data.idRestaurant),
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
              src={data.restaurantPicture}
              className="h-[250px] object-cover w-full"
            />
            <p className="block absolute bg-primary text-white rounded-full p-2 text-xs font-semibold bottom-2 left-6">
              {data.city}
            </p>
          </div>

          <div className="px-8 py-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl">{data.name}</h1>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-semibold ">Description</h2>
              <p className="text-gray-500">{data.description}</p>
            </div>

            <div className="flex flex-col gap-1 ">
              <h2 className="font-semibold ">Foods</h2>
              <div className="flex gap-2 items-center flex-wrap">
                {data.strFoods.map((food) => (
                  <div
                    key={food}
                    className="w-fit border hover:cursor-pointer hover:border-primary duration-500 rounded-lg py-2 px-4"
                  >
                    {food}
                  </div>
                ))}
              </div>
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

export default RestaurantDetail;
