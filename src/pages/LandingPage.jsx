import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Star } from "lucide-react";
import CatalogueSection from "../components/CatalogueSection";
import { useNavigate } from "react-router-dom";
import foods from "../data/FoodData";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [customerReviews, setCustomerReviews] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch("https://restaurant-api.dicoding.dev/list");
    const data = await response.json();
    setRestaurants(data.restaurants);
  };

  const fetchReviews = async () => {
    const urls = [
      "https://restaurant-api.dicoding.dev/detail/uqzwm2m981kfw1e867",
      "https://restaurant-api.dicoding.dev/detail/dy62fuwe6w8kfw1e867",
      "https://restaurant-api.dicoding.dev/detail/vfsqv0t48jkfw1e867",
      "https://restaurant-api.dicoding.dev/detail/w7jca3irwykfw1e867",
    ];

    const allRequests = urls.map((url) =>
      fetch(url).then((response) => response.json())
    );

    const allResponses = await Promise.all(allRequests);

    allResponses.forEach((response) => {
      setCustomerReviews((prev) => [...prev, response.restaurant]);
    });
  };
  useEffect(() => {
    fetchData();
    fetchReviews();
  }, []);

  return (
    <div className="bg-white pt-[100px]">
      <Navbar />
      <Hero />
      <CatalogueSection />
      <div>
        <div id="main" className="rounded-t-[100px] py-8 bg-[#EDEEF3]">
          <div className="w-[85%] mx-auto flex flex-col gap-9">
            <h1 className="text-4xl font-bold text-center">
              Featured Restaurants
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {restaurants.slice(0, 8).map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                  className="rounded-lg border-2 hover:border-primary duration-500 text-start overflow-hidden"
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
            <a
              href="/catalogue/restaurants"
              className="text-lg mx-auto active:translate-y-1 active:scale-90 font-medium duration-300 py-2 px-8 text-white bg-primary rounded-xl w-fit"
            >
              See All Restaurants
            </a>

            <h1 className="text-4xl mt-8 font-bold text-center">
              Featured Foods
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {foods.slice(0, 4).map((food) => (
                <button
                  key={food.idMeal}
                  onClick={() => navigate(`/food/${food.idMeal}`)}
                  className="border-2 hover:border-primary duration-500 text-start overflow-hidden rounded-lg"
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
            <a
              href="/catalogue/foods"
              className="text-lg mx-auto active:translate-y-1 active:scale-90 font-medium duration-300 py-2 px-8 text-white bg-primary rounded-xl w-fit"
            >
              See All Foods
            </a>
          </div>
        </div>
        <div className="bg-primary">
          <div className="bg-[#EDEEF3] rounded-b-[100px] h-[50px]"></div>
        </div>
        <div className=""></div>
      </div>

      <div className="bg-primary py-12 flex flex-col gap-3">
        <h1 className="text-4xl text-white font-bold text-center">
          Testimonials
        </h1>

        <div className="max-w-[1000px] mx-auto gap-x-4 auto-cols-[48%] lg:auto-cols-[49.2%] grid  overflow-x-scroll grid-flow-col w-full snap-x snap-mandatory p-4 ">
          {customerReviews.map((restaurant) => (
            <div
              key={`${restaurant.name} featured restaurant`}
              className="flex flex-col justify-between gap-4 bg-[#2c3333] group hover:bg-white duration-500 w-full rounded-lg p-4 border-b-[6px] border-[#00c2cb]"
            >
              <div className="flex justify-between ">
                <h2 className="text-[#00c2cb] font-bold text-xl">
                  {restaurant.name}
                </h2>
                <div className="text-yellow-400 font-bold text-yellow flex gap-1 items-center">
                  <Star size={20} className="" fill="rgb(250,204,1)" />
                  <p>{restaurant.rating}</p>
                </div>{" "}
              </div>
              <p className="text-center group-hover:text-black text-white font-bold">
                {restaurant.customerReviews[0].review}
              </p>
              <div className="font-medium text-end text-[#00c2cb]">
                <p>{restaurant.customerReviews[0].name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
