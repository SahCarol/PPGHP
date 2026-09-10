"use strict";

/* ============================================================
AS CRÔNICAS DE HOGWARTS
SASAH & LUCAS
SCRIPT PRINCIPAL
Versão estável para GitHub Pages
============================================================ */

var SAVE_KEY = "PPGHP_SASAH_LUCAS_V1";

/* ============================================================
ESTADO DO JOGO
============================================================ */

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
ELEMENTOS DA INTERFACE
============================================================ */

var sceneElement = null;
var chapterElement = null;
var locationElement = null;
var choicesElement = null;
var playerTagElement = null;
var logElement = null;

/* ============================================================
UTILIDADES
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
return (
sceneElement &&
chapterElement &&
locationElement &&
choicesElement
);
}

function setText(element, text) {
if (element) {
element.textContent = text;
}
}

function clamp(value, min, max) {
return Math.max(min, Math.min(max, value));
}

function addLog(text) {
if (!logElement) {
return;
}

```
var entry = document.createElement("p");
entry.textContent = text;

logElement.appendChild(entry);

while (logElement.children.length > 12) {
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
if (!effects) {
return;
}

```
var player = getPlayer(playerName);
var keys = [
    "bravery",
    "loyalty",
    "intelligence",
    "ambition",
    "empathy",
    "magic",
    "hp",
    "mana",
    "xp"
];

for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (typeof effects[key] === "number") {
        player[key] += effects[key];
    }
}

player.hp = clamp(player.hp, 0, 100);
player.mana = clamp(player.mana, 0, 100);
player.xp = Math.max(0, player.xp);
```

}

function applyRelationship(effects) {
if (!effects) {
return;
}

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
    chapter: "Prólogo — A Carta",
    location: "Casa de Sasah",
    text:
        "A noite parecia comum até que três batidas ecoaram na janela. " +
        "Sasah se aproximou lentamente e encontrou uma coruja carregando " +
        "um envelope grosso e antigo. O selo de cera trazia um brasão que " +
        "ela jamais havia visto antes.",

    choices: [

        {
            text: "Abrir a carta imediatamente.",
            effects: {
                bravery: 2,
                intelligence: 1,
                magic: 1,
                xp: 10
            },
            result:
                "Sasah rompe o selo. A carta começa a brilhar e revela que " +
                "ela foi aceita na Escola de Magia e Bruxaria de Hogwarts."
        },

        {
            text: "Examinar o envelope antes de abri-lo.",
            effects: {
                intelligence: 2,
                empathy: 1,
                xp: 10
            },
            result:
                "Sasah observa cuidadosamente cada detalhe. O papel possui " +
                "uma energia mágica incomum, como se a própria carta estivesse viva."
        },

        {
            text: "Guardar a carta e fingir que nada aconteceu.",
            effects: {
                empathy: 1,
                ambition: 1,
                xp: 5
            },
            result:
                "Sasah guarda o envelope, mas ele começa a vibrar dentro da gaveta. " +
                "Ignorar Hogwarts parece cada vez mais difícil."
        }

    ]
},

{
    chapter: "Capítulo I — O Símbolo",
    location: "Quarto de Sasah",
    text:
        "Na manhã seguinte, Sasah percebe um pequeno símbolo desenhado em sua mão. " +
        "O desenho se parece com uma estrela cercada por quatro animais. " +
        "Quando ela toca o símbolo, uma voz distante sussurra seu nome.",

    choices: [

        {
            text: "Tentar descobrir o significado do símbolo.",
            effects: {
                intelligence: 3,
                magic: 1,
                xp: 15
            },
            result:
                "Sasah pesquisa antigos livros e percebe que o símbolo parece estar " +
                "relacionado às quatro casas de Hogwarts."
        },

        {
            text: "Concentrar-se e tentar usar magia.",
            effects: {
                bravery: 2,
                magic: 3,
                xp: 15
            },
            result:
                "Uma pequena luz surge na ponta dos dedos de Sasah. " +
                "Pela primeira vez, ela sente a magia respondendo ao seu chamado."
        },

        {
            text: "Esconder o símbolo de todos.",
            effects: {
                ambition: 2,
                empathy: 1,
                xp: 10
            },
            result:
                "Sasah cobre a mão. Algo lhe diz que aquele símbolo pode ser importante " +
                "e que nem todos devem saber sobre ele."
        }

    ]
},

{
    chapter: "Capítulo II — A Figura Encapuzada",
    location: "Distrito Mágico",
    text:
        "No caminho para encontrar os materiais necessários para Hogwarts, Sasah " +
        "percebe que está sendo observada. Em uma rua estreita, uma figura encapuzada " +
        "surge diante dela. A pessoa parece conhecer seu nome.",

    choices: [

        {
            text: "Enfrentar a figura.",
            effects: {
                bravery: 3,
                magic: 2,
                xp: 20
            },
            result:
                "Sasah não recua. A figura desaparece em uma nuvem escura, deixando " +
                "para trás apenas uma pequena moeda prateada."
        },

        {
            text: "Perguntar quem ela é.",
            effects: {
                intelligence: 2,
                empathy: 2,
                xp: 15
            },
            result:
                "A figura responde apenas: \"Você não é a única escolhida.\" " +
                "Antes que Sasah consiga perguntar mais alguma coisa, ela desaparece."
        },

        {
            text: "Seguir a figura discretamente.",
            effects: {
                ambition: 3,
                intelligence: 1,
                xp: 20
            },
            result:
                "Sasah segue a figura até uma passagem secreta. Lá encontra um " +
                "símbolo idêntico ao que apareceu em sua mão."
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
    chapter: "Prólogo — O Livro",
    location: "Casa de Lucas",
    text:
        "Lucas encontra um livro antigo escondido entre objetos que pertenciam à sua família. " +
        "A capa não possui título. Quando ele abre a primeira página, palavras aparecem " +
        "sozinhas diante de seus olhos.",

    choices: [

        {
            text: "Ler o livro.",
            effects: {
                intelligence: 2,
                magic: 2,
                xp: 10
            },
            result:
                "O livro conta histórias sobre Hogwarts e menciona um acontecimento " +
                "misterioso que deverá ocorrer naquele ano."
        },

        {
            text: "Procurar informações sobre o livro.",
            effects: {
                intelligence: 3,
                ambition: 1,
                xp: 10
            },
            result:
                "Lucas descobre que o livro pertenceu a um antigo estudante de Hogwarts."
        },

        {
            text: "Fechar o livro e escondê-lo.",
            effects: {
                loyalty: 2,
                empathy: 1,
                xp: 5
            },
            result:
                "Lucas decide que talvez seja melhor não mexer com aquilo. " +
                "Mas o livro começa a emitir uma fraca luz azul."
        }

    ]
},

{
    chapter: "Capítulo I — A Mensagem",
    location: "Quarto de Lucas",
    text:
        "Durante a madrugada, Lucas acorda com uma mensagem escrita na parede. " +
        "Ela diz que alguém em Hogwarts precisa encontrá-lo. " +
        "Antes que consiga compreender a mensagem, ela desaparece.",

    choices: [

        {
            text: "Memorizar a mensagem.",
            effects: {
                intelligence: 3,
                xp: 15
            },
            result:
                "Lucas memoriza cada palavra. A mensagem parece conter pistas sobre um segredo."
        },

        {
            text: "Tentar responder à mensagem.",
            effects: {
                bravery: 2,
                magic: 2,
                xp: 15
            },
            result:
                "As letras reaparecem e formam uma nova frase: \"Procure a estrela de quatro caminhos.\""
        },

        {
            text: "Contar tudo para alguém de confiança.",
            effects: {
                loyalty: 3,
                empathy: 2,
                xp: 15
            },
            result:
                "Lucas decide que não deve enfrentar aquilo sozinho. " +
                "A ideia de confiar em alguém poderá ser importante no futuro."
        }

    ]
},

{
    chapter: "Capítulo II — A Perseguição",
    location: "Distrito Mágico",
    text:
        "No distrito mágico, Lucas percebe passos atrás dele. " +
        "Quando olha para trás, vê uma figura encapuzada. " +
        "Ela segura uma moeda prateada semelhante à que aparece no antigo livro.",

    choices: [

        {
            text: "Correr e tentar despistar a figura.",
            effects: {
                bravery: 2,
                hp: -5,
                xp: 20
            },
            result:
                "Lucas consegue despistar o perseguidor, mas percebe que a moeda " +
                "ficou misteriosamente em seu bolso."
        },

        {
            text: "Parar e confrontar o perseguidor.",
            effects: {
                bravery: 3,
                magic: 2,
                xp: 20
            },
            result:
                "Lucas encara a figura. Ela desaparece, deixando apenas uma frase: " +
                "\"O encontro está próximo.\""
        },

        {
            text: "Seguir a figura sem ser percebido.",
            effects: {
                intelligence: 2,
                ambition: 3,
                xp: 20
            },
            result:
                "Lucas segue a figura até uma passagem secreta. " +
                "Na parede há um símbolo com quatro caminhos."
        }

    ]
}
```

];

/* ============================================================
PERGUNTAS DO CHAPÉU SELETOR
Cada pergunta possui cinco alternativas.
============================================================ */

