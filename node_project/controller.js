let xyz = (req, res) => {
  res.send({
    Name: [{ name: "Ritu", position: "Angular Developer" }],
  });
};

module.exports = {
  xyz
};
