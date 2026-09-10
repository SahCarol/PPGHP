"use strict";

/* ============================================================
HOGWARTS RPG
Dois protagonistas — nomes personalizados
============================================================ */

var SAVE_KEY = "PPGHP_SASAH_LUCAS_V2";

/* ============================================================
ESTADO PADRÃO
============================================================ */

function createDefaultGame() {
return {
currentPlayer: "sasah",


    gameStarted: false,
    finished: false,

    sasah: {
        name: "Sasah",
        house: "",
        hp: 100,
        maxHp: 100,
        mana: 100,
        maxMana: 100,
        xp: 0,

        bravery: 0,
        loyalty: 0,
        intelligence: 0,
        ambition: 0,
        empathy: 0,
        magic: 0,

        chapter: 0,
        finished: false
    },

    lucas: {
        name: "Lucas",
        house: "",
        hp: 100,
        maxHp: 100,
        mana: 100,
        maxMana: 100,
        xp: 0,

        bravery: 0,
        loyalty: 0,
        intelligence: 0,
        ambition: 0,
        empathy: 0,
        magic: 0,

        chapter: 0,
        finished: false
    },

    relationship: {
        friendship: 0,
        trust: 0,
        rivalry: 0,
        affinity: 0
    },

    houseQuestion: 0,

    houseAnswers: {
        sasah: [],
        lucas: []
    },

    meetingStarted: false,
    missionStarted: false,

    storyFlags: {
        secretDoor: false,
        mysteriousBook: false,
        forbiddenForest: false,
        ancientArtifact: false,
        discoveredTruth: false
    },

    log: []
};


}

var game = createDefaultGame();

/* ============================================================
ELEMENTOS DA PÁGINA
============================================================ */

var scene;
var chapter;
var locationElement;
var choices;
var playerTag;
var logElement;

function getElements() {
scene = document.getElementById("scene");
chapter = document.getElementById("chapter");
locationElement = document.getElementById("location");
choices = document.getElementById("choices");
playerTag = document.getElementById("playerTag");
logElement = document.getElementById("log");
}

function pageIsReady() {
return (
scene &&
chapter &&
locationElement &&
choices &&
playerTag &&
logElement
);
}

/* ============================================================
UTILITÁRIOS
============================================================ */

function setText(element, text) {
if (element) {
element.textContent = text;
}
}

function clamp(value, minimum, maximum) {
return Math.max(
minimum,
Math.min(maximum, value)
);
}

function getPlayer(playerName) {
if (playerName === "lucas") {
return game.lucas;
}


return game.sasah;


}

function addLog(message) {
if (!message) {
return;
}


game.log.push(message);

if (game.log.length > 50) {
    game.log.shift();
}

updateLog();


}

