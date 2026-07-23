const bcrypt = require("bcrypt");

bcrypt.hash('Admin@123', 10).then(console.log);

//to hash admin password and get the hashed value to use in the seed file.