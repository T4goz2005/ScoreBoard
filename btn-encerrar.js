document.addEventListener("DOMContentLoaded", function() {
    const teams = document.querySelectorAll(".team");
    let previousFirstPlace = null;
    let previousSecondPlace = null;
    let previousThirdPlace = null;
    let messageElement = null;

    const updatePositions = () => {
        const sortedTeams = Array.from(teams).sort((a, b) => {
            const scoreA = parseInt(a.querySelector(".score").textContent);
            const scoreB = parseInt(b.querySelector(".score").textContent);
            return scoreB - scoreA;
        });

        const firstPlaceTeam = sortedTeams[0];
        const secondPlaceTeam = sortedTeams[1];
        const thirdPlaceTeam = sortedTeams[2];

        if (previousFirstPlace !== firstPlaceTeam || previousSecondPlace !== secondPlaceTeam || previousThirdPlace !== thirdPlaceTeam) {
            if (messageElement) {
                document.body.removeChild(messageElement);
            }

            messageElement = document.createElement("div");
            messageElement.textContent = `A equipe ${firstPlaceTeam.querySelector("h2").textContent} está em primeiro lugar!`;
            messageElement.classList.add("top-message");
            document.body.appendChild(messageElement);

            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 9999999999); // Remove a mensagem após 3 segundos (3000 milissegundos)

            previousFirstPlace = firstPlaceTeam;
            previousSecondPlace = secondPlaceTeam;
            previousThirdPlace = thirdPlaceTeam;

            setTimeout(() => {
                sortedTeams.forEach((team, index) => {
                    if (index === 0) {
                        team.style.order = 1; // Primeiro lugar
                    } else if (index === 1) {
                        team.style.order = 2; // Segundo lugar
                    } else if (index === 2) {
                        team.style.order = 3; // Terceiro lugar
                    } else {
                        team.style.order = 4; // Outras posições
                    }
                });
            }, 2000); // Atraso de 2 segundos
        }
    };
    
    teams.forEach(team => {
        const addButtons = team.querySelectorAll(".btn-add");
        const removeButton = team.querySelector(".btn-remove");

        addButtons.forEach(button => {
            button.addEventListener("click", function() {
                const scoreElement = team.querySelector(".score");
                let score = parseInt(scoreElement.textContent);
                const points = parseInt(button.textContent.replace("+", ""));
                score += points;
                scoreElement.textContent = score;

                updatePositions();
            });
        });

        removeButton.addEventListener("click", function() {
            const scoreElement = team.querySelector(".score");
            let score = parseInt(scoreElement.textContent);
            const points = parseInt(removeButton.textContent.replace("-", ""));
            score -= points;
            if (score < 0) score = 0;
            scoreElement.textContent = score;

            updatePositions();
        });
    });

    // Atualiza as posições inicialmente
    updatePositions();

    // Atualiza as posições a cada segundo (1000 milissegundos)
    setInterval(updatePositions, 2000);

    // Adiciona evento de clique ao botão de encerramento de jogo
    const btnEndGame = document.getElementById("btn-end-game");
    btnEndGame.addEventListener("click", function() {
        const topTeams = Array.from(teams).sort((a, b) => {
            const scoreA = parseInt(a.querySelector(".score").textContent);
            const scoreB = parseInt(b.querySelector(".score").textContent);
            return scoreB - scoreA;
        }).slice(0, 3); // Seleciona os top 3 times

        let message = "Parabéns aos times:\n ";
        topTeams.forEach((team, index) => {
            message += `${index + 1}. ${team.querySelector("h2").textContent} - ${team.querySelector(".score").textContent} pontos\n`;
        });

        alert(message);
    });
});
