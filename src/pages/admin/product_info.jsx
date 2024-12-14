import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import api from "../../context/api";
import { Link } from "react-router-dom";
import { FaHeart, FaShare } from "react-icons/fa";
import { Heart, MessageSquare, Share, Share2, Share2Icon, ShareIcon } from "lucide-react";

// Style
import '../../styles/product_details.scss';

const ProductInfo = (props) => {
    const [productDetails, setProductDetails] = useState({})
    // api.get(`/product/${props.product}`)
    // .then(response => {
    //     const data = response.data;
    //     const product_details = data.product;
    //     const [originalPrice, discountedPrice] = product_details.price.split(/\s+/);
    //     product_details.originalPrice = originalPrice;
    //     product_details.discountedPrice = discountedPrice;
    //     setProductDetails(product_details);
    // })
    // .catch(err => {
    //     console.log(err);
    // })
    return (
        <>
            <Helmet >
                <title>{props.role} | {props.title}</title>
            </Helmet>
            <section className="productDetails">
                <header>
                    <ul>
                        <li><Link to='/admin/products'>Product</Link></li>
                        <li>Product Details</li>
                        <li>Category</li>
                        <li></li>
                    </ul>
                </header>
                <div className="productDetail">
                    <div className="productImages">
                        <div className="displayImages">
                            <div className="display_image">
                                <img src="/src/components/Images/img1.jpg" alt="Product Image" />
                            </div>
                            <div className="product_images">
                                <ul>
                                    <li><img src="/src/components/Images/img2.jpg" alt="product image 1" /></li>
                                    <li><img src="/src/components/Images/img4.jpg" alt="product image 1" /></li>
                                    <li><img src="/src/components/Images/img2.jpg" alt="product image 1" /></li>
                                    <li><img src="/src/components/Images/img4.jpg" alt="product image 1" /></li>
                                </ul>
                            </div>
                        </div>
                        <div className="product_tools">
                            <div className="share_like">
                                <ul>
                                    <li><Share /></li>
                                    <li><Heart /></li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    <div className="productDescription">
                        heli
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductInfo;