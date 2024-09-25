import React,  {useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { getRequest } from "../../../utils/request";

const NewArrivals = () => {

  const [slides, setSlides] = useState([]);

  useEffect(()=> {
    const setSliderSlides = async () => {
      const latestProducts = await getRequest("latest_products", localStorage.getItem("token"));
      console.log(latestProducts);
      setSlides(latestProducts.data.products);
      }
    setSliderSlides();
  },[]);


  return (
    <div className="w-full pb-20">
      <Heading heading="New Arrivals" />
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

export default NewArrivals;
