const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  const result = blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);

  return result;
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr));
};

const mostBlog1 = (blogs) => {
  const result = blogs.reduce((p, c) => {
    const known = p.find((f) => f.author === c.author);
    if (!known) {
      return p.concat({ author: c.author, blogs: 1 });
    }
    known.blogs++;
    return p;
  }, []);
  return result.reduce((a, b) => (a.blogs > b.blogs ? a : b));
};

const mostLikes = (blogs) => {
  const result = blogs.reduce((p, c) => {
    const tempObj = p.find((f) => f.author === c.author);
    if (!tempObj) {
      return p.concat({ author: c.author, likes: c.likes });
    }
    tempObj.likes += c.likes;
    return p;
  }, []);

  return result.reduce((a, b) => (a.likes > b.likes ? a : b));
};

// return author of least number of blog
const minBlog = (blogs) => {
  const result = blogs.reduce((prevv, currv) => {
    const known = prevv.find((p) => p.author === currv.author);
    if (!known) return prevv.concat({ author: currv.author, blogs: 1 });
    known.blogs++;

    return prevv;
  }, []);
  console.log(result);
  return result.reduce((a, b) => (a.blogs < b.blogs ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog1,
  mostLikes,
  minBlog,
};