var houseQuestions = [

```
{
    question:
        "Você encontra um colega em perigo dentro de uma área proibida. O que faz?",

    answers: [

        {
            text: "Entro no local imediatamente para salvá-lo.",
            trait: "bravery"
        },

        {
            text: "Permaneço ao lado dele e não o abandono.",
            trait: "loyalty"
        },

        {
            text: "Procuro uma maneira inteligente de tirá-lo do perigo.",
            trait: "intelligence"
        },

        {
            text: "Uso a situação para conseguir uma vantagem.",
            trait: "ambition"
        },

        {
            text: "Tento entender o que ele está sentindo e ajudá-lo.",
            trait: "empathy"
        }

    ]
},

{
    question:
        "Um professor propõe um desafio aparentemente impossível. Qual é sua reação?",

    answers: [

        {
            text: "Aceito o desafio mesmo com medo.",
            trait: "bravery"
        },

        {
            text: "Faço o desafio junto com meus amigos.",
            trait: "loyalty"
        },

        {
            text: "Estudo o problema antes de agir.",
            trait: "intelligence"
        },

        {
            text: "Penso em como transformar o desafio em uma oportunidade.",
            trait: "ambition"
        },

        {
            text: "Penso em como minhas decisões podem afetar os outros.",
            trait: "empathy"
        }

    ]
},

{
    question:
        "Você descobre um segredo que poderia prejudicar alguém. O que faria?",

    answers: [

        {
            text: "Enfrentaria a situação diretamente.",
            trait: "bravery"
        },

        {
            text: "Protegeria a pessoa que confiou em mim.",
            trait: "loyalty"
        },

        {
            text: "Investigaria todos os fatos antes de decidir.",
            trait: "intelligence"
        },

        {
            text: "Guardaria o segredo para usar somente quando necessário.",
            trait: "ambition"
        },

        {
            text: "Pensaria primeiro em como evitar que alguém se machuque.",
            trait: "empathy"
        }

    ]
},

{
    question:
        "Qual dessas características mais representa você?",

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
        "Quando precisa tomar uma decisão difícil, o que costuma pesar mais?",

    answers: [

        {
            text: "Fazer o que considero certo, mesmo que seja perigoso.",
            trait: "bravery"
        },

        {
            text: "Não abandonar quem confia em mim.",
            trait: "loyalty"
        },

        {
            text: "Analisar todas as possibilidades.",
            trait: "intelligence"
        },

        {
            text: "Pensar no futuro e nos meus objetivos.",
            trait: "ambition"
        },

        {
            text: "Considerar os sentimentos das pessoas envolvidas.",
            trait: "empathy"
        }

    ]
}
```

];

