/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [{
            source: '/',
            destination: '/dashboard',
            permanent: true,
        }, ];
    },
    async headers() {
        return [{
            // matching all API routes
            source: "/(.*)",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Allow", value: "GET,POST" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }];
    },

}

module.exports = nextConfig