function updateLog() {
if (!logElement) {
return;
}


logElement.innerHTML = "";

if (game.log.length === 0) {
    var empty = document.createElement("div");

    empty.className = "log-empty";

    empty.textContent =
        "A aventura ainda está começando...";

    logElement.appendChild(empty);

    return;
}

for (var i = 0; i < game.log.length; i++) {
    var entry =
        document.createElement("div");

    entry.className = "log-entry";

    entry.textContent =
        game.log[i];

    logElement.appendChild(entry);
}

logElement.scrollTop =
    logElement.scrollHeight;
```

}

/* ============================================================
EFEITOS
============================================================ */

function applyEffects(playerName, effects) {
if (!effects) {
return;
}


var player =
    getPlayer(playerName);

if (typeof effects.bravery === "number") {
    player.bravery += effects.bravery;
}

if (typeof effects.loyalty === "number") {
    player.loyalty += effects.loyalty;
}

if (typeof effects.intelligence === "number") {
    player.intelligence += effects.intelligence;
}

if (typeof effects.ambition === "number") {
    player.ambition += effects.ambition;
}

if (typeof effects.empathy === "number") {
    player.empathy += effects.empathy;
}

if (typeof effects.magic === "number") {
    player.magic += effects.magic;
}

if (typeof effects.hp === "number") {
    player.hp = clamp(
        player.hp + effects.hp,
        0,
        player.maxHp
    );
}

if (typeof effects.mana === "number") {
    player.mana = clamp(
        player.mana + effects.mana,
        0,
        player.maxMana
    );
}

if (typeof effects.xp === "number") {
    player.xp =
        Math.max(
            0,
            player.xp + effects.xp
        );
}


}

function applyRelationship(effects) {
if (!effects) {
return;
}


if (typeof effects.friendship === "number") {
    game.relationship.friendship +=
        effects.friendship;
}

if (typeof effects.trust === "number") {
    game.relationship.trust +=
        effects.trust;
}

if (typeof effects.rivalry === "number") {
    game.relationship.rivalry +=
        effects.rivalry;
}

if (typeof effects.affinity === "number") {
    game.relationship.affinity +=
        effects.affinity;
}

game.relationship.friendship =
    clamp(
        game.relationship.friendship,
        -100,
        100
    );

game.relationship.trust =
    clamp(
        game.relationship.trust,
        -100,
        100
    );

game.relationship.rivalry =
    clamp(
        game.relationship.rivalry,
        -100,
        100
    );

game.relationship.affinity =
    clamp(
        game.relationship.affinity,
        -100,
        100
    );


}

/* ============================================================
HISTÓRIA DE SASAH
============================================================ */

var sasahStory = [


{
    title: "Prólogo — A Carta",
    location: "Casa de " + "Sasah",
    text:
        "Era uma noite aparentemente comum. A chuva batia suavemente " +
        "contra a janela quando uma coruja pousou no parapeito. " +
        "Preso à sua pata havia um envelope grosso, selado com cera vermelha. " +
        "No selo havia um símbolo que parecia familiar.",
    choices: [
        {
            text: "Abrir a carta imediatamente.",
            effects: {
                bravery: 1,
                intelligence: 1,
                magic: 1,
                xp: 10
            },
            log: "Sasah abriu a carta misteriosa."
        },
        {
            text: "Examinar cuidadosamente o selo.",
            effects: {
                intelligence: 2,
                xp: 10
            },
            log: "Sasah examinou o estranho selo."
        },
        {
            text: "Guardar a carta e esperar.",
            effects: {
                loyalty: 1,
                ambition: 1,
                xp: 10
            },
            log: "Sasah decidiu agir com cautela."
        }
    ]
},

{
    title: "Capítulo I — A Mensagem",
    location: "Quarto",
    text:
        "A carta dizia que uma vaga havia sido reservada para você " +
        "na Escola de Magia e Bruxaria de Hogwarts. Entretanto, havia " +
        "uma segunda mensagem escrita à mão: 'Não confie em tudo o que " +
        "o castelo lhe mostrar.'",
    choices: [
        {
            text: "Investigar quem escreveu a mensagem.",
            effects: {
                intelligence: 2,
                ambition: 1,
                xp: 15
            },
            log: "Sasah decidiu descobrir a origem da mensagem."
        },
        {
            text: "Ignorar o aviso e pensar em Hogwarts.",
            effects: {
                bravery: 1,
                empathy: 1,
                xp: 15
            },
            log: "Sasah decidiu não deixar o aviso estragar sua expectativa."
        },
        {
            text: "Guardar a mensagem em segredo.",
            effects: {
                loyalty: 2,
                intelligence: 1,
                xp: 15
            },
            log: "Sasah guardou a mensagem cuidadosamente."
        }
    ]
},

{
    title: "Capítulo II — O Objeto",
    location: "Sótão",
    text:
        "Antes da viagem, algo estranho acontece. Um pequeno objeto " +
        "metálico aparece entre seus pertences. Ele possui o mesmo símbolo " +
        "da carta e emite uma fraca luz quando você o toca.",
    choices: [
        {
            text: "Tocar no objeto novamente.",
            effects: {
                bravery: 1,
                magic: 2,
                xp: 15
            },
            log: "Sasah tocou novamente no objeto mágico."
        },
        {
            text: "Pesquisar o símbolo nos livros.",
            effects: {
                intelligence: 2,
                magic: 1,
                xp: 15
            },
            log: "Sasah pesquisou o símbolo."
        },
        {
            text: "Esconder o objeto.",
            effects: {
                ambition: 1,
                loyalty: 1,
                xp: 15
            },
            log: "Sasah decidiu esconder o objeto."
        }
    ]
},

{
    title: "Capítulo III — A Coruja",
    location: "Janela",
    text:
        "Na madrugada anterior à partida, a mesma coruja retorna. " +
        "Ela deixa cair uma pena escura sobre a mesa. Quando você toca " +
        "na pena, escuta uma voz distante dizendo apenas uma palavra: " +
        "'Hogwarts.'",
    choices: [
        {
            text: "Seguir a voz.",
            effects: {
                bravery: 2,
                magic: 1,
                xp: 20
            },
            log: "Sasah tentou seguir a misteriosa voz."
        },
        {
            text: "Analisar a pena.",
            effects: {
                intelligence: 2,
                magic: 1,
                xp: 20
            },
            log: "Sasah estudou cuidadosamente a pena."
        },
        {
            text: "Guardar a pena para usar depois.",
            effects: {
                ambition: 1,
                intelligence: 1,
                xp: 20
            },
            log: "Sasah guardou a pena misteriosa."
        }
    ]
},

{
    title: "Capítulo IV — A Partida",
    location: "Estação",
    text:
        "Chega o dia da viagem. A plataforma está cheia de estudantes. " +
        "O trem para Hogwarts espera silenciosamente. Antes de embarcar, " +
        "você percebe uma pessoa encapuzada observando de longe.",
    choices: [
        {
            text: "Observar a pessoa.",
            effects: {
                intelligence: 1,
                bravery: 1,
                xp: 20
            },
            log: "Sasah observou atentamente a figura encapuzada."
        },
        {
            text: "Aproximar-se.",
            effects: {
                bravery: 2,
                empathy: 1,
                xp: 20
            },
            log: "Sasah tentou se aproximar da figura."
        },
        {
            text: "Entrar no trem e não olhar para trás.",
            effects: {
                intelligence: 1,
                ambition: 1,
                xp: 20
            },
            log: "Sasah embarcou no trem."
        }
    ]
}


];

/* ============================================================
HISTÓRIA DE LUCAS
============================================================ */

var lucasStory = [


{
    title: "Prólogo — O Livro",
    location: "Casa de Lucas",
    text:
        "Entre caixas antigas, você encontra um livro que ninguém " +
        "parece lembrar que existe. A capa não possui título. " +
        "Há apenas um símbolo prateado gravado no centro.",
    choices: [
        {
            text: "Abrir o livro.",
            effects: {
                intelligence: 2,
                magic: 1,
                xp: 10
            },
            log: "Lucas abriu o misterioso livro."
        },
        {
            text: "Pesquisar o símbolo primeiro.",
            effects: {
                intelligence: 2,
                ambition: 1,
                xp: 10
            },
            log: "Lucas pesquisou o símbolo."
        },
        {
            text: "Guardar o livro.",
            effects: {
                loyalty: 1,
                empathy: 1,
                xp: 10
            },
            log: "Lucas decidiu guardar o livro."
        }
    ]
},

{
    title: "Capítulo I — As Páginas",
    location: "Quarto",
    text:
        "Quando você abre o livro novamente, as páginas começam a virar " +
        "sozinhas. Uma frase aparece lentamente: 'Dois caminhos serão " +
        "abertos. Apenas dois poderão fechá-los.'",
    choices: [
        {
            text: "Continuar lendo.",
            effects: {
                intelligence: 2,
                magic: 1,
                xp: 15
            },
            log: "Lucas continuou lendo."
        },
        {
            text: "Tentar destruir o livro.",
            effects: {
                bravery: 2,
                magic: 1,
                xp: 15
            },
            log: "Lucas tentou destruir o livro."
        },
        {
            text: "Guardar o livro em segredo.",
            effects: {
                loyalty: 1,
                ambition: 1,
                xp: 15
            },
            log: "Lucas decidiu guardar o segredo."
        }
    ]
},

{
    title: "Capítulo II — A Mensagem",
    location: "Quarto",
    text:
        "Uma nova mensagem surge: 'Procure Hogwarts. O castelo guarda " +
        "a resposta.' Ao terminar de ler, uma página desaparece.",
    choices: [
        {
            text: "Memorizar o conteúdo.",
            effects: {
                intelligence: 2,
                xp: 15
            },
            log: "Lucas memorizou a mensagem."
        },
        {
            text: "Procurar a página desaparecida.",
            effects: {
                bravery: 1,
                intelligence: 1,
                magic: 1,
                xp: 15
            },
            log: "Lucas procurou a página desaparecida."
        },
        {
            text: "Aceitar que Hogwarts é o próximo destino.",
            effects: {
                ambition: 2,
                bravery: 1,
                xp: 15
            },
            log: "Lucas decidiu seguir para Hogwarts."
        }
    ]
},

{
    title: "Capítulo III — O Visitante",
    location: "Rua",
    text:
        "Na noite seguinte, alguém bate à porta. Quando você abre, não há " +
        "ninguém. Apenas uma pequena caixa contendo uma peça metálica " +
        "com o mesmo símbolo do livro.",
    choices: [
        {
            text: "Abrir a caixa.",
            effects: {
                bravery: 1,
                magic: 2,
                xp: 20
            },
            log: "Lucas abriu a caixa misteriosa."
        },
        {
            text: "Examinar a caixa.",
            effects: {
                intelligence: 2,
                xp: 20
            },
            log: "Lucas examinou a caixa."
        },
        {
            text: "Guardar a caixa.",
            effects: {
                ambition: 1,
                loyalty: 1,
                xp: 20
            },
            log: "Lucas guardou a caixa."
        }
    ]
},

{
    title: "Capítulo IV — A Partida",
    location: "Estação",
    text:
        "No dia da viagem, você embarca rumo a Hogwarts. " +
        "Antes de entrar no trem, vê uma figura encapuzada segurando " +
        "algo que parece ser uma cópia do seu livro.",
    choices: [
        {
            text: "Seguir a figura.",
            effects: {
                bravery: 2,
                xp: 20
            },
            log: "Lucas decidiu seguir a figura."
        },
        {
            text: "Observar de longe.",
            effects: {
                intelligence: 2,
                xp: 20
            },
            log: "Lucas decidiu observar."
        },
        {
            text: "Entrar no trem.",
            effects: {
                ambition: 1,
                intelligence: 1,
                xp: 20
            },
            log: "Lucas entrou no trem."
        }
    ]
}


];

/* ============================================================
CHAPÉU SELETOR
============================================================ */

var houseQuestions = [


{
    question:
        "Você encontra uma criatura perigosa bloqueando seu caminho. O que faz?",
    answers: [
        {
            text: "Enfrento a criatura, mesmo com medo.",
            trait: "bravery"
        },
        {
            text: "Protejo meus amigos e procuro uma saída juntos.",
            trait: "loyalty"
        },
        {
            text: "Analiso o comportamento da criatura antes de agir.",
            trait: "intelligence"
        },
        {
            text: "Procuro uma maneira de usar a situação a meu favor.",
            trait: "ambition"
        },
        {
            text: "Tento descobrir por que a criatura está assustada.",
            trait: "empathy"
        }
    ]
},

{
    question:
        "Qual destas qualidades você considera mais importante?",
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
            text: "Ambição.",
            trait: "ambition"
        },
        {
            text: "Empatia.",
            trait: "empathy"
        }
    ]
},

{
    question:
        "Você descobre um segredo muito poderoso. O que faz?",
    answers: [
        {
            text: "Uso o segredo para proteger alguém.",
            trait: "bravery"
        },
        {
            text: "Guardo o segredo de quem confiou em mim.",
            trait: "loyalty"
        },
        {
            text: "Investigo para descobrir toda a verdade.",
            trait: "intelligence"
        },
        {
            text: "Penso em como o segredo pode me tornar mais poderoso.",
            trait: "ambition"
        },
        {
            text: "Penso primeiro em quem poderia ser prejudicado.",
            trait: "empathy"
        }
    ]
},

{
    question:
        "O que você mais deseja encontrar em Hogwarts?",
    answers: [
        {
            text: "Grandes aventuras.",
            trait: "bravery"
        },
        {
            text: "Amigos verdadeiros.",
            trait: "loyalty"
        },
        {
            text: "Conhecimento.",
            trait: "intelligence"
        },
        {
            text: "Reconhecimento.",
            trait: "ambition"
        },
        {
            text: "Um lugar onde todos possam se sentir acolhidos.",
            trait: "empathy"
        }
    ]
},

{
    question:
        "Um amigo está em perigo. O que faria?",
    answers: [
        {
            text: "Entraria no perigo para salvá-lo.",
            trait: "bravery"
        },
        {
            text: "Não o abandonaria por nada.",
            trait: "loyalty"
        },
        {
            text: "Criaria um plano para salvá-lo.",
            trait: "intelligence"
        },
        {
            text: "Assumiria o controle da situação.",
            trait: "ambition"
        },
        {
            text: "Tentaria compreender o que ele está sentindo.",
            trait: "empathy"
        }
    ]
}


];

/* ============================================================
CÁLCULO DAS CASAS
============================================================ */

function calculateHouse(playerName) {
var player =
getPlayer(playerName);


var scores = {
    Gryffindor: player.bravery,
    Hufflepuff:
        (player.loyalty +
            player.empathy) / 2,
    Ravenclaw: player.intelligence,
    Slytherin: player.ambition
};

var houses = [
    "Gryffindor",
    "Hufflepuff",
    "Ravenclaw",
    "Slytherin"
];

var highest = -1;
var possibleHouses = [];

for (var i = 0; i < houses.length; i++) {
    var houseName =
        houses[i];

    var score =
        scores[houseName];

    if (score > highest) {
        highest = score;
        possibleHouses = [
            houseName
        ];
    } else if (score === highest) {
        possibleHouses.push(
            houseName
        );
    }
}

/*
   Desempate pelo padrão de respostas.
*/

var answers =
    game.houseAnswers[playerName];

if (
    possibleHouses.length > 1 &&
    answers &&
    answers.length > 0
) {
    for (
        var a = answers.length - 1;
        a >= 0;
        a--
    ) {
        var trait =
            answers[a];

        var preferredHouse = "";

        if (trait === "bravery") {
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
            trait === "intelligence"
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

function getHouseDescription(house) {
if (house === "Gryffindor") {
return (
"Coragem, ousadia e determinação. " +
"Você não precisa deixar de sentir medo para ser corajoso."
);
}


if (house === "Hufflepuff") {
    return (
        "Lealdade, companheirismo, paciência e empatia. " +
        "Você valoriza as pessoas e não abandona facilmente aqueles que ama."
    );
}

if (house === "Ravenclaw") {
    return (
        "Inteligência, curiosidade, criatividade e conhecimento. " +
        "Você deseja compreender aquilo que existe além do óbvio."
    );
}

if (house === "Slytherin") {
    return (
        "Ambição, estratégia, determinação e astúcia. " +
        "Você sabe que objetivos importantes exigem persistência."
    );
}

return "";


}

function getHouseEmoji(house) {
if (house === "Gryffindor") {
return "🦁";
}

```
if (house === "Hufflepuff") {
    return "🦡";
}

if (house === "Ravenclaw") {
    return "🦅";
}

if (house === "Slytherin") {
    return "🐍";
}

return "🎩";


}

