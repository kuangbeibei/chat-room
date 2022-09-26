import { createRoot } from "react-dom/client";
import "./styles/app.css";
import App from "./App";

const rootNode = document.getElementById("root");
if (rootNode) {
	createRoot(rootNode).render(<App />);
}
