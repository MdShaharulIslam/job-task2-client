import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Login from "../page/Login";
import { Register } from "../page/Register";
import Display from "../page/Display";


const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    children:[
      {
        path:'/',
        element:<Display/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
]);

export default router;
