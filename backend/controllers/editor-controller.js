const checkEditor = require('../utils/editor');
const catchAsync = require('../utils/catch-async');

exports.checkArticle = catchAsync(async (req, res, next) => {
  const { article } = req.body;

  const data = await checkEditor(article);

  res.status(200).json({
    status: 'success',
    data: {
      answer: data,
    },
  });
});
