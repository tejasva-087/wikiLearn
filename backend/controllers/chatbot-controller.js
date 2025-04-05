const runAI = require('../utils/chat');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.fivePillers = catchAsync(async (req, res, next) => {
  const knowledge = `The fundamental principles of Wikipedia may be summarized in five "pillars":
  1. Wikipedia is an encyclopedia: Wikipedia combines many features of general and specialized encyclopedias, almanacs, and gazetteers. Wikipedia is not a soapbox, an advertising platform, a social network, a vanity press, an experiment in anarchy or democracy, an indiscriminate collection of information, nor a web directory. It is not a dictionary, a newspaper, nor a collection of source documents, although some of its fellow Wikimedia projects are.
  2. Wikipedia is written from a neutral point of view: We strive for articles with an impartial tone that document and explain major points of view, giving due weight for their prominence. We avoid advocacy, and we characterize information and issues rather than debate them. In some areas there may be just one well-recognized point of view; in others we describe multiple points of view, presenting each accurately and in context rather than as "the truth" or "the best view". All articles must strive for verifiable accuracy with citations based on reliable sources, especially when the topic is controversial or is about a living person. Editors' personal experiences, interpretations, or opinions do not belong on Wikipedia.
  3. Wikipedia is free content that anyone can use, edit, and distribute: All editors freely license their work to the public, and no editor owns an article – any contributions can and may be mercilessly edited and redistributed. Respect copyright laws and never plagiarize from any sources. Borrowing non-free media is sometimes allowed as fair use, but editors should strive to find free alternatives first.
  4. Wikipedia's editors should treat each other with respect and civility: Respect your fellow Wikipedians, even when you disagree. Apply Wikipedia etiquette, and do not engage in personal attacks or edit wars. Seek consensus, and never disrupt Wikipedia to illustrate a point. Act in good faith, and assume good faith on the part of others. Be open and welcoming to newcomers. Should conflicts arise, discuss them calmly on the appropriate talk pages, follow dispute resolution procedures, and consider that there are 6,976,632 other articles on the English Wikipedia to improve and discuss.
  5. Wikipedia has no firm rules: Wikipedia has policies and guidelines, but they are not carved in stone; their content and interpretation can evolve over time. The principles and spirit matter more than literal wording, and sometimes improving Wikipedia requires making exceptions. Be bold, but not reckless, in updating articles. And do not agonize over making mistakes: they can be corrected easily because (almost) every past version of each article is saved.`;

  if (!req.body || typeof req.body.question !== 'string') {
    return next(new AppError('Question is required and must be a string', 400));
  }

  const { question } = req.body;

  const data = await runAI({ knowledge, question });

  res.status(200).json({
    status: 'success',
    data: {
      answer: data,
    },
  });
});
