$(document).ready((_) => $(".lodingPage").fadeOut(2000));

function openSideNav() {
  $(".open-close-icon").removeClass("fa-bars");
  $(".open-close-icon").addClass("fa-x");
  document.querySelector(".open-close-icon").setAttribute("is-open", "y");
  $(".leftMenu").animate({ left: "0px" }, 500);

  for (let i = 0; i < 6; i++) {
    $(".navLinks li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 6) * 100
      );
  }
}

function closeSideNav() {
  $(".open-close-icon").removeClass("fa-x");
  $(".open-close-icon").addClass("fa-bars");
  document.querySelector(".open-close-icon").setAttribute("is-open", "f");
  $(".leftMenu").animate({ left: "-260px" }, 500);
  $(".navLinks li").animate({ top: "250px" }, 500);
}

$(".open-close-icon").click((_) => {
  if (
    document.querySelector(".open-close-icon").getAttribute("is-open") == "f"
  ) {
    openSideNav();
  } else {
    closeSideNav();
  }
});

async function getMovies(term) {
  $(".lodingPage").removeClass("d-none");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzNlOTU0Mzc5MzIzZjJiOWIxMjJmMzViYzE1MDZiYSIsInN1YiI6IjYzZDA2N2M0YjdhMTU0MDU3NzVhMzEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n3EcEhpxSleSawKbubPuuIC36A-U12HxPWTpmErjrAk",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/movie/${term}?language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => displayMovies(response.results))
    .catch((err) => console.error(err));

  $(".lodingPage").addClass("d-none");
}
getMovies("now_playing");

function displayMovies(arr) {
  let box = ``;
  let iPath = "";

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].poster_path != null) {
      iPath = `https://image.tmdb.org/t/p/w500${arr[i].poster_path}`;
    } else {
      iPath = "./imgs/not-available.jpg";
    }

    box += `
        <div class="col-md-4 px-4 pb-5">
        <figure class="position-relative rounded-3 overflow-hidden p-2">

          <img src="${iPath}" class="w-100 rounded-3 animate" alt="movie photo">

          <figcaption class=" position-absolute top-0 bottom-0 start-0 end-0 p-4 text-white rounded-3">
            <h2 class="text-center">${arr[i].title}</h2>
            <p class="fw-lighter p1">${arr[i].overview}</p>
            <p class="fw-lighter p2">Release Date : ${arr[i].release_date}</p>
            <div class="stars">
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-regular fa-star-half-stroke text-warning border-1 border-danger"></i>
            </div>
            <h5>${arr[i].vote_average.toFixed(1)}</h5>

          </figcaption>
        </figure>
      </div>
        `;
  }

  document.querySelector(".movies").innerHTML = box;
}

async function getTrending() {
  $(".lodingPage").removeClass("d-none");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzNlOTU0Mzc5MzIzZjJiOWIxMjJmMzViYzE1MDZiYSIsInN1YiI6IjYzZDA2N2M0YjdhMTU0MDU3NzVhMzEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n3EcEhpxSleSawKbubPuuIC36A-U12HxPWTpmErjrAk",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((response) => response.json())
    .then((response) => displayMovies(response.results))
    .catch((err) => console.error(err));

  $(".lodingPage").addClass("d-none");
}

async function searchMovie(term) {
  if (term.length >= 1) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzNlOTU0Mzc5MzIzZjJiOWIxMjJmMzViYzE1MDZiYSIsInN1YiI6IjYzZDA2N2M0YjdhMTU0MDU3NzVhMzEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n3EcEhpxSleSawKbubPuuIC36A-U12HxPWTpmErjrAk",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => displayMovies(response.results))
      .catch((err) => console.error(err));
  } else {
    getMovies("now_playing");
  }
}

$(window).scroll(function () {
  let wScroll = $(window).scrollTop();

  if (wScroll > 200) {
    $("#btnUp").removeClass("d-none");
    $("#btnUp").fadeIn();
  } else {
    $("#btnUp").fadeOut();
  }
});
$("#btnUp").click(function () {
  $("html,body").animate({ scrollTop: 0 }, 2000);
});

$(".navLinks li a[href^='#']").click(function () {
  let aHref = $(this).attr("href");
  let sectionOffset = $(aHref).offset().top;
  $("html,body").animate({ scrollTop: sectionOffset }, 2000);
});

function backToTop() {
  $("html,body").animate({ scrollTop: 0 }, 2000);
}

//validationForm

let nameRjx = /[a-z]{3,36}/i;
let emailRjx = /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/;
let phoneRjx = /^01[0125][0-9]{8}$/gm;
let ageRjx = /^(1[6-9]|[2-9][0-9]|100)$/;
let passwordRjx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// name validation
$("input#name").on("keyup", (e) => {
  if(e.target.value != ""){
    if (nameRjx.test(e.target.value) != true) {
      e.target.classList.add('border-danger');
      $("span#name").removeClass('d-none');
    }else{
      e.target.classList.remove('border-danger');
      $("span#name").addClass('d-none');
    }
  }else{
    e.target.classList.remove('border-danger');
      $("span#name").addClass('d-none');
  }
});
//----------------------------------------------------
// email validation
$("input#email").on("keyup", (e) => {
  if(e.target.value != ""){
    if (emailRjx.test(e.target.value) != true) {
      e.target.classList.add('border-danger');
      $("span#email").removeClass('d-none');
    }else{
      e.target.classList.remove('border-danger');
      $("span#email").addClass('d-none');
    }
  }else{
    e.target.classList.remove('border-danger');
      $("span#email").addClass('d-none');
  }
});
//----------------------------------------------------
// phone validation
$("input#phone").on("keyup", (e) => {
  if(e.target.value != ""){
    if (phoneRjx.test(e.target.value) != true) {
      e.target.classList.add('border-danger');
      $("span#phone").removeClass('d-none');
    }else{
      e.target.classList.remove('border-danger');
      $("span#phone").addClass('d-none');
    }
  }else{
    e.target.classList.remove('border-danger');
      $("span#phone").addClass('d-none');
  }
});
//----------------------------------------------------
// age validation
$("input#age").on("keyup", (e) => {
  if(e.target.value != ""){
    if (ageRjx.test(e.target.value) != true) {
      e.target.classList.add('border-danger');
      $("span#age").removeClass('d-none');
    }else{
      e.target.classList.remove('border-danger');
      $("span#age").addClass('d-none');
    }
  }else{
    e.target.classList.remove('border-danger');
      $("span#age").addClass('d-none');
  }
});
//----------------------------------------------------
// password validation
$("input#password").on("keyup", (e) => {
  if(e.target.value != ""){
    if (passwordRjx.test(e.target.value) != true) {
      e.target.classList.add('border-danger');
      $("span#password").removeClass('d-none');
    }else{
      e.target.classList.remove('border-danger');
      $("span#password").addClass('d-none');
    }
  }else{
    e.target.classList.remove('border-danger');
      $("span#password").addClass('d-none');
  }
});
//----------------------------------------------------
// repassword validation
$("input#repassword").on("keyup", (e) => {
  if(e.target.value != ""){
    if(e.target.value != $("input#password").val()){
      e.target.classList.add('border-danger');
      $("span#repassword").removeClass('d-none');
    }else{
      e.target.classList.remove('border-danger');
      $("span#repassword").addClass('d-none');
    }
  }else{
    e.target.classList.remove('border-danger');
      $("span#repassword").addClass('d-none');
  }
});
