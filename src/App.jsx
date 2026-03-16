import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import CreateNewOrder from "./pages/CreateNewOrder";
import OrderMaster from "./pages/OrderMaster";
import OrderApprovalPage from "./pages/OrderApprovalPage";
import ModifyOrders from "./pages/ModifyOrders";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CreateNewOrder />} />
          <Route path="/create-order" element={<CreateNewOrder />} />
          <Route path="/order-master" element={<OrderMaster />} />
          <Route path="/order-approval" element={<OrderApprovalPage />} />
          <Route path="/modify-orders" element={<ModifyOrders />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}