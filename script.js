const { client } = require('./subscription.js')

const blogsDiv = document.getElementById("blogs");
const createBlogForm = document.getElementById("post-form");

function getAllBlogs() {
  const query = `
    query {
      blogs {
        blogs {
          id
          title
          author
        }
      }
    }
  `;

  client.query(query).toPromise().then(result => {
    const blogs = result.data.blogs.blogs;
    blogs.forEach((blog) => {
      const blogDiv = document.createElement("div");
      blogDiv.innerHTML = `
          <h3>title: ${blog.title}</h3>
          <p>author: ${blog.author}</p>
          `;
      blogsDiv.appendChild(blogDiv);
    });
  });

  const subscriptionQuery = `
    subscription {
      reviewBlog {
        id
        title
        author
      }
    }
  `;

  const subscription = client.subscription(subscriptionQuery);

  subscription.subscribe(({ data }) => {
    const newBlog = data.reviewBlog;
    const blogDiv = document.createElement("div");
    blogDiv.innerHTML = `
          <h3>title: ${newBlog.title}</h3>
          <p>author: ${newBlog.author}</p>
          `;
    blogsDiv.appendChild(blogDiv);
  });
}

getAllBlogs();

createBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation {
        createBlog(title: "${title}", author: "${author}") {
          errors,
          id
        }
      }`
    })
  });
});