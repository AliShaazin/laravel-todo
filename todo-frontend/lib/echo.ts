"use client";
import Echo from "laravel-echo";
import io from "socket.io-client";

export const echo = new Echo({
  broadcaster: "socket.io",
  host: "http://localhost:6001",
  client: io,
  path: "/socket.io/",
  transports: ["websocket", "polling"],
});
echo.connector.socket.on("connect", () => {
  console.log("Echo connected successfully!");
});
