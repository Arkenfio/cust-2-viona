// DOM Elements
const preloader = document.getElementById("preloader")
const navbar = document.getElementById("navbar")
const navMenu = document.getElementById("nav-menu")
const hamburger = document.getElementById("hamburger")
const navLinks = document.querySelectorAll(".nav-link")
const scrollTopBtn = document.getElementById("scroll-top")
const copyEmailBtn = document.getElementById("copy-email")
const emailText = document.getElementById("email-text")
const yearSpan = document.getElementById("year")
const lastUpdatedSpan = document.getElementById("last-updated")
const tooltip = document.getElementById("tooltip")
const filterBtns = document.querySelectorAll(".filter-btn")
const skillCards = document.querySelectorAll(".skill-card")

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Hide preloader after 2 seconds
  setTimeout(() => {
    preloader.classList.add("hidden")
    document.body.style.overflow = "visible"
  }, 2000)

  // Set current year and last updated
  yearSpan.textContent = new Date().getFullYear()
  lastUpdatedSpan.textContent = new Date().toLocaleDateString("id-ID")

  // Initialize animations
  initScrollAnimations()
  initFloatingParticles()

  // Initialize navigation
  initNavigation()

  // Initialize skill filters
  initSkillFilters()

  // Initialize tooltips
  initTooltips()
})

// Preloader Animation
function hidePreloader() {
  preloader.style.opacity = "0"
  setTimeout(() => {
    preloader.style.display = "none"
    document.body.style.overflow = "visible"
  }, 500)
}

// Navigation Functions
function initNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Scroll Animations
function initScrollAnimations() {
  // Intersection Observer for section animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")

        // Update active navigation link
        const sectionId = entry.target.getAttribute("id")
        updateActiveNavLink(sectionId)
      }
    })
  }, observerOptions)

  // Observe all sections
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.classList.add("reveal")
    observer.observe(section)
  })

  // Scroll event for navbar and scroll-to-top button
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY

    // Show/hide scroll to top button
    if (scrollY > 300) {
      scrollTopBtn.classList.add("visible")
    } else {
      scrollTopBtn.classList.remove("visible")
    }

    // Navbar background on scroll
    if (scrollY > 50) {
      navbar.style.background = "rgba(252, 250, 255, 0.95)"
    } else {
      navbar.style.background = "var(--glass)"
    }
  })

  // Scroll to top functionality
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active")
    }
  })
}

// Floating Particles Animation
function initFloatingParticles() {
  const particles = document.querySelectorAll(".floating-particle")

  particles.forEach((particle, index) => {
    // Random animation duration and delay
    const duration = 4 + Math.random() * 4 // 4-8 seconds
    const delay = Math.random() * 2 // 0-2 seconds delay

    particle.style.animationDuration = `${duration}s`
    particle.style.animationDelay = `${delay}s`

    // Add random movement
    setInterval(
      () => {
        const randomX = Math.random() * 20 - 10 // -10 to 10px
        const randomY = Math.random() * 20 - 10 // -10 to 10px
        particle.style.transform = `translate(${randomX}px, ${randomY}px)`
      },
      3000 + index * 500,
    )
  })
}

// Skill Filter System
function initSkillFilters() {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active filter button
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      // Filter skill cards
      skillCards.forEach((card) => {
        const categories = card.getAttribute("data-category")

        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hidden")
          card.style.animation = "fadeInUp 0.5s ease forwards"
        } else {
          card.classList.add("hidden")
        }
      })
    })
  })
}

// Copy Email Functionality
copyEmailBtn.addEventListener("click", async () => {
  const email = emailText.textContent

  try {
    await navigator.clipboard.writeText(email)

    // Show success feedback
    const originalText = copyEmailBtn.textContent
    copyEmailBtn.textContent = "Copied! ✓"
    copyEmailBtn.style.background = "var(--lilac)"

    setTimeout(() => {
      copyEmailBtn.textContent = originalText
      copyEmailBtn.style.background = ""
    }, 2000)
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea")
    textArea.value = email
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)

    copyEmailBtn.textContent = "Copied! ✓"
    setTimeout(() => {
      copyEmailBtn.textContent = "Salin Email"
    }, 2000)
  }
})

// Tooltip System
function initTooltips() {
  const tooltipTriggers = document.querySelectorAll("[data-tooltip]")

  tooltipTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", (e) => {
      const tooltipText = trigger.getAttribute("data-tooltip")
      tooltip.textContent = tooltipText
      tooltip.classList.add("visible")

      // Position tooltip
      const rect = trigger.getBoundingClientRect()
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px"
    })

    trigger.addEventListener("mouseleave", () => {
      tooltip.classList.remove("visible")
    })
  })
}

// Card Hover Effects
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)"
  })
})

// Progress Ring Animation
function animateProgressRings() {
  const progressRings = document.querySelectorAll(".progress-ring")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ring = entry.target
          const progress = ring.style.getPropertyValue("--progress")

          // Animate the progress
          let currentProgress = 0
          const targetProgress = Number.parseInt(progress)
          const increment = targetProgress / 50 // 50 frames

          const animate = () => {
            if (currentProgress < targetProgress) {
              currentProgress += increment
              ring.style.setProperty("--progress", `${currentProgress}%`)
              requestAnimationFrame(animate)
            }
          }

          animate()
        }
      })
    },
    { threshold: 0.5 },
  )

  progressRings.forEach((ring) => observer.observe(ring))
}

// Initialize progress ring animations
document.addEventListener("DOMContentLoaded", animateProgressRings)

// Smooth reveal animations for timeline items
const timelineItems = document.querySelectorAll(".timeline-item")
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 200)
      }
    })
  },
  { threshold: 0.3 },
)

timelineItems.forEach((item) => {
  item.style.opacity = "0"
  item.style.transform = "translateY(30px)"
  item.style.transition = "all 0.6s ease"
  timelineObserver.observe(item)
})

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
`
document.head.appendChild(style)

// Add pulse animation to hero buttons
document.querySelectorAll(".hero-buttons .btn").forEach((btn, index) => {
  setTimeout(
    () => {
      btn.classList.add("pulse")
      setTimeout(() => btn.classList.remove("pulse"), 2000)
    },
    3000 + index * 500,
  )
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
  const scrollY = window.scrollY

  if (scrollY > 300) {
    scrollTopBtn.classList.add("visible")
  } else {
    scrollTopBtn.classList.remove("visible")
  }

  if (scrollY > 50) {
    navbar.style.background = "rgba(252, 250, 255, 0.95)"
  } else {
    navbar.style.background = "var(--glass)"
  }
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)
