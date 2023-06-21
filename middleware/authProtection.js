validationCheck = (req, res, next) => {
    const {idUser} = req.params;
    const idRequest = req.user.id;
    if (idRequest.toString() !== idUser) {
        return res.send({message: "Not Has Authorization"});
    }
    next();
};

module.exports = {validationCheck};
