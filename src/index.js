import { dbConnect } from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 5000;


dbConnect()
.then(() => {
  app.listen(port, () => {
    console.log("Server is live at ", port);
  })
})
.catch((err) => {
    console.log("error while connecting DB", err)
    throw err;
})