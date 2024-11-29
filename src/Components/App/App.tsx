import { Outlet } from "react-router";
import AppHeader from "../AppHeader/AppHeader";
import "./App.scss";

function App() {
  return (
    <div id="app">
      <AppHeader />

      <div id="page-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
