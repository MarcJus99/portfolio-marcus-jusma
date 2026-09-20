// ========================================
// MENU BURGER (MOBILE)
// ========================================

const burger = document.querySelector(".nav__burger");
const navList = document.querySelector(".nav__list");

if (burger) {
    burger.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", isOpen);
    });

    // Fermer le menu après un clic sur un lien (mobile)
    navList.querySelectorAll(".nav__link").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("is-open");
            burger.setAttribute("aria-expanded", "false");
        });
    });
}


// ========================================
// SMOOTH SCROLL (SPA)
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ========================================
// FORMULAIRE DE CONTACT + FORMSPREE (AJAX)
// ========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        // On bloque TOUJOURS l'envoi classique pour gérer nous-mêmes
        event.preventDefault();

        const nom = document.getElementById("nom").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        formMessage.textContent = "";
        formMessage.classList.remove("is-success", "is-error");

        // Vérification nom
        if (nom === "") {
            formMessage.textContent = "Veuillez renseigner votre nom.";
            formMessage.classList.add("is-error");
            return;
        }

        // Vérification email
        if (email === "") {
            formMessage.textContent = "Veuillez renseigner votre adresse email.";
            formMessage.classList.add("is-error");
            return;
        }

        // Vérification format email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formMessage.textContent = "Veuillez entrer une adresse email valide.";
            formMessage.classList.add("is-error");
            return;
        }

        // Vérification message
        if (message === "") {
            formMessage.textContent = "Veuillez écrire un message.";
            formMessage.classList.add("is-error");
            return;
        }

        // Envoi à Formspree en AJAX (pas de rechargement de page)
        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                formMessage.textContent = "✓ Votre message a été envoyé avec succès !";
                formMessage.classList.add("is-success");
                contactForm.reset();
            } else {
                formMessage.textContent = "Oups ! Une erreur est survenue lors de l'envoi.";
                formMessage.classList.add("is-error");
            }
        } catch (error) {
            formMessage.textContent = "Erreur réseau. Veuillez réessayer plus tard.";
            formMessage.classList.add("is-error");
        }
    });
}