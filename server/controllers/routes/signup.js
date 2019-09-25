const { hashPassowrd } = require('../utils/password');
const { addUser } = require('../../db/queries/addUser');
const { addHandyman } = require('../../db/queries/addHandyman');
const { handymanSchema } = require('../validationSchemas/handymanSchema');
const { clientSchema } = require('../validationSchemas/clientSchema');
const { createToken } = require('../utils/cookie');

module.exports = async (req, res, next) => {
  const user = req.body;
  const { isHandyman } = user;
  try {
    await clientSchema.validate(user);
    if (isHandyman) await handymanSchema.validate(user);

    user.password = await hashPassowrd(user.password);

    let addedUser = (await addUser(user)).rows[0];
    delete addedUser.password;

    let addedHandyman = '';
    if (isHandyman) {
      user.id = addedUser.id;
      addedHandyman = (await addHandyman(user)).rows[0];
      delete addedHandyman.handyman_id;
    }

    const token = await createToken({
      id: addedUser.id,
      email: addedUser.email,
      username: addedUser.username,
      isHandyman: addedUser.is_handyman,
    });
    res.cookie('jwt', token);

    if (addedHandyman) addedUser = { ...addedUser, ...addedHandyman };
    res.send({ data: addedUser, statusCode: 200 });
  } catch (e) {
    if (e.name === 'ValidationError' || e.code === '23505') {
      res.status(400).send({
        message: e.message,
        statusCode: 400,
      });
    } else {
      next(e);
    }
  }
};
