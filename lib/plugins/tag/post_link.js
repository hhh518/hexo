'use strict';

const { escapeHTML } = require('hexo-util');

/**
 * Post link tag
 *
 * Syntax:
 *   {% post_link slug [title] [escape] %}
 */
module.exports = ctx => {
  const Post = ctx.model('Post');

  return function postLinkTag(args) {
    const slug = args.shift();
    if (!slug) return;

    let escape = args[args.length - 1];
    if (escape === 'true' || escape === 'false') {
      args.pop();
    } else {
      escape = 'true';
    }

    const post = Post.findOne({slug});
    if (!post) return;

    let title = args.length ? args.join(' ') : post.title;
    const attrTitle = escapeHTML(title);
    if (escape === 'true') title = attrTitle;

    return `<a href="${ctx.config.root}${post.path}" title="${attrTitle}">${title}</a>`;
  };
};
