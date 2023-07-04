export const config = {
    server: {
        port    : process.env.PORT || 3000,
    },
    mongo: {
        server  : process.env.MONGO_SERVER,
        db      : process.env.MONGO_DB,
    },
    jwt : {
        key     : process.env.JWT_KEY,
    },
};
