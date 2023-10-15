const logger = require("tracer").colorConsole();
const getApiToken = require("./getToken");
const connectDb = require("./dbSetup");
const port = process.env.PORT || 8000;
const allRoutes = require("./routes/routes");

function initializeRoutes(app) {

  
  app.get("/api", (req, res) => {
    res.send("Welcome to the EdTech.");
  });

  app.use("/api", allRoutes);

  const http = require('http').createServer(app);

  return http.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

async function serverApp(app) {
  // 1. Connect to db
  await connectDb();
  // 2. Initialize routes
  return initializeRoutes(app);
}

module.exports = serverApp;
