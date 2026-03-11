import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// markers: false by default

// Custom Cursor
export const initCursor = () => {
    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".cursor-follower");

    if (!cursor || !follower) return;

    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    const clickableElements = document.querySelectorAll("button, a, .product-card, .gallery-item, .nav-item");
    clickableElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(255, 107, 107, 0.3)" });
            gsap.to(follower, { scale: 1.5, borderColor: "#ff6b6b" });
        });
        el.addEventListener("mouseleave", () => {
            gsap.to(cursor, { scale: 1, backgroundColor: "#ff6b6b" });
            gsap.to(follower, { scale: 1, borderColor: "rgba(255, 107, 107, 0.5)" });
        });
    });
};

// Hero Animations
export const initHero = () => {
    // Floating Animation
    const floatingElements = document.querySelectorAll(".floating-item");
    floatingElements.forEach((el, i) => {
        gsap.to(el, {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            rotation: "random(-15, 15)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
        });
    });

    // Text Reveal
    const tl = gsap.timeline();
    tl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
    .from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .from(".hero-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.5");

    // Parallax
    gsap.to(".hero", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        backgroundPositionY: "50%"
    });
};

// Scroll Reveal
export const initScrollReveal = () => {
    // Exclude gallery and testimonials from generic scroll reveal as they have their own
    const sections = document.querySelectorAll("section:not(.hero):not(.gallery):not(.testimonials)");
    sections.forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 90%", // Start slightly earlier
                toggleActions: "play none none none" // Just play once when entering
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all" // Clear styles after animation to avoid layout issues
        });
    });
};

// Product Animations
export const initProducts = () => {
    gsap.from(".product-card", {
        scrollTrigger: {
            trigger: ".products",
            start: "top 80%"
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    // 3D Tilt Effect logic (simplified)
    const cards = document.querySelectorAll(".product-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
};

// Gallery Multi-media Animations
export const initGallery = () => {
    gsap.utils.toArray(".gallery-item").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 95%", // Start much earlier
                toggleActions: "play none none none" // Just play once
            },
            scale: 1.1,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
        });
    });
};

// Testimonials Letter Animation
export const initTestimonials = () => {
    const testimonials = document.querySelectorAll(".testimonial-text");
    testimonials.forEach(t => {
        const text = t.textContent;
        t.innerHTML = text.split("").map(char => `<span class='char'>${char === " " ? "&nbsp;" : char}</span>`).join("");
        
        gsap.from(t.querySelectorAll(".char"), {
            scrollTrigger: {
                trigger: t,
                start: "top 85%"
            },
            opacity:0,
            y: 20,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out"
        });
    });
};
