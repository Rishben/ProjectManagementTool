import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import LRViewContextProvider from "./context/LoginView/ViewContextProvider.jsx";
import ProjectViewContextProvider from "./context/ProjectView/ViewContextProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LRViewContextProvider>
      <ProjectViewContextProvider>
        <Theme>
          <App />
        </Theme>
        </ProjectViewContextProvider>
    </LRViewContextProvider>
  </StrictMode>
);
