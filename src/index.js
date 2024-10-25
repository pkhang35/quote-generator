import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Đảm bảo đường dẫn chính xác
import "./index.css"; // Đảm bảo tập tin CSS chính xác

import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    {/* Chứa toàn bộ thành phần của ứng dụng */}
    {/* Router của React Router s�� quản lý trang web */}
    {/* App là một component chứa toàn bộ các component con */}
    {/* React Router s�� điều hướng đến component con phù h��p với trang hiện tại */}
    
    <App />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
