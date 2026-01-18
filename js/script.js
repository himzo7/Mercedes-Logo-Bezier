// Počakamo, da se celoten HTML naloži (DOM Content Loaded)
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. MODAL WARNING LOGIC (Novo!) ---
    const modal = document.getElementById('school-warning-modal');
    const acceptBtn = document.getElementById('accept-warning-btn');

    if (modal && acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            // Animacija zbledenja
            modal.style.transition = "opacity 0.5s ease";
            modal.style.opacity = "0";
            
            // Po 500ms (ko zbledi) popolnoma odstranimo element
            setTimeout(() => {
                modal.style.display = "none";
            }, 500);
        });
    }

    // --- 2. SHOW/HIDE CODE FUNCTION ---
    // Ta funkcija mora biti globalna, da jo onclick="toggleCode(this)" najde
    window.toggleCode = function(btn) {
        btn.classList.toggle('active');
        var content = btn.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    };

    // --- 3. SCROLL ANIMATION (REVEAL) ---
    const observerOptions = {
        threshold: 0.1, 
        rootMargin: "0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                });
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // --- 4. CANVAS LOGIC ---
    (function drawMercedesLogo() {
        const canvas = document.getElementById("mercedesCanvas");
        if(!canvas) return; 
        const ctx = canvas.getContext("2d");
        const scaleFactor = 200 / 980; 

        ctx.scale(scaleFactor, scaleFactor);
        ctx.beginPath();
        ctx.moveTo(489.39, 177.15);
        ctx.bezierCurveTo(658.26, 170.76, 819.34, 324.04, 802.99, 518.39);
        ctx.bezierCurveTo(781.96, 712.64, 617.20, 806.95, 486.74, 804.20);
        ctx.bezierCurveTo(284.75, 795.72, 150.46, 622.18, 180.17, 444.61);
        ctx.bezierCurveTo(205.33, 276.19, 347.03, 177.56, 489.39, 177.15);
        ctx.closePath();
        ctx.moveTo(749.03, 634.06);
        ctx.lineTo(533.02, 465.99);
        ctx.lineTo(495.00, 195.01);
        ctx.bezierCurveTo(747.10, 206.39, 846.72, 464.97, 749.04, 634.06);
        ctx.closePath();
        ctx.moveTo(745.01, 641.02);
        ctx.bezierCurveTo(645.15, 817.83, 365.52, 854.05, 236.03, 642.04);
        ctx.lineTo(490.45, 538.00);
        ctx.lineTo(745.01, 641.01);
        ctx.closePath();
        ctx.moveTo(232.98, 635.98);
        ctx.lineTo(446.58, 462.63);
        ctx.lineTo(485.95, 194.98);
        ctx.bezierCurveTo(388.82, 194.26, 288.72, 248.55, 236.33, 338.44);
        ctx.bezierCurveTo(170.00, 442.01, 192.34, 575.29, 232.98, 635.98);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill("evenodd");
    })();

    // --- 5. SLIDER INTERACTION ---
    const sliderWrapper = document.getElementById('splitView');
    if (sliderWrapper) {
        function updateSlider(x) {
            const rect = sliderWrapper.getBoundingClientRect();
            const percent = Math.min(Math.max((x - rect.left) / rect.width * 100, 0), 100);
            sliderWrapper.style.setProperty('--pos', percent + '%');
        }

        sliderWrapper.addEventListener('mousemove', (e) => updateSlider(e.clientX));
        sliderWrapper.addEventListener('touchmove', (e) => {
            updateSlider(e.touches[0].clientX);
            e.preventDefault(); 
        });
    }
});