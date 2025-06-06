import ratemimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratemimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.log("Error in rateLimiter middleware", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export default rateLimiter;
