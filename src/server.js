import app from "./app/app.js";
import { connectDB } from "./config/db.js";

try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });

} catch (error) {
    console.error("Database connection failed:", error);
}