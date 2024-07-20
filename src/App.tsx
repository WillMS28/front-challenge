import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";
import { ToastProvider } from "./components/ui/toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);
function App() {
  return (
    <div className="flex flex-1 bg-white justify-center items-center pb-8 pt-24 max-md:pt-8  overflow-y-auto">
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </div>
  );
}

export default App;
