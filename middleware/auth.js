const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const tokenArr = token.split('.');
    const userId = tokenArr[2];
    const tokenStart = tokenArr[1];

    const user = await User.findOne({ _id: userId, 'tokens.token': token }).select('-password');

    if (Date.now() - Number(tokenStart) > 10000) {
      user.tokens = user.tokens.filter(tokenItem => {
        return tokenItem.token !== token;
      });

      await user.save();

      return res.status(401).send({ error: 'Please authenticate' });
    }

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
