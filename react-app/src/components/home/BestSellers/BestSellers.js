import React, {useState, useEffect} from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";
const {getRequest} = require('../../../utils/request');

const BestSellers = () => {
  const [slides, setSlides] = useState([]);

  useEffect(()=> {
    const setSliderSlides = async () => {
      const bestSelling = await getRequest("best_selling", localStorage.getItem("token"));
      console.log(bestSelling);
      setSlides(bestSelling.data.products)
    }
    setSliderSlides();
  },[])
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {slides ? slides.map((slide, index) => (
          <Product 
          key={index}
          productName={slide.name}
          img={slide.image_url}
          price={slide.price}
          des={slide.description} />
        )): {}}
      </div>
    </div>
  );
};

export default BestSellers;
