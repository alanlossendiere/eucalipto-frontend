import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";
import { NextUIProvider } from "@nextui-org/react";

export const EucaliptoApp = () => {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </NextUIProvider>
  );
};