/* ============================================================
CHAPÉU — PERGUNTA
============================================================ */

function showHouseQuestion(playerName) {
var player =
getPlayer(playerName);


var questionIndex =
    game.houseQuestion;

if (
    questionIndex >=
    houseQuestions.length
) {
    finishHouse(playerName);
    return;
}

var currentQuestion =
    houseQuestions[
        questionIndex
    ];

setText(
    chapter,
    "CHAPÉU SELETOR — " +
        (questionIndex + 1) +
        " / " +
        houseQuestions.length
);

setText(
    locationElement,
    "Grande Salão de Hogwarts"
);

setText(
    playerTag,
    player.name
);

setText(
    scene,
    currentQuestion.question
);

choices.innerHTML = "";

for (
    var i = 0;
    i <
    currentQuestion.answers.length;
    i++
) {
    createHouseButton(
        playerName,
        currentQuestion.answers[i],
        i
    );
}

updateUI();


}

function createHouseButton(
playerName,
answer,
index
) {
var button =
document.createElement(
"button"
);


button.type = "button";

button.className =
    "choice-button house-choice";

button.textContent =
    String.fromCharCode(
        65 + index
    ) +
    " — " +
    answer.text;

button.addEventListener(
    "click",
    function () {
        handleHouseAnswer(
            playerName,
            answer.trait,
            button
        );
    }
);

choices.appendChild(
    button
);


}

function handleHouseAnswer(
playerName,
trait,
selectedButton
) {
var buttons =
choices.querySelectorAll(
".choice-button"
);


for (
    var i = 0;
    i < buttons.length;
    i++
) {
    buttons[i].disabled = true;
}

if (selectedButton) {
    selectedButton.classList.add(
        "selected"
    );
}

var player =
    getPlayer(playerName);

if (trait === "bravery") {
    player.bravery++;
}

if (trait === "loyalty") {
    player.loyalty++;
}

if (trait === "intelligence") {
    player.intelligence++;
}

if (trait === "ambition") {
    player.ambition++;
}

if (trait === "empathy") {
    player.empathy++;
}

game.houseAnswers[
    playerName
].push(trait);

addLog(
    player.name +
        " respondeu à pergunta " +
        (game.houseQuestion + 1) +
        " do Chapéu Seletor."
);

game.houseQuestion++;

saveGame();

setTimeout(
    function () {
        if (
            game.houseQuestion >=
            houseQuestions.length
        ) {
            finishHouse(
                playerName
            );
        } else {
            showHouseQuestion(
                playerName
            );
        }
    },
    350
);


}

/* ============================================================
RESULTADO DA CASA
============================================================ */

function finishHouse(playerName) {
var player =
getPlayer(playerName);


var house =
    calculateHouse(
        playerName
    );

player.house =
    house;

game.houseQuestion = 0;

addLog(
    player.name +
        " foi selecionado(a) para " +
        house +
        "."
);

saveGame();

showHouseResult(
    playerName,
    house
);


}

function showHouseResult(
playerName,
house
) {
var player =
getPlayer(playerName);


setText(
    chapter,
    "O CHAPÉU SELETOR DECIDIU"
);

setText(
    locationElement,
    "Grande Salão de Hogwarts"
);

setText(
    playerTag,
    player.name
);

choices.innerHTML = "";

scene.innerHTML = "";

var result =
    document.createElement(
        "div"
    );

result.className =
    "house-result";

var icon =
    document.createElement(
        "div"
    );

icon.className =
    "house-result-icon";

icon.textContent =
    getHouseEmoji(
        house
    );

var title =
    document.createElement(
        "h2"
    );

title.textContent =
    house;

var description =
    document.createElement(
        "p"
    );

description.textContent =
    getHouseDescription(
        house
    );

var playerText =
    document.createElement(
        "p"
    );

playerText.textContent =
    player.name +
    ", sua vida em Hogwarts acaba de começar.";

result.appendChild(icon);
result.appendChild(title);
result.appendChild(description);
result.appendChild(playerText);

scene.appendChild(
    result
);

var continueButton =
    document.createElement(
        "button"
    );

continueButton.type =
    "button";

continueButton.className =
    "choice-button continue-button";

continueButton.textContent =
    "Continuar";

continueButton.addEventListener(
    "click",
    function () {
        continueAfterHouse(
            playerName
        );
    }
);

choices.appendChild(
    continueButton
);

updateUI();


}

