import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import { getRequest } from "../../../utils/request";

const items = paginationItems;

function Items({ currentItems, selectedBrands, selectedCategories }) {
  // Filter items based on selected brands and categories
  console.log(currentItems);
  // const filteredItems = currentItems.filter((item) => {
  //   const isBrandSelected =
  //     selectedBrands.length === 0 ||
  //     selectedBrands.some((brand) => brand.title === item.brand);

  //   const isCategorySelected =
  //     selectedCategories.length === 0 ||
  //     selectedCategories.some((category) => category.title === item.cat);

  //   return isBrandSelected && isCategorySelected;
  // });

  return (
    <>
      {currentItems.map((item) => (
        <div key={item._id} className="w-full">
          <Product
            _id={item.id}
            img={item.image_url}
            productName={item.name}
            price={item.price}
            des={item.description}
            stock={item.stock}
          />
        </div>
      ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [productdata, setProductData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const apiCall = async () => {
    try {
      const response = await getRequest(
        "products",
        localStorage.getItem("token")
      );
      return response.data.products;
    } catch (err) {
      throw new Error('Failed to fetch data');
    }
  };

  useEffect(() => {
    // Define an async function inside useEffect to call apiCall
    const fetchData = async () => {
      try {
        const result = await apiCall();
        console.log(result)
        setProductData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  console.log(productdata)

  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const pageCount = Math.ceil(productdata.length / itemsPerPage);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = productdata.slice(itemOffset, endOffset);
  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productdata.length;
    const newStart = newOffset + 1; // Adjust the start index

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 gap-y-14 mdl:gap-6 lg:gap-10">
        <Items
          currentItems={currentItems}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
        />{" "}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, productdata.length)} of{" "}
          {productdata.length}
        </p>
        <button onClick={() => console.log(selectedBrands)}> test</button>
      </div>
    </div>
  );
};

export default Pagination;
