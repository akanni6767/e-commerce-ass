import { useNavigate } from "react-router-dom";
import "../../styles/product_details.scss";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/admin/sidebar";
import ProductInfo from "./product_info";
import { useEffect, useState } from "react";
import '../../styles/product_details.scss';
import { ArrowLeft } from "lucide-react";
import api from "../../context/api";
import {useParams} from 'react-router-dom';

const ProductDetails = () => {
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
    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setOpenSidebar(!isSidebarOpen);
        }
    }
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                setOpenSidebar(true);
            } else {
                setOpenSidebar(false);
            }
        };

        // Set initial state
        handleResize();

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="flex w-full bg-gray-100">
            <Helmet>
            <title>Products | Admin | Mera Bestie</title>
            </Helmet>
            <Sidebar handleSidebar={true} isOpen={isSidebarOpen} sidebarWidth={toggleSidebar} />

            <div className={`${isSidebarOpen ? 'pl-64' : 'pl-20'} w-full`}>
                {product._id}
                <header className="product_header px-4 w-full">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Details</h1>
                    <div className="product_header_button flex justify-between">
                        <button className="text-gray-900 hover:text-gray-700 flex gap-2" onClick={() => navigate(-1)}><ArrowLeft />Back to Products</button>
                        <div className="product_updates">
                            {/* <button className="transition-all rounded-md bg-slate-400 px-6 py-1 ml-auto text-gray-50 hover:bg-slate-500" onClick={() => navigate('/admin/edit-product/6751f73eecca9fe8f7891e57')}>Edit Product</button> */}
                            <button className="transition-all rounded-md bg-red-700 px-6 py-1 ml-4 text-gray-50 hover:bg-red-800" onClick={() => navigate('/admin/delete-product/6751f73eecca9fe8f7891e57')}>Delete Product</button>
                        </div>
                    </div>
                </header>
                <ProductInfo productId={true} role="Admin" title="Product Details | Mera Bestie" />
            </div>
        </div>
    )
}

export default ProductDetails;