
"use strict";

/* ============================================================
   AS CRÔNICAS DE HOGWARTS
   RPG DE ESCOLHAS
   SASAH & LUCAS
   ============================================================ */

var SAVE_KEY = "PPGHP_SASAH_LUCAS_V2";

/* ============================================================
   DADOS INICIAIS
   ============================================================ */

function createPlayer(name) {
    return {
        name: name,
        house: "",
        hp: 100,
        maxHp: 100,
        mana: 100,
        maxMana: 100,
        xp: 0,
        level: 1,

        bravery: 0,
        loyalty: 0,
        intelligence: 0,
        ambition: 0,
        empathy: 0,
        magic: 0
    };
}

function createDefaultGame() {
    return {
        sasah: createPlayer("Sasah"),
        lucas: createPlayer("Lucas"),

        relationship: {
            friendship: 0,
            trust: 0,
            rivalry: 0,
            affinity: 0
        },

        houseAnswers: {
            sasah: [],
            lucas: []
        },

        storyFlags: {
            sasahStoryComplete: false,
            lucasStoryComplete: false,
            housesComplete: false,
            meetingComplete: false,
            missionComplete: false,
            gameFinished: false
        },

        currentCharacter: "",
        currentStep: 0,
        currentStory: "",
        logEntries: []
    };
}

var game = createDefaultGame();

/* ============================================================
   ELEMENTOS DA INTERFACE
   ============================================================ */

function getElement(id) {
    return document.getElementById(id);
}

function setText(id, text) {
    var element = getElement(id);

    if (element) {
        element.textContent = text;
    }
}

function setHTML(id, html) {
    var element = getElement(id);

    if (element) {
        element.innerHTML = html;
    }
}

function clearChoices() {
    var choices = getElement("choices");

    if (choices) {
        choices.innerHTML = "";
    }
}

/* ============================================================
   UTILIDADES
   ============================================================ */

function escapeHTML(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function replaceNames(text) {
    if (!text) {
        return "";
    }

    var result = String(text);

    result = result.replace(/\bSasah\b/g, game.sasah.name);
    result = result.replace(/\bLucas\b/g, game.lucas.name);

    return result;
}

function getPlayer(playerName) {
    if (playerName === "sasah") {
        return game.sasah;
    }

    return game.lucas;
}

function otherPlayer(playerName) {
    if (playerName === "sasah") {
        return game.lucas;
    }

    return game.sasah;
}

/* ============================================================
   DIÁRIO
   ============================================================ */

function addLog(text) {
    var finalText = replaceNames(text);

    game.logEntries.push(finalText);

    if (game.logEntries.length > 30) {
        game.logEntries.shift();
    }

    renderLog();
}

function renderLog() {
    var log = getElement("log");

    if (!log) {
        return;
    }

    if (game.logEntries.length === 0) {
        log.innerHTML =
            '<div class="log-empty">A aventura ainda está começando...</div>';

        return;
    }

    var html = "";

    for (var i = 0; i < game.logEntries.length; i++) {
        html +=
            '<div class="log-entry">' +
            escapeHTML(game.logEntries[i]) +
            "</div>";
    }

    log.innerHTML = html;
    log.scrollTop = log.scrollHeight;
}

/* ============================================================
   STATUS DOS PERSONAGENS
   ============================================================ */

function updatePlayerUI(playerName) {
    var player = getPlayer(playerName);

    var prefix = playerName === "sasah"
        ? "sasah"
        : "lucas";

    setText(prefix + "Name", player.name);
    setText(
        prefix + "House",
        player.house || "Ainda não definida"
    );

    setText(
        prefix + "HpText",
        player.hp + " / " + player.maxHp
    );

    setText(
        prefix + "ManaText",
        player.mana + " / " + player.maxMana
    );

    setText(
        prefix + "XpText",
        String(player.xp)
    );

    setText(
        prefix + "Bravery",
        String(player.bravery)
    );

    setText(
        prefix + "Loyalty",
        String(player.loyalty)
    );

    setText(
        prefix + "Intelligence",
        String(player.intelligence)
    );

    setText(
        prefix + "Ambition",
        String(player.ambition)
    );

    setText(
        prefix + "Empathy",
        String(player.empathy)
    );

    setText(
        prefix + "Magic",
        String(player.magic)
    );

    var hpBar = getElement(prefix + "Hp");

    if (hpBar) {
        var hpPercent =
            (player.hp / player.maxHp) * 100;

        hpPercent = Math.max(
            0,
            Math.min(100, hpPercent)
        );

        hpBar.style.width =
            hpPercent + "%";
    }

    var manaBar = getElement(prefix + "Mana");

    if (manaBar) {
        var manaPercent =
            (player.mana / player.maxMana) * 100;

        manaPercent = Math.max(
            0,
            Math.min(100, manaPercent)
        );

        manaBar.style.width =
            manaPercent + "%";
    }

    var xpBar = getElement(prefix + "Xp");

    if (xpBar) {
        var xpPercent =
            player.xp % 100;

        xpBar.style.width =
            xpPercent + "%";
    }
}

function updateRelationshipUI() {
    setText(
        "friendship",
        String(game.relationship.friendship)
    );

    setText(
        "trust",
        String(game.relationship.trust)
    );

    setText(
        "rivalry",
        String(game.relationship.rivalry)
    );

    setText(
        "affinity",
        String(game.relationship.affinity)
    );
}

function updateAllUI() {
    updatePlayerUI("sasah");
    updatePlayerUI("lucas");
    updateRelationshipUI();
    renderLog();
}

/* ============================================================
   CONTROLE DE ATRIBUTOS
   ============================================================ */

function addAttribute(playerName, attribute, amount) {
    var player = getPlayer(playerName);

    if (
        typeof player[attribute] !== "number"
    ) {
        return;
    }

    player[attribute] += amount;

    if (player[attribute] < 0) {
        player[attribute] = 0;
    }

    updatePlayerUI(playerName);
}

function addXP(playerName, amount) {
    var player = getPlayer(playerName);

    player.xp += amount;

    while (player.xp >= player.level * 100) {
        player.xp -= player.level * 100;
        player.level += 1;
        player.maxHp += 10;
        player.hp = player.maxHp;
        player.maxMana += 10;
        player.mana = player.maxMana;
        player.magic += 1;

        addLog(
            player.name +
            " alcançou o nível " +
            player.level +
            "."
        );
    }

    updatePlayerUI(playerName);
}

/* ============================================================
   CENAS
   ============================================================ */

function showScene(chapter, location, text, tag) {
    setText("chapter", replaceNames(chapter));
    setText("location", replaceNames(location));
    setText("playerTag", replaceNames(tag));

    setHTML(
        "scene",
        "<p>" +
        escapeHTML(replaceNames(text)) +
        "</p>"
    );

    clearChoices();
}

function createChoice(text, callback, className) {
    var button = document.createElement("button");

    button.type = "button";
    button.className =
        "choice-button" +
        (className ? " " + className : "");

    button.textContent =
        replaceNames(text);

    button.addEventListener(
        "click",
        function () {
            callback();
        }
    );

    return button;
}

function addChoice(text, callback, className) {
    var choices = getElement("choices");

    if (!choices) {
        return;
    }

    choices.appendChild(
        createChoice(
            text,
            callback,
            className
        )
    );
}

function addContinueButton(text, callback) {
    addChoice(
        text || "Continuar",
        callback,
        "continue-button"
    );
}

/* ============================================================
   TELA INICIAL
   ============================================================ */

function showStartScreen() {
    var hasSave =
        localStorage.getItem(SAVE_KEY) !== null;

    showScene(
        "As Crônicas de Hogwarts",
        "O início da aventura",
        "Duas pessoas estão prestes a descobrir que suas vidas estão ligadas por um mistério antigo. Antes de entrar na história, escolha os nomes dos dois protagonistas.",
        "Novo jogo"
    );

    clearChoices();

    addChoice(
        "Começar uma nova aventura",
        function () {
            showNameScreen();
        },
        "continue-button"
    );

    if (hasSave) {
        addChoice(
            "Continuar aventura salva",
            function () {
                loadGame();
            }
        );
    }
}

/* ============================================================
   ESCOLHA DOS NOMES
   ============================================================ */

function showNameScreen() {
    setText(
        "chapter",
        "Criação dos protagonistas"
    );

    setText(
        "location",
        "Antes da primeira carta"
    );

    setText(
        "playerTag",
        "Escolha os nomes"
    );

    setHTML(
        "scene",
        "<h2>Quem viverá esta história?</h2>" +
        "<p>" +
        "Escolha os nomes dos dois protagonistas. " +
        "Esses nomes serão usados durante toda a aventura." +
        "</p>" +

        '<div class="name-selection">' +

        "<label for=\"characterName1\">" +
        "Nome da primeira personagem" +
        "</label>" +

        '<input ' +
        'id="characterName1" ' +
        'type="text" ' +
        'maxlength="30" ' +
        'value="Sasah" ' +
        'autocomplete="off">' +

        "<label for=\"characterName2\">" +
        "Nome do segundo personagem" +
        "</label>" +

        '<input ' +
        'id="characterName2" ' +
        'type="text" ' +
        'maxlength="30" ' +
        'value="Lucas" ' +
        'autocomplete="off">' +

        "</div>"
    );

    clearChoices();

    addChoice(
        "Começar a história",
        function () {
            startCustomGame();
        },
        "continue-button"
    );
}

function startCustomGame() {
    var input1 =
        getElement("characterName1");

    var input2 =
        getElement("characterName2");

    var name1 =
        input1
            ? input1.value.trim()
            : "Sasah";

    var name2 =
        input2
            ? input2.value.trim()
            : "Lucas";

    if (!name1) {
        name1 = "Sasah";
    }

    if (!name2) {
        name2 = "Lucas";
    }

    if (
        name1.toLowerCase() ===
        name2.toLowerCase()
    ) {
        alert(
            "Escolha nomes diferentes para os dois protagonistas."
        );

        return;
    }

    startGameWithNames(
        name1,
        name2
    );
}

function startGameWithNames(name1, name2) {
    game = createDefaultGame();

    game.sasah.name = name1;
    game.lucas.name = name2;

    updateAllUI();

    addLog(
        "A história de " +
        name1 +
        " e " +
        name2 +
        " começou."
    );

    startSasah();
}

/* ============================================================
   HISTÓRIA DA PRIMEIRA PERSONAGEM
   ============================================================ */

var sasahStory = [
    {
        chapter: "Capítulo I",
        location: "A casa de " + "Sasah",
        text:
            "A manhã parecia comum, até que uma coruja pousou diante da janela. Presa à sua pata havia uma carta grossa, selada com cera. Algo dentro de você dizia que aquela carta mudaria tudo.",
        choices: [
            {
                text:
                    "Abrir a carta imediatamente.",
                trait: "bravery",
                value: 2,
                xp: 10,
                result:
                    "Você abre a carta sem hesitar. A curiosidade vence qualquer receio."
            },
            {
                text:
                    "Examinar o selo antes de abrir.",
                trait: "intelligence",
                value: 2,
                xp: 10,
                result:
                    "Você observa cuidadosamente o selo e percebe pequenos detalhes mágicos."
            },
            {
                text:
                    "Pensar em quem poderia ter enviado.",
                trait: "empathy",
                value: 2,
                xp: 10,
                result:
                    "Antes de abrir, você imagina quem poderia estar por trás daquela mensagem."
            },
            {
                text:
                    "Guardar a carta por alguns minutos.",
                trait: "loyalty",
                value: 2,
                xp: 10,
                result:
                    "Você prefere pensar primeiro nas pessoas que fazem parte da sua vida."
            },
            {
                text:
                    "Abrir e pensar nas possibilidades.",
                trait: "ambition",
                value: 2,
                xp: 10,
                result:
                    "Você imediatamente imagina tudo o que poderia conquistar naquele novo mundo."
            }
        ]
    },

    {
        chapter: "Capítulo II",
        location: "O Beco Diagonal",
        text:
            "Pouco tempo depois, você chega a um lugar que parecia impossível existir. Lojas mágicas se espalham pelas ruas, criaturas estranhas caminham entre bruxos e bruxas, e cada vitrine parece esconder um segredo.",
        choices: [
            {
                text:
                    "Entrar na loja de varinhas.",
                trait: "magic",
                value: 2,
                xp: 15,
                result:
                    "Uma varinha parece reagir à sua presença. Uma pequena faísca ilumina a loja."
            },
            {
                text:
                    "Visitar a livraria.",
                trait: "intelligence",
                value: 2,
                xp: 15,
                result:
                    "Você se perde entre livros antigos e descobre referências a uma antiga lenda."
            },
            {
                text:
                    "Conversar com uma criatura mágica.",
                trait: "empathy",
                value: 2,
                xp: 15,
                result:
                    "Você percebe que a criatura está assustada e tenta tranquilizá-la."
            },
            {
                text:
                    "Procurar equipamentos raros.",
                trait: "ambition",
                value: 2,
                xp: 15,
                result:
                    "Você procura objetos que possam ser úteis no futuro."
            },
            {
                text:
                    "Ajudar uma pessoa perdida.",
                trait: "loyalty",
                value: 2,
                xp: 15,
                result:
                    "Você deixa seus próprios planos de lado para ajudar alguém."
            }
        ]
    },

    {
        chapter: "Capítulo III",
        location: "O Expresso de Hogwarts",
        text:
            "No trem, você encontra uma cabine quase vazia. Uma janela mostra a paisagem desaparecendo rapidamente. O castelo ainda está distante, mas uma sensação estranha começa a crescer.",
        choices: [
            {
                text:
                    "Investigar um ruído no corredor.",
                trait: "bravery",
                value: 2,
                xp: 15,
                result:
                    "Você se levanta e investiga, mesmo sem saber o que encontrará."
            },
            {
                text:
                    "Observar o mapa do trem.",
                trait: "intelligence",
                value: 2,
                xp: 15,
                result:
                    "Você tenta descobrir exatamente onde o trem está."
            },
            {
                text:
                    "Conversar com outros estudantes.",
                trait: "empathy",
                value: 2,
                xp: 15,
                result:
                    "Uma conversa aparentemente simples faz você perceber que outros alunos também estão nervosos."
            },
            {
                text:
                    "Planejar os primeiros dias em Hogwarts.",
                trait: "ambition",
                value: 2,
                xp: 15,
                result:
                    "Você começa a pensar em tudo o que deseja conquistar na escola."
            },
            {
                text:
                    "Oferecer ajuda aos alunos mais novos.",
                trait: "loyalty",
                value: 2,
                xp: 15,
                result:
                    "Você decide ajudar quem parece estar tendo dificuldades."
            }
        ]
    }
];

/* ============================================================
   HISTÓRIA DO SEGUNDO PERSONAGEM
   ============================================================ */

var lucasStory = [
    {
        chapter: "Capítulo I",
        location: "A casa de " + "Lucas",
        text:
            "Enquanto uma nova vida começa para outra pessoa, uma segunda carta chega a uma casa diferente. A mensagem possui o mesmo símbolo misterioso, mas ninguém sabe por que duas cartas foram enviadas naquela mesma noite.",
        choices: [
            {
                text:
                    "Abrir a carta imediatamente.",
                trait: "bravery",
                value: 2,
                xp: 10,
                result:
                    "Você encara o desconhecido e abre a carta."
            },
            {
                text:
                    "Investigar o selo.",
                trait: "intelligence",
                value: 2,
                xp: 10,
                result:
                    "Você percebe que o selo possui uma marca que não aparece em nenhum livro comum."
            },
            {
                text:
                    "Pensar em como a notícia afetará sua família.",
                trait: "loyalty",
                value: 2,
                xp: 10,
                result:
                    "Sua primeira preocupação é com as pessoas próximas."
            },
            {
                text:
                    "Imaginar o que poderá conquistar.",
                trait: "ambition",
                value: 2,
                xp: 10,
                result:
                    "A possibilidade de aprender magia desperta sua ambição."
            },
            {
                text:
                    "Sentir que algo está errado.",
                trait: "empathy",
                value: 2,
                xp: 10,
                result:
                    "Você percebe uma sensação estranha na carta e decide agir com cautela."
            }
        ]
    },

    {
        chapter: "Capítulo II",
        location: "O Beco Diagonal",
        text:
            "Ao chegar ao mundo mágico, tudo parece novo. Entre lojas e becos movimentados, você nota o mesmo símbolo presente na carta escondido em uma antiga parede.",
        choices: [
            {
                text:
                    "Investigar o símbolo.",
                trait: "intelligence",
                value: 2,
                xp: 15,
                result:
                    "Você memoriza cada detalhe do símbolo."
            },
            {
                text:
                    "Procurar alguém que saiba sobre ele.",
                trait: "empathy",
                value: 2,
                xp: 15,
                result:
                    "Você procura alguém que possa explicar o significado daquela marca."
            },
            {
                text:
                    "Entrar em uma loja misteriosa.",
                trait: "bravery",
                value: 2,
                xp: 15,
                result:
                    "Você entra mesmo sem saber o que encontrará."
            },
            {
                text:
                    "Comprar equipamentos melhores.",
                trait: "ambition",
                value: 2,
                xp: 15,
                result:
                    "Você procura equipamentos que possam lhe dar vantagem."
            },
            {
                text:
                    "Ajudar um estudante perdido.",
                trait: "loyalty",
                value: 2,
                xp: 15,
                result:
                    "Você decide ajudar outro estudante antes de continuar."
            }
        ]
    },

    {
        chapter: "Capítulo III",
        location: "O Expresso de Hogwarts",
        text:
            "No trem para Hogwarts, você sente uma presença estranha do outro lado do corredor. Por alguns segundos, tem a impressão de que alguém está observando você.",
        choices: [
            {
                text:
                    "Levantar e procurar a pessoa.",
                trait: "bravery",
                value: 2,
                xp: 15,
                result:
                    "Você decide descobrir quem está observando."
            },
            {
                text:
                    "Observar discretamente.",
                trait: "intelligence",
                value: 2,
                xp: 15,
                result:
                    "Você permanece em silêncio e tenta descobrir o que está acontecendo."
            },
            {
                text:
                    "Conversar com quem estiver por perto.",
                trait: "empathy",
                value: 2,
                xp: 15,
                result:
                    "Você inicia uma conversa e descobre que outras pessoas também sentiram algo estranho."
            },
            {
                text:
                    "Pensar em como se destacar em Hogwarts.",
                trait: "ambition",
                value: 2,
                xp: 15,
                result:
                    "Você começa a imaginar como poderá se tornar alguém importante dentro da escola."
            },
            {
                text:
                    "Ficar perto dos outros estudantes.",
                trait: "loyalty",
                value: 2,
                xp: 15,
                result:
                    "Você prefere não deixar ninguém sozinho diante daquela sensação estranha."
            }
        ]
    }
];

/* ============================================================
   INÍCIO DAS HISTÓRIAS
   ============================================================ */

function startSasah() {
    game.currentCharacter = "sasah";
    game.currentStep = 0;
    game.currentStory = "sasah";

    addLog(
        "A aventura de " +
        game.sasah.name +
        " começou."
    );

    showSasahScene();
}

function showSasahScene() {
    var index = game.currentStep;

    if (index >= sasahStory.length) {
        continueAfterStory("sasah");
        return;
    }

    var scene =
        sasahStory[index];

    showScene(
        scene.chapter,
        scene.location,
        scene.text,
        game.sasah.name
    );

    for (
        var i = 0;
        i < scene.choices.length;
        i++
    ) {
        createStoryChoice(
            "sasah",
            scene.choices[i]
        );
    }
}

function startLucas() {
    game.currentCharacter = "lucas";
    game.currentStep = 0;
    game.currentStory = "lucas";

    addLog(
        "A aventura de " +
        game.lucas.name +
        " começou."
    );

    showLucasScene();
}

function showLucasScene() {
    var index = game.currentStep;

    if (index >= lucasStory.length) {
        continueAfterStory("lucas");
        return;
    }

    var scene =
        lucasStory[index];

    showScene(
        scene.chapter,
        scene.location,
        scene.text,
        game.lucas.name
    );

    for (
        var i = 0;
        i < scene.choices.length;
        i++
    ) {
        createStoryChoice(
            "lucas",
            scene.choices[i]
        );
    }
}

function createStoryChoice(
    playerName,
    choice
) {
    addChoice(
        choice.text,
        function () {
            addAttribute(
                playerName,
                choice.trait,
                choice.value
            );

            addXP(
                playerName,
                choice.xp
            );

            addLog(
                getPlayer(playerName).name +
                ": " +
                choice.result
            );

            game.currentStep += 1;

            if (playerName === "sasah") {
                showSasahScene();
            } else {
                showLucasScene();
            }
        }
    );
}

/* ============================================================
   TRANSIÇÃO PARA SELEÇÃO DE CASA
   ============================================================ */

function continueAfterStory(playerName) {
    if (playerName === "sasah") {
        game.storyFlags.sasahStoryComplete =
            true;

        startHouseSelection("sasah");

        return;
    }

    game.storyFlags.lucasStoryComplete =
        true;

    startHouseSelection("lucas");
}

/* ============================================================
   SELEÇÃO DE CASA
   ============================================================ */

var houseQuestions = [
    {
        question:
            "Um colega está sendo injustamente acusado. O que você faz?",
        answers: [
            {
                text:
                    "Defendo o colega, mesmo que isso me coloque em perigo.",
                trait: "bravery"
            },
            {
                text:
                    "Fico ao lado dele até que a verdade apareça.",
                trait: "loyalty"
            },
            {
                text:
                    "Procuro provas para descobrir o que realmente aconteceu.",
                trait: "intelligence"
            },
            {
                text:
                    "Uso a situação para descobrir quem está por trás da acusação.",
                trait: "ambition"
            },
            {
                text:
                    "Tento entender o que todos estão sentindo.",
                trait: "empathy"
            }
        ]
    },

    {
        question:
            "Você encontra uma passagem secreta dentro do castelo. O que faz?",
        answers: [
            {
                text:
                    "Entro imediatamente.",
                trait: "bravery"
            },
            {
                text:
                    "Chamo alguém de confiança para entrar comigo.",
                trait: "loyalty"
            },
            {
                text:
                    "Estudo a passagem antes de entrar.",
                trait: "intelligence"
            },
            {
                text:
                    "Penso em como transformar o segredo em uma vantagem.",
                trait: "ambition"
            },
            {
                text:
                    "Verifico se alguém pode estar preso lá dentro.",
                trait: "empathy"
            }
        ]
    },

    {
        question:
            "Qual qualidade você mais valoriza?",
        answers: [
            {
                text: "Coragem.",
                trait: "bravery"
            },
            {
                text: "Lealdade.",
                trait: "loyalty"
            },
            {
                text: "Conhecimento.",
                trait: "intelligence"
            },
            {
                text: "Determinação.",
                trait: "ambition"
            },
            {
                text: "Compaixão.",
                trait: "empathy"
            }
        ]
    },

    {
        question:
            "Você descobre que possui uma magia muito rara.",
        answers: [
            {
                text:
                    "Uso-a para proteger alguém.",
                trait: "bravery"
            },
            {
                text:
                    "Ensino-a às pessoas em quem confio.",
                trait: "loyalty"
            },
            {
                text:
                    "Estudo profundamente como ela funciona.",
                trait: "intelligence"
            },
            {
                text:
                    "Uso seu potencial para alcançar grandes objetivos.",
                trait: "ambition"
            },
            {
                text:
                    "Penso primeiro nas consequências para outras pessoas.",
                trait: "empathy"
            }
        ]
    },

    {
        question:
            "O Chapéu Seletor pergunta quem você realmente é.",
        answers: [
            {
                text:
                    "Alguém que não foge de seus medos.",
                trait: "bravery"
            },
            {
                text:
                    "Alguém que nunca abandona quem ama.",
                trait: "loyalty"
            },
            {
                text:
                    "Alguém que sempre procura compreender.",
                trait: "intelligence"
            },
            {
                text:
                    "Alguém que deseja deixar sua marca no mundo.",
                trait: "ambition"
            },
            {
                text:
                    "Alguém que sente profundamente o que os outros sentem.",
                trait: "empathy"
            }
        ]
    }
];

function startHouseSelection(playerName) {
    game.currentCharacter = playerName;
    game.currentStep = 0;
    game.houseAnswers[playerName] = [];

    var player =
        getPlayer(playerName);

    showHouseQuestion(
        playerName
    );

    addLog(
        player.name +
        " chegou ao momento da Seleção das Casas."
    );
}

function showHouseQuestion(playerName) {
    var questionIndex =
        game.currentStep;

    if (
        questionIndex >=
        houseQuestions.length
    ) {
        finishHouseSelection(
            playerName
        );

        return;
    }

    var question =
        houseQuestions[
            questionIndex
        ];

    var player =
        getPlayer(playerName);

    showScene(
        "Seleção das Casas",
        "Grande Salão de Hogwarts",
        question.question,
        player.name +
        " — Pergunta " +
        (questionIndex + 1) +
        " de " +
        houseQuestions.length
    );

    for (
        var i = 0;
        i < question.answers.length;
        i++
    ) {
        createHouseChoice(
            playerName,
            question.answers[i]
        );
    }
}

function createHouseChoice(
    playerName,
    answer
) {
    addChoice(
        answer.text,
        function () {
            game.houseAnswers[playerName]
                .push(answer.trait);

            addAttribute(
                playerName,
                answer.trait,
                2
            );

            addXP(
                playerName,
                10
            );

            addLog(
                getPlayer(playerName).name +
                " respondeu à pergunta " +
                (
                    game.houseAnswers[
                        playerName
                    ].length
                ) +
                " da Seleção."
            );

            game.currentStep += 1;

            showHouseQuestion(
                playerName
            );
        },
        "house-choice"
    );
}

/* ============================================================
   CÁLCULO DA CASA
   ============================================================ */

function calculateHouse(playerName) {
    var player =
        getPlayer(playerName);

    var scores = {
        Gryffindor: player.bravery,
        Hufflepuff:
            (
                player.loyalty +
                player.empathy
            ) / 2,
        Ravenclaw:
            player.intelligence,
        Slytherin:
            player.ambition
    };

    var houses = [
        "Gryffindor",
        "Hufflepuff",
        "Ravenclaw",
        "Slytherin"
    ];

    var highest = -1;
    var possibleHouses = [];

    for (
        var i = 0;
        i < houses.length;
        i++
    ) {
        var houseName =
            houses[i];

        var score =
            scores[houseName];

        if (score > highest) {
            highest = score;

            possibleHouses = [
                houseName
            ];
        } else if (
            score === highest
        ) {
            possibleHouses.push(
                houseName
            );
        }
    }

    var answers =
        game.houseAnswers[playerName];

    if (
        possibleHouses.length > 1 &&
        answers &&
        answers.length > 0
    ) {
        for (
            var a =
                answers.length - 1;
            a >= 0;
            a--
        ) {
            var trait =
                answers[a];

            var preferredHouse =
                "";

            if (
                trait === "bravery"
            ) {
                preferredHouse =
                    "Gryffindor";
            }

            if (
                trait === "loyalty" ||
                trait === "empathy"
            ) {
                preferredHouse =
                    "Hufflepuff";
            }

            if (
                trait ===
                "intelligence"
            ) {
                preferredHouse =
                    "Ravenclaw";
            }

            if (
                trait === "ambition"
            ) {
                preferredHouse =
                    "Slytherin";
            }

            if (
                possibleHouses.indexOf(
                    preferredHouse
                ) !== -1
            ) {
                return preferredHouse;
            }
        }
    }

    return possibleHouses[0];
}

/* ============================================================
   RESULTADO DA CASA
   ============================================================ */

function getHouseIcon(house) {
    if (house === "Gryffindor") {
        return "🦁";
    }

    if (house === "Hufflepuff") {
        return "🦡";
    }

    if (house === "Ravenclaw") {
        return "🦅";
    }

    if (house === "Slytherin") {
        return "🐍";
    }

    return "✨";
}

function getHouseDescription(house) {
    if (house === "Gryffindor") {
        return "Coragem, ousadia e disposição para enfrentar o impossível.";
    }

    if (house === "Hufflepuff") {
        return "Lealdade, dedicação, amizade e um forte senso de justiça.";
    }

    if (house === "Ravenclaw") {
        return "Curiosidade, inteligência, criatividade e busca pelo conhecimento.";
    }

    if (house === "Slytherin") {
        return "Ambição, estratégia, determinação e desejo de alcançar grandes objetivos.";
    }

    return "Uma casa ainda desconhecida.";
}

function finishHouseSelection(playerName) {
    var player =
        getPlayer(playerName);

    var house =
        calculateHouse(playerName);

    player.house = house;

    game.storyFlags.housesComplete =
        game.sasah.house !== "" &&
        game.lucas.house !== "";

    updatePlayerUI(playerName);

    setText(
        "chapter",
        "O Chapéu Seletor decidiu"
    );

    setText(
        "location",
        "Grande Salão"
    );

    setText(
        "playerTag",
        player.name
    );

    setHTML(
        "scene",
        '<div class="house-result">' +

        '<div class="house-result-icon">' +
        getHouseIcon(house) +
        "</div>" +

        "<h2>" +
        escapeHTML(house) +
        "</h2>" +

        "<p>" +
        escapeHTML(
            getHouseDescription(house)
        ) +
        "</p>" +

        "<p>" +
        escapeHTML(
            player.name +
            " agora faz parte de " +
            house +
            "."
        ) +
        "</p>" +

        "</div>"
    );

    clearChoices();

    addLog(
        player.name +
        " foi selecionado para " +
        house +
        "."
    );

    if (playerName === "sasah") {
        addContinueButton(
            "Continuar para a história de " +
            game.lucas.name,
            function () {
                startLucas();
            }
        );
    } else {
        addContinueButton(
            "Continuar",
            function () {
                startMeeting();
            }
        );
    }
}

/* ============================================================
   ENCONTRO DOS DOIS
   ============================================================ */

function startMeeting() {
    game.storyFlags.housesComplete =
        game.sasah.house !== "" &&
        game.lucas.house !== "";

    showScene(
        "Capítulo IV",
        "Hogwarts",
        "Finalmente, os caminhos dos dois protagonistas se cruzam. Os dois carregam cartas semelhantes e perceberam o mesmo símbolo misterioso antes de chegar à escola. Agora estão frente a frente.",
        game.sasah.name +
        " & " +
        game.lucas.name
    );

    clearChoices();

    addChoice(
        "Os dois conversam e tentam descobrir o que têm em comum.",
        function () {
            game.relationship.friendship += 3;
            game.relationship.trust += 2;
            game.relationship.affinity += 2;

            addLog(
                "Os dois protagonistas decidiram conversar e descobrir o que os unia."
            );

            showMeetingResult(
                "A conversa revela mais semelhanças do que diferenças. Uma amizade começa a nascer."
            );
        }
    );

    addChoice(
        "Eles desconfiam um do outro.",
        function () {
            game.relationship.rivalry += 3;
            game.relationship.trust -= 1;

            addLog(
                "A primeira impressão entre os dois foi marcada pela desconfiança."
            );

            showMeetingResult(
                "A tensão aumenta. Talvez eles precisem de tempo para aprender a confiar um no outro."
            );
        }
    );

    addChoice(
        "Um ajuda o outro a investigar o símbolo misterioso.",
        function () {
            game.relationship.trust += 3;
            game.relationship.friendship += 2;
            game.relationship.affinity += 1;

            addLog(
                "Os dois decidiram investigar juntos o símbolo misterioso."
            );

            showMeetingResult(
                "Trabalhando juntos, eles percebem que o símbolo aparece em registros muito antigos de Hogwarts."
            );
        }
    );

    addChoice(
        "Eles competem para descobrir quem é mais poderoso.",
        function () {
            game.relationship.rivalry += 4;
            game.relationship.affinity += 1;

            addLog(
                "Uma competição inesperada surgiu entre os dois."
            );

            showMeetingResult(
                "A rivalidade começa, mas por trás dela existe uma curiosidade mútua."
            );
        }
    );
}

function showMeetingResult(text) {
    showScene(
        "Capítulo IV",
        "Hogwarts",
        text,
        game.sasah.name +
        " & " +
        game.lucas.name
    );

    addContinueButton(
        "Investigar o mistério",
        function () {
            startJointMission();
        }
    );
}

/* ============================================================
   MISSÃO CONJUNTA
   ============================================================ */

function startJointMission() {
    showScene(
        "Capítulo V",
        "Uma passagem esquecida",
        "Durante a noite, os dois encontram uma porta escondida atrás de uma tapeçaria. O mesmo símbolo das cartas está gravado na pedra. A porta parece reagir à presença dos dois.",
        game.sasah.name +
        " & " +
        game.lucas.name
    );

    clearChoices();

    addChoice(
        "Abrir a porta juntos.",
        function () {
            game.relationship.trust += 3;
            game.relationship.friendship += 2;
            game.sasah.magic += 1;
            game.lucas.magic += 1;

            addLog(
                "Os dois abriram a passagem juntos."
            );

            finishMission(
                "A porta se abre quando os dois encostam nela ao mesmo tempo. Por trás existe uma sala esquecida, onde uma antiga profecia menciona duas pessoas destinadas a alterar o futuro de Hogwarts."
            );
        }
    );

    addChoice(
        "Procurar informações antes de entrar.",
        function () {
            game.relationship.trust += 2;

            addAttribute(
                "sasah",
                "intelligence",
                1
            );

            addAttribute(
                "lucas",
                "intelligence",
                1
            );

            addLog(
                "Os dois decidiram estudar o mistério antes de agir."
            );

            finishMission(
                "Depois de investigar cuidadosamente, eles descobrem como abrir a passagem sem ativar as antigas proteções mágicas."
            );
        }
    );

    addChoice(
        "Entrar sem pensar duas vezes.",
        function () {
            game.relationship.rivalry += 1;
            game.relationship.affinity += 2;

            addAttribute(
                "sasah",
                "bravery",
                1
            );

            addAttribute(
                "lucas",
                "bravery",
                1
            );

            addLog(
                "A dupla decidiu enfrentar o desconhecido."
            );

            finishMission(
                "A porta se abre violentamente e os dois precisam reagir rapidamente. Apesar do perigo, conseguem avançar."
            );
        }
    );

    addChoice(
        "Cada um segue por um lado da passagem.",
        function () {
            game.relationship.rivalry += 2;
            game.relationship.trust -= 1;

            addLog(
                "Os dois seguiram caminhos diferentes dentro da passagem."
            );

            finishMission(
                "A passagem se divide em duas partes. Embora separados, os dois percebem que os caminhos terminam no mesmo lugar."
            );
        }
    );
}

function finishMission(text) {
    game.storyFlags.missionComplete =
        true;

    showScene(
        "Capítulo V",
        "A Câmara Esquecida",
        text,
        game.sasah.name +
        " & " +
        game.lucas.name
    );

    clearChoices();

    addContinueButton(
        "Descobrir o destino dos dois",
        function () {
            showEnding();
        }
    );
}

/* ============================================================
   FINAL
   ============================================================ */

function showEnding() {
    game.storyFlags.meetingComplete =
        true;

    game.storyFlags.gameFinished =
        true;

    var friendship =
        game.relationship.friendship;

    var trust =
        game.relationship.trust;

    var rivalry =
        game.relationship.rivalry;

    var affinity =
        game.relationship.affinity;

    var title = "";
    var text = "";

    if (
        friendship >= 7 &&
        trust >= 6 &&
        rivalry < 5
    ) {
        title =
            "Uma amizade destinada a durar";

        text =
            game.sasah.name +
            " e " +
            game.lucas.name +
            " descobriram que suas maiores forças estavam na capacidade de confiar um no outro. A aventura estava apenas começando, mas Hogwarts já não parecia a mesma.";
    } else if (
        rivalry >= 7 &&
        rivalry > trust
    ) {
        title =
            "Rivais sob o mesmo destino";

        text =
            game.sasah.name +
            " e " +
            game.lucas.name +
            " terminaram a primeira grande aventura como rivais. Ainda assim, nenhum dos dois conseguia ignorar a importância do outro. Talvez a rivalidade fosse apenas o primeiro capítulo de algo muito maior.";
    } else if (
        affinity >= 5 &&
        trust >= 4
    ) {
        title =
            "Dois caminhos, uma ligação";

        text =
            game.sasah.name +
            " e " +
            game.lucas.name +
            " descobriram uma conexão incomum. Eles ainda não compreendiam completamente o motivo de terem sido escolhidos, mas sabiam que seus destinos estavam ligados.";
    } else {
        title =
            "O mistério continua";

        text =
            game.sasah.name +
            " e " +
            game.lucas.name +
            " sobreviveram ao primeiro grande mistério de Hogwarts. Ainda havia perguntas sem resposta, e a verdade sobre o símbolo permanecia escondida.";
    }

    showScene(
        "Final do Primeiro Arco",
        "Hogwarts",
        text,
        "Fim do capítulo"
    );

    setHTML(
        "scene",
        '<div class="ending-box">' +

        "<h2>" +
        escapeHTML(title) +
        "</h2>" +

        "<p>" +
        escapeHTML(text) +
        "</p>" +

        "<p>" +
        "<strong>" +
        escapeHTML(
            game.sasah.name +
            ": " +
            game.sasah.house
        ) +
        "</strong>" +
        "</p>" +

        "<p>" +
        "<strong>" +
        escapeHTML(
            game.lucas.name +
            ": " +
            game.lucas.house
        ) +
        "</strong>" +
        "</p>" +

        "</div>"
    );

    clearChoices();

    addChoice(
        "Salvar esta aventura",
        function () {
            saveGame();

            alert(
                "A aventura foi salva."
            );
        },
        "continue-button"
    );

    addChoice(
        "Começar uma nova aventura",
        function () {
            showStartScreen();
        }
    );

    addLog(
        "O primeiro arco da aventura terminou."
    );
}

/* ============================================================
   SALVAMENTO
   ============================================================ */

function saveGame() {
    try {
        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(game)
        );

        addLog(
            "Jogo salvo com sucesso."
        );

        return true;
    } catch (error) {
        console.error(
            "Erro ao salvar o jogo:",
            error
        );

        alert(
            "Não foi possível salvar o jogo neste navegador."
        );

        return false;
    }
}

function loadGame() {
    try {
        var saved =
            localStorage.getItem(
                SAVE_KEY
            );

        if (!saved) {
            alert(
                "Nenhum jogo salvo foi encontrado."
            );

            return false;
        }

        var loaded =
            JSON.parse(saved);

        if (
            !loaded ||
            !loaded.sasah ||
            !loaded.lucas
        ) {
            throw new Error(
                "Save inválido."
            );
        }

        game = loaded;

        normalizeGame();

        updateAllUI();

        resumeGame();

        return true;
    } catch (error) {
        console.error(
            "Erro ao carregar o jogo:",
            error
        );

        alert(
            "O jogo salvo está inválido ou corrompido."
        );

        return false;
    }
}

function normalizeGame() {
    if (!game.relationship) {
        game.relationship = {
            friendship: 0,
            trust: 0,
            rivalry: 0,
            affinity: 0
        };
    }

    if (!game.houseAnswers) {
        game.houseAnswers = {
            sasah: [],
            lucas: []
        };
    }

    if (!game.storyFlags) {
        game.storyFlags = {
            sasahStoryComplete: false,
            lucasStoryComplete: false,
            housesComplete: false,
            meetingComplete: false,
            missionComplete: false,
            gameFinished: false
        };
    }

    if (!Array.isArray(game.logEntries)) {
        game.logEntries = [];
    }

    if (
        !game.sasah.name
    ) {
        game.sasah.name = "Sasah";
    }

    if (
        !game.lucas.name
    ) {
        game.lucas.name = "Lucas";
    }
}

function resumeGame() {
    if (
        game.storyFlags.gameFinished
    ) {
        showEnding();
        return;
    }

    if (
        game.storyFlags.missionComplete
    ) {
        finishMission(
            "A aventura continua..."
        );

        return;
    }

    if (
        game.storyFlags.housesComplete
    ) {
        startMeeting();
        return;
    }

    if (
        !game.storyFlags.sasahStoryComplete
    ) {
        startSasah();
        return;
    }

    if (
        !game.storyFlags.lucasStoryComplete
    ) {
        startLucas();
        return;
    }

    if (
        !game.sasah.house
    ) {
        startHouseSelection("sasah");
        return;
    }

    if (
        !game.lucas.house
    ) {
        startHouseSelection("lucas");
        return;
    }

    startMeeting();
}

/* ============================================================
   REINICIAR
   ============================================================ */

function restartGame() {
    var confirmed =
        confirm(
            "Tem certeza que deseja reiniciar a aventura? O progresso atual será perdido."
        );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        SAVE_KEY
    );

    game =
        createDefaultGame();

    updateAllUI();

    showStartScreen();
}

/* ============================================================
   BOTÕES FIXOS
   ============================================================ */

function setupControls() {
    var saveButton =
        getElement("saveButton");

    var loadButton =
        getElement("loadButton");

    var restartButton =
        getElement("restartButton");

    if (saveButton) {
        saveButton.addEventListener(
            "click",
            function () {
                saveGame();
            }
        );
    }

    if (loadButton) {
        loadButton.addEventListener(
            "click",
            function () {
                loadGame();
            }
        );
    }

    if (restartButton) {
        restartButton.addEventListener(
            "click",
            function () {
                restartGame();
            }
        );
    }
}

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */

function initializeGame() {
    setupControls();
    updateAllUI();
    showStartScreen();
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        initializeGame();
    }
);


