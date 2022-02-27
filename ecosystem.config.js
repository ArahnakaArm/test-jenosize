module.exports = {
    apps: [
        {
            name: 'app',
            script: 'index.js',
            env: {
                PORT: 3000,
                NODE_ENV: 'development',
                service: {
                    db: {
                        default: {
                            ip: 'cluster0.h2qmi.mongodb.net',
                            path: 'test-db',
                            user: '2api3r',
                            pass: 'a0899752124',
                        },
                    },
                    googleApi: {
                        placeUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                        key: 'AIzaSyDR5SFb0ksdgYZmB5lac8PhWvtLIFy3VNk',
                    },
                },
            },
            env_production: {
                PORT: 80,
                NODE_ENV: 'production',
                service: {
                    db: {
                        default: {
                            ip: 'cluster0.h2qmi.mongodb.net',
                            path: 'test-db',
                            user: '2api3r',
                            pass: 'a0899752124',
                        },
                    },
                    googleApi: {
                        placeUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                        key: 'AIzaSyDR5SFb0ksdgYZmB5lac8PhWvtLIFy3VNk',
                    },
                },
            },
        },
    ],
};
