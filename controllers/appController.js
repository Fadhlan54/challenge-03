const pingServer = (req, res) => {
  res.status(200).json({
    message: "ping succesfully",
  });
};

module.exports = { pingServer };
