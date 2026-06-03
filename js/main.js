document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       MENU HAMBURGUER (MOBILE)
       ========================================================================== */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    /* ==========================================================================
       NAVBAR EVENTO DE SCROLL (MUDANÇA DE TAMANHO)
       ========================================================================== */
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* ==========================================================================
       FILTRO DE PROJETOS (GALERIA)
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remover classe ativa de todos os botões e adicionar no clicado
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block";
                    setTimeout(() => card.style.opacity = "1", 50);
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => card.style.display = "none", 300);
                }
            });
        });
    });

    /* ==========================================================================
       VALIDAÇÃO DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const form = document.getElementById("portfolio-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isFormValid = true;

        const inputs = form.querySelectorAll("input, textarea");

        inputs.forEach(input => {
            const formGroup = input.parentElement;
            
            // Validação padrão de preenchimento
            if (input.value.trim() === "") {
                formGroup.classList.add("invalid");
                isFormValid = false;
            } else {
                formGroup.classList.remove("invalid");
            }

            // Validação estrutural de E-mail
            if (input.type === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    formGroup.classList.add("invalid");
                    isFormValid = false;
                }
            }
        });

        if (isFormValid) {
            alert("Sucesso! Sua mensagem foi enviada de forma demonstrativa.");
            form.reset();
        }
    });

    /* ==========================================================================
       CONTADORES ANIMADOS (ESTATÍSTICAS)
       ========================================================================== */
    const statsSection = document.querySelector(".stats-section");
    const statNumbers = document.querySelectorAll(".stat-number");
    let animatedStats = false;

    const animateStats = () => {
        statNumbers.forEach(num => {
            const target = parseInt(num.parentElement.getAttribute("data-target"));
            let current = 0;
            const increment = target / 50; // Velocidade da animação
            
            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    num.innerText = Math.ceil(current) + "+";
                    setTimeout(updateCount, 20);
                } else {
                    num.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    /* ==========================================================================
       DETECTOR DE ROLAGEM (SCROLL REVEAL E LINKS DA NAVBAR)
       ========================================================================== */
    const sections = document.querySelectorAll(".section-scroll");
    const animatedElements = document.querySelectorAll(".animate-left, .animate-right");

    const scrollIntersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Ativa animação das barras de habilidades quando entrar na tela
            if (entry.isIntersecting && entry.target.id === "skills") {
                document.querySelectorAll(".progress").forEach(prog => {
                    prog.style.width = prog.parentElement.previousElementSibling.children[1].innerText;
                });
            }

            // Ativa contadores numéricos
            if (entry.isIntersecting && entry.target.classList.contains("stats-section") && !animatedStats) {
                animateStats();
                animatedStats = true;
            }

            // Ativa animações gerais de entrada (FadeIn / Slide)
            if (entry.isIntersecting && (entry.target.classList.contains("animate-left") || entry.target.classList.contains("animate-right"))) {
                entry.target.classList.add("animated");
            }

            // Gerencia qual item do menu fica ativo com base no scroll
            if (entry.isIntersecting && entry.target.classList.contains("section-scroll")) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${entry.target.id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, {
        threshold: 0.2 // Dispara quando 20% do elemento está visível
    });

    // Registrar elementos no observador
    sections.forEach(sec => scrollIntersectionObserver.observe(sec));
    animatedElements.forEach(el => scrollIntersectionObserver.observe(el));
    if (statsSection) scrollIntersectionObserver.observe(statsSection);
    
    // Adicionar observador separado para o card de skills para ativar as barras
    const skillsSection = document.getElementById("skills");
    if (skillsSection) scrollIntersectionObserver.observe(skillsSection);


    /* ==========================================================================
       BOTÃO VOLTAR AO TOPO
       ========================================================================== */
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});