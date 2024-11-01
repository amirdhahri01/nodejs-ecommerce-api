import http from "http"
import app from "./app/app.js"

//Create the server
const PORT = process.env.PORT || 4000;
const server = http.createServer(app)
server.listen(PORT ,  console.log(`Server is running on http://localhost:${PORT}`));
