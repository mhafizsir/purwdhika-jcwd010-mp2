const prisma = require("../models/comment.model");

exports.create = async (req, res) => {
  const userId = req.userId;

  const { content, postId } = req.body;

  const comment = await prisma.postComment.create({
    data: {
      content: content,
      authorId: userId,
      postId: postId,
    },
  });

  res.status(200).send({ message: "Comment was created successfully!" });
};

exports.getAll = async (req, res) => {
  const comments = await prisma.postComment.findMany({
    include: {
      user: true,
      post: true,
    },
  });

  res.status(200).send(comments);
};

exports.getOne = async (req, res) => {
  const id = req.params.id;

  const comment = await prisma.postComment.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      post: true,
    },
  });

  res.status(200).send(comment);
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const { content } = req.body;

  const comment = await prisma.postComment.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  });

  res.status(200).send({ message: "Comment was updated successfully!" });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  const comment = await prisma.postComment.delete({
    where: {
      id: id,
    },
  });

  res.status(200).send({ message: "Comment was deleted successfully!" });
};
