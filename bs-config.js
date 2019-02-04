module.exports = {
    port: 3000,
    files: [
        "build/**/*.{html,htm,css,js}"
    ],
    ghostMode: false,
    server: {
        baseDir: "build",
        directory: true
    }
};