"use strict";

/* =========================================================
RPG SASAH & LUCAS
Harry Potter / Hogwarts
Versão estável
========================================================= */

const SAVE_KEY = "sasahLucasRPG_v3";

/* =========================================================
DADOS
========================================================= */

const houses = {
Gryffindor: {
emoji: "🦁",
color: "Vermelho e dourado"
},
Hufflepuff: {
emoji: "🦡",
color: "Amarelo e preto"
},
Ravenclaw: {
emoji: "🦅",
color: "Azul e bronze"
},
Slytherin: {
emoji: "🐍",
color: "Verde e prata"
}
};

function createPlayer(name) {
return {
name: name,
house: "Não definida",
hp: 100,
mana: 100,
xp: 0,

```
    bravery: 0,
    loyalty: 0,
    intelligence: 0,
    ambition: 0,
    empathy: 0,
    magic: 0
};
```

}

function createGame() {
return {
version: 3,

```
    currentPlayer: "sasah",

    sasah: createPlayer("Sasah"),
    lucas: createPlayer("Lucas"),

    chapterSasah: 0,
    chapterLucas: 0,

    friendship: 0,
    trust: 0,
    rivalry: 0,
    affinity: 0,

    started: false,
    finished: false
};
```

}

let game = createGame();

/* =========================================================
ELEMENTOS HTML
========================================================= */

let sceneElement;
let chapterElement;
let locationElement;
let choicesElement;
let playerTag;
let logElement;

/* =========================================================
INICIALIZAÇÃO
========================================================= */

function getElements() {
sceneElement = document.getElementById("scene");
chapterElement = document.getElementById("chapter");
locationElement = document.getElementById("location");
choicesElement = document.getElementById("choices");
playerTag = document.getElementById("playerTag");
logElement = document.getElementById("log");
}

function interfaceReady() {
return (
sceneElement &&
chapterElement &&
locationElement &&
choicesElement
);
}

/* =========================================================
UTILIDADES
========================================================= */

function clamp(value, min, max) {
return Math.max(min, Math.min(max, value));
}

function setText(element, text) {
if (element) {
element.textContent = text;
}
}

function addLog(text) {
if (!logElement) return;

```
const entry = document.createElement("div");
entry.className = "log-entry";
entry.textContent = text;

logElement.appendChild(entry);

while (logElement.children.length > 12) {
    logElement.removeChild(logElement.firstChild);
}

logElement.scrollTop = logElement.scrollHeight;
```

}

function updatePlayerTag() {
if (!playerTag) return;

```
const player =
    game.currentPlayer === "sasah"
        ? game.sasah
        : game.lucas;

playerTag.textContent =
    player.name + " — " + player.house;
```

}

/* =========================================================
EFEITOS
========================================================= */

function applyEffects(effects) {
if (!effects) return;

```
const player =
    game.currentPlayer === "sasah"
        ? game.sasah
        : game.lucas;

const attributes = [
    "bravery",
    "loyalty",
    "intelligence",
    "ambition",
    "empathy",
    "magic"
];

attributes.forEach(attribute => {
    if (typeof effects[attribute] === "number") {
        player[attribute] += effects[attribute];
    }
});

if (typeof effects.hp === "number") {
    player.hp = clamp(player.hp + effects.hp, 0, 100);
}

if (typeof effects.mana === "number") {
    player.mana = clamp(player.mana + effects.mana, 0, 100);
}

if (typeof effects.xp === "number") {
    player.xp += effects.xp;
}

const relationshipAttributes = [
    "friendship",
    "trust",
    "rivalry",
    "affinity"
];

relationshipAttributes.forEach(attribute => {
    if (typeof effects[attribute] === "number") {
        game[attribute] += effects[attribute];
    }
});
```

}

/* =========================================================
QUESTIONÁRIO DAS CASAS
========================================================= */

const houseQuestions = [
{
question:
"Você encontra uma criatura perigosa bloqueando seu caminho. O que faz?",
answers: [
{
text: "Enfrento o perigo imediatamente.",
effects: { bravery: 3 }
},
{
text: "Procuro proteger primeiro quem está comigo.",
effects: { loyalty: 3 }
},
{
text: "Observo a criatura para descobrir seu ponto fraco.",
effects: { intelligence: 3 }
},
{
text: "Tento transformar a situação em uma oportunidade.",
effects: { ambition: 3 }
},
{
text: "Tento entender por que a criatura está agressiva.",
effects: { empathy: 3 }
}
]
},

```
{
    question:
        "Qual destas características você mais admira?",
    answers: [
        {
            text: "Coragem.",
            effects: { bravery: 3 }
        },
        {
            text: "Lealdade.",
            effects: { loyalty: 3 }
        },
        {
            text: "Inteligência.",
            effects: { intelligence: 3 }
        },
        {
            text: "Determinação.",
            effects: { ambition: 3 }
        },
        {
            text: "Compaixão.",
            effects: { empathy: 3 }
        }
    ]
},

{
    question:
        "Você descobre uma passagem secreta proibida em Hogwarts. O que faz?",
    answers: [
        {
            text: "Entro. Algumas regras existem para serem desafiadas.",
            effects: { bravery: 3 }
        },
        {
            text: "Só entro se meus amigos também estiverem seguros.",
            effects: { loyalty: 3 }
        },
        {
            text: "Investigo cuidadosamente antes de entrar.",
            effects: { intelligence: 3 }
        },
        {
            text: "Procuro descobrir se há algo valioso escondido ali.",
            effects: { ambition: 3 }
        },
        {
            text: "Penso nas consequências para todos os envolvidos.",
            effects: { empathy: 3 }
        }
    ]
},

{
    question:
        "Um colega confia a você um segredo muito importante.",
    answers: [
        {
            text: "Guardo o segredo, mesmo que isso me coloque em perigo.",
            effects: { bravery: 3 }
        },
        {
            text: "Jamais trairia alguém que confiou em mim.",
            effects: { loyalty: 3 }
        },
        {
            text: "Analiso cuidadosamente o que fazer com essa informação.",
            effects: { intelligence: 3 }
        },
        {
            text: "Penso em como a informação poderia me ajudar.",
            effects: { ambition: 3 }
        },
        {
            text: "Penso primeiro no que a pessoa está sentindo.",
            effects: { empathy: 3 }
        }
    ]
},

{
    question:
        "Seu feitiço falha diante de toda a turma. Como reage?",
    answers: [
        {
            text: "Tento novamente sem medo de errar.",
            effects: { bravery: 3 }
        },
        {
            text: "Peço ajuda e continuo tentando.",
            effects: { loyalty: 3 }
        },
        {
            text: "Analiso exatamente onde cometi o erro.",
            effects: { intelligence: 3 }
        },
        {
            text: "Transformo a falha em motivação para ficar melhor.",
            effects: { ambition: 3 }
        },
        {
            text: "Espero que ninguém tenha se sentido mal com a situação.",
            effects: { empathy: 3 }
        }
    ]
}
```

];

function calculateHouse(player) {
const scores = {
Gryffindor: player.bravery,
Hufflepuff: player.loyalty + player.empathy,
Ravenclaw: player.intelligence,
Slytherin: player.ambition
};

```
let bestHouse = "Gryffindor";
let bestScore = -Infinity;

Object.keys(scores).forEach(house => {
    if (scores[house] > bestScore) {
        bestScore = scores[house];
        bestHouse = house;
    }
});

return bestHouse;
```

}

function showHouseQuestion(playerKey, questionIndex) {
const player =
playerKey === "sasah"
? game.sasah
: game.lucas;

```
const question = houseQuestions[questionIndex];

setText(
    chapterElement,
    "Seleção para a Casa"
);

setText(
    locationElement,
    "Hogwarts — Salão Principal"
);

setText(
    sceneElement,
    "O Chapéu Seletor observa " +
    player.name +
    ".\n\n" +
    question.question
);

choicesElement.innerHTML = "";

question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "choice";
    button.type = "button";
    button.textContent =
        (index + 1) + ". " + answer.text;

    button.addEventListener("click", function () {
        applyPlayerEffects(playerKey, answer.effects);

        addLog(
            player.name +
            " respondeu à pergunta " +
            (questionIndex + 1) +
            " da Seleção."
        );

        if (questionIndex + 1 < houseQuestions.length) {
            showHouseQuestion(
                playerKey,
                questionIndex + 1
            );
        } else {
            finishHouseSelection(playerKey);
        }

        updateUI();
    });

    choicesElement.appendChild(button);
});
```

}

function applyPlayerEffects(playerKey, effects) {
const oldPlayer = game.currentPlayer;

```
game.currentPlayer = playerKey;
applyEffects(effects);
game.currentPlayer = oldPlayer;
```

}

function finishHouseSelection(playerKey) {
const player =
playerKey === "sasah"
? game.sasah
: game.lucas;

```
player.house = calculateHouse(player);

const house = houses[player.house];

setText(
    sceneElement,
    "O Chapéu Seletor finalmente anuncia:\n\n" +
    "— " +
    player.house.toUpperCase() +
    "!\n\n" +
    house.emoji +
    " " +
    player.name +
    " agora pertence à Casa " +
    player.house +
    "."
);

setText(
    chapterElement,
    "A Casa foi escolhida"
);

setText(
    locationElement,
    "Hogwarts"
);

choicesElement.innerHTML = "";

const button = document.createElement("button");
button.className = "choice";
button.type = "button";
button.textContent = "Continuar aventura";

button.addEventListener("click", function () {
    if (playerKey === "sasah") {
        startLucas();
    } else {
        startMeeting();
    }
});

choicesElement.appendChild(button);

addLog(
    player.name +
    " foi selecionado para " +
    player.house +
    "."
);

updateUI();
```

}

/* =========================================================
HISTÓRIA DE SASAH
========================================================= */

const sasahStory = [
{
chapter: "Prólogo — A carta",
location: "Casa de Sasah",
text:
"A noite parecia comum. Sasah estava em seu quarto quando uma corrente de ar atravessou a janela fechada.\n\n" +
"Uma coruja pousou silenciosamente perto da janela e deixou um envelope sobre a mesa.\n\n" +
"O envelope era pesado, antigo e trazia um símbolo estranho em cera.\n\n" +
"Sasah percebeu imediatamente que havia alguma coisa diferente naquela carta.",
choices: [
{
text: "Abrir a carta imediatamente.",
effects: {
bravery: 1,
magic: 2,
xp: 5
},
result:
"Sasah abre a carta e sente uma pequena vibração mágica percorrer seus dedos."
},
{
text: "Examinar o selo antes de abrir.",
effects: {
intelligence: 2,
magic: 1,
xp: 5
},
result:
"Sasah percebe que o símbolo do selo não pertence a nenhuma família comum."
},
{
text: "Guardar a carta e procurar alguém de confiança.",
effects: {
loyalty: 2,
empathy: 1,
xp: 5
},
result:
"Sasah decide que não precisa enfrentar aquele mistério sozinha."
}
]
},

```
{
    chapter: "Capítulo I — O chamado",
    location: "Quarto de Sasah",
    text:
        "Dentro do envelope existe uma carta de Hogwarts.\n\n" +
        "Por alguns segundos, Sasah permanece imóvel.\n\n" +
        "Então percebe algo ainda mais estranho: o mesmo símbolo do selo aparece desenhado no vidro da janela.\n\n" +
        "Uma sensação mágica cresce dentro do quarto.",
    choices: [
        {
            text: "Tocar no símbolo da janela.",
            effects: {
                bravery: 2,
                magic: 2,
                xp: 10
            },
            result:
                "Quando Sasah toca o símbolo, ele brilha por alguns segundos."
        },
        {
            text: "Copiar o símbolo para estudar depois.",
            effects: {
                intelligence: 2,
                xp: 10
            },
            result:
                "Sasah memoriza cada detalhe do símbolo."
        },
        {
            text: "Apagar o símbolo e fechar a janela.",
            effects: {
                empathy: 1,
                loyalty: 1,
                xp: 8
            },
            result:
                "Sasah prefere não provocar uma força que ainda não compreende."
        }
    ]
},

{
    chapter: "Capítulo II — O homem encapuzado",
    location: "Beco mágico",
    text:
        "Depois de seguir as instruções da carta, Sasah chega a um pequeno distrito mágico.\n\n" +
        "As lojas estão iluminadas por lanternas flutuantes e criaturas estranhas passam pelas ruas.\n\n" +
        "Porém, no final do beco, uma figura encapuzada observa Sasah.\n\n" +
        "No peito da figura está exatamente o mesmo símbolo da carta.",
    choices: [
        {
            text: "Seguir a figura.",
            effects: {
                bravery: 2,
                ambition: 1,
                xp: 15
            },
            result:
                "Sasah segue a figura até uma rua estreita, onde encontra uma pista sobre Hogwarts."
        },
        {
            text: "Observar escondida.",
            effects: {
                intelligence: 2,
                xp: 15
            },
            result:
                "Sasah percebe que a figura parece procurar alguém."
        },
        {
            text: "Perguntar diretamente quem ele é.",
            effects: {
                empathy: 2,
                bravery: 1,
                xp: 15
            },
            result:
                "A figura permanece em silêncio, mas deixa cair um pequeno objeto mágico."
        }
    ]
}
```

];

function startSasah() {
game.currentPlayer = "sasah";
game.chapterSasah = 0;

```
addLog("A aventura de Sasah começou.");

showSasahChapter();
```

}

function showSasahChapter() {
if (game.chapterSasah >= sasahStory.length) {
showHouseQuestion("sasah", 0);
return;
}

```
const chapter = sasahStory[game.chapterSasah];

renderScene(
    "sasah",
    chapter.chapter,
    chapter.location,
    chapter.text,
    chapter.choices
);
```

}

function continueSasah(choice) {
applyEffects(choice.effects);

```
addLog(choice.result);

game.chapterSasah++;

showSasahChapter();

updateUI();
```

}

/* =========================================================
HISTÓRIA DE LUCAS
========================================================= */

const lucasStory = [
{
chapter: "Prólogo — O estranho sonho",
location: "Casa de Lucas",
text:
"Na mesma noite em que Sasah recebe sua carta, Lucas tem um sonho estranho.\n\n" +
"Ele está diante de um castelo gigantesco.\n\n" +
"Uma voz distante pronuncia seu nome.\n\n" +
"Quando acorda, encontra um livro que nunca havia visto sobre sua mesa.",
choices: [
{
text: "Abrir o livro.",
effects: {
bravery: 1,
intelligence: 1,
magic: 2,
xp: 5
},
result:
"Lucas abre o livro e encontra uma página que muda sozinha."
},
{
text: "Estudar a capa e os símbolos.",
effects: {
intelligence: 3,
xp: 5
},
result:
"Lucas percebe que os símbolos parecem formar um mapa."
},
{
text: "Guardar o livro.",
effects: {
loyalty: 1,
empathy: 1,
xp: 5
},
result:
"Lucas decide que precisa pensar antes de tomar qualquer decisão."
}
]
},

```
{
    chapter: "Capítulo I — A mensagem",
    location: "Quarto de Lucas",
    text:
        "Uma mensagem aparece no livro.\n\n" +
        "Ela fala sobre Hogwarts e sobre uma antiga ameaça que voltou a se movimentar.\n\n" +
        "No final da página existe o mesmo símbolo que Sasah encontrou em sua carta.",
    choices: [
        {
            text: "Investigar imediatamente.",
            effects: {
                bravery: 2,
                xp: 10
            },
            result:
                "Lucas descobre que o símbolo está relacionado a uma antiga passagem mágica."
        },
        {
            text: "Pesquisar o símbolo no livro.",
            effects: {
                intelligence: 2,
                magic: 1,
                xp: 10
            },
            result:
                "Lucas encontra uma referência a uma sala secreta de Hogwarts."
        },
        {
            text: "Procurar alguém que possa ajudar.",
            effects: {
                loyalty: 2,
                empathy: 1,
                xp: 10
            },
            result:
                "Lucas decide que confiar em alguém pode ser mais seguro."
        }
    ]
},

{
    chapter: "Capítulo II — O distrito mágico",
    location: "Distrito mágico",
    text:
        "Lucas chega ao distrito mágico indicado pelo livro.\n\n" +
        "Entre lojas e vielas, ele percebe uma figura encapuzada segurando um objeto idêntico ao símbolo de sua mensagem.\n\n" +
        "A figura desaparece rapidamente em uma esquina.",
    choices: [
        {
            text: "Correr atrás da figura.",
            effects: {
                bravery: 2,
                ambition: 1,
                xp: 15
            },
            result:
                "Lucas corre atrás da figura e encontra uma pista escondida."
        },
        {
            text: "Observar de longe.",
            effects: {
                intelligence: 2,
                xp: 15
            },
            result:
                "Lucas descobre que a figura parece estar esperando alguém."
        },
        {
            text: "Perguntar aos comerciantes.",
            effects: {
                empathy: 2,
                loyalty: 1,
                xp: 15
            },
            result:
                "Um comerciante revela que outras pessoas também viram aquela figura."
        }
    ]
}
```

];

function startLucas() {
game.currentPlayer = "lucas";
game.chapterLucas = 0;

```
addLog("Agora a história de Lucas começa.");

showLucasChapter();
```

}

function showLucasChapter() {
if (game.chapterLucas >= lucasStory.length) {
showHouseQuestion("lucas", 0);
return;
}

```
const chapter = lucasStory[game.chapterLucas];

renderScene(
    "lucas",
    chapter.chapter,
    chapter.location,
    chapter.text,
    chapter.choices
);
```

}

function continueLucas(choice) {
applyEffects(choice.effects);

```
addLog(choice.result);

game.chapterLucas++;

showLucasChapter();

updateUI();
```

}

/* =========================================================
RENDERIZAÇÃO
========================================================= */

function renderScene(
playerKey,
chapter,
location,
text,
choices
) {
game.currentPlayer = playerKey;

```
setText(chapterElement, chapter);
setText(locationElement, location);
setText(sceneElement, text);

updatePlayerTag();

choicesElement.innerHTML = "";

choices.forEach((choice, index) => {
    const button = document.createElement("button");

    button.className = "choice";
    button.type = "button";

    button.textContent =
        (index + 1) + ". " + choice.text;

    button.addEventListener("click", function () {
        if (playerKey === "sasah") {
            continueSasah(choice);
        } else {
            continueLucas(choice);
        }
    });

    choicesElement.appendChild(button);
});

updateUI();
```

}

/* =========================================================
ENCONTRO DE SASAH E LUCAS
========================================================= */

function startMeeting() {
game.currentPlayer = "sasah";

```
setText(
    chapterElement,
    "Capítulo III — O encontro"
);

setText(
    locationElement,
    "Hogwarts — Corredor antigo"
);

setText(
    sceneElement,
    "Os caminhos de Sasah e Lucas finalmente se cruzam.\n\n" +
    "Os dois percebem que carregam pistas relacionadas ao mesmo símbolo.\n\n" +
    "Por alguns segundos, nenhum dos dois sabe se deve confiar no outro."
);

choicesElement.innerHTML = "";

const choices = [
    {
        text: "Sasah decide confiar em Lucas.",
        effects: {
            friendship: 3,
            trust: 3,
            affinity: 2
        }
    },
    {
        text: "Lucas decide confiar em Sasah.",
        effects: {
            friendship: 3,
            trust: 3,
            affinity: 2
        }
    },
    {
        text: "Os dois decidem competir para descobrir quem está certo.",
        effects: {
            rivalry: 4,
            affinity: 1
        }
    },
    {
        text: "Os dois mantêm distância até descobrirem a verdade.",
        effects: {
            trust: 1,
            rivalry: 1
        }
    }
];

choices.forEach(choice => {
    const button = document.createElement("button");

    button.className = "choice";
    button.type = "button";
    button.textContent = choice.text;

    button.addEventListener("click", function () {
        applyRelationshipEffects(choice.effects);

        addLog(
            "Sasah e Lucas tomaram uma decisão sobre sua relação."
        );

        jointMission();
        updateUI();
    });

    choicesElement.appendChild(button);
});

updateUI();
```

}

function applyRelationshipEffects(effects) {
if (!effects) return;

```
if (typeof effects.friendship === "number") {
    game.friendship += effects.friendship;
}

if (typeof effects.trust === "number") {
    game.trust += effects.trust;
}

if (typeof effects.rivalry === "number") {
    game.rivalry += effects.rivalry;
}

if (typeof effects.affinity === "number") {
    game.affinity += effects.affinity;
}
```

}

/* =========================================================
MISSÃO CONJUNTA
========================================================= */

function jointMission() {
setText(
chapterElement,
"Capítulo IV — A sala escondida"
);

```
setText(
    locationElement,
    "Hogwarts — Ala proibida"
);

setText(
    sceneElement,
    "As pistas finalmente levam Sasah e Lucas até uma porta antiga.\n\n" +
    "O símbolo encontrado pelos dois está gravado no centro dela.\n\n" +
    "Para abrir a porta, os dois precisam decidir como agir."
);

choicesElement.innerHTML = "";

const choices = [
    {
        text: "Trabalhar juntos e procurar uma solução.",
        effects: {
            friendship: 4,
            trust: 4,
            xp: 20
        },
        result:
            "A colaboração entre os dois faz a porta reagir."
    },
    {
        text: "Sasah tenta abrir a porta com magia.",
        effects: {
            bravery: 2,
            magic: 3,
            xp: 20
        },
        result:
            "A magia de Sasah faz o símbolo começar a brilhar."
    },
    {
        text: "Lucas tenta decifrar os símbolos.",
        effects: {
            intelligence: 3,
            xp: 20
        },
        result:
            "Lucas encontra uma sequência escondida nos símbolos."
    },
    {
        text: "Os dois competem para ver quem consegue abrir primeiro.",
        effects: {
            rivalry: 4,
            xp: 15
        },
        result:
            "A competição aumenta a tensão entre Sasah e Lucas."
    }
];

choices.forEach(choice => {
    const button = document.createElement("button");

    button.className = "choice";
    button.type = "button";
    button.textContent = choice.text;

    button.addEventListener("click", function () {
        game.currentPlayer = "sasah";
        applyEffects(choice.effects);

        addLog(choice.result);

        finalScene();
        updateUI();
    });

    choicesElement.appendChild(button);
});
```

}

/* =========================================================
FINAL
========================================================= */

function finalScene() {
game.finished = true;

```
let relationshipText;

if (game.friendship >= 6 && game.trust >= 5) {
    relationshipText =
        "A confiança entre Sasah e Lucas se tornou muito forte. Os dois descobriram que juntos são capazes de enfrentar desafios que nenhum deles conseguiria enfrentar sozinho.";
} else if (game.rivalry >= 5) {
    relationshipText =
        "A rivalidade entre Sasah e Lucas cresceu. Eles continuam competindo, mas no fundo sabem que seus destinos estão ligados.";
} else {
    relationshipText =
        "Sasah e Lucas seguem caminhos diferentes dentro de Hogwarts, mas sabem que ainda terão muitos encontros pela frente.";
}

setText(
    chapterElement,
    "Fim do primeiro arco"
);

setText(
    locationElement,
    "Hogwarts"
);

setText(
    sceneElement,
    "A porta finalmente se abre.\n\n" +
    "Do outro lado existe uma enorme sala circular, cheia de livros, retratos antigos e objetos mágicos.\n\n" +
    relationshipText +
    "\n\n" +
    "A aventura está apenas começando..."
);

choicesElement.innerHTML = "";

const button = document.createElement("button");

button.className = "choice";
button.type = "button";
button.textContent = "Recomeçar aventura";

button.addEventListener("click", restartGame);

choicesElement.appendChild(button);

addLog("Primeiro arco concluído!");

updateUI();
```

}

/* =========================================================
INTERFACE DOS PERSONAGENS
========================================================= */

function updateCharacterUI(player, prefix) {
setText(
document.getElementById(prefix + "House"),
player.house
);

```
setText(
    document.getElementById(prefix + "HpText"),
    player.hp
);

setText(
    document.getElementById(prefix + "ManaText"),
    player.mana
);

setText(
    document.getElementById(prefix + "XpText"),
    player.xp
);

const hpBar =
    document.getElementById(prefix + "Hp");

const manaBar =
    document.getElementById(prefix + "Mana");

if (hpBar) {
    hpBar.style.width = player.hp + "%";
}

if (manaBar) {
    manaBar.style.width = player.mana + "%";
}

const attributes = [
    "bravery",
    "loyalty",
    "intelligence",
    "ambition",
    "empathy",
    "magic"
];

attributes.forEach(attribute => {
    const element =
        document.getElementById(
            prefix + attribute.charAt(0).toUpperCase() + attribute.slice(1)
        );

    if (element) {
        element.textContent = player[attribute];
    }
});
```

}

function updateRelationshipUI() {
setText(
document.getElementById("friendship"),
game.friendship
);

```
setText(
    document.getElementById("trust"),
    game.trust
);

setText(
    document.getElementById("rivalry"),
    game.rivalry
);

setText(
    document.getElementById("affinity"),
    game.affinity
);
```

}

function updateUI() {
updateCharacterUI(game.sasah, "sasah");
updateCharacterUI(game.lucas, "lucas");

```
updateRelationshipUI();
updatePlayerTag();
```

}

/* =========================================================
SALVAMENTO
========================================================= */

function saveGame() {
try {
localStorage.setItem(
SAVE_KEY,
JSON.stringify(game)
);

```
    addLog("Jogo salvo com sucesso.");
} catch (error) {
    console.error(error);
    addLog("Não foi possível salvar o jogo.");
}
```

}

function loadGame() {
try {
const saved = localStorage.getItem(SAVE_KEY);

```
    if (!saved) {
        addLog("Nenhum jogo salvo encontrado.");
        return;
    }

    const parsed = JSON.parse(saved);

    if (
        !parsed ||
        !parsed.sasah ||
        !parsed.lucas
    ) {
        throw new Error("Arquivo de salvamento inválido.");
    }

    game = parsed;

    addLog("Jogo carregado com sucesso.");

    updateUI();

    if (game.finished) {
        finalScene();
    } else {
        /*
         * Recomeça a cena correspondente ao estado salvo.
         */
        if (game.currentPlayer === "sasah") {
            if (
                game.chapterSasah >= sasahStory.length
            ) {
                showHouseQuestion("sasah", 0);
            } else {
                showSasahChapter();
            }
        } else {
            if (
                game.chapterLucas >= lucasStory.length
            ) {
                showHouseQuestion("lucas", 0);
            } else {
                showLucasChapter();
            }
        }
    }
} catch (error) {
    console.error(error);

    game = createGame();

    addLog(
        "O salvamento antigo estava corrompido. Um novo jogo foi criado."
    );

    updateUI();
    startGame();
}
```

}

/* =========================================================
REINICIAR
========================================================= */

function restartGame() {
localStorage.removeItem(SAVE_KEY);

```
game = createGame();

addLog("Nova aventura iniciada.");

updateUI();

startSasah();
```

}

/* =========================================================
BOTÃO DE INÍCIO
========================================================= */

function createStartButton() {
if (!choicesElement) return;

```
choicesElement.innerHTML = "";

const button = document.createElement("button");

button.className = "choice";
button.type = "button";
button.textContent = "✨ Iniciar aventura";

button.addEventListener("click", function () {
    game = createGame();

    addLog(
        "A aventura de Sasah e Lucas começou."
    );

    startSasah();
    updateUI();
});

choicesElement.appendChild(button);
```

}

/* =========================================================
BOTÕES DO HTML
========================================================= */

function setupButtons() {
const saveButton =
document.getElementById("saveButton");

```
const loadButton =
    document.getElementById("loadButton");

const restartButton =
    document.getElementById("restartButton");

if (saveButton) {
    saveButton.addEventListener(
        "click",
        saveGame
    );
}

if (loadButton) {
    loadButton.addEventListener(
        "click",
        loadGame
    );
}

if (restartButton) {
    restartButton.addEventListener(
        "click",
        restartGame
    );
}
```

}

/* =========================================================
INICIAR
========================================================= */

function startGame() {
getElements();

```
if (!interfaceReady()) {
    console.error(
        "ERRO DO RPG: os elementos principais não foram encontrados."
    );

    console.error(
        "Verifique se o index.html possui: scene, chapter, location e choices."
    );

    return;
}

setupButtons();

updateUI();

/*
 * Mostra uma tela inicial em vez de iniciar
 * automaticamente. Isso evita problemas de carregamento.
 */
setText(
    chapterElement,
    "As Crônicas de Hogwarts"
);

setText(
    locationElement,
    "Prólogo"
);

setText(
    sceneElement,
    "Duas histórias começam em lugares diferentes.\n\n" +
    "Sasah e Lucas ainda não sabem que seus destinos estão ligados.\n\n" +
    "Suas escolhas determinarão suas Casas, suas habilidades e a relação que surgirá quando finalmente se encontrarem.\n\n" +
    "A aventura começa agora."
);

createStartButton();

updateUI();
```

}

/* =========================================================
ESPERAR O HTML CARREGAR
========================================================= */

if (document.readyState === "loading") {
document.addEventListener(
"DOMContentLoaded",
startGame
);
} else {
startGame();
}
