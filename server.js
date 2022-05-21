// import express
const express = require("express");

// import routes
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// create an express app
const app = express();

// port
const PORT = process.env.PORT || 3005;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// listen to port
app.listen(PORT, () => console.log(`App is now listening on ${PORT}`));
