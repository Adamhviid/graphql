const blogsDiv = document.getElementById("blogs");
const createButton = document.getElementById("create-button");
const updateButton = document.getElementById("update-button");
const deleteButton = document.getElementById("delete-button");

fetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `query {
        getBlogs {
          id,
          title,
          author
        }
      }`
  })
})
  .then((res) => res.json())
  .then((res) => {
    for (const blog of res.data.getBlogs) {
      const blogDiv = document.createElement("div");
      blogDiv.innerHTML = `
          <h3>title: ${blog.title}</h3>
          <p>author: ${blog.author}</p>
          <p>id: ${blog.id}</p>
        `;
      blogsDiv.appendChild(blogDiv);
    }
  });


createButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const title = document.getElementById("post-title").value;
  const author = document.getElementById("post-author").value;

  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation {
        createBlog(title: "${title}", author: "${author}") {
          id,
          title,
          author
        }
      }`
    })
  });

  const { data } = await response.json();
  console.log(data);

  if (data.createBlog) {
    const phoneNumberResponse = await fetch("Sms/phoneNumbers.txt");
    const phoneNumbers = await phoneNumberResponse.text();

    const numbersArray = phoneNumbers.split("\n");

    for (const number of numbersArray) {
      console.log(number);
      await fetch("http://localhost:4000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_api_key: "INSERT API KEY HERE",
          sms_to_phone: number,
          sms_message: author + " just posted a new blog titled " + title
        })
      })
    }
  }
});

updateButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const id = document.getElementById("update-id").value;
  const title = document.getElementById("update-title").value;
  const author = document.getElementById("update-author").value;

  await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation {
        updateBlog(id: "${id}", title: "${title}", author: "${author}") {
          id,
          title,
          author
        }
      }`
    })
  });
})

deleteButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const id = document.getElementById("delete-id").value;

  await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation {
        deleteBlog(id: "${id}") {
          id,
          title,
          author
        }
      }`
    })
  });
})