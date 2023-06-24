validationCheck = (req, res, next) => {
  const {idUser} = req.params;
  console.log(req.user);
  const idRequest = req.user.id;
  console.log(idRequest);
  if (idRequest.toString() !== idUser) {
    return res.send({message: "Not Has Authorization"});
  }
  next();
};

module.exports = {validationCheck};
