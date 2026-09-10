"use strict";

/* ============================================================
AS CRÔNICAS DE HOGWARTS
SASAH & LUCAS
Versão estável para GitHub Pages
============================================================ */

var SAVE_KEY = "PPGHP_SASAH_LUCAS_V1";

var game = {
currentPlayer: "sasah",

```
sasah: {
    name: "Sasah",
    house: "Não definida",
    hp: 100,
    mana: 100,
    xp: 0,
    bravery: 0,
    loyalty: 0,
    intelligence: 0,
    ambition: 0,
    empathy: 0,
    magic: 0
},

lucas: {
    name: "Lucas",
    house: "Não definida",
    hp: 100,
    mana: 100,
    xp: 0,
    bravery: 0,
    loyalty: 0,
    intelligence: 0,
    ambition: 0,
    empathy: 0,
    magic: 0
},

friendship: 0,
trust: 0,
rivalry: 0,
affinity: 0,

sasahChapter: 0,
lucasChapter: 0,

finished: false
```

};

/* ============================================================
ELEMENTOS DA PÁGINA
============================================================ */

var sceneElement = null;
var chapterElement = null;
var locationElement = null;
var choicesElement = null;
var playerTagElement = null;
var logElement = null;

/* ============================================================
INICIALIZAÇÃO
============================================================ */

function getElements() {
sceneElement = document.getElementById("scene");
chapterElement = document.getElementById("chapter");
locationElement = document.getElementById("location");
choicesElement = document.getElementById("choices");
playerTagElement = document.getElementById("playerTag");
logElement = document.getElementById("log");
}

function pageIsReady() {
if (!sceneElement) return false;
if (!chapterElement) return false;
if (!locationElement) return false;
if (!choicesElement) return false;

```
return true;
```

}

/* ============================================================
UTILIDADES
============================================================ */

function setText(element, text) {
if (element) {
element.textContent = text;
}
}

function clamp(value, minimum, maximum) {
if (value < minimum) return minimum;
if (value > maximum) return maximum;
return value;
}

function addLog(text) {
if (!logElement) return;

```
var item = document.createElement("div");

item.className = "log-entry";
item.textContent = text;

logElement.appendChild(item);

if (logElement.children.length > 15) {
    logElement.removeChild(logElement.firstChild);
}

logElement.scrollTop = logElement.scrollHeight;
```

}

function getPlayer(playerName) {
if (playerName === "lucas") {
return game.lucas;
}

```
return game.sasah;
```

}

/* ============================================================
EFEITOS
============================================================ */

function applyEffects(playerName, effects) {
var player = getPlayer(playerName);

```
if (!effects) return;

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
    player.hp = clamp(player.hp + effects.hp, 0, 100);
}

if (typeof effects.mana === "number") {
    player.mana = clamp(player.mana + effects.mana, 0, 100);
}

if (typeof effects.xp === "number") {
    player.xp += effects.xp;
}
```

}

