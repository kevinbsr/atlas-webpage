/*
 * script.js
 * Foco: Animações de contadores, animação de barras e lazy loading de animações.
 * Usando Intersection Observer para performance.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- Animação de Contadores ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Quanto maior, mais lenta a contagem

    const animateCounter = (counter) => {
        const target = +counter.parentElement.getAttribute('data-target');
        let current = 0;
        const update = () => {
            const increment = target / speed;
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(update, 1);
            } else {
                counter.textContent = target;
            }
        };
        update();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spanCounter = entry.target.querySelector('.counter');
                if (spanCounter) {
                    animateCounter(spanCounter);
                }
                observer.unobserve(entry.target); // Para de observar depois de animar
            }
        });
    }, {
        threshold: 0.5 // Aciona quando 50% do elemento está visível
    });

    document.querySelectorAll('#resultados .bg-gray-800').forEach(card => {
        counterObserver.observe(card);
    });

    // --- Animação de Barras de Gráfico ---
    const chartBars = document.querySelectorAll('.chart-bar');

    const animateChartBars = (bars) => {
        bars.forEach((bar, index) => {
            const height = bar.getAttribute('data-height');
            // Usar setTimeout para respeitar o delay-X00 do CSS ou simplesmente animar em sequência
            setTimeout(() => {
                bar.style.setProperty('--bar-height', height);
            }, index * 100); // Pequeno atraso para cada barra
        });
    };

    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChartBars(chartBars);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.7 // Aciona quando 70% do elemento está visível
    });

    const abordagemSection = document.getElementById('abordagem');
    if (abordagemSection) {
        chartObserver.observe(abordagemSection);
    }


    // --- Animações genéricas de fade-in-up e scale-in ao rolar (observador para performance) ---
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-scale-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
                observer.unobserve(entry.target); // Para de observar depois de animar
            }
        });
    }, {
        threshold: 0.1, // Aciona quando 10% do elemento está visível
        rootMargin: "0px 0px -50px 0px" // Inicia a animação um pouco antes de chegar no centro
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Garante que o elemento esteja invisível no início
        if (el.classList.contains('animate-fade-in-up')) {
            el.style.transform = 'translateY(20px)';
        } else if (el.classList.contains('animate-scale-in')) {
            el.style.transform = 'scale(0.95)';
        }
        observer.observe(el);
    });


    // --- Menu Mobile (exemplo básico) ---
    const navButton = document.querySelector('header button');
    const navMenu = document.querySelector('.nav-menu'); // Você precisaria adicionar um menu mobile
    
    // Este é um placeholder, em um projeto real, você criaria o menu mobile dinamicamente ou o ocultaria com Tailwind
    if (navButton && navMenu) {
        navButton.addEventListener('click', () => {
            // navMenu.classList.toggle('hidden'); // Exemplo: alterna a classe hidden do Tailwind
            console.log('Menu mobile clicado. Implementar toggle aqui.');
        });
    }

});
