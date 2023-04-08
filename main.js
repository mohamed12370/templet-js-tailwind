const navbar = document.querySelector('nav.navbar');
const exploreBtn = document.querySelector('.title .btn');
const section2 = document.querySelector('.sec2');
const scrollBtnToTop = document.querySelector('.scrollBtn');

// window scroll change navbar
window.addEventListener('scroll', function () {
  window.scrollY > 100
    ? navbar.classList.add('active')
    : navbar.classList.remove('active');

  window.scrollY > 500
    ? scrollBtnToTop.classList.add('active')
    : scrollBtnToTop.classList.remove('active');
});

scrollBtnToTop.addEventListener('click', function () {
  window.scrollTo({
    behavior: 'smooth',
    top: 0,
  });
});

exploreBtn.addEventListener('click', function () {
  section2.scrollIntoView({
    behavior: 'smooth',
  });
});

const allSection = document.querySelectorAll('section');
const allLinks = document.querySelectorAll('.navbar ul li');

allLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    allLinks.forEach((link) => link.classList.remove('active'));
    link.classList.add('active');
    const { filter } = link.dataset;
    allSection.forEach((sec) => {
      if (sec.classList.contains(filter)) {
        sec.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });
});

/////////////////////////////////////////////////////// section 2
const sec2Content = document.querySelector('.sec2-cont');
const nextBtn = document.querySelector('.sec2-btns .next');
const prevBtn = document.querySelector('.sec2-btns .prev');
const sec2NumberContent = document.querySelector('.sec2-btns .number');
let pageContent = 1;

const fetchSec2Cont = async function (page = pageContent) {
  try {
    const respons = await fetch(
      `https://dorar-hadith-api.cyclic.app/api/search?page=${page}`
    );
    const data = await respons.json();
    //console.log(data);

    sec2Content.innerHTML = `<div> ${data.map(
      (el, i) => `<p> ${i + 1}: ${el.hadith} </p> `
    )} </div>`;
    sec2NumberContent.innerHTML = `Page: ${pageContent}`;
  } catch (err) {
    console.log('Error: ', err);
  }
};
fetchSec2Cont();

nextBtn.addEventListener('click', function () {
  if (pageContent < 10000) {
    pageContent++;
    fetchSec2Cont(pageContent);
  }
});
prevBtn.addEventListener('click', function () {
  if (pageContent > 1) {
    pageContent--;
    fetchSec2Cont(pageContent);
  }
});

///////////////////////////////////////////// section 4
const sec4Container = document.querySelector('.sec4-container');
const popUpSec = document.querySelector('.popUp');
const popContent = document.querySelector('.popUp-container');
const closePopUp = document.querySelector('.closePopUp');
let allSec4Content = [];

const displaySec4Content = function (element, index) {
  //console.log(element, index);
  element.addEventListener('click', async function () {
    try {
      const res = await fetch(
        `http://api.alquran.cloud/v1/surah/${index + 1}/ar.alafasy`
      );
      const data = await res.json();
      const { ayahs } = data.data;
      //console.log(ayahs);
      popContent.innerHTML = '';
      popContent.innerHTML += ayahs.map(
        (el) => `<p> [${el.numberInSurah}]-  ${el.text}</p> `
      );
      popUpSec.classList.add('active');
    } catch (err) {
      console.log('err from function in sec4 :' + err);
    }
  });
};

const fetchSec4 = async function () {
  try {
    const res = await fetch(`http://api.alquran.cloud/v1/meta`);
    const data = await res.json();
    const { references } = data.data.surahs;
    //console.log(references);
    sec4Container.innerHTML = '';
    references.forEach(
      (el) =>
        (sec4Container.innerHTML += `<div class="item">
          <p>${el.name}</p>
          <p>${el.englishName}</p>
        </div>`)
    );
    //console.log(sec4Container.innerHTML);
    allSec4Content = Array.from(
      document.querySelectorAll('.sec4-container .item')
    );
    //console.log(allSec4Content);
    allSec4Content.forEach((el, i) => {
      displaySec4Content(el, i);
    });
  } catch (err) {
    console.log('err from function in sec4 :' + err);
  }
};

fetchSec4();

closePopUp.addEventListener('click', function () {
  popUpSec.classList.remove('active');
});

///////////////////////////////////////////// section 5
const sec5Container = document.querySelector('.sec5 .box-items');

const getPrayTime = async function () {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/08-04-2023?city=cairo&country=egypt`
    );
    const data = await res.json();
    const { timings } = data.data;
    //console.log(Object.entries(timings));
    sec5Container.innerHTML = '';
    for (const [name, time] of Object.entries(timings)) {
      sec5Container.innerHTML += `
    <div class="item">
      <div class="circle">
        <svg>
          <circle cx="100" cy="100" r="100"></circle>
        </svg>
        <div class="praytime">${time}</div>
      </div>
      <p>${name}</p>
    </div>`;
    }
  } catch (err) {
    console.log('err from function in sec5 :' + err);
  }
};
getPrayTime();

/////////////////////////////////////// open and close navbar
const barsBtn = document.querySelector('.navbar .bars');
const mainUl = document.querySelector('.navbar ul');

barsBtn.addEventListener('click', function () {
  mainUl.classList.toggle('active');
});

//////////////////////////////////// video

// const getVideo = async function () {
//   const res = await fetch(
//     `https://www.youtube.com/playlist?list=PLVlF-iTcGOghVhtHo2ZmOCyR8idR8RJl0`
//   );
//   const data = await res.json();
//   console.log(data);
// };
// getVideo();
