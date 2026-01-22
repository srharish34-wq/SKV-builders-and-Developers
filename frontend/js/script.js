document.addEventListener("DOMContentLoaded", function () {

  /* ================= Counter Animation ================= */
  const counters = document.querySelectorAll(".count");

  function animateCounter(counter) {
    let start = 0;
    const end = Number(counter.dataset.target);
    const speed = 30;

    function update() {
      start += Math.ceil(end / 100);
      if (start < end) {
        counter.innerText = start;
        setTimeout(update, speed);
      } else {
        counter.innerText = end + "+";
      }
    }

    update();
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          counter.classList.add("visible");
          animateCounter(counter);
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(counter => {
      counter.classList.add("visible");
      animateCounter(counter);
    });
  }

  /* ============ What We Do Section Animation (Scroll) ============ */
  const section = document.querySelector(".what-we-do-section");

  if (section && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add("animate");
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(section);
  } else if (section) {
    section.classList.add("animate");
  }

  /* ============ Counter Section Animation (Scroll) ============ */
  const counterSection = document.querySelector(".counter-section");
  const counterBoxes = document.querySelectorAll(".counter-box");

  if (counterSection && "IntersectionObserver" in window) {
    const counterSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counterSection.classList.add("animate");
          counterBoxes.forEach(box => {
            const number = box.querySelector("h2");
            if (number) animateCounter(number);
          });
          counterSectionObserver.unobserve(counterSection);
        }
      });
    }, { threshold: 0.3 });

    counterSectionObserver.observe(counterSection);
  } else if (counterSection) {
    counterSection.classList.add("animate");
  }

});

/* ================= Scroll Animation for Service Sections ================= */
const serviceSections = document.querySelectorAll(
  ".construction-section, .renovation-section, .property-section"
);

serviceSections.forEach(section => {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add("animate");
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(section);
  } else {
    section.classList.add("animate");
  }
});

const firstTitle = document.querySelector(".page-content .section-title");

if (firstTitle && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        firstTitle.style.transform = "translateX(0)";
        firstTitle.style.opacity = "1";
        observer.unobserve(firstTitle);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(firstTitle);
} else if (firstTitle) {
  firstTitle.style.transform = "translateX(0)";
  firstTitle.style.opacity = "1";
}

/* ============ Service Section Animation (Scroll) ============ */
const serviceCards = document.querySelectorAll(".service-card");

if (serviceCards.length && "IntersectionObserver" in window) {

  serviceCards.forEach((card, index) => {
    if (index % 4 < 2) {
      card.classList.add("from-left");
    } else {
      card.classList.add("from-right");
    }
  });

  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  serviceCards.forEach(card => serviceObserver.observe(card));

} else {
  serviceCards.forEach(card => card.classList.add("show"));
}

/* ============ Ongoing Projects Section Animation (Scroll) ============ */
const projectCards = document.querySelectorAll(".project-card");

if (projectCards.length && "IntersectionObserver" in window) {

  projectCards.forEach((card, index) => {
    if (index % 4 < 2) {
      card.classList.add("from-left");
    } else {
      card.classList.add("from-right");
    }
  });

  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        projectObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  projectCards.forEach(card => projectObserver.observe(card));

} else {
  projectCards.forEach(card => card.classList.add("show"));
}

/* ============ Testimonial Slider ============ */
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");

function showSlide(index, direction) {
  slides.forEach(slide => {
    slide.classList.remove("active", "slide-next", "slide-prev");
    slide.style.display = "none";
  });

  const activeSlide = slides[index];
  activeSlide.style.display = "flex";
  activeSlide.classList.add("active");

  if (direction === "next") {
    activeSlide.classList.add("slide-next");
  } else if (direction === "prev") {
    activeSlide.classList.add("slide-prev");
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide, "next");
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide, "prev");
}

/* INITIAL LOAD */
if (slides.length > 0) {
  showSlide(currentSlide, "next");
}


/* ============ Know More Button ============ */
/* ============ Know More Button ============ */
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".know-more-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const card = this.closest(".project-card");
      if (!card) return;

      card.classList.toggle("active");

      this.textContent = card.classList.contains("active")
        ? "Show Less"
        : "Know More";
    });
  });
});


// EMAIL CONFIGURATION
// ============================================
// CONTACT FORM HANDLER - ADD THIS AT THE BOTTOM OF YOUR script.js
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const submitBtn = document.querySelector('.submit-btn');
  const form = document.querySelector('.enquiry-form');
  
  if (submitBtn && form) {
    submitBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      
      // Get form values
      const name = form.querySelectorAll('input[type="text"]')[0].value.trim();
      const contact = form.querySelectorAll('input[type="text"]')[1].value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const subject = form.querySelector('.subject-dropdown').value;
      const message = form.querySelector('textarea').value.trim();
      
      // Validation
      if (!name || !contact || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Phone validation (10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(contact.replace(/\s/g, ''))) {
        alert('Please enter a valid 10-digit contact number');
        return;
      }
      
      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        // Send data to backend
        const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            contact: contact,
            email: email,
            subject: subject,
            message: message
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          alert('Thank you! Your enquiry has been submitted successfully. We will contact you within 24 hours.');
          
          // Clear form
          form.querySelectorAll('input[type="text"]')[0].value = '';
          form.querySelectorAll('input[type="text"]')[1].value = '';
          form.querySelector('input[type="email"]').value = '';
          form.querySelector('.subject-dropdown').value = '';
          form.querySelector('textarea').value = '';
        } else {
          alert('Failed to send enquiry. Please try again or contact us directly.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later or contact us directly at +91 6369254389');
      } finally {
        // Reset button state
        submitBtn.textContent = 'Submit';
        submitBtn.disabled = false;
      }
    });
  }
});
 



