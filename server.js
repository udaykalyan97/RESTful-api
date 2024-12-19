import express, { json } from "express";                                                        //express module import

const app = new express();                                                                      //create new server

// Start the server
app.listen(5100, (res) => {
    console.log("Server is running on port 5100");                                              //Starting server on port 5100
});

// Middleware for logging request details
app.use((req, res, next) => {
    const sendRequest = res.send;

    res.send = function (body) {
        try {
            const responseBody = JSON.parse(body);                                              // Parse the JSON body if possible
            console.log(`\n[${new Date().toISOString()}]\n
                        METHOD: ${req.method}\n
                        URL: ${req.url}\n
                        CODE: ${res.statusCode}\n
                        MESSAGE: ${responseBody.message || "No message provided"}\n`);
        } catch (error) {
            console.log(`\n[${new Date().toISOString()}]\n
                            METHOD: ${req.method}\n
                            URL: ${req.url}\n
                            CODE: ${res.statusCode}\n
                            MESSAGE: Response is not JSON`);
        }
        return sendRequest.call(this, body);                                                    // Call the original `res.send` to complete the response
    };

    next();                                                                                     //Pass to the next Layer
});


// Middleware for parsing JSON requests
app.use(express.json());

const users = [
    {
        "id": "1",
        "firstName": "Uday",
        "lastName": "Kalyan",
        "hobby": "Learning"
    },
    {
        "id": "2",
        "firstName": "Ananya",
        "lastName": "Sharma",
        "hobby": "Reading"
    },
    {
        "id": "3",
        "firstName": "Rahul",
        "lastName": "Verma",
        "hobby": "Traveling"
    },
    {
        "id": "4",
        "firstName": "Sanjana",
        "lastName": "Iyer",
        "hobby": "Cooking"
    },
    {
        "id": "5",
        "firstName": "Arjun",
        "lastName": "Patel",
        "hobby": "Gaming"
    },
];

// Fetching user data
app.get("/users", (req, res) => {
    res.status(200).json({message:"All Users List",users});                                     // Send status 200 and OK message
});

// Fetch a particular user by ID
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;                                                               // Get the user ID from the URL parameter
    const user = users.find(u => u.id === userId);                                              // Search for the user by ID

    if (!user) {
        return res.status(404).json({ message: "User not found" });                             // If no user found, return 404
    }

    res.status(200).json({message: "Found user", user});                                        // Return the user details
});


// Adding a new user
app.post("/user", (req, res) => {
    const { firstName, lastName, hobby } = req.body;
    
    if (!firstName || !lastName || !hobby) {                                                    // Check if any of the required fields (firstName, lastName, hobby) are missing 
        return res.status(400).json({ 
            message: "All fields (firstName, lastName, hobby) are required"                     // If any field is missing, return a 400 Bad Request response with an error message
        });
    }

    const newUser = {
        "id": (users.length + 1).toString(),                                                    // Generate ID by taking the length of the user array and adding 1
        "firstName": firstName, 
        "lastName": lastName,   
        "hobby": hobby,         
    };

    users.push(newUser);                                                                        // Add the new user to the users array

    res.status(201).json({
        message: "User Added",                                                                  // Success message
        user: newUser,                                                                          // Newly created user object
        users                                                                                   // List of all users (including the new user)
    });
});



// Updating a user by ID
app.put("/user/:id", (req, res) => {
    const userId = req.params.id;                                                               // Get the user ID from the URL parameter
    const user = users.find(user => user.id === userId);                                        // Find the user by ID

    if (!user) {
        return res.status(404).json({ message: "User with this ID does not exist" });
    }

    const keys = Object.keys(req.body);                                                         // Get the keys from the request body

    keys.forEach(key => {
        if (user.hasOwnProperty(key)) {                                                         // Check if the user has the property
            user[key] = req.body[key];                                                          // Update the user property
        }
    });

    res.status(202).json({
        message: "User Updated",
        user,                                                                                   // Send back the updated user
        users                                                                                   // Optionally, send the full list of users
    });
});

// Deleting a user by ID
app.delete("/user/:id", (req, res) => {
    const userId = req.params.id;                                                               // Extract the user ID from the URL parameters
    const user = users.find(user => user.id === userId);                                        // Find the user by ID in the users array

    if (!user) {
        return res.status(404).json({ message: "User Not Found" });                             // If the user is not found, return a 404 Not Found response with an error message
    }
                
    const filteredUsers = users.filter((user) => user.id !== userId);                           // Filter out the user from the users array based on the ID

    res.status(200).json({ 
        message: "User Deleted",                                                                // Success message
        users: filteredUsers                                                                    // List of users after deletion
    });
});


