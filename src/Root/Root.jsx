import { Outlet } from "react-router-dom";
import TopNavbar from "../component/Navber";
import { SimpleFooter } from "../component/Footer";



const Root = () => {
    return (
        <>
        <TopNavbar/>
        <Outlet/>
        <SimpleFooter/>
            
        </>
    );
};

export default Root;