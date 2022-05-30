exports.home = (req, res) => {
  res.status(200).json({
    message: "hello from get user in json format",
  });
};
