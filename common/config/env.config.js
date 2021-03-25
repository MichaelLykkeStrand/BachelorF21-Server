module.exports = {
    "port": 3600,
    "appEndpoint": "http://localhost:3600",
    "apiEndpoint": "http://localhost:3600",
    "jwt_secret": "SECRET",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "EVERYONE": 1,
        "STUDENT": 2,
        "INSTRUCTOR": 3,
        "ADMIN": 2048
    }
};
