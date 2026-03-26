import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup middleware
app.use(cors());
app.use(helmet());

// Parse JSON bodies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Healt check: http://localhost:${PORT}/health`);
});

export default app;
