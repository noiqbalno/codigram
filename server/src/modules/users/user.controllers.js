import models from '../../model/init-models.js';
import { validationResult } from 'express-validator';
import { decryptField, encryptField } from '../../helpers/hashBcrypt.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';

export const getAllUser = async (req, res) => {
  try {
    const result = await models.users.findAll();
    res.status(200).json({ message: 'Get all data users', data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await models.users.findOne({
      where: {
        id: +id,
      },
    });

    if (!result) {
      return res.status(404).json({
        message: `User by id ${id} not found`,
      });
    }

    res.status(200).json({
      message: `Get data user by id ${id}`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    if (req.errorValidateFile) {
      console.log('error controller validate file');
      return res.status(400).json({ message: req.errorValidateFile });
    }

    const { nama, username, password } = req.body;

    const checkUsername = await models.users.findOne({
      where: {
        username: username,
      },
    });

    if (checkUsername) {
      return res.status(400).json({
        message: `Username ${username} sudah ada, harap masukkan username lain`,
      });
    }

    let image = req.file;
    if (!image) {
      image = 'uploads\\user\\default.png';
    } else {
      image = image.path;
    }

    const hashedPassword = encryptField(password);

    const result = await models.users.create(
      {
        nama,
        username,
        password: hashedPassword,
        image: image,
        createdat: new Date(),
      },
      {
        returning: true,
      }
    );

    res.status(201).json({
      message: 'Berhasil menambah user',
      data: result,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.errorValidateFile) {
      return res.status(400).json({ message: req.errorValidateFile });
    }

    const { id } = req.params;
    const { nama, username, password } = req.body;

    const userdata = await models.users.findOne({
      where: {
        id: +id,
      },
    });

    if (!userdata) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    // check username
    const checkUsername = await models.users.findOne({
      where: {
        username: username,
      },
    });

    if (checkUsername && userdata.username !== checkUsername.username) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: `Username ${username} sudah ada, harap masukkan username lain`,
      });
    }

    let image = req.file;
    if (!image) {
      image = userdata.image;
    } else {
      image = image.path;
    }

    const hashedPassword = encryptField(password);

    const result = await models.users.update(
      {
        nama,
        username,
        password: hashedPassword,
        image: image,
        createdat: new Date(),
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );

    if (req.file) {
      if (userdata.image !== 'uploads\\user\\default.png') {
        fs.unlinkSync(userdata.image);
      }
    }

    const token = jwt.sign(
      {
        id: checkUsername.id,
        nama: checkUsername.nama,
        username: checkUsername.username,
        image: checkUsername.image,
        createdat: checkUsername.createdat,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30d',
      }
    );

    res.status(200).json({
      message: 'Berhasil mengubah data user',
      data: result[1][0],
      accessToken: token,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUsername = await models.users.findOne({
      where: {
        username: username,
      },
    });

    if (!checkUsername) {
      return res.status(400).json({ message: 'Username atau Password Salah' });
    }

    const checkPassword = decryptField(password, checkUsername.password);

    if (!checkPassword) {
      return res.status(400).json({ message: 'Username atau Password Salah' });
    }

    const token = jwt.sign(
      {
        id: checkUsername.id,
        nama: checkUsername.nama,
        username: checkUsername.username,
        image: checkUsername.image,
        createdat: checkUsername.createdat,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30d',
      }
    );

    const result = {
      accessToken: token,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
