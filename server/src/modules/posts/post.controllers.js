import fs from 'fs';
import models from '../../model/init-models.js';

export const getAllPosts = async (req, res) => {
  try {
    const result = await models.posts.findAll({
      order: [['id', 'DESC']],
      include: {
        model: models.users,
        as: 'user',
        required: true,
        attributes: ['nama', 'username', 'image'],
      },
    });
    res.status(200).json({
      message: 'Get all posts success',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const dataUser = await models.users.findOne({
      where: {
        id: +userId,
      },
    });

    if (!dataUser) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }

    const result = await models.posts.findAll({
      order: [['id', 'DESC']],
      include: {
        model: models.users,
        as: 'user',
        required: true,
        attributes: ['nama', 'username', 'image'],
      },
      where: {
        user_id: +userId,
      },
    });

    res.status(200).json({
      message: 'Get all posts success',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await models.posts.findOne({
      order: [['id', 'DESC']],
      include: {
        model: models.users,
        as: 'user',
        required: true,
        attributes: ['nama', 'username', 'image'],
      },
      where: {
        id: +id,
      },
    });

    result === null
      ? res.status(404).json({
          message: `Post with id ${id} not found`,
        })
      : res.status(200).json({
          message: 'Get detail post success',
          data: result,
        });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    if (req.errorValidateFile) {
      return res.status(400).json({ message: req.errorValidateFile });
    }

    const { caption } = req.body;

    // custom req from decoded jwt checkAuth
    const userId = req.userId;

    let image = req.file;
    if (!image) {
      return res.status(400).json({
        message: 'Gambar wajib diisi',
      });
    } else {
      image = image.path;
    }

    const result = await models.posts.create(
      {
        user_id: userId,
        caption,
        image: image,
        createdat: new Date(),
      },
      {
        returning: true,
      }
    );

    res.status(201).json({
      message: 'Berhasil menambah post',
      data: result,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    if (req.errorValidateFile) {
      return res.status(400).json({ message: req.errorValidateFile });
    }

    const { id } = req.params;
    const { caption } = req.body;

    // custom req from decoded jwt checkAuth
    const userId = req.userId;

    const postData = await models.posts.findOne({
      where: {
        id: +id,
      },
    });

    if (!postData) {
      return res.status(404).json({ message: `Post with id ${id} not found` });
    }

    if (postData.user_id !== +userId) {
      return res.status(401).json({ message: `Unauthorized` });
    }

    let image = req.file;
    if (!image) {
      image = postData.image;
    } else {
      image = image.path;
    }

    const result = await models.posts.update(
      {
        caption,
        image: image,
      },
      {
        where: {
          id: +id,
        },
        returning: true,
      }
    );

    if (req.file) {
      fs.unlinkSync(postData.image);
    }

    res.status(200).json({
      message: 'Berhasil mengubah data post',
      data: result,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    // custom req from decoded jwt checkAuth
    const userId = req.userId;

    const { id } = req.params;

    const postData = await models.posts.findOne({
      where: {
        id: +id,
      },
    });

    if (!postData) {
      return res.status(404).json({ message: `Post with id ${id} not found` });
    }

    if (postData.user_id !== +userId) {
      return res.status(401).json({ message: `Unauthorized` });
    }

    const destroyPost = await models.posts.destroy({
      where: {
        id: +id,
      },
    });

    if (fs.existsSync(postData.image)) {
      fs.unlinkSync(postData.image);
    }

    res.status(200).json({
      message: `Berhasil menghapus post dengan id ${id}`,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
