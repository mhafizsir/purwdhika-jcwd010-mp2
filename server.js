const express = require("express");
const app = express();
const verifyToken = require("./middleware/authjwt");

app.use(express.json());

require("./routes/auth.routes")(app);

require("./routes/test.routes")(app);

app.use(verifyToken);

require("./routes/post.routes")(app);

require("./routes/comment.routes")(app);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
