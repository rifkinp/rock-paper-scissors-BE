module.exports = async (req, res, next) => {
  const tokenId = req.token.id.toString();

  try {
    const { userId } = await req.params;

    if (tokenId === userId) {
      next();
    } else {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error Protection Middleware' });
  }

  return null;
};
