const prisma = require("../models/post.model");

exports.create = async (req, res) => {
  const userId = req.userId;

  const { title, content } = req.body;

  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: userId,
    },
  });

  res.status(200).send({ message: "Post was created successfully!" });
};

exports.getAll = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      PostComment: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      },
    },
  });

  res.status(200).send(posts);
};

exports.getOne = async (req, res) => {
  const id = req.params.id;

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      PostComment: true,
    },
  });

  res.status(200).send(post);
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const { title, content } = req.body;

  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
    },
  });

  res.status(200).send({ message: "Post was updated successfully!" });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  const post = await prisma.post.delete({
    where: {
      id: id,
    },
  });

  res.status(200).send({ message: "Post was deleted successfully!" });
};
