import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // One bucket per client IP instead of one shared bucket for everyone
    const identifier = req.ip || "anonymous";
    const { success } = await ratelimit.limit(`notes:${identifier}`);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("rate limiter error:", error);
    next(error);
  }
};

export default rateLimiter;