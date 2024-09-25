import React, { useState } from "react";
import { useSelector } from "react-redux";

const profile = (props) => {
    const products = useSelector((state) => state.orebiReducer.products);
    return (
        <div>
            <h3>Hi {products.first_name}</h3>
        </div>
    );
}