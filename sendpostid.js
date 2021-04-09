const urlParams = new URLSearchParams(window.location.search);
const artID = urlParams.get("id");
const url =
  "https://kea21-7e1e.restdb.io/rest/t9-post/" + artID + "?fetchchildren=true";

fetch(url, {
  method: "GET",
  headers: {
    "x-apikey": "602f9e445ad3610fb5bb63d5",
  },
})
  .then((res) => res.json())
  .then((response) => {
    console.log(response);
    showPosts(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPosts(post) {
  document.querySelector(".postTitle").textContent = post.title;
  document.querySelector(".postAuthor").textContent = `By ${post.username}`;
  document.querySelector(".postText").textContent = post.content;
  console.log(post.comments);

  post.comments.forEach((comment) => {
    // grab the template
    const template = document.querySelector("template").content;
    //clone the template
    const copy = template.cloneNode(true);
    //change the content
    copy.querySelector(".commentAuthor").textContent = `By ${comment.username}`;

    copy.querySelector(".commentText").textContent = comment.content;

    //grab the parent
    const parent = document.querySelector(".commentsection div");
    //apend
    parent.appendChild(copy);
  });
}

//send comments to database
const form = document.querySelector("form");
form.addEventListener("submit", userSubmitted);

function userSubmitted(e) {
  e.preventDefault();
  const payload = {
    email: form.elements.email.value,
    username: form.elements.username.value,
    content: form.elements.content.value,
    date: Date.now(),
  };

  console.log(payload);
  document.querySelector("input[type=submit]").disabled = true;

  fetch("https://kea21-7e1e.restdb.io/rest/t9-post/" + artID + "/comments", {
    method: "POST",
    headers: {
      "x-apikey": "602f9e445ad3610fb5bb63d5",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      form.elements.email.value = "";
      form.elements.username.value = "";
      form.elements.content.value = "";
      document.querySelector("input[type=submit]").disabled = false;

      // grab the template
      const template = document.querySelector("template").content;
      //clone the template
      const copy = template.cloneNode(true);
      //change the content
      copy.querySelector(
        ".commentAuthor"
      ).textContent = `By ${response.username}`;
      copy.querySelector(".commentText").textContent = response.content;

      //grab the parent
      const parent = document.querySelector(".commentsection div");
      //apend
      parent.appendChild(copy);
    })
    .catch((err) => {
      console.error(err);
    });
}