/* ============================================================
CONTINUAR APÓS A CASA
============================================================ */

function continueAfterHouse(
playerName
) {
if (playerName === "sasah") {
startLucas();
return;
}


if (playerName === "lucas") {
    startMeeting();
    return;
}


}

/* ============================================================
RENDERIZAÇÃO DA HISTÓRIA
============================================================ */

function renderStory(playerName) {
var player =
getPlayer(playerName);


var story =
    playerName === "sasah"
        ? sasahStory
        : lucasStory;

if (
    player.chapter >=
    story.length
) {
    showHouseQuestion(
        playerName
    );

    return;
}

var chapterData =
    story[player.chapter];

setText(
    chapter,
    chapterData.title
);

setText(
    locationElement,
    chapterData.location
);

setText(
    playerTag,
    player.name
);

setText(
    scene,
    replaceNames(
        chapterData.text
    )
);

choices.innerHTML = "";

for (
    var i = 0;
    i < chapterData.choices.length;
    i++
) {
    createStoryButton(
        playerName,
        chapterData.choices[i]
    );
}

updateUI();


}

/* ============================================================
SUBSTITUIÇÃO DE NOMES
============================================================ */

function replaceNames(text) {
if (!text) {
return "";
}


var result =
    text.replace(
        /\bSasah\b/g,
        game.sasah.name
    );

result =
    result.replace(
        /\bLucas\b/g,
        game.lucas.name
    );

return result;


}

/* ============================================================
BOTÕES DA HISTÓRIA
============================================================ */

function createStoryButton(
playerName,
choice
) {
var button =
document.createElement(
"button"
);


button.type =
    "button";

button.className =
    "choice-button";

button.textContent =
    replaceNames(
        choice.text
    );

button.addEventListener(
    "click",
    function () {
        applyEffects(
            playerName,
            choice.effects
        );

        if (choice.relationship) {
            applyRelationship(
                choice.relationship
            );
        }

        if (choice.flag) {
            game.storyFlags[
                choice.flag
            ] = true;
        }

        if (choice.log) {
            addLog(
                replaceNames(
                    choice.log
                )
            );
        }

        var player =
            getPlayer(
                playerName
            );

        player.chapter++;

        saveGame();

        renderStory(
            playerName
        );
    }
);

choices.appendChild(
    button
);


}

/* ============================================================
INÍCIO — SASAH
============================================================ */

