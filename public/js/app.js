console.log("browser javascript");

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const search = document.querySelector("input");
  const responseBody = document.querySelector("#response");

  fetch("/weather?address=" + search.value).then(response =>
    response.json().then(({ forecast }) => {
      search.value = "";
      responseBody.textContent = forecast;
    })
  );
});
