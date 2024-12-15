import { useNavigate } from "react-router-dom";
import "../../styles/product_details.scss";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/admin/sidebar";
import { useEffect, useState } from "react";
import '../../styles/product_details.scss';
import { ArrowLeft } from "lucide-react";
import api from "../../context/api";
import {useParams} from 'react-router-dom';
import ProductInfo from "../admin/product_info";

const UserProductDetails = () => {
    const [isSidebarOpen, setOpenSidebar] = useState(true);
    const navigate = useNavigate();
    const [productId, setProductId] = useState(null);
    const [product, setProduct] = useState(null);

    const { id } = useParams();
    useEffect(() => {
        setProductId(id);
    }, [id]);
    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                api.get('/product/' + productId)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    setProduct(data.product);
                })
                .catch(err => {
                    console.error('Failed to fetch product:', err);
                    throw new Error('Failed to fetch product');
                })
            };
            fetchProduct();
        }
    },[productId]);
    return (
        <div className="flex w-full bg-gray-100">
            <Helmet>
            <title>Products | Admin | Mera Bestie</title>
            </Helmet>

            {product && <div className={`w-full`}>
                <header className="product_header px-4 w-full">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Details</h1>
                    <div className="product_header_button flex justify-between">
                        <button className="text-gray-900 hover:text-gray-700 flex gap-2" onClick={() => navigate(-1)}><ArrowLeft />Back to Products</button>
                        
                    </div>
                </header>
                <ProductInfo productId={productId} role="user" title="Product Details | Mera Bestie" />
            </div>}
        </div>
    )
}

export default UserProductDetails;