
const humburger = document.querySelector('.humburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = document.querySelector('.fa-bars');
const cursor = document.getElementById('cursor');
const glow = document.getElementById('cursor-glow');
const navbar = document.getElementById('navbar');
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
const scrollContainer = document.getElementById("imageScroll");
const leftBtn = document.querySelector(".scroll-btn.left");
const rightBtn = document.querySelector(".scroll-btn.right");


let touchStartX = 0;
let touchEndX = 0;

let currentIndex = 0;
let isAnimating = false;


document.addEventListener('mousemove', (event) => {
    
    cursor.style.left = event.x + 'px';
    cursor.style.top = event.y + 'px';
})

document.addEventListener('mousemove', (event) => {
    
    glow.style.left = event.x - 50 + 'px';
    glow.style.top = event.y - 50 + 'px';

})

humburger.addEventListener('click', ()=>mobileMenu.classList.toggle('mobile-menu-active'))
humburger.addEventListener('click', ()=>bars.classList.toggle('fa-xmark'))


    const teamMembers = [
	{ name: "Solar Panel" },
    {name : "Solar Panel"},
	{ name: "Solar Rooftop System" },
    { name: "Solar Water Heater" },
	{ name: "Solar Power System" }
];

   {/* For mobile toggle dropdown */}
  document.querySelectorAll(".dropdown .dropbtn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      let dropdown = this.nextElementSibling;
      dropdown.classList.toggle("show");
    });
  });

  //  Close dropdown when clicked outside
  window.addEventListener("click", function(e) {
    if (!e.target.matches('.dropbtn') && !e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-content").forEach(menu => {
        menu.classList.remove("show");
      });
    }
  });



document.addEventListener('scroll', () =>{

    if(window.scrollY > 0){

        navbar.classList.add('navbar-scroll');
    }
    else{
        navbar.classList.remove('navbar-scroll');

    }
})




function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	memberName.style.opacity = "0";

	setTimeout(() => {
		memberName.textContent = teamMembers[currentIndex].name;
		memberName.style.opacity = "1";
	}, 300);

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

leftArrow.addEventListener("click", () => {
	updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
	updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		updateCarousel(i);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		updateCarousel(i);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentIndex - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentIndex + 1);
	}
});



document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

updateCarousel(0);


// ABOUT //




leftBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
});


// product //


