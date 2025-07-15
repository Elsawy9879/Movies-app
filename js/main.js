// عند تحميل الصفحة
$(document).ready(() => {
  $(".lodingPage").fadeOut(2000);
  getMovies("now_playing");
});

// فتح القائمة الجانبية
function openSideNav() {
  $(".open-close-icon").removeClass("fa-bars").addClass("fa-x").attr("is-open", "y");
  $(".leftMenu").animate({ left: "0px" }, 500);
  $(".navLinks li").each((i, el) => {
    $(el).animate({ top: 0 }, (i + 6) * 100);
  });
}

// إغلاق القائمة الجانبية
function closeSideNav() {
  $(".open-close-icon").removeClass("fa-x").addClass("fa-bars").attr("is-open", "f");
  $(".leftMenu").animate({ left: "-260px" }, 500);
  $(".navLinks li").animate({ top: "250px" }, 500);
}

// التحكم في زر فتح/غلق القائمة
$(".open-close-icon").click(() => {
  const isOpen = $(".open-close-icon").attr("is-open");
  if (isOpen === "f") openSideNav();
  else closeSideNav();
});

// جلب الأفلام (now_playing, popular, top_rated, upcoming)
async function getMovies(term) {
  $(".lodingPage").removeClass("d-none").show();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzNlOTU0Mzc5MzIzZjJiOWIxMjJmMzViYzE1MDZiYSIsInN1YiI6IjYzZDA2N2M0YjdhMTU0MDU3NzVhMzEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n3EcEhpxSleSawKbubPuuIC36A-U12HxPWTpmErjrAk",
    },
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${term}?language=en-US&page=1`, options);
    const data = await response.json();
    displayMovies(data.results);
  } catch (err) {
    console.error(err);
  }

  $(".lodingPage").fadeOut(500);
}

// عرض الأفلام
function displayMovies(arr) {
  let box = "";
  arr.forEach((movie) => {
    const iPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "./imgs/not-available.jpg";

    box += `
      <div class="col-md-4 px-4 pb-5">
        <figure class="position-relative rounded-3 overflow-hidden p-2">
          <img src="${iPath}" class="w-100 rounded-3 animate" alt="movie photo" />
          <figcaption class="position-absolute top-0 bottom-0 start-0 end-0 p-4 text-white rounded-3">
            <h2 class="text-center">${movie.title}</h2>
            <p class="fw-lighter p1">${movie.overview}</p>
            <p class="fw-lighter p2">Release Date : ${movie.release_date}</p>
            <div class="stars">
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-regular fa-star-half-stroke text-warning border-1 border-danger"></i>
            </div>
            <h5>${movie.vote_average.toFixed(1)}</h5>
          </figcaption>
        </figure>
      </div>
    `;
  });

  $(".movies").html(box);
}

// جلب الأفلام الرائجة يوميًا
async function getTrending() {
  $(".lodingPage").removeClass("d-none").show();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzNlOTU0Mzc5MzIzZjJiOWIxMjJmMzViYzE1MDZiYSIsInN1YiI6IjYzZDA2N2M0YjdhMTU0MDU3NzVhMzEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n3EcEhpxSleSawKbubPuuIC36A-U12HxPWTpmErjrAk",
    },
  };

  try {
    const response = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options);
    const data = await response.json();
    displayMovies(data.results);
  } catch (err) {
    console.error(err);
  }

  $(".lodingPage").fadeOut(500);
}

// البحث عن فيلم بالكلمة
async function searchMovie(term) {
  if (term.length < 1) {
    getMovies("now_playing");
    return;
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzNlOTU0Mzc5MzIzZjJiOWIxMjJmMzViYzE1MDZiYSIsInN1YiI6IjYzZDA2N2M0YjdhMTU0MDU3NzVhMzEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n3EcEhpxSleSawKbubPuuIC36A-U12HxPWTpmErjrAk",
    },
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`, options);
    const data = await response.json();
    displayMovies(data.results);
  } catch (err) {
    console.error(err);
  }
}

// إظهار وإخفاء زر العودة للأعلى أثناء التمرير
$(window).scroll(() => {
  if ($(window).scrollTop() > 200) {
    $("#btnUp").removeClass("d-none").fadeIn();
  } else {
    $("#btnUp").fadeOut();
  }
});

// عند الضغط على زر العودة للأعلى
$("#btnUp").click(() => {
  $("html, body").animate({ scrollTop: 0 }, 2000);
});

// التمرير السلس عند الضغط على روابط القائمة (داخل الصفحة)
$(".navLinks li a[href^='#']").click(function () {
  const target = $(this).attr("href");
  if ($(target).length) {
    const offset = $(target).offset().top;
    $("html, body").animate({ scrollTop: offset }, 2000);
  }
});

// دوال التحقق من صحة المدخلات - regex
const nameRjx = /^[a-zA-Z\s]{3,36}$/;
const emailRjx = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const phoneRjx = /^01[0125][0-9]{8}$/;
const ageRjx = /^(1[6-9]|[2-9][0-9]|100)$/;
const passwordRjx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// دالة للتحقق من الحقل مع إضافة وإزالة التنبيهات
function validateField(inputSelector, regex, errorSpanSelector) {
  $(inputSelector).on("keyup", (e) => {
    const val = e.target.value.trim();
    if (val !== "") {
      if (!regex.test(val)) {
        e.target.classList.add("border-danger");
        $(errorSpanSelector).removeClass("d-none");
      } else {
        e.target.classList.remove("border-danger");
        $(errorSpanSelector).addClass("d-none");
      }
    } else {
      e.target.classList.remove("border-danger");
      $(errorSpanSelector).addClass("d-none");
    }
  });
}

// استدعاء التحقق على الحقول المختلفة
validateField("input#name", nameRjx, "span#name");
validateField("input#email", emailRjx, "span#email");
validateField("input#phone", phoneRjx, "span#phone");
validateField("input#age", ageRjx, "span#age");
validateField("input#password", passwordRjx, "span#password");

// تحقق خاص لحقل إعادة كلمة السر
$("input#repassword").on("keyup", (e) => {
  const val = e.target.value.trim();
  const passwordVal = $("input#password").val().trim();

  if (val !== "") {
    if (val !== passwordVal) {
      e.target.classList.add("border-danger");
      $("span#repassword").removeClass("d-none");
    } else {
      e.target.classList.remove("border-danger");
      $("span#repassword").addClass("d-none");
    }
  } else {
    e.target.classList.remove("border-danger");
