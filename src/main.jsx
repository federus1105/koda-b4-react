  import { createRoot } from "react-dom/client";
  import "./index.css";
  import Router from "./routes/Routes.jsx";
  import { Provider } from "react-redux";
  import { persistor, reduxStore } from "./redux/store";
  import { PersistGate } from "redux-persist/integration/react";
  

  createRoot(document.getElementById("root")).render(
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
  );
