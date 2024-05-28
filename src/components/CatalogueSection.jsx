import { Beef, MessageCircle, Utensils } from "lucide-react";
import React from "react";



const CatalogueSection = () => {
  return (
    <div className="my-16">
      <h1 className="font-bold text-4xl text-center mb-9">
        Our Catalogue Consist of
      </h1>
      <div className="flex justify-around items-center mx-auto w-[90%] max-w-[1024px]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center text-primary font-bold text-[40px]">
            <Utensils size="40" />
            <h2>20</h2>
          </div>
          <p className="text-tertiary text-xl">Restaurants</p>
        </div>

      <a href="catalogue?type=foods">
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center text-primary font-bold text-[40px]">
            <Beef size="40" />
            <h2>8</h2>
          </div>
          <p className="text-tertiary text-xl">Foods</p>
        </div>
      </a>
        
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center text-primary font-bold text-[40px]">
            <MessageCircle size="40" />
            <h2>50+</h2>
          </div>
          <p className="text-tertiary text-xl">Reviews</p>
        </div>
      </div>
    </div>
  );
};

export default CatalogueSection;
