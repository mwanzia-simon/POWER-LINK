const authenticate = (req, res, next) => {
  console.log("Headers:", req.headers);

  const providedKey = req.headers["x-api-key"];
  const validKey = process.env.POWERLINK_API_KEY;

  console.log("Provided key:", providedKey);
  console.log("Valid key:", validKey ? "Loaded" : "Missing");

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