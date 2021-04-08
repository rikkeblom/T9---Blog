function fetchData() {
  fetch("https://kea21-7e1e.restdb.io/rest/t9-post", {
    method: "GET",
    headers: {
      "x-apikey": "602f9e445ad3610fb5bb63d5",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      handlePosts(response);
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

fetchData();

function handlePosts(post) {
  post.forEach(showPosts);
}

function showPosts(post) {
  if (post.approval == true) {
    console.log(post);
    // grab the template
    const template = document.querySelector(".tempPost").content;
    //clone the template
    const copy = template.cloneNode(true);
    //change the content
    copy.querySelector(".postTitle").textContent = post.title;
    copy.querySelector(".postAuthor").textContent = `By ${post.username}`;
    // copy.querySelector(".postText").textContent = post.content;
    copy.querySelector("a").href = `blogpost.html?id=${post._id}`;
    //grab the parent
    const parent = document.querySelector(".showSection");
    //apend
    parent.appendChild(copy);
  }
}
