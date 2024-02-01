import "./App.css";
import ArtGrid from "./components/ArtGrid";
import Details from "./components/Details"
import Landing from "./pages/Landing";
import RootLayout from './layouts/RootLayout'
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<ArtGrid />} />
      <Route path="landing" element={<Landing />}  />
      <Route path="details/:Id" element={<Details />}  />
    </Route>
  ),
);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
