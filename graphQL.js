const blogsDiv = document.getElementById("blogs");
const createBlogForm = document.getElementById("post-form");
import * as dotenv from "dotenv";
dotenv.config();

function getAllBlogs() {
  fetch("http://localhost:4000/graphql?query={ blogs { blogs { id title author } } }")
    .then((res) => res.json())
    .then((res) => {
      const blogs = res.data.blogs.blogs;
      blogs.forEach((blog) => {
        const blogDiv = document.createElement("div");
        blogDiv.innerHTML = `
          <h3>title: ${blog.title}</h3>
          <p>author: ${blog.author}</p>
          `;
        blogsDiv.appendChild(blogDiv);
      });
    });
}

getAllBlogs();

createBlogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  const response = await fetch("http://localhost:4000/graphql", {
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

  const { data } = await response.json();

  if (data.createBlog.errors.length === 0) {
    const phoneNumberResponse = await fetch("phoneNumbers.txt");
    const phoneNumbers = await phoneNumberResponse.text();

    const numbersArray = phoneNumbers.split("\n");

    for (const number of numbersArray) {
      console.log(number);
      await fetch("http://localhost:4000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: process.env.API_KEY,
          phone: number,
          message: author + " just posted a new blog titled " + title
        })
      })
    }
  }
});
