const urlParams = new URLSearchParams(window.location.search);
const artID = urlParams.get("id");
console.log(artID);
const url = "https://kea21-7e1e.restdb.io/rest/t9-post/" + artID;

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
}
