import { useNavigate } from "react-router-dom";
import "../../styles/product_details.scss";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/admin/sidebar";
import ProductInfo from "./product_info";

const ProductDetails = () => {
    return (
        <div className="flex">
            <Helmet>
            <title>Products | Admin | Mera Bestie</title>
            </Helmet>
            <Sidebar />
            <div className="pl-64">
                <h2>shill</h2>
                <ProductInfo role="Admin" title="Product Details | Mera Bestie" />

            </div>
        </div>
    )
}

export default ProductDetails;