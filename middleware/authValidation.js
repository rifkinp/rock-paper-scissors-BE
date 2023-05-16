validationCheck = () => {
    if (user.id !== req.user.id) {
        res.statusCode = 403; // Forbidden
        return res.json({message: "Not authorized to update this user"});
    }
};

module.exports = validationCheck;