function applyRelationship(effects) {
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

/* ============================================================
HISTÓRIA DE SASAH
============================================================ */

var sasahStory = [

```
{
    chapter: "Prólogo — A carta",
    location: "Casa de Sasah",
    text:
        "A noite parecia completamente comum.\n\n" +
        "Sasah estava em seu quarto quando ouviu uma batida na janela.\n\n" +
        "Uma coruja pousou no parapeito e deixou um envelope sobre a mesa.\n\n" +
        "O envelope era antigo e tinha um estranho selo vermelho.\n\n" +
        "Por algum motivo, Sasah sentiu que aquela carta mudaria sua vida.",
    choices: [
        {
            text: "Abrir a carta imediatamente.",
            effects: {
                bravery: 2,
                magic: 2,
                xp: 5
            },
            result:
                "Sasah abre a carta. Dentro dela existe uma mensagem de Hogwarts."
        },
        {
            text: "Examinar o selo antes de abrir.",
            effects: {
                intelligence: 2,
                magic: 1,
                xp: 5
            },
            result:
                "Sasah percebe que o selo contém uma magia muito antiga."
        },
        {
            text: "Guardar a carta e procurar ajuda.",
            effects: {
                loyalty: 2,
                empathy: 1,
                xp: 5
            },
            result:
                "Sasah decide que é melhor não enfrentar aquele mistério sozinha."
        }
    ]
},

{
    chapter: "Capítulo I — O símbolo",
    location: "Quarto de Sasah",
    text:
        "A carta confirma que Sasah foi aceita em Hogwarts.\n\n" +
        "Porém, existe algo estranho.\n\n" +
        "Na janela aparece o mesmo símbolo que estava no selo.\n\n" +
        "O desenho começa a brilhar lentamente.\n\n" +
        "Sasah sente uma energia mágica atravessar o quarto.",
    choices: [
        {
            text: "Tocar no símbolo.",
            effects: {
                bravery: 2,
                magic: 2,
                xp: 10
            },
            result:
                "O símbolo reage ao toque e libera uma pequena explosão de luz."
        },
        {
            text: "Desenhar o símbolo para estudá-lo.",
            effects: {
                intelligence: 3,
                xp: 10
            },
            result:
                "Sasah copia cuidadosamente cada detalhe do símbolo."
        },
        {
            text: "Fechar a janela e se afastar.",
            effects: {
                empathy: 2,
                loyalty: 1,
                xp: 8
            },
            result:
                "Sasah decide que ainda não está preparada para mexer com aquela magia."
        }
    ]
},

{
    chapter: "Capítulo II — A figura encapuzada",
    location: "Distrito mágico",
    text:
        "Sasah chega ao distrito mágico antes de seguir para Hogwarts.\n\n" +
        "Entre lojas, criaturas mágicas e bruxos apressados, ela percebe uma figura encapuzada.\n\n" +
        "A pessoa está segurando um objeto com exatamente o mesmo símbolo da carta.\n\n" +
        "Quando Sasah se aproxima, a figura desaparece em uma viela.",
    choices: [
        {
            text: "Seguir a figura.",
            effects: {
                bravery: 2,
                ambition: 1,
                xp: 15
            },
            result:
                "Sasah segue a figura e encontra uma pista escondida."
        },
        {
            text: "Observar de longe.",
            effects: {
                intelligence: 3,
                xp: 15
            },
            result:
                "Sasah percebe que a figura parece estar procurando alguém."
        },
        {
            text: "Perguntar aos comerciantes.",
            effects: {
                empathy: 2,
                loyalty: 1,
                xp: 15
            },
            result:
                "Um comerciante revela que aquela figura já foi vista perto de Hogwarts."
        }
    ]
}
```

];

/* ============================================================
HISTÓRIA DE LUCAS
============================================================ */

var lucasStory = [

```
{
    chapter: "Prólogo — O livro",
    location: "Casa de Lucas",
    text:
        "Na mesma noite, Lucas teve um sonho estranho.\n\n" +
        "No sonho, ele estava diante de um enorme castelo cercado por montanhas.\n\n" +
        "Uma voz distante pronunciava seu nome.\n\n" +
        "Quando Lucas acordou, encontrou um livro antigo sobre sua mesa.\n\n" +
        "Ele tinha certeza de que aquele livro não estava ali antes.",
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
                "Lucas abre o livro e percebe que algumas páginas mudam sozinhas."
        },
        {
            text: "Examinar os símbolos da capa.",
            effects: {
                intelligence: 3,
                xp: 5
            },
            result:
                "Lucas percebe que os símbolos formam uma espécie de mapa."
        },
        {
            text: "Guardar o livro.",
            effects: {
                loyalty: 1,
                empathy: 1,
                xp: 5
            },
            result:
                "Lucas decide não mexer no livro até entender o que está acontecendo."
        }
    ]
},

{
    chapter: "Capítulo I — A mensagem",
    location: "Quarto de Lucas",
    text:
        "Uma nova página aparece no livro.\n\n" +
        "Ela fala sobre Hogwarts e sobre uma antiga ameaça que estaria despertando.\n\n" +
        "No final da página existe um símbolo.\n\n" +
        "Lucas percebe que é exatamente o mesmo símbolo que apareceu na carta de Hogwarts.",
    choices: [
        {
            text: "Investigar imediatamente.",
            effects: {
                bravery: 2,
                xp: 10
            },
            result:
                "Lucas encontra uma referência a uma antiga passagem escondida."
        },
        {
            text: "Pesquisar o símbolo no livro.",
            effects: {
                intelligence: 3,
                magic: 1,
                xp: 10
            },
            result:
                "Lucas descobre que o símbolo está relacionado a Hogwarts."
        },
        {
            text: "Procurar alguém para ajudar.",
            effects: {
                loyalty: 2,
                empathy: 1,
                xp: 10
            },
            result:
                "Lucas percebe que talvez precise confiar em outra pessoa."
        }
    ]
},

{
    chapter: "Capítulo II — A perseguição",
    location: "Distrito mágico",
    text:
        "Lucas chega ao distrito mágico indicado pelo livro.\n\n" +
        "Entre as vielas, ele vê uma pessoa encapuzada segurando um objeto estranho.\n\n" +
        "O objeto possui o mesmo símbolo encontrado no livro.\n\n" +
        "A figura percebe que Lucas está observando e começa a fugir.",
    choices: [
        {
            text: "Correr atrás da figura.",
            effects: {
                bravery: 3,
                xp: 15
            },
            result:
                "Lucas corre pela viela e encontra uma pista deixada pela figura."
        },
        {
            text: "Observar sem ser percebido.",
            effects: {
                intelligence: 3,
                xp: 15
            },
            result:
                "Lucas descobre que a figura está procurando outra pessoa."
        },
        {
            text: "Perguntar aos comerciantes.",
            effects: {
                empathy: 2,
                loyalty: 1,
                xp: 15
            },
            result:
                "Um comerciante conta que a figura foi vista seguindo estudantes."
        }
    ]
}
```

];

/* ============================================================
SELEÇÃO DAS CASAS
============================================================ */

var houseQuestions = [

```
{
    question:
        "Uma criatura perigosa bloqueia seu caminho. O que você faz?",
    answers: [
        {
            text: "Enfrento a criatura sem recuar.",
            effects: { bravery: 3 }
        },
        {
            text: "Protejo primeiro quem está comigo.",
            effects: { loyalty: 3 }
        },
        {
            text: "Procuro descobrir o ponto fraco da criatura.",
            effects: { intelligence: 3 }
        },
        {
            text: "Procuro uma maneira de transformar a situação em vantagem.",
            effects: { ambition: 3 }
        },
        {
            text: "Tento descobrir por que a criatura está assustada.",
            effects: { empathy: 3 }
        }
    ]
},

{
    question:
        "Qual característica você mais admira?",
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
        "Você encontra uma passagem proibida em Hogwarts.",
    answers: [
        {
            text: "Entro, mesmo sabendo que é proibido.",
            effects: { bravery: 3 }
        },
        {
            text: "Só entro se meus amigos estiverem comigo.",
            effects: { loyalty: 3 }
        },
        {
            text: "Investigo cuidadosamente antes de entrar.",
            effects: { intelligence: 3 }
        },
        {
            text: "Procuro descobrir o que posso ganhar entrando ali.",
            effects: { ambition: 3 }
        },
        {
            text: "Penso primeiro nas consequências para todos.",
            effects: { empathy: 3 }
        }
    ]
},

{
    question:
        "Um colega confia a você um segredo.",
    answers: [
        {
            text: "Protejo o segredo mesmo que isso me coloque em perigo.",
            effects: { bravery: 3 }
        },
        {
            text: "Nunca trairia alguém que confiou em mim.",
            effects: { loyalty: 3 }
        },
        {
            text: "Analiso cuidadosamente como lidar com a informação.",
            effects: { intelligence: 3 }
        },
        {
            text: "Penso em como aquela informação poderia me beneficiar.",
            effects: { ambition: 3 }
        },
        {
            text: "Penso primeiro nos sentimentos da pessoa.",
            effects: { empathy: 3 }
        }
    ]
},

{
    question:
        "Seu feitiço falha diante da turma. Como você reage?",
    answers: [
        {
            text: "Tento novamente sem medo.",
            effects: { bravery: 3 }
        },
        {
            text: "Peço ajuda e continuo tentando.",
            effects: { loyalty: 3 }
        },
        {
            text: "Analiso exatamente onde errei.",
            effects: { intelligence: 3 }
        },
        {
            text: "Uso a falha como motivação para ficar melhor.",
            effects: { ambition: 3 }
        },
        {
            text: "Espero que ninguém tenha ficado constrangido.",
            effects: { empathy: 3 }
        }
    ]
}
```

];

/* ============================================================
CALCULAR CASA
============================================================ */

function calculateHouse(player) {
var gryffindor = player.bravery;
var hufflepuff = player.loyalty + player.empathy;
var ravenclaw = player.intelligence;
var slytherin = player.ambition;

```
var highest = gryffindor;
var house = "Grifinória";

if (hufflepuff > highest) {
    highest = hufflepuff;
    house = "Lufa-Lufa";
}

if (ravenclaw > highest) {
    highest = ravenclaw;
    house = "Corvinal";
}

if (slytherin > highest) {
    highest = slytherin;
    house = "Sonserina";
}

return house;
```

}

/* ============================================================
MOSTRAR PERGUNTA DA CASA
============================================================ */

function showHouseQuestion(playerName, questionNumber) {
var player = getPlayer(playerName);
var question = houseQuestions[questionNumber];

```
if (!question) {
    finishHouse(playerName);
    return;
}

game.currentPlayer = playerName;

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
    player.name +
    " está diante do Chapéu Seletor.\n\n" +
    question.question
);

choicesElement.innerHTML = "";

for (var i = 0; i < question.answers.length; i++) {
    createHouseButton(
        playerName,
        questionNumber,
        question.answers[i],
        i
    );
}

updateUI();
```

}

function createHouseButton(
playerName,
questionNumber,
answer,
index
) {
var button = document.createElement("button");

```
button.className = "choice";
button.type = "button";

button.textContent =
    (index + 1) +
    ". " +
    answer.text;

button.addEventListener("click", function () {
    applyEffects(playerName, answer.effects);

    addLog(
        getPlayer(playerName).name +
        " respondeu à pergunta " +
        (questionNumber + 1) +
        " da Seleção."
    );

    if (questionNumber < houseQuestions.length - 1) {
        showHouseQuestion(
            playerName,
            questionNumber + 1
        );
    } else {
        finishHouse(playerName);
    }
});

choicesElement.appendChild(button);
```

}

function finishHouse(playerName) {
var player = getPlayer(playerName);

```
player.house = calculateHouse(player);

setText(
    chapterElement,
    "A decisão foi tomada"
);

setText(
    locationElement,
    "Hogwarts"
);

setText(
    sceneElement,
    "O Chapéu Seletor permanece em silêncio por alguns segundos.\n\n" +
    "Então ele anuncia:\n\n" +
    "— " +
    player.house.toUpperCase() +
    "!\n\n" +
    player.name +
    " agora pertence à Casa " +
    player.house +
    "."
);

choicesElement.innerHTML = "";

var button = document.createElement("button");

button.className = "choice";
button.type = "button";

button.textContent =
    "Continuar aventura";

button.addEventListener("click", function () {
    if (playerName === "sasah") {
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

/* ============================================================
RENDERIZAR CENA
============================================================ */

function renderStory(
playerName,
story,
chapterNumber
) {
var chapter = story[chapterNumber];

```
if (!chapter) return;

game.currentPlayer = playerName;

setText(
    chapterElement,
    chapter.chapter
);

setText(
    locationElement,
    chapter.location
);

setText(
    sceneElement,
    chapter.text
);

choicesElement.innerHTML = "";

for (var i = 0; i < chapter.choices.length; i++) {
    createStoryButton(
        playerName,
        chapter.choices[i],
        i
    );
}

updateUI();
```

}

function createStoryButton(
playerName,
choice,
index
) {
var button = document.createElement("button");

```
button.className = "choice";
button.type = "button";

button.textContent =
    (index + 1) +
    ". " +
    choice.text;

button.addEventListener("click", function () {
    applyEffects(
        playerName,
        choice.effects
    );

    addLog(choice.result);

    if (playerName === "sasah") {
        game.sasahChapter++;

        if (game.sasahChapter >= sasahStory.length) {
            showHouseQuestion("sasah", 0);
        } else {
            renderStory(
                "sasah",
                sasahStory,
                game.sasahChapter
            );
        }
    } else {
        game.lucasChapter++;

        if (game.lucasChapter >= lucasStory.length) {
            showHouseQuestion("lucas", 0);
        } else {
            renderStory(
                "lucas",
                lucasStory,
                game.lucasChapter
            );
        }
    }

    updateUI();
});

choicesElement.appendChild(button);
```

}

/* ============================================================
COMEÇAR SASAH
============================================================ */

function startSasah() {
game.currentPlayer = "sasah";
game.sasahChapter = 0;

```
addLog(
    "A história de Sasah começou."
);

renderStory(
    "sasah",
    sasahStory,
    0
);
```

}

/* ============================================================
COMEÇAR LUCAS
============================================================ */

function startLucas() {
game.currentPlayer = "lucas";
game.lucasChapter = 0;

```
addLog(
    "Agora começa a história de Lucas."
);

renderStory(
    "lucas",
    lucasStory,
    0
);
```

}

/* ============================================================
ENCONTRO
============================================================ */

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
    "Finalmente, os caminhos de Sasah e Lucas se cruzam.\n\n" +
    "Os dois percebem que encontraram o mesmo símbolo durante suas jornadas.\n\n" +
    "Nenhum dos dois sabe ainda se pode confiar no outro.\n\n" +
    "A primeira decisão deles poderá mudar completamente a relação entre os dois."
);

choicesElement.innerHTML = "";

createRelationshipButton(
    "Confiar imediatamente um no outro.",
    {
        friendship: 4,
        trust: 4,
        affinity: 2
    }
);

createRelationshipButton(
    "Manter distância e investigar primeiro.",
    {
        trust: 1,
        rivalry: 1
    }
);

createRelationshipButton(
    "Competir para descobrir quem está certo.",
    {
        rivalry: 4,
        affinity: 1
    }
);

createRelationshipButton(
    "Contar tudo o que descobriram.",
    {
        friendship: 3,
        trust: 3,
        affinity: 3
    }
);

updateUI();
```

}

function createRelationshipButton(text, effects) {
var button = document.createElement("button");

```
button.className = "choice";
button.type = "button";

button.textContent = text;

button.addEventListener("click", function () {
    applyRelationship(effects);

    addLog(
        "Sasah e Lucas tomaram uma decisão sobre sua relação."
    );

    startJointMission();
});

choicesElement.appendChild(button);
```

}

/* ============================================================
MISSÃO CONJUNTA
============================================================ */

function startJointMission() {
setText(
chapterElement,
"Capítulo IV — A porta secreta"
);

```
setText(
    locationElement,
    "Hogwarts — Ala proibida"
);

setText(
    sceneElement,
    "As pistas dos dois finalmente levam a uma porta escondida.\n\n" +
    "O mesmo símbolo aparece gravado no centro da madeira.\n\n" +
    "Uma energia mágica muito forte vem do outro lado.\n\n" +
    "Sasah e Lucas precisam decidir como abrir a porta."
);

choicesElement.innerHTML = "";

createMissionButton(
    "Trabalhar juntos.",
    {
        friendship: 4,
        trust: 4,
        xp: 25
    },
    "A cooperação entre os dois faz a porta começar a brilhar."
);

createMissionButton(
    "Sasah tenta abrir a porta com magia.",
    {
        friendship: 1,
        trust: 1,
        magic: 4,
        xp: 25
    },
    "Sasah canaliza sua magia e o símbolo reage."
);

createMissionButton(
    "Lucas tenta decifrar os símbolos.",
    {
        friendship: 1,
        trust: 2,
        xp: 25
    },
    "Lucas encontra uma sequência escondida nos símbolos."
);

createMissionButton(
    "Os dois competem para abrir a porta.",
    {
        rivalry: 5,
        xp: 20
    },
    "A rivalidade entre os dois aumenta ainda mais."
);

updateUI();
```

}

function createMissionButton(
text,
effects,
result
) {
var button = document.createElement("button");

```
button.className = "choice";
button.type = "button";

button.textContent = text;

button.addEventListener("click", function () {
    applyRelationship(effects);
    applyEffects("sasah", effects);
    applyEffects("lucas", effects);

    addLog(result);

    showEnding();
});

choicesElement.appendChild(button);
```

}

/* ============================================================
FINAL
============================================================ */

function showEnding() {
game.finished = true;

```
var relationship;

if (
    game.friendship >= 6 &&
    game.trust >= 5
) {
    relationship =
        "A amizade entre Sasah e Lucas se tornou muito forte. Os dois descobriram que conseguem enfrentar perigos muito maiores quando trabalham juntos.";
} else if (game.rivalry >= 5) {
    relationship =
        "A rivalidade entre Sasah e Lucas cresceu. Eles continuam competindo, mas agora sabem que seus destinos estão ligados.";
} else {
    relationship =
        "Sasah e Lucas ainda não sabem exatamente o que são um para o outro. Existe confiança, mas também existem muitas perguntas sem resposta.";
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
    "A porta secreta finalmente se abre.\n\n" +
    "Do outro lado existe uma enorme sala circular cheia de livros, retratos antigos e objetos mágicos.\n\n" +
    relationship +
    "\n\n" +
    "Mas, no fundo da sala, uma sombra se movimenta.\n\n" +
    "A verdadeira aventura de Sasah e Lucas está apenas começando."
);

choicesElement.innerHTML = "";

var restartButton = document.createElement("button");

restartButton.className = "choice";
restartButton.type = "button";

restartButton.textContent =
    "Recomeçar aventura";

restartButton.addEventListener(
    "click",
    restartGame
);

choicesElement.appendChild(
    restartButton
);

addLog(
    "Primeiro arco concluído."
);

updateUI();
```

}

/* ============================================================
ATUALIZAÇÃO DA INTERFACE
============================================================ */

function updatePlayerTag() {
if (!playerTagElement) return;

```
var player =
    getPlayer(game.currentPlayer);

playerTagElement.textContent =
    player.name +
    " — " +
    player.house;
```

}

function updatePlayerInterface(
player,
prefix
) {
var houseElement =
document.getElementById(
prefix + "House"
);

```
var hpText =
    document.getElementById(
        prefix + "HpText"
    );

var manaText =
    document.getElementById(
        prefix + "ManaText"
    );

var xpText =
    document.getElementById(
        prefix + "XpText"
    );

var hpBar =
    document.getElementById(
        prefix + "Hp"
    );

var manaBar =
    document.getElementById(
        prefix + "Mana"
    );

setText(
    houseElement,
    player.house
);

setText(
    hpText,
    player.hp
);

setText(
    manaText,
    player.mana
);

setText(
    xpText,
    player.xp
);

if (hpBar) {
    hpBar.style.width =
        player.hp + "%";
}

if (manaBar) {
    manaBar.style.width =
        player.mana + "%";
}

updateAttribute(
    prefix,
    "Bravery",
    player.bravery
);

updateAttribute(
    prefix,
    "Loyalty",
    player.loyalty
);

updateAttribute(
    prefix,
    "Intelligence",
    player.intelligence
);

updateAttribute(
    prefix,
    "Ambition",
    player.ambition
);

updateAttribute(
    prefix,
    "Empathy",
    player.empathy
);

updateAttribute(
    prefix,
    "Magic",
    player.magic
);
```

}

function updateAttribute(
prefix,
name,
value
) {
var element =
document.getElementById(
prefix + name
);

```
if (element) {
    element.textContent = value;
}
```

}

function updateRelationshipInterface() {
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
updatePlayerInterface(
game.sasah,
"sasah"
);

```
updatePlayerInterface(
    game.lucas,
    "lucas"
);

updateRelationshipInterface();

updatePlayerTag();
```

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

```
    addLog(
        "Jogo salvo com sucesso."
    );
} catch (error) {
    console.error(
        "Erro ao salvar:",
        error
    );

    addLog(
        "Não foi possível salvar o jogo."
    );
}
```

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

```
    if (!saved) {
        addLog(
            "Nenhum jogo salvo foi encontrado."
        );

        return;
    }

    var loaded =
        JSON.parse(saved);

    if (
        !loaded ||
        !loaded.sasah ||
        !loaded.lucas
    ) {
        throw new Error(
            "Salvamento inválido."
        );
    }

    game = loaded;

    updateUI();

    addLog(
        "Jogo carregado."
    );

    continueFromSave();

} catch (error) {
    console.error(
        "Erro ao carregar:",
        error
    );

    localStorage.removeItem(
        SAVE_KEY
    );

    game = createNewGame();

    addLog(
        "O salvamento estava inválido. Um novo jogo foi criado."
    );

    updateUI();

    showStartScreen();
}
```

}

/* ============================================================
NOVO JOGO
============================================================ */

function createNewGame() {
return {
currentPlayer: "sasah",

```
    sasah: {
        name: "Sasah",
        house: "Não definida",
        hp: 100,
        mana: 100,
        xp: 0,
        bravery: 0,
        loyalty: 0,
        intelligence: 0,
        ambition: 0,
        empathy: 0,
        magic: 0
    },

    lucas: {
        name: "Lucas",
        house: "Não definida",
        hp: 100,
        mana: 100,
        xp: 0,
        bravery: 0,
        loyalty: 0,
        intelligence: 0,
        ambition: 0,
        empathy: 0,
        magic: 0
    },

    friendship: 0,
    trust: 0,
    rivalry: 0,
    affinity: 0,

    sasahChapter: 0,
    lucasChapter: 0,

    finished: false
};
```

}

/* ============================================================
CONTINUAR JOGO SALVO
============================================================ */

function continueFromSave() {
if (game.finished) {
showEnding();
return;
}

```
if (
    game.currentPlayer === "sasah"
) {
    if (
        game.sasahChapter >=
        sasahStory.length
    ) {
        showHouseQuestion(
            "sasah",
            0
        );
    } else {
        renderStory(
            "sasah",
            sasahStory,
            game.sasahChapter
        );
    }

    return;
}

if (
    game.currentPlayer === "lucas"
) {
    if (
        game.lucasChapter >=
        lucasStory.length
    ) {
        showHouseQuestion(
            "lucas",
            0
        );
    } else {
        renderStory(
            "lucas",
            lucasStory,
            game.lucasChapter
        );
    }
}
```

}

/* ============================================================
REINICIAR
============================================================ */

function restartGame() {
localStorage.removeItem(
SAVE_KEY
);

```
game = createNewGame();

if (logElement) {
    logElement.innerHTML = "";
}

addLog(
    "Uma nova aventura começou."
);

updateUI();

startSasah();
```

}

/* ============================================================
TELA INICIAL
============================================================ */

function showStartScreen() {
setText(
chapterElement,
"As Crônicas de Hogwarts"
);

```
setText(
    locationElement,
    "Prólogo"
);

setText(
    sceneElement,
    "Duas histórias começam em lugares diferentes.\n\n" +
    "Sasah e Lucas ainda não sabem que seus destinos estão ligados.\n\n" +
    "Suas escolhas determinarão suas habilidades, suas Casas e a relação que surgirá quando finalmente se encontrarem.\n\n" +
    "Prepare-se para entrar no mundo mágico."
);

choicesElement.innerHTML = "";

var button = document.createElement("button");

button.className = "choice";
button.type = "button";

button.textContent =
    "✨ Iniciar aventura";

button.addEventListener(
    "click",
    function () {
        game = createNewGame();

        addLog(
            "A aventura de Sasah começou."
        );

        startSasah();
        updateUI();
    }
);

choicesElement.appendChild(
    button
);

updateUI();
```

}

/* ============================================================
BOTÕES DE SALVAR / CARREGAR / REINICIAR
============================================================ */

function setupButtons() {
var saveButton =
document.getElementById(
"saveButton"
);

```
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

/* ============================================================
INICIAR A APLICAÇÃO
============================================================ */

function startApplication() {
getElements();

```
if (!pageIsReady()) {
    console.error(
        "ERRO: o index.html não possui todos os elementos necessários."
    );

    console.error(
        "São necessários os elementos: scene, chapter, location e choices."
    );

    return;
}

setupButtons();

updateUI();

showStartScreen();
```

}

/* ============================================================
ESPERAR O HTML
============================================================ */

if (
document.readyState === "loading"
) {
document.addEventListener(
"DOMContentLoaded",
startApplication
);
} else {
startApplication();
}
