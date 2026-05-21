const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("DevSecOps Node.js App Running 🚀");
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        message: "Application is healthy"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
