const Router = require('express');
const User = require('../models/User');
const router = new Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post(
  // функция регистрации юзера
  '/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check(
      'password',
      'Password must be longer than 3 and shorter than 12'
    ).isLength({ min: 3, max: 12 }),
  ], // массив валидации данных с библиотечкой express-validator
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Uncorrect request', errors });
      } // проверка на ввод пустых значений/неправильных
      const { email, password } = req.body; // вытянули из тела запроса переменные

      const candidate = await User.findOne({ email }); // выборка одного юзера

      if (candidate) {
        // проверка на валидный эмейл
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }

      const hashPassword = await bcrypt.hash(password, 8); // хэш пароля

      const user = new User({ email, password: hashPassword }); // создали объект конкретного юзера
      await user.save();
      return res.json({ message: 'User was created' });
    } catch (error) {
      console.log(error);
      res.send({ message: 'Server error' });
    }
  }
);

router.post(
  // функция авторизации юзера
  '/login',
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return res.status(404).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
        expiresIn: '1h',
      });
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({ message: 'Server error' });
    }
  }
);

module.exports = router;
