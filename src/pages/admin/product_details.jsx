import { useNavigate } from "react-router-dom";
import "../../styles/product_details.scss";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/admin/sidebar";
import ProductInfo from "./product_info";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const [isSidebarOpen, setOpenSidebar] = useState(true);
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
        <div className="flex w-full">
            <Helmet>
            <title>Products | Admin | Mera Bestie</title>
            </Helmet>
            <Sidebar handleSidebar={true} isOpen={isSidebarOpen} sidebarWidth={toggleSidebar} />
            <div className={`${isSidebarOpen ? 'pl-64' : 'pl-20'} w-full`}>
                <ProductInfo product='6751f73eecca9fe8f7891e57' role="Admin" title="Product Details | Mera Bestie" />
            </div>
        </div>
    )
}

export default ProductDetails;