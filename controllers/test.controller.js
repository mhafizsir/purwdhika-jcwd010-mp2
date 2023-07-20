exports.firstController = async (req, res, next) => {
  res.status(200).send({ message: "first" });
};

exports.secondController = async (req, res, next) => {
  res.status(200).send({ message: "second" });
};
