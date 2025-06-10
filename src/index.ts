import { DiamondGrid } from "./models";
import "./styles/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  if (!container) {
    throw new Error("Container element not found");
  }

  new DiamondGrid(container);
});
