import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SingUp from "./pages/SingUp";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PrivateRoute from "./components/privateRoute";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import Profile from "./pages/Profile";
import { QueryClientProvider, QueryClient } from "react-query";
import FilterProducts from "./pages/FilterProducts";
import DetailProduct from "./pages/DetailProduct";
import Admin from "./admin/FormProduct";
import PrivateAdmin from "./components/PrivateAdmin";
import CrateProduct from "./admin/CreateProduct";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route
                    path="/"
                    element={
                      <>
                        <Header />
                        <Home />
                      </>
                    }
                  />
                  <Route
                    path="/products/:category"
                    element={
                      <>
                        <Header />
                        <FilterProducts />
                      </>
                    }
                  />
                  <Route
                    path="/detail-product/:id"
                    element={
                      <>
                        <Header />
                        <DetailProduct />
                      </>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <>
                        <Header />
                        <Profile />
                      </>
                    }
                  />
                </Route>
                <Route
                  path="/sign-in"
                  element={
                    <>
                      <Header />
                      <SignIn />
                    </>
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <>
                      <Header />
                      <SingUp />
                    </>
                  }
                />
                <Route element={<PrivateAdmin />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/create-product" element={<CrateProduct />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
