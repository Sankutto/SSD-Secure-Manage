const express = require("express");
const proxy = require("express-http-proxy")
const cors = require("cors");

const app = express();

const corsOption = {
    origin: "*",
}

app.use(cors(corsOption));
app.use(express.json());

// Set up CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Proxy requests to different service
// Use Docker Compose service names in production, localhost for development
const userServiceUrl = process.env.NODE_ENV === 'production' ? "http://user-management:3001" : "http://localhost:3001";
const courseServiceUrl = process.env.NODE_ENV === 'production' ? "http://course-management:3002" : "http://localhost:3002";
const paymentServiceUrl = process.env.NODE_ENV === 'production' ? "http://payment-management:3003" : "http://localhost:3003";
const enrollmentServiceUrl = process.env.NODE_ENV === 'production' ? "http://enrollment-management:3004" : "http://localhost:3004";

app.use("/UserManagementService", proxy(userServiceUrl));
app.use("/CourseManagementService", proxy(courseServiceUrl));
app.use("/PaymentManagementService", proxy(paymentServiceUrl));
app.use("/EnrollmentManagementService", proxy(enrollmentServiceUrl));

// Start the API Gateway
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Gateway is Listening to Port ${PORT}`);
});
