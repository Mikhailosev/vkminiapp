import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import connect from "@vkontakte/vk-connect";
import App from "./App";
// import registerServiceWorker from './sw';

// Init VK  Mini App
connect.send("VKWebAppInit", {});
window.onload = () => {
  if (localStorage.getItem("theme") === "client-light") {
    document.body.setAttribute("scheme", "client_dark");
  }
  if (localStorage.getItem("theme") === "client-dark") {
    document.body.setAttribute("scheme", "");
  }
  console.log(document.body);
};

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT
// registerServiceWorker();

ReactDOM.render(<App />, document.getElementById("root"));
