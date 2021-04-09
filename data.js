const form = document.querySelector("form");
form.addEventListener("submit", userSubmitted);

function userSubmitted(e) {
  e.preventDefault();
  console.log(form.elements.title.value);
  console.log(form.elements.username.value);
  console.log(form.elements.formPost.value);

  const payload = {
    title: form.elements.title.value,
    username: form.elements.username.value,
    content: form.elements.formPost.value,
    date: Date.now(),
  };

  document.querySelector("input[type=submit]").disabled = true;

  fetch("https://kea21-7e1e.restdb.io/rest/t9-post", {
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
      form.elements.title.value = "";
      form.elements.username.value = "";
      form.elements.formPost.value = "";
      document.querySelector("input[type=submit]").disabled = false;
      document.querySelector(".thankYou").classList.remove("hidden");
    })
    .catch((err) => {
      console.error(err);
    });
}