function startSasah() {
game.gameStarted = true;
game.currentPlayer = "sasah";

```
addLog(
    game.sasah.name +
        " iniciou sua jornada."
);

saveGame();

renderStory(
    "sasah"
);


}

/* ============================================================
INÍCIO — LUCAS
============================================================ */

function startLucas() {
game.gameStarted = true;
game.currentPlayer = "lucas";


addLog(
    game.lucas.name +
        " iniciou sua jornada."
);

saveGame();

renderStory(
    "lucas"
);


}

/* ============================================================
ENCONTRO
============================================================ */

function startMeeting() {
game.currentPlayer =
"joint";


game.meetingStarted =
    true;

setText(
    chapter,
    "Capítulo — O Encontro"
);

setText(
    locationElement,
    "Hogwarts — Grande Salão"
);

setText(
    playerTag,
    game.sasah.name +
        " & " +
        game.lucas.name
);

setText(
    scene,
    game.sasah.name +
        " e " +
        game.lucas.name +
        " finalmente percebem que as histórias que os trouxeram " +
        "até Hogwarts estavam conectadas. Ambos carregam objetos " +
        "marcados pelo mesmo símbolo."
);

choices.innerHTML = "";

var meetingChoices = [
    {
        text:
            game.sasah.name +
            " se apresenta e tenta iniciar uma conversa.",
        relationship: {
            friendship: 3,
            trust: 2,
            affinity: 2
        },
        log:
            game.sasah.name +
            " decidiu iniciar uma conversa."
    },

    {
        text:
            game.lucas.name +
            " mostra seu objeto e pergunta sobre o símbolo.",
        relationship: {
            friendship: 2,
            trust: 3,
            affinity: 1
        },
        log:
            game.lucas.name +
            " decidiu compartilhar informações."
    },

    {
        text:
            "Os dois permanecem desconfiados um do outro.",
        relationship: {
            rivalry: 2,
            trust: -1
        },
        log:
            "O primeiro encontro foi marcado pela desconfiança."
    },

    {
        text:
            "Os dois percebem que possuem exatamente o mesmo objetivo.",
        relationship: {
            friendship: 4,
            trust: 4,
            affinity: 3
        },
        log:
            "Os dois perceberam que poderiam trabalhar juntos."
    }
];

for (
    var i = 0;
    i < meetingChoices.length;
    i++
) {
    createMissionButton(
        meetingChoices[i],
        function () {
            startJointMission();
        }
    );
}

updateUI();

saveGame();


}

/* ============================================================
MISSÃO CONJUNTA
============================================================ */

function startJointMission() {
game.currentPlayer =
"joint";


game.missionStarted =
    true;

setText(
    chapter,
    "Capítulo — O Símbolo Perdido"
);

setText(
    locationElement,
    "Hogwarts — Corredor Proibido"
);

setText(
    playerTag,
    game.sasah.name +
        " & " +
        game.lucas.name
);

setText(
    scene,
    "Durante a noite, " +
        game.sasah.name +
        " e " +
        game.lucas.name +
        " descobrem uma passagem escondida. " +
        "O símbolo aparece na porta. " +
        "Do outro lado parece existir algo que alguém tentou esconder " +
        "há muitos anos."
);

choices.innerHTML = "";

var missionChoices = [

    {
        text:
            "Abrir a porta imediatamente.",
        relationship: {
            friendship: 2,
            trust: 1
        },
        effectsSasah: {
            bravery: 1,
            magic: 1,
            xp: 25
        },
        effectsLucas: {
            bravery: 1,
            magic: 1,
            xp: 25
        },
        log:
            "Os dois decidiram enfrentar o mistério diretamente."
    },

    {
        text:
            "Investigar a porta antes de abri-la.",
        relationship: {
            trust: 3,
            affinity: 1
        },
        effectsSasah: {
            intelligence: 1,
            magic: 1,
            xp: 25
        },
        effectsLucas: {
            intelligence: 1,
            magic: 1,
            xp: 25
        },
        log:
            "Os dois investigaram cuidadosamente a passagem."
    },

    {
        text:
            "Procurar outra entrada.",
        relationship: {
            friendship: 2,
            trust: 2
        },
        effectsSasah: {
            empathy: 1,
            intelligence: 1,
            xp: 25
        },
        effectsLucas: {
            empathy: 1,
            intelligence: 1,
            xp: 25
        },
        log:
            "Os dois decidiram procurar uma alternativa."
    },

    {
        text:
            "Entrar juntos, preparados para qualquer coisa.",
        relationship: {
            friendship: 4,
            trust: 3,
            affinity: 2
        },
        effectsSasah: {
            bravery: 1,
            loyalty: 1,
            xp: 35
        },
        effectsLucas: {
            bravery: 1,
            loyalty: 1,
            xp: 35
        },
        log:
            "Os dois entraram juntos na passagem secreta."
    }
];

for (
    var i = 0;
    i < missionChoices.length;
    i++
) {
    createJointChoice(
        missionChoices[i]
    );
}

updateUI();


}

function createJointChoice(
choice
) {
var button =
document.createElement(
"button"
);


button.type =
    "button";

button.className =
    "choice-button";

button.textContent =
    choice.text;

button.addEventListener(
    "click",
    function () {
        disableChoiceButtons(
            button
        );

        applyRelationship(
            choice.relationship
        );

        applyEffects(
            "sasah",
            choice.effectsSasah
        );

        applyEffects(
            "lucas",
            choice.effectsLucas
        );

        addLog(
            choice.log
        );

        saveGame();

        setTimeout(
            function () {
                showEnding();
            },
            350
        );
    }
);

choices.appendChild(
    button
);


}

/* ============================================================
BOTÃO DE MISSÃO
============================================================ */

function createMissionButton(
choice,
callback
) {
var button =
document.createElement(
"button"
);


button.type =
    "button";

button.className =
    "choice-button";

button.textContent =
    choice.text;

button.addEventListener(
    "click",
    function () {
        disableChoiceButtons(
            button
        );

        applyRelationship(
            choice.relationship
        );

        if (choice.log) {
            addLog(
                choice.log
            );
        }

        saveGame();

        setTimeout(
            function () {
                callback();
            },
            350
        );
    }
);

choices.appendChild(
    button
);


}

function disableChoiceButtons(
selectedButton
) {
var buttons =
choices.querySelectorAll(
".choice-button"
);


for (
    var i = 0;
    i < buttons.length;
    i++
) {
    buttons[i].disabled =
        true;
}

if (selectedButton) {
    selectedButton.classList.add(
        "selected"
    );
}


}

/* ============================================================
FINAL
============================================================ */

function showEnding() {
game.finished =
true;


setText(
    chapter,
    "Fim do Primeiro Arco"
);

setText(
    locationElement,
    "Hogwarts — Sala Secreta"
);

setText(
    playerTag,
    game.sasah.name +
        " & " +
        game.lucas.name
);

scene.innerHTML = "";

var ending =
    document.createElement(
        "div"
    );

ending.className =
    "ending-box";

var title =
    document.createElement(
        "h2"
    );

title.textContent =
    "O segredo foi despertado";

var paragraph =
    document.createElement(
        "p"
    );

paragraph.textContent =
    getEndingText();

ending.appendChild(
    title
);

ending.appendChild(
    paragraph
);

scene.appendChild(
    ending
);

choices.innerHTML = "";

var restartButton =
    document.createElement(
        "button"
    );

restartButton.type =
    "button";

restartButton.className =
    "choice-button continue-button";

restartButton.textContent =
    "Jogar novamente";

restartButton.addEventListener(
    "click",
    restartGame
);

choices.appendChild(
    restartButton
);

updateUI();

saveGame();


}

function getEndingText() {
var friendship =
game.relationship.friendship;


var trust =
    game.relationship.trust;

var rivalry =
    game.relationship.rivalry;

var affinity =
    game.relationship.affinity;

var firstName =
    game.sasah.name;

var secondName =
    game.lucas.name;

if (
    rivalry >= 8 &&
    rivalry > friendship
) {
    return (
        firstName +
        " e " +
        secondName +
        " descobriram o segredo, mas a desconfiança entre os dois " +
        "continua crescendo. Hogwarts ainda não sabe se está diante " +
        "de dois futuros aliados ou de dois grandes rivais."
    );
}

if (
    friendship >= 10 &&
    trust >= 8
) {
    return (
        firstName +
        " e " +
        secondName +
        " deixaram a sala secreta como verdadeiros aliados. " +
        "A amizade construída entre os dois pode ser justamente " +
        "o que Hogwarts precisará quando a verdadeira ameaça surgir."
    );
}

if (
    affinity >= 6 &&
    trust >= 5
) {
    return (
        "Existe uma ligação incomum entre " +
        firstName +
        " e " +
        secondName +
        ". Eles ainda não compreendem completamente " +
        "o que os conecta, mas sabem que seus destinos " +
        "não se cruzaram por acaso."
    );
}

if (trust >= 6) {
    return (
        firstName +
        " e " +
        secondName +
        " decidiram confiar um no outro. " +
        "O mistério foi apenas parcialmente revelado, " +
        "e muitas perguntas continuam sem resposta."
    );
}

return (
    firstName +
    " e " +
    secondName +
    sobreviveram ao primeiro grande mistério de Hogwarts. " +
    "Entretanto, o símbolo continua brilhando nas sombras. " +
    "A aventura está apenas começando."
);


}

/* ============================================================
INTERFACE DOS JOGADORES
============================================================ */

function updatePlayerTag() {
if (!playerTag) {
return;
}


if (
    game.currentPlayer ===
    "joint"
) {
    playerTag.textContent =
        game.sasah.name +
        " & " +
        game.lucas.name;

    return;
}

var player =
    getPlayer(
        game.currentPlayer
    );

if (player) {
    playerTag.textContent =
        player.name;
}


}

function updateAttribute(
id,
value
) {
var element =
document.getElementById(
id
);


if (element) {
    element.textContent =
        String(value);
}


}

function updatePlayerInterface(
prefix,
player
) {
if (!player) {
return;
}


var houseElement =
    document.getElementById(
        prefix + "House"
    );

if (houseElement) {
    houseElement.textContent =
        player.house ||
        "Ainda não definida";
}

var hpText =
    document.getElementById(
        prefix + "HpText"
    );

var hpBar =
    document.getElementById(
        prefix + "Hp"
    );

if (hpText) {
    hpText.textContent =
        player.hp +
        " / " +
        player.maxHp;
}

if (hpBar) {
    hpBar.style.width =
        (
            player.hp /
            player.maxHp *
            100
        ) +
        "%";
}

var manaText =
    document.getElementById(
        prefix + "ManaText"
    );

var manaBar =
    document.getElementById(
        prefix + "Mana"
    );

if (manaText) {
    manaText.textContent =
        player.mana +
        " / " +
        player.maxMana;
}

if (manaBar) {
    manaBar.style.width =
        (
            player.mana /
            player.maxMana *
            100
        ) +
        "%";
}

var xpText =
    document.getElementById(
        prefix + "XpText"
    );

var xpBar =
    document.getElementById(
        prefix + "Xp"
    );

if (xpText) {
    xpText.textContent =
        String(
            player.xp
        );
}

if (xpBar) {
    xpBar.style.width =
        (
            player.xp %
            100
        ) +
        "%";
}

updateAttribute(
    prefix + "Bravery",
    player.bravery
);

updateAttribute(
    prefix + "Loyalty",
    player.loyalty
);

updateAttribute(
    prefix + "Intelligence",
    player.intelligence
);

updateAttribute(
    prefix + "Ambition",
    player.ambition
);

updateAttribute(
    prefix + "Empathy",
    player.empathy
);

updateAttribute(
    prefix + "Magic",
    player.magic
);


}

function updateRelationshipInterface() {
updateAttribute(
"friendship",
game.relationship.friendship
);


updateAttribute(
    "trust",
    game.relationship.trust
);

updateAttribute(
    "rivalry",
    game.relationship.rivalry
);

updateAttribute(
    "affinity",
    game.relationship.affinity
);


}

function updateNamesInInterface() {
var sasahName =
document.getElementById(
"sasahName"
);


var lucasName =
    document.getElementById(
        "lucasName"
    );

if (sasahName) {
    sasahName.textContent =
        game.sasah.name;
}

if (lucasName) {
    lucasName.textContent =
        game.lucas.name;
}


}

function updateUI() {
updatePlayerInterface(
"sasah",
game.sasah
);


updatePlayerInterface(
    "lucas",
    game.lucas
);

updateRelationshipInterface();

updateNamesInInterface();

updatePlayerTag();

updateLog();


}

/* ============================================================
SALVAR
============================================================ */

function saveGame() {
try {
localStorage.setItem(
SAVE_KEY,
JSON.stringify(game)
);
} catch (error) {
console.warn(
"Não foi possível salvar o jogo.",
error
);
}
}

/* ============================================================
CARREGAR
============================================================ */

function loadGame() {
try {
var saved =
localStorage.getItem(
SAVE_KEY
);


    if (!saved) {
        return false;
    }

    var parsed =
        JSON.parse(
            saved
        );

    if (
        !parsed ||
        !parsed.sasah ||
        !parsed.lucas
    ) {
        return false;
    }

    game = parsed;

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
            secretDoor: false,
            mysteriousBook: false,
            forbiddenForest: false,
            ancientArtifact: false,
            discoveredTruth: false
        };
    }

    if (
        typeof game.houseQuestion !==
        "number"
    ) {
        game.houseQuestion = 0;
    }

    if (!Array.isArray(game.log)) {
        game.log = [];
    }

    updateUI();

    return true;

} catch (error) {
    console.warn(
        "Erro ao carregar o jogo.",
        error
    );

    return false;
}


}

/* ============================================================
TELA DE NOMES
============================================================ */

function showNameScreen() {
setText(
chapter,
"Escolha seus protagonistas"
);


setText(
    locationElement,
    "Antes da aventura começar"
);

setText(
    playerTag,
    "Novos personagens"
);

scene.innerHTML = "";

var title =
    document.createElement(
        "h2"
    );

title.textContent =
    "Quem viverá esta aventura?";

var description =
    document.createElement(
        "p"
    );

description.textContent =
    "Você pode usar seus próprios nomes ou inventar dois personagens. " +
    "Os nomes escolhidos serão utilizados durante toda a história.";

var form =
    document.createElement(
        "div"
    );

form.className =
    "name-selection";

var label1 =
    document.createElement(
        "label"
    );

label1.textContent =
    "Nome do primeiro protagonista";

var input1 =
    document.createElement(
        "input"
    );

input1.type =
    "text";

input1.id =
    "characterName1";

input1.placeholder =
    "Ex.: Sasah";

input1.maxLength =
    30;

var label2 =
    document.createElement(
        "label"
    );

label2.textContent =
    "Nome do segundo protagonista";

var input2 =
    document.createElement(
        "input"
    );

input2.type =
    "text";

input2.id =
    "characterName2";

input2.placeholder =
    "Ex.: Lucas";

input2.maxLength =
    30;

form.appendChild(
    label1
);

form.appendChild(
    input1
);

form.appendChild(
    label2
);

form.appendChild(
    input2
);

scene.appendChild(
    title
);

scene.appendChild(
    description
);

scene.appendChild(
    form
);

choices.innerHTML = "";

var startButton =
    document.createElement(
        "button"
    );

startButton.type =
    "button";

startButton.className =
    "choice-button continue-button";

startButton.textContent =
    "Começar aventura";

startButton.addEventListener(
    "click",
    function () {
        startCustomGame();
    }
);

choices.appendChild(
    startButton
);

var backButton =
    document.createElement(
        "button"
    );

backButton.type =
    "button";

backButton.className =
    "choice-button";

backButton.textContent =
    "Usar Sasah e Lucas";

backButton.addEventListener(
    "click",
    function () {
        startGameWithNames(
            "Sasah",
            "Lucas"
        );
    }
);

choices.appendChild(
    backButton
);


}

function startCustomGame() {
var input1 =
document.getElementById(
"characterName1"
);


var input2 =
    document.getElementById(
        "characterName2"
    );

var name1 =
    input1
        ? input1.value.trim()
        : "";

var name2 =
    input2
        ? input2.value.trim()
        : "";

if (!name1) {
    name1 = "Sasah";
}

if (!name2) {
    name2 = "Lucas";
}

startGameWithNames(
    name1,
    name2
);


}

function startGameWithNames(
name1,
name2
) {
game =
createDefaultGame();


game.sasah.name =
    name1;

game.lucas.name =
    name2;

game.gameStarted =
    true;

addLog(
    "A aventura de " +
        name1 +
        " e " +
        name2 +
        " começou."
);

saveGame();

startSasah();


}

/* ============================================================
CONTINUAR SALVAMENTO
============================================================ */

function continueFromSave() {
var loaded =
loadGame();


if (!loaded) {
    showNameScreen();
    return;
}

game.gameStarted =
    true;

if (game.finished) {
    showEnding();
    return;
}

if (
    game.currentPlayer ===
    "sasah"
) {
    if (
        game.sasah.chapter >=
        sasahStory.length
    ) {
        showHouseQuestion(
            "sasah"
        );
    } else {
        renderStory(
            "sasah"
        );
    }

    return;
}

if (
    game.currentPlayer ===
    "lucas"
) {
    if (
        game.lucas.chapter >=
        lucasStory.length
    ) {
        showHouseQuestion(
            "lucas"
        );
    } else {
        renderStory(
            "lucas"
        );
    }

    return;
}

if (
    game.currentPlayer ===
    "joint"
) {
    if (
        game.missionStarted
    ) {
        startJointMission();
    } else {
        startMeeting();
    }

    return;
}

startSasah();


}

/* ============================================================
NOVA AVENTURA
============================================================ */

function createNewGame() {
try {
localStorage.removeItem(
SAVE_KEY
);
} catch (error) {
console.warn(
"Não foi possível limpar o salvamento.",
error
);
}


game =
    createDefaultGame();

updateUI();

showNameScreen();

}

/* ============================================================
REINICIAR
============================================================ */

function restartGame() {
var confirmed =
window.confirm(
"Deseja realmente apagar o progresso e começar uma nova aventura?"
);


if (!confirmed) {
    return;
}

createNewGame();


}

/* ============================================================
TELA INICIAL
============================================================ */

function showStartScreen() {
if (!pageIsReady()) {
return;
}


setText(
    chapter,
    "Hogwarts RPG"
);

setText(
    locationElement,
    "Uma nova aventura mágica"
);

setText(
    playerTag,
    "Dois destinos"
);

scene.innerHTML = "";

var title =
    document.createElement(
        "h2"
    );

title.textContent =
    "Bem-vindo a Hogwarts";

var description =
    document.createElement(
        "p"
    );

description.textContent =
    "Duas pessoas receberão cartas para Hogwarts. " +
    "Suas histórias começarão separadas, mas seus destinos " +
    "estarão ligados por um antigo mistério.";

scene.appendChild(
    title
);

scene.appendChild(
    description
);

choices.innerHTML = "";

var newButton =
    document.createElement(
        "button"
    );

newButton.type =
    "button";

newButton.className =
    "choice-button continue-button";

newButton.textContent =
    "Criar personagens";

newButton.addEventListener(
    "click",
    function () {
        createNewGame();
    }
);

choices.appendChild(
    newButton
);

var hasSave =
    false;

try {
    hasSave =
        localStorage.getItem(
            SAVE_KEY
        ) !== null;
} catch (error) {
    hasSave = false;
}

if (hasSave) {
    var continueButton =
        document.createElement(
            "button"
        );

    continueButton.type =
        "button";

    continueButton.className =
        "choice-button";

    continueButton.textContent =
        "Continuar jogo salvo";

    continueButton.addEventListener(
        "click",
        continueFromSave
    );

    choices.appendChild(
        continueButton
    );
}

updateUI();


}

/* ============================================================
BOTÕES FIXOS
============================================================ */

function setupButtons() {
var saveButton =
document.getElementById(
"saveButton"
);


var loadButton =
    document.getElementById(
        "loadButton"
    );

var restartButton =
    document.getElementById(
        "restartButton"
    );

if (saveButton) {
    saveButton.addEventListener(
        "click",
        function () {
            saveGame();

            addLog(
                "Jogo salvo."
            );
        }
    );
}

if (loadButton) {
    loadButton.addEventListener(
        "click",
        function () {
            if (
                loadGame()
            ) {
                addLog(
                    "Jogo carregado."
                );

                continueFromSave();
            } else {
                addLog(
                    "Nenhum jogo salvo foi encontrado."
                );
            }
        }
    );
}

if (restartButton) {
    restartButton.addEventListener(
        "click",
        restartGame
    );
}


}

/* ============================================================
INICIALIZAÇÃO
============================================================ */

function startApplication() {
getElements();


if (!pageIsReady()) {
    console.error(
        "O RPG não encontrou todos os elementos necessários do HTML."
    );

    return;
}

setupButtons();

showStartScreen();


}

/* ============================================================
DOM READY
============================================================ */

if (
document.readyState ===
"loading"
) {
document.addEventListener(
"DOMContentLoaded",
startApplication
);
} else {
startApplication();
}
