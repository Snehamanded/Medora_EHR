module.exports = {
  jwtSecret: process.env.JWT_SECRET || "super-secret-key",
  callBaseUrl: process.env.CALL_BASE_URL || "https://video.medora.dev"
};
