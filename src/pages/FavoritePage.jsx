import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const FavoritePage = () => {
  const [restaurants, setRestaurants] = useState(
    JSON.parse(localStorage.getItem("favoriteRestaurants")) || []
  );
  const [foodsData, setFoodsData] = useState(
    JSON.parse(localStorage.getItem("favoriteFoods")) || []
  );

  const navigate = useNavigate();

  return (
    <div className="pt-[100px]">
      <Navbar />
      <div className="flex flex-col gap-6 pb-12">
        <div className="relative">
          <img
            className="h-[120px] object-cover w-full"
            src="/heros/burger-small.jpg"
          />
          <h1 className="text-4xl font-bold text-white absolute -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2">
            Favorite
          </h1>
        </div>
        <div className="w-[85%] mx-auto flex flex-col gap-9">
          <div id="restaurants" className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-center">Restaurants</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {restaurants.map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                  className="rounded-lg border-2 text-start overflow-hidden"
                >
                  <div className="relative group overflow-hidden">
                    <img
                      src={`https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`}
                      alt={restaurant.name}
                      className="w-full h-[160px] group-hover:scale-110 duration-500  object-cover rounded-t-lg hover:"
                    />
                    <p className="block absolute bg-primary text-white rounded-full p-2 text-xs font-semibold bottom-3 left-2">
                      {restaurant.city}
                    </p>
                  </div>

                  <div className="p-5 pt-4 bg-white">
                    <div className="flex justify-between  items-center">
                      <a className="text-xl font-bold hover:cursor-pointer hover:underline duration-300">
                        {restaurant.name}
                      </a>

                      <div className="text-yellow-400 font-bold text-yellow flex gap-1 items-center">
                        <Star size={20} className="" fill="rgb(250,204,1)" />
                        <p>{restaurant.rating}</p>
                      </div>
                    </div>
                    <p className="line-clamp-4 text-sm text-tertiary mt-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ad corporis commodi, quibusdam itaque rem qui delectus
                      quidem tempora voluptas id, eius sapiente deserunt
                      adipisci accusantium soluta doloribus nihil cumque
                      expedita.
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {restaurants.length === 0 && (
              <h2 className="font-bold text-tertiary text-2xl text-center">{`There is no Favorite Restaurants :(`}</h2>
            )}
          </div>

          <div id="foods" className="flex flex-col gap-6">
            <h1 className="text-3xl mt-8 font-bold text-center">Foods</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {foodsData.map((food) => (
                <button
                  key={food.idMeal}
                  onClick={() => navigate(`/food/${food.idMeal}`)}
                  className="border-2 text-start overflow-hidden rounded-lg"
                >
                  <div className="relative group overflow-hidden">
                    <img
                      src={food.strMealThumb}
                      alt={food.strMeal}
                      className="w-full h-[160px] group-hover:scale-110 duration-500  object-cover rounded-t-lg hover:"
                    />
                    <p className="block absolute bg-primary text-white rounded-full p-2 text-xs font-semibold bottom-3 left-2">
                      {food.strArea}
                    </p>
                  </div>

                  <div className="p-5 pt-4 bg-white">
                    <div className="flex justify-between  items-center">
                      <a className="text-xl font-bold hover:cursor-pointer hover:underline duration-300">
                        {food.strMeal}
                      </a>
                    </div>
                    <p className="line-clamp-4 text-sm text-tertiary mt-1">
                      {food.strDescription}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {foodsData.length === 0 && (
              <h2 className="font-bold text-2xl text-center text-tertiary">{`There is no Favorite Foods :(`}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;
