import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import foods from "../data/FoodData";
import restaurants from "../data/RestaurantData";
import { Search, Star } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"; // Import useNavigate

const CataloguePage = () => {
  // const [originalRestaurants, setOriginalRestaurants] = useState([]);
  // const [restaurants, setRestaurants] = useState([]);
  const [searchCategory, setSearchCategory] = useState("restaurant");
  const [searchQuery, setSearchQuery] = useState("");
  const [foodsData, setFoodsData] = useState(foods);
  const navigate = useNavigate(); // Define navigate
  const [restaurantsData, setRestaurantsData] = useState(restaurants);
  const [searchParams, setSearchParams]= useSearchParams()
  
  useEffect(() => {
    const type = searchParams.get("type")
    if(type === "foods" || type=== "restaurants"){
      setTimeout(() => {
        document.getElementById(type).scrollIntoView()
      },300)
    }

  },[])

  // const fetchData = async () => {
  //   const response = await fetch("https://restaurant-api.dicoding.dev/list");
  //   const data = await response.json();

  //   setRestaurants(data.restaurants);
  //   setOriginalRestaurants(data.restaurants);
  // };

  const filteredRestaurants = () => {
    if (searchQuery === "") {
      setRestaurantsData(restaurants);
      return;
    }

    const filteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setRestaurantsData(filteredRestaurants);
    document.getElementById("restaurants").scrollIntoView(true); // Move scrollIntoView here
  };


  const filteredFoods = () => {
    if (searchQuery === "") {
      setFoodsData(foods);
      return;
    }

    const filteredFoods = foods.filter((food) =>
      food.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFoodsData(filteredFoods);
    document.getElementById("foods").scrollIntoView(true); // Move scrollIntoView here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchCategory === "restaurant") {
      filteredRestaurants();
    } else {
      filteredFoods();
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="pt-[100px]">
      <Navbar />
      <div className="flex flex-col gap-6 pb-12">
        <div className="relative">
          <img
            className="h-[120px] object-cover w-full"
            src="/heros/chef-small.jpg"
          />
          <h1 className="text-4xl font-bold text-white absolute -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2">
            Catalogue
          </h1>
        </div>
        <div className="w-[85%] mx-auto flex flex-col gap-9">
          <div className="p-4 rounded-2xl border-2 flex flex-col gap-3 items-start">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex w-full gap-4">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, category, and menu"
                  className="px-4 py-1 border w-full rounded-xl"
                />
                <button className="p-4 text-white bg-primary rounded-xl">
                  <Search />
                </button>
              </div>
            </form>
            <div className="flex gap-4">
              <button
                onClick={() => setSearchCategory("restaurant")}
                className={`py-2 px-4 active:scale-90 duration-500 rounded-2xl ${
                  searchCategory === "restaurant" ? "bg-primary " : "bg-gray-400"
                } text-white`}
              >
                Restaurant
              </button>
              <button
                onClick={() => setSearchCategory("food")}
                className={`py-2 px-4 active:scale-90 duration-500 rounded-2xl ${
                  searchCategory === "food" ? "bg-primary " : "bg-gray-400"
                } text-white`}
              >
                Food
              </button>
            </div>
          </div>

          <div id="restaurants" className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-center">Restaurants</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {restaurantsData.map((restaurant) => (
                <button
                  key={restaurant.idRestaurant}
                  onClick={() => navigate(`/restaurant/${restaurant.idRestaurant}`)}
                  className="border-2 text-start overflow-hidden rounded-lg"
                >
                  <div className="w-full relative h-[160px] group overflow-hidden">
                    <img
                      src={restaurant.restaurantPicture}
                      alt={restaurant.name}
                      className="w-full h-[160px] group-hover:scale-110 duration-500 object-cover rounded-t-lg"
                    />
                    <p className="block absolute bg-primary text-white rounded-full p-2 text-xs font-semibold bottom-3 left-2">
                      {restaurant.city}
                    </p>
                  </div>

                  <div className="p-5 pt-4 bg-white">
                    <div className="flex justify-between items-center">
                      <a className="text-xl font-bold hover:cursor-pointer hover:underline duration-300">
                        {restaurant.name}
                      </a>
                    </div>
                    <p className="line-clamp-4 text-sm text-tertiary mt-1">
                      {restaurant.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div id="foods" className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-center">Foods</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {foodsData.map((food) => (
                <button
                  key={food.idMeal}
                  onClick={() => navigate(`/food/${food.idMeal}`)}
                  className="border-2 text-start overflow-hidden rounded-lg"
                >
                  <div className="w-full relative h-[160px] group overflow-hidden">
                    <img
                      src={food.strMealThumb}
                      alt={food.strMeal}
                      className="w-full h-[160px] group-hover:scale-110 duration-500 object-cover rounded-t-lg"
                    />
                    <p className="block absolute bg-primary text-white rounded-full p-2 text-xs font-semibold bottom-3 left-2">
                      {food.strArea}
                    </p>
                  </div>

                  <div className="p-5 pt-4 bg-white">
                    <div className="flex justify-between items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CataloguePage;
