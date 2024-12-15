import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import api from "../../context/api";
import { Link } from "react-router-dom";
import { FaHeart, FaShare, FaStar } from "react-icons/fa";
import { ChevronLeft, Star, ChevronRight, Heart, MessageSquare, Share, Share2, Share2Icon, ShareIcon } from "lucide-react";

// Style
import '../../styles/product_info.scss';
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyImage from "../../context/LazyImage";


const loadRelatedProduct = (productsDetails, category) => {
    const filterPrice = price =>  price.split(/\s+/);
    return productsDetails.map(product => (
            <>
                {product.category == category && 
                    <li>
                        <Link to='/admin/products'>
                            <div className="product_image">
                                <LazyImage src={product.img} alt="Product Image" />
                            </div>
                            <div className="product_info">
                                <h4>{product.name}</h4>
                                <div className="price">
                                    <span className="dis_price">{filterPrice(product.price)[1]}</span>
                                    <span className="original_price">{filterPrice(product.price)[0]}</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                }
            </>
        ));
}
const ProductInfo = (props) => {
    const [productDetails, setProductDetails] = useState({});
    const [productsDetails, setProductsDetails] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
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
        });

    }, [props.productId]);
    
    useEffect(() => {
        api.get('/get-product')
        .then( response => {
            const data = response.data;
            const products = data.products;
            setProductsDetails(products);
        })
        .catch(err => {
            setError("Error fetching products: "+err.message);
            // setIsLoading(false);
            throw new Error('Error fetching products');
        });

    }, [productDetails]);


    const formatAmount = (amount) => {
        if(!amount) {
            return 0;
        }
        return new Intl.NumberFormat('en-US', {
          maximumFractionDigits: 0,
        }).format(amount);
    };
    
      
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
                                {/* <LazyLoadImage src={productDetails.img} alt={productDetails.name} /> */}
                                <LazyImage src={productDetails.img} alt={productDetails.name} />
                            </div>
                            <div className="product_images">
                                <ul>
                                    <li><LazyImage src={productDetails.img} alt={productDetails.name} /></li>
                                    <li><LazyImage src="https://menscollection.ca/cdn/shop/collections/AW24_LONDON_LOOKBOOK_PAGES_MAN_Page_14_copy.jpg?v=1731360654&width=1080" alt={productDetails.name} /></li>
                                    <li><LazyImage src="/src/components/Images/img2.jpg" alt={productDetails.name} /></li>
                                    <li><LazyImage src="/src/components/Images/img4.jpg" alt={productDetails.name} /></li>
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
                                    <span className="original_price">{productDetails.originalPrice}</span>
                                    <h3 className="discount_price">{productDetails.discountedPrice}</h3>
                                </div>
                                <div className="product_review_sold">
                                    <span className="__sold">{formatAmount(productDetails.soldStockValue)} Sold</span>
                                    <small className="separator"></small>
                                    <h3 className="__review"><Star /> {productDetails.rating}</h3>
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
                                    <h3 className="discount_price">{productDetails.discountedPrice}</h3>
                                    <span className="original_price">{productDetails.originalPrice}</span>
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
                                        ({formatAmount(productDetails.rating * 396) } verified ratings)
                                    </li>
                                </ul>
                                <div className="product_available">
                                {formatAmount(productDetails.inStockValue)} available in stock
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
                    {loadRelatedProduct(productsDetails,productDetails.category)}
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