import express from "express";
import cors from "cors";
import { config } from "./config";
import usersRoutes from "./routes/users.routes";
import morgan from "morgan";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import recordsRoutes from "./routes/records.routes";
import path from "path";

const app = express();

app.use(
  cors({
    origin: [
      "https://nekonomy.app",
      config.appUrl,
      config.betterAuthUrl,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morgan("dev"));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(recordsRoutes);
app.use(usersRoutes);
app.use("/terms", (req, res) => {
  res.sendFile(path.join(process.cwd(), "pages/terms.html"));
});

app.get("/", (req, res) => {
  res.json({ message: "Running Ok!" });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
