import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "./RelayEnvironment";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <Suspense fallback={<p>Loading</p>}>
      <App />
    </Suspense>
  </RelayEnvironmentProvider>
);
