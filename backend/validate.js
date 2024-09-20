const zod = require("zod");

const validationRule = zod.object({
    Username: zod.string().min(4).max(50), // Increased max length to 50
    Password: zod.string()
        .min(5)
        .max(16)
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[0-9]/, "Must contain a number"),
    FirstName: zod.string().min(2).max(10), // Adjust this if necessary
    LastName: zod.string().min(3).max(10)   // Adjust this if necessary
});

module.exports = { validationRule };