/* ============================================================
CÁLCULO DA CASA
============================================================ */

function calculateHouse(player) {
var scores = {
bravery: player.bravery,
loyalty: player.loyalty + player.empathy,
intelligence: player.intelligence,
ambition: player.ambition
};

```
var house = "Gryffindor";
var highest = scores.bravery;

if (scores.loyalty > highest) {
    house = "Hufflepuff";
    highest = scores.loyalty;
}

if (scores.intelligence > highest) {
    house = "Ravenclaw";
    highest = scores.intelligence;
}

if (scores.ambition > highest) {
    house = "Slytherin";
}

return house;
```

}

/* ============================================================
BOTÕES
============================================================ */

function clearChoices() {
if (choicesElement) {
choicesElement.innerHTML = "";
}
}

function createButton(text, callback) {
var button = document.createElement("button");

```
button.type = "button";
button.textContent = text;
button.className = "choice-button";

button.addEventListener("click", callback);

return button;
```

}

/* ============================================================
HISTÓRIA
============================================================ */

function renderStory(playerName) {
var story;
var chapterIndex;

```
if (playerName === "lucas") {
    story = lucasStory;
    chapterIndex = game.lucasChapter;
} else {
    story = sasahStory;
    chapterIndex = game.sasahChapter;
}

if (chapterIndex >= story.length) {
    showHouseSelection(playerName);
    return;
}

var chapter = story[chapterIndex];

setText(chapterElement, chapter.chapter);
setText(locationElement, chapter.location);
setText(sceneElement, chapter.text);

clearChoices();

for (var i = 0; i < chapter.choices.length; i++) {
    createStoryButton(
        playerName,
        chapter.choices[i]
    );
}

updateUI();
```

}

