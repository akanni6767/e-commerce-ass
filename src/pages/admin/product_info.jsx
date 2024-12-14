import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet";

const ProductInfo = (props) => {
    return (
        <>
            <Helmet >
                <title>{props.role} | {props.title}</title>
            </Helmet>
            <h2>Product Details</h2>
        </>
    )
}

export default ProductInfo;