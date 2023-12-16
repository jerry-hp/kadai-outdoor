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

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products/:category" element={<FilterProducts />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SingUp />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
