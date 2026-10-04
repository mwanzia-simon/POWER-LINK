const authenticate = (req, res, next) => {
  const providedKey = req.headers["x-api-key"];
  const validKey = process.env.POWERLINK_API_KEY;

  console.log(providedKey)

  if (!providedKey) {
    return res.status(401).json({
      success: false,
      message: "API key is required",
    });
  }

  if (providedKey !== validKey) {
    return res.status(401).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
};

export default authenticate;