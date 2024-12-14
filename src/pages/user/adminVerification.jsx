import React, {useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/admin_verification.scss';
import { FaCheck, FaLock, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminVerification = () => {
    const navigate = useNavigate();
    const admin_verified = sessionStorage.getItem('adminVerified');
    const [verified, setVerified] = useState(null);
    const [passcode, setPasscode] = useState('');
    const [checkingVerification, setCheckingVerification] = useState(false);
    const [isAdminVerified, setAdminVerify] = useState(JSON.parse(sessionStorage.getItem('adminVerified')));


    useEffect(() => {
        isAdminVerified && navigate('/admin');
    },[isAdminVerified]);

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function loading() {
        setCheckingVerification(true);
        await delay(2000);
        setCheckingVerification(false);
    }
    const verify = async () => {
        const passcode_stored = import.meta.env.VITE_REACT_APP_ADMIN_PASS_CODE;
        console.log(passcode_stored, import.meta.env);
        await loading();
        if(passcode === passcode_stored) {
            toast("Passcode verified!");
            !checkingVerification && setVerified(true);
            sessionStorage.setItem('adminVerified',true)
        }else {
            !checkingVerification && toast.error("Invalid passcode");
            sessionStorage.removeItem('adminVerified');
        }
    };
    
    // after verified
    useEffect(() => {
        const verifyingPasscode = async () => {
            if(verified) {
                await delay(6000);
                navigate('/admin');
            };
        }
        verifyingPasscode();
    },[verified]);
    
    const spinnerStyle = {
        animation: 'spin 1s linear infinite',
    };
    return (
        <>
            <section className="admin_verify">
                <div className="verification_section">
                    <h3 className="company_logo">MERA Bestie</h3>
                    <div className="verify_control">
                        <header>Admin Verification</header>

                        <div className="input_passcode">
                            <label htmlFor="passcode">Passcode</label>
                            <div className="input_group">
                                <FaLock className="faLock" />
                                <input placeholder="Enter Passcode ..." onChange={(e)=> setPasscode(e.target.value)} name="passcode" id="passcode" type="password" />
                                <button 
                                    onClick={verify} 
                                    disabled={checkingVerification}
                                    aria-busy={checkingVerification}
                                >
                                    {verified && (<><FaCheck />Verified</>)}
                                    {checkingVerification ? 
                                        (<><FaSpinner style={spinnerStyle} /> Verifying</>) : 
                                        !verified && "Verify" 
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <ToastContainer 
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </section>
        </>
    )
}

export default AdminVerification;