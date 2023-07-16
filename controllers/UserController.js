const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const userController = {
  register: async (req, res) => {
    try {
      const {
        account, password, name,
      } = req.body;
      const user = await User.findOne({ where: { account } });
      if (user) {
        return res.status(400).json({ message: '此帳號已被註冊' });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      await User.create({
        account,
        password: hash,
        name,
      });
      res.status(200).json({ message: '註冊成功' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { account, password } = req.body;
      const user = await User.findOne({ where: { account } });
      if (!user) {
        return res.status(400).json({ message: '此帳號不存在' });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: '密碼錯誤' });
      }
      const payload = {
        id: user.id,
        account: user.account,
        name: user.name,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1 day' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({ attributes: ['id', 'account', 'name', 'role'] });
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, { attributes: ['id', 'account', 'name', 'role'] });
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.user;
      const { name, password } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({ message: '此帳號不存在' });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      await User.update({ name, password: hash }, { where: { id } });
      res.status(200).json({ message: '更新成功' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({ message: '此帳號不存在' });
      }
      await User.destroy({ where: { id } });
      res.status(200).json({ message: '刪除成功' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
