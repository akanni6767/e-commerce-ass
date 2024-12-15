import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import api from "../../context/api";
import { Link } from "react-router-dom";
import { FaHeart, FaShare, FaStar } from "react-icons/fa";
import { ChevronLeft, Star, ChevronRight, Heart, MessageSquare, Share, Share2, Share2Icon, ShareIcon } from "lucide-react";

// Style
import '../../styles/product_info.scss';

const ProductInfo = (props) => {
    const [productDetails, setProductDetails] = useState({});
    const [productsDetails, setProductsDetails] = useState([]);
    api.get(`/product/${props.productId}`)
    .then(response => {
        const data = response.data;
        const product_details = data.product;
        const [originalPrice, discountedPrice] = product_details.price.split(/\s+/);
        product_details.originalPrice = originalPrice;
        product_details.discountedPrice = discountedPrice;
        setProductDetails(product_details);
    })
    .catch(err => {
        console.log(err);
    })
    return (
        <>
            <Helmet >
                <title>{props.role} | {props.title}</title>
            </Helmet>
            <section className="productDetails">
                <div className="productDetail">
                    <div className="productImages">
                        <div className="displayImages">
                            <div className="display_image">
                                <img src={productDetails.img} alt="Product Image" />
                            </div>
                            <div className="product_images">
                                <ul>
                                    <li><img src="/src/components/Images/img2.jpg" alt="product image 1" /></li>
                                    <li><img src="https://menscollection.ca/cdn/shop/collections/AW24_LONDON_LOOKBOOK_PAGES_MAN_Page_14_copy.jpg?v=1731360654&width=1080" alt="product image 1" /></li>
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
                            <ul>
                                <li><ChevronLeft /></li>
                                <li><ChevronRight /></li>
                            </ul>
                        </div>
                    </div>
                    <div className="productDescription">
                        <header>
                            <div className="product_about">
                                <span className="author_name">John Lewis ANYDAY</span>
                                <h2 className="product_name">{productDetails.name}</h2>    
                            </div>
                            <div className="product_prices_review">
                                <div className="product_price">
                                    <s className="original_price">£400</s>
                                    <h3 className="discount_price">£320</h3>
                                </div>
                                <div className="product_review_sold">
                                    <span className="__sold">1,228 Sold</span>
                                    <small className="separator"></small>
                                    <h3 className="__review"><Star /> 4.3</h3>
                                </div>
                                <hr />
                            </div>
                        </header>
                        <div className="product_details">
                            <div className="product_desc">
                                <h3>Descriptions: </h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, libero non faucibus commodo, justo enim viverra massa, sed consectetur velit mi sit amet neque. Donec sed libero non massa semper eleifend. Donec auctor, velit vel pulvinar semper, felis nunc lobortis enim, et viverra purus est vel est.</p>
                            </div>
                            <div className="product_specs">
                                <div className="product_price">
                                    <h3 className="discount_price">£320</h3>
                                    <s className="original_price">£400</s>
                                </div>
                                <div className="discount_percent">-35%</div>
                            </div>
                            <div className="product_features">
                                <ul className="flex">
                                    <li>
                                        <Star className="fill-amber-300 stroke-amber-300" />
                                        <Star className="fill-amber-300 stroke-amber-300" />
                                        <Star className="fill-amber-300 stroke-amber-300" />
                                        <Star className="fill-amber-300 stroke-amber-300" />
                                        <Star className="stroke-gray-200"  />
                                        (4,332 verified ratings)
                                    </li>
                                </ul>
                                <div className="product_available">
                                    12 available in stock
                                    <small className="separator"></small>
                                    <span className="__stock">In stock</span>
                                </div>
                                <hr />
                                <div className="product_variants">
                                    <span>Available Variants:</span>
                                    <ul>
                                        <li>Size: S</li>
                                        <li>Color: Black</li>
                                    </ul>
                                </div>
                                <hr />
                                <div className="product_size_guide">
                                    100% Comfortable, 10% Slim
                                    <small className="separator"></small>
                                    <span className="__size_guide">Size Guide</span>
                                </div>
                            </div>
                            <div className="product_place_order">
                                <Link to='/admin/checkout'>
                                    <button className="bg-[#6dc522] text-white py-2 rounded-md hover:bg-[#6dc533] w-full transition-colors">
                                        Place Order
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="product_related_products">
                <h3>Related Products:</h3><hr />
                <ul className="related_products">
                    <li>
                        <Link to='/admin/products'>
                            <div className="product_image">
                                <img src="/src/components/Images/img1.jpg" alt="Product Image" />
                            </div>
                            <div className="product_info">
                                <h4>Long Sleeve, Khaki, 6</h4>
                                <div className="price">
                                    <span className="dis_price">$320</span>
                                    <s className="original_price">$420</s>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </section>
            <section className="product_description">
                <h3>Product Description:</h3>
                <hr />
                <div className="description">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, libero non faucibus commodo, justo enim viverra massa, sed consectetur velit mi sit amet neque. Donec sed libero non massa semper eleifend. Donec auctor, velit vel pulvinar semper, felis nunc lobortis enim, et viverra purus est vel est. Sed consectetur, libero non faucibus commodo, justo enim viverra massa, sed consectetur velit mi sit amet neque. Donec sed libero non massa semper eleifend. Donec auctor, velit vel pulvinar semper, felis nunc lobortis enim, et viverra purus est vel est. Sed consectetur, libero non faucibus commodo, justo enim viverra massa, sed consectetur velit mi sit amet neque. Donec sed libero non massa semper eleifend. Donec auctor, velit vel pulvinar semper, felis nunc lobortis enim, et viverra purus est vel est. Sed consectetur,
                    </p>
                    <p>
                        libero non faucibus commodo, justo enim viverra massa, sed consectetur velit mi sit amet neque. Donec sed libero non massa semper eleifend. Donec auctor, velit vel pulvinar semper, felis nunc lobortis enim, et viverra purus est vel est. Sed consectetur, libero non faucibus commodo, justo enim viverra massa, sed consectetur velit mi sit amet neque. Donec sed libero non massa semper eleifend. Donec auctor, velit vel

                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, libero non faucibus commodo, justo enim viverra massa, sed consectetur velit mi sit amet neque. Donec sed libero non massa semper eleifend. Donec auctor, velit vel pulvinar semper, felis nunc lobortis enim, et viverra purus est vel est. Sed consectetur, libero non faucibus commodo, justo enim viverra massa, sed consectetur velit mi sit amet neque. Donec sed libero non massa semper eleifend. Donec auctor, velit vel pulvinar semper, felis nunc lobortis enim, et viverra purus est vel est. Sed consectetur, libero non faucibus commodo, justo enim viverra massa, sed consectetur velit mi sit amet neque. Donec sed libero non massa semper eleifend. Donec auctor, velit vel pulvinar semper, felis nunc lobortis enim, et viverra purus est vel est. Sed consectetur,
                    </p>
                </div>
            </section>
            <section className="product_additional_info">
                <h3>Additional Information:</h3><hr />
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Brand</td>
                            <td>AW24</td>
                        </tr>
                        <tr>
                            <td>Material</td>
                            <td>Cotton</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>Men</td>
                        </tr>
                        <tr>
                            <td>Size</td>
                            <td>S, M, L, XL</td>
                        </tr>
                        <tr>
                            <td>Color</td>
                            <td>Black, White, Khaki</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default ProductInfo;