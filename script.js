document.addEventListener("DOMContentLoaded", () => {
    // 1. Jouw skills array (hier kun je makkelijk skills aanpassen, wissen of toevoegen!)
    let mySkills = [
        { name: "HTML", percent: 85 },
        { name: "CSS", percent: 75 },
        { name: "JavaScript", percent: 70 },
        { name: "Python", percent: 65 },
        { name: "SQL", percent: 60 },
        { name: "Lua", percent: 60 }
    ];

    let skillsContainer = document.getElementById("skills-container");

    // 2. Bouw de HTML voor elk skill-balkje automatisch op
    mySkills.forEach(skill => {
        let skillBox = document.createElement("div");
        skillBox.classList.add("skill-box");

        skillBox.innerHTML = `
            <div class="skill-info">
                <span>${skill.name}</span>
                <span>${skill.percent}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress" data-percent="${skill.percent}"></div>
            </div>
        `;
        
        skillsContainer.appendChild(skillBox);
    });

    // 3. De IntersectionObserver die luistert of de balkjes in beeld zijn
    let progressBars = document.querySelectorAll(".progress");

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            let bar = entry.target;
            let targetPercent = bar.getAttribute("data-percent");

            if (entry.isIntersecting) {
                // In beeld: Geef de balk zijn breedte uit de array
                bar.style.width = `${targetPercent}%`;
            } else {
                // Uit beeld: Reset de balk weer naar 0%
                bar.style.width = "0%";
            }
        });
    }, {
        threshold: 0.15 // Start de animatie als 15% van de balk te zien is
    });

    // Vertel de observer dat hij op alle gegenereerde balkjes moet letten
    progressBars.forEach(bar => observer.observe(bar));
});