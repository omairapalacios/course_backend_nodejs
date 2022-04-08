const isAdmin = (req, res, next) => {
  console.log(req);
  try {
    const role = req.body.admin;
    if (role) {
      next();
      return;
    }
    return res
      .status(403)
      .json({
        error: 403,
        message: `Access Denied – You don’t have permission to access ${req.baseUrl}`,
      });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

module.exports = isAdmin;