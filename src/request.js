import $ from 'jquery';

const getRandomPuppy = new Promise((resolve, reject) => {
  $.ajax({
    url: "https://dog.ceo/api/breeds/image/random",
    method: "GET"
  })
    .done((data) => {
      if (data.status === "success") {
        resolve(data);
      }
      else {
        reject();
      }
    })
    .fail((err) => {
      reject(err);
    });
});

const getPuppyFact = new Promise((resolve, reject) => {
  /*
  $.ajax({
    url: "http://cors-proxy.htmldriven.com/?url=https://dog-api.kinduff.com/api/facts",
    method: "GET",
  })
    .done((data) => {
      if (data.success) {
        resolve(data);
      }
      else {
        reject();
      }
    })
    .fail((err) => {
      reject(err);
    });
    */
  resolve("dogs are cool");
});

export {getRandomPuppy, getPuppyFact};