function createStoryButton(playerName, choice) {
var button = createButton(choice.text, function () {

```
    applyEffects(playerName, choice.effects);

    addLog(
        getPlayer(playerName).name +
        ": " +
        choice.text
    );

    setText(sceneElement, choice.result);

    if (playerName === "sasah") {
        game.sasahChapter++;
    } else {
        game.lucasChapter++;
    }

    clearChoices();

    var nextButton = createButton(
        "Continuar",
        function () {
            renderStory(playerName);
        }
    );

    choicesElement.appendChild(nextButton);

    updateUI();
    saveGame();
});

choicesElement.appendChild(button);
```

}

/* ============================================================
SELEÇÃO DA CASA
============================================================ */

function showHouseSelection(playerName) {
setText(
chapterElement,
"O Chapéu Seletor"
);

```
setText(
    locationElement,
    "Grande Salão"
);

setText(
    sceneElement,
    getPlayer(playerName).name +
    " está diante do Chapéu Seletor."
);

showHouseQuestion(playerName, 0);
```

}

function showHouseQuestion(playerName, questionIndex) {
var question;

```
if (questionIndex >= houseQuestions.length) {
    finishHouse(playerName);
    return;
}

question = houseQuestions[questionIndex];

setText(
    sceneElement,
    question.question
);

clearChoices();

for (var i = 0; i < question.answers.length; i++) {
    createHouseButton(
        playerName,
        questionIndex,
        question.answers[i]
    );
}
```

}

function createHouseButton(playerName, questionIndex, answer) {
var button = createButton(answer.text, function () {

```
    var player = getPlayer(playerName);

    player[answer.trait] += 1;

    addLog(
        player.name +
        " respondeu à pergunta " +
        (questionIndex + 1) +
        "."
    );

    showHouseQuestion(
        playerName,
        questionIndex + 1
    );

    updateUI();
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
    "A Seleção"
);

setText(
    locationElement,
    "Grande Salão"
);

setText(
    sceneElement,
    "O Chapéu Seletor permanece em silêncio por alguns segundos. " +
    "Então finalmente anuncia: " +
    player.house + "!"
);

addLog(
    player.name +
    " foi selecionado(a) para " +
    player.house + "."
);

clearChoices();

var continueButton = createButton(
    "Continuar a aventura",
    function () {

        if (playerName === "sasah") {
            startLucas();
        } else {
            startMeeting();
        }

    }
);

choicesElement.appendChild(continueButton);

updateUI();
saveGame();
```

}

/* ============================================================
INÍCIO DE SASAH
============================================================ */

function startSasah() {
game.currentPlayer = "sasah";

```
addLog("A história de Sasah começou.");

renderStory("sasah");
updateUI();
saveGame();
```

}

/* ============================================================
INÍCIO DE LUCAS
============================================================ */

function startLucas() {
game.currentPlayer = "lucas";

```
addLog("A história de Lucas começou.");

renderStory("lucas");
updateUI();
saveGame();
```

}

/* ============================================================
ENCONTRO DE SASAH E LUCAS
============================================================ */

function startMeeting() {

```
game.currentPlayer = "joint";

setText(
    chapterElement,
    "Capítulo Especial — O Encontro"
);

setText(
    locationElement,
    "Hogwarts"
);

setText(
    sceneElement,
    "Os caminhos de Sasah e Lucas finalmente se cruzam. " +
    "Os dois reconhecem o símbolo de quatro caminhos e percebem " +
    "que suas histórias estão ligadas."
);

clearChoices();

var options = [

    {
        text: "Sasah decide confiar em Lucas.",
        friendship: 3,
        trust: 3,
        affinity: 2,
        rivalry: 0
    },

    {
        text: "Lucas decide confiar em Sasah.",
        friendship: 3,
        trust: 3,
        affinity: 2,
        rivalry: 0
    },

    {
        text: "Os dois mantêm distância e investigam separadamente.",
        friendship: 0,
        trust: 1,
        affinity: 1,
        rivalry: 0
    },

    {
        text: "Os dois discutem e transformam o encontro em uma rivalidade.",
        friendship: -1,
        trust: -1,
        affinity: -1,
        rivalry: 3
    }

];

for (var i = 0; i < options.length; i++) {
    createMeetingButton(options[i]);
}

updateUI();
```

}

function createMeetingButton(option) {

```
var button = createButton(
    option.text,
    function () {

        applyRelationship({
            friendship: option.friendship,
            trust: option.trust,
            affinity: option.affinity,
            rivalry: option.rivalry
        });

        addLog(option.text);

        setText(
            sceneElement,
            "A decisão foi tomada. A relação entre Sasah e Lucas " +
            "começará a definir o destino dos dois."
        );

        clearChoices();

        var nextButton = createButton(
            "Continuar",
            function () {
                startJointMission();
            }
        );

        choicesElement.appendChild(nextButton);

        updateUI();
        saveGame();
    }
);

choicesElement.appendChild(button);
```

}

/* ============================================================
MISSÃO CONJUNTA
============================================================ */

function startJointMission() {

```
setText(
    chapterElement,
    "Capítulo Final — O Símbolo dos Quatro Caminhos"
);

setText(
    locationElement,
    "Passagem secreta de Hogwarts"
);

setText(
    sceneElement,
    "Sasah e Lucas encontram uma porta antiga escondida nos corredores " +
    "de Hogwarts. O mesmo símbolo que apareceu nas histórias dos dois " +
    "está gravado no centro da porta."
);

clearChoices();

var options = [

    {
        text: "Usar magia para abrir a porta.",
        effects: {
            magic: 5,
            bravery: 2,
            xp: 30
        },
        relationship: {
            friendship: 2,
            trust: 1,
            affinity: 2
        },
        result:
            "Os dois combinam suas habilidades mágicas. A porta se abre " +
            "e uma luz intensa ilumina a passagem."
    },

    {
        text: "Procurar uma solução nos livros.",
        effects: {
            intelligence: 5,
            xp: 30
        },
        relationship: {
            friendship: 1,
            trust: 2,
            affinity: 2
        },
        result:
            "Depois de analisar antigos símbolos, Lucas encontra a combinação correta."
    },

    {
        text: "Forçar a porta juntos.",
        effects: {
            bravery: 4,
            hp: -10,
            xp: 25
        },
        relationship: {
            friendship: 3,
            trust: 2,
            affinity: 1
        },
        result:
            "A porta resiste, mas os dois trabalham juntos até que finalmente conseguem abri-la."
    },

    {
        text: "Tentar negociar com a magia da porta.",
        effects: {
            empathy: 4,
            intelligence: 2,
            magic: 2,
            xp: 30
        },
        relationship: {
            friendship: 2,
            trust: 3,
            affinity: 3
        },
        result:
            "A porta parece reconhecer a intenção dos dois e se abre lentamente."
    }

];

for (var i = 0; i < options.length; i++) {
    createMissionButton(options[i]);
}

updateUI();
```

}

function createMissionButton(option) {

```
var button = createButton(
    option.text,
    function () {

        applyEffects("sasah", option.effects);
        applyEffects("lucas", option.effects);
        applyRelationship(option.relationship);

        addLog(option.text);

        setText(
            sceneElement,
            option.result
        );

        clearChoices();

        var endingButton = createButton(
            "Descobrir o final",
            function () {
                showEnding();
            }
        );

        choicesElement.appendChild(endingButton);

        updateUI();
        saveGame();
    }
);

choicesElement.appendChild(button);
```

}

/* ============================================================
FINAL
============================================================ */

function showEnding() {

```
game.finished = true;

var relationshipScore =
    game.friendship +
    game.trust +
    game.affinity -
    game.rivalry;

var endingTitle;
var endingText;

if (relationshipScore >= 10) {

    endingTitle = "Final — Aliados Inseparáveis";

    endingText =
        "Sasah e Lucas descobrem que suas histórias estavam conectadas " +
        "desde antes de chegarem a Hogwarts. A confiança construída entre " +
        "os dois permite que enfrentem juntos os mistérios que surgem. " +
        "A amizade deles se torna uma das histórias mais comentadas do castelo.";

} else if (game.rivalry >= 5) {

    endingTitle = "Final — Rivais de Hogwarts";

    endingText =
        "Sasah e Lucas conseguem desvendar parte do mistério, mas suas diferenças " +
        "fazem com que sigam caminhos distintos. A rivalidade entre os dois se torna " +
        "lendária dentro de Hogwarts.";

} else if (relationshipScore >= 4) {

    endingTitle = "Final — Uma Nova Aliança";

    endingText =
        "Os dois percebem que podem confiar um no outro, embora ainda existam " +
        "muitos mistérios a serem resolvidos. A aventura deles está apenas começando.";

} else {

    endingTitle = "Final — Caminhos Separados";

    endingText =
        "Sasah e Lucas seguem seus próprios caminhos dentro de Hogwarts. " +
        "Mesmo assim, o símbolo dos quatro caminhos permanece como uma lembrança " +
        "de que seus destinos ainda podem voltar a se cruzar.";
}

setText(
    chapterElement,
    endingTitle
);

setText(
    locationElement,
    "Hogwarts"
);

setText(
    sceneElement,
    endingText
);

clearChoices();

var restartButton = createButton(
    "Jogar novamente",
    function () {
        restartGame();
    }
);

choicesElement.appendChild(restartButton);

addLog("A aventura chegou ao seu final.");

updateUI();
saveGame();
```

}

/* ============================================================
INTERFACE DOS JOGADORES
============================================================ */

function updatePlayerTag() {

```
if (!playerTagElement) {
    return;
}

if (game.currentPlayer === "lucas") {
    playerTagElement.textContent = "Jogando como Lucas";
} else if (game.currentPlayer === "sasah") {
    playerTagElement.textContent = "Jogando como Sasah";
} else {
    playerTagElement.textContent = "Sasah & Lucas";
}
```

}

function updateAttribute(id, value) {
var element = document.getElementById(id);

```
if (element) {
    element.textContent = value;
}
```

}

function updatePlayerInterface(playerName) {

```
var player = getPlayer(playerName);

var prefix = playerName === "sasah"
    ? "sasah"
    : "lucas";

updateAttribute(
    prefix + "House",
    player.house
);

updateAttribute(
    prefix + "HpText",
    player.hp
);

updateAttribute(
    prefix + "ManaText",
    player.mana
);

updateAttribute(
    prefix + "XpText",
    player.xp
);

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

var hpBar = document.getElementById(
    prefix + "Hp"
);

if (hpBar) {
    hpBar.style.width = player.hp + "%";
}

var manaBar = document.getElementById(
    prefix + "Mana"
);

if (manaBar) {
    manaBar.style.width = player.mana + "%";
}

var xpBar = document.getElementById(
    prefix + "Xp"
);

if (xpBar) {
    var xpPercentage = player.xp % 100;

    xpBar.style.width =
        xpPercentage + "%";
}
```

}

function updateRelationshipInterface() {

```
updateAttribute(
    "friendship",
    game.friendship
);

updateAttribute(
    "trust",
    game.trust
);

updateAttribute(
    "rivalry",
    game.rivalry
);

updateAttribute(
    "affinity",
    game.affinity
);
```

}

function updateUI() {

```
updatePlayerTag();

updatePlayerInterface("sasah");
updatePlayerInterface("lucas");

updateRelationshipInterface();
```

}

/* ============================================================
SALVAMENTO
============================================================ */

function saveGame() {

```
try {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(game)
    );

    addLog("Jogo salvo.");

} catch (error) {

    console.error(
        "Não foi possível salvar o jogo:",
        error
    );
}
```

}

function loadGame() {

```
try {

    var saved = localStorage.getItem(
        SAVE_KEY
    );

    if (!saved) {
        return false;
    }

    var loadedGame = JSON.parse(saved);

    if (!loadedGame || !loadedGame.sasah || !loadedGame.lucas) {
        return false;
    }

    game = loadedGame;

    updateUI();

    addLog("Jogo carregado.");

    return true;

} catch (error) {

    console.error(
        "Não foi possível carregar o jogo:",
        error
    );

    return false;
}
```

}

/* ============================================================
NOVO JOGO
============================================================ */

function createNewGame() {

```
game = {
    currentPlayer: "sasah",

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
CONTINUAR JOGO
============================================================ */

function continueFromSave() {

```
var loaded = loadGame();

if (!loaded) {

    addLog(
        "Nenhum jogo salvo foi encontrado."
    );

    showStartScreen();

    return;
}

if (game.finished) {
    showEnding();
    return;
}

if (game.currentPlayer === "lucas") {

    renderStory("lucas");

} else if (game.currentPlayer === "sasah") {

    renderStory("sasah");

} else {

    startMeeting();
}

updateUI();
```

}

/* ============================================================
REINICIAR
============================================================ */

function restartGame() {

```
var confirmed = window.confirm(
    "Tem certeza de que deseja começar uma nova aventura? " +
    "O progresso atual será apagado."
);

if (!confirmed) {
    return;
}

try {
    localStorage.removeItem(SAVE_KEY);
} catch (error) {
    console.error(error);
}

createNewGame();

showStartScreen();
```

}

/* ============================================================
TELA INICIAL
============================================================ */

function showStartScreen() {

```
game.currentPlayer = "sasah";

setText(
    chapterElement,
    "As Crônicas de Hogwarts"
);

setText(
    locationElement,
    "O início da aventura"
);

setText(
    sceneElement,
    "Duas histórias diferentes estão prestes a começar. " +
    "Sasah e Lucas receberão cartas que mudarão suas vidas para sempre. " +
    "Suas escolhas determinarão suas características, suas casas e " +
    "o relacionamento entre os dois."
);

clearChoices();

var startButton = createButton(
    "Começar a história de Sasah",
    function () {
        createNewGame();
        startSasah();
    }
);

choicesElement.appendChild(startButton);

var continueButton = createButton(
    "Continuar jogo salvo",
    function () {
        continueFromSave();
    }
);

choicesElement.appendChild(continueButton);

updateUI();
```

}

/* ============================================================
BOTÕES FIXOS DA PÁGINA
============================================================ */

function setupButtons() {

```
var saveButton = document.getElementById(
    "saveButton"
);

if (saveButton) {
    saveButton.addEventListener(
        "click",
        saveGame
    );
}

var loadButton = document.getElementById(
    "loadButton"
);

if (loadButton) {
    loadButton.addEventListener(
        "click",
        continueFromSave
    );
}

var restartButton = document.getElementById(
    "restartButton"
);

if (restartButton) {
    restartButton.addEventListener(
        "click",
        restartGame
    );
}
```

}

/* ============================================================
INICIALIZAÇÃO
============================================================ */

function startApplication() {

```
getElements();

if (!pageIsReady()) {

    console.error(
        "Erro: elementos principais do jogo não foram encontrados."
    );

    return;
}

setupButtons();

showStartScreen();

updateUI();

console.log(
    "As Crônicas de Hogwarts carregadas com sucesso."
);
```

}

/* ============================================================
DOM READY
============================================================ */

document.addEventListener(
"DOMContentLoaded",
startApplication
);

