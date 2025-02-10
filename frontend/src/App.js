import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import MyOrders from './pages/MyOrders/MyOrders';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/cart',
      element:<Cart/>
    },
    {
      path:'/order',
      element:<Order/>
    },
    {
      path:'/myorders',
      element:<MyOrders/>
    },
    {
      path:'/ordersuccess',
      element:<OrderSuccess/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
