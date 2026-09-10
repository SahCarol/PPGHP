
"use strict";

/* =========================================================
   CRÔNICAS DE HOGWARTS
   SASAH & LUCAS
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const SAVE_KEY = "sasahLucasRPG";


const houses = {

    gryffindor: {
        name: "Grifinória",
        emoji: "🦁"
    },

    hufflepuff: {
        name: "Lufa-Lufa",
        emoji: "🦡"
    },

    ravenclaw: {
        name: "Corvinal",
        emoji: "🦅"
    },

    slytherin: {
        name: "Sonserina",
        emoji: "🐍"
    }

};


/* =========================================================
   ESTADO DO JOGO
========================================================= */

function createPlayer() {

    return {

        hp: 100,
        mana: 100,
        xp: 0,

        house: null,

        bravery: 0,
        loyalty: 0,
        intelligence: 0,
        ambition: 0,
        empathy: 0,
        magic: 0

    };

}


function createGame() {

    return {

        currentPlayer: "sasah",

        chapterSasah: 0,
        chapterLucas: 0,

        meeting: false,

        relationship: {

            friendship: 0,
            trust: 0,
            rivalry: 0,
            affinity: 0

        },

        sasah: createPlayer(),

        lucas: createPlayer(),

        flags: {}

    };

}


let game = createGame();


/* =========================================================
   ELEMENTOS DA INTERFACE
========================================================= */

const sceneElement =
    document.getElementById("scene");

const chapterElement =
    document.getElementById("chapter");

const locationElement =
    document.getElementById("location");

const choicesElement =
    document.getElementById("choices");

const playerTag =
    document.getElementById("playerTag");

const logElement =
    document.getElementById("log");


/* =========================================================
   VERIFICAÇÃO
========================================================= */

function checkInterface() {

    const required = [

        sceneElement,
        chapterElement,
        locationElement,
        choicesElement,
        playerTag,
        logElement

    ];


    return required.every(
        element => element !== null
    );

}


/* =========================================================
   DIÁRIO
========================================================= */

function addLog(text) {

    if (!logElement) return;


    const entry =
        document.createElement("div");


    entry.className =
        "log-entry";


    entry.textContent =
        text;


    logElement.prepend(entry);

}


/* =========================================================
   UTILIDADES
========================================================= */

function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}


function updatePlayerTag() {

    if (!playerTag) return;


    if (game.meeting) {

        playerTag.textContent =
            "Sasah & Lucas";

        return;

    }


    playerTag.textContent =
        game.currentPlayer === "sasah"
            ? "Jogando como Sasah"
            : "Jogando como Lucas";

}


/* =========================================================
   APLICAR EFEITOS
========================================================= */

function applyEffects(effects) {

    if (!effects) return;


    const player =
        game[game.currentPlayer];


    Object.entries(effects).forEach(
        ([key, value]) => {

            if (
                Object.prototype.hasOwnProperty.call(
                    game.relationship,
                    key
                )
            ) {

                game.relationship[key] += value;

                return;

            }


            if (
                Object.prototype.hasOwnProperty.call(
                    player,
                    key
                )
            ) {

                player[key] += value;

            }

        }
    );

}


/* =========================================================
   QUESTÕES DO CHAPÉU SELETOR
========================================================= */

const houseQuestions = [

    {

        title:
            "Quando você encontra um perigo inesperado, o que faz?",

        answers: [

            {
                text:
                    "Enfrento o perigo imediatamente.",
                attribute:
                    "bravery"
            },

            {
                text:
                    "Primeiro penso em quem pode estar precisando de ajuda.",
                attribute:
                    "loyalty"
            },

            {
                text:
                    "Analiso cuidadosamente a situação antes de agir.",
                attribute:
                    "intelligence"
            },

            {
                text:
                    "Procuro descobrir como transformar o perigo em uma oportunidade.",
                attribute:
                    "ambition"
            },

            {
                text:
                    "Tento entender por que aquilo está acontecendo.",
                attribute:
                    "empathy"
            }

        ]

    },


    {

        title:
            "Qual característica você mais admira em uma pessoa?",

        answers: [

            {
                text:
                    "Coragem para defender aquilo em que acredita.",
                attribute:
                    "bravery"
            },

            {
                text:
                    "Lealdade, mesmo quando tudo fica difícil.",
                attribute:
                    "loyalty"
            },

            {
                text:
                    "Inteligência e curiosidade.",
                attribute:
                    "intelligence"
            },

            {
                text:
                    "Determinação para alcançar grandes objetivos.",
                attribute:
                    "ambition"
            },

            {
                text:
                    "Capacidade de compreender os sentimentos dos outros.",
                attribute:
                    "empathy"
            }

        ]

    },


    {

        title:
            "Você descobre uma passagem proibida em Hogwarts. O que faz?",

        answers: [

            {
                text:
                    "Entro. Se é proibida, provavelmente existe algo importante lá.",
                attribute:
                    "bravery"
            },

            {
                text:
                    "Procuro alguém de confiança para investigar comigo.",
                attribute:
                    "loyalty"
            },

            {
                text:
                    "Pesquiso primeiro sobre a passagem e seus possíveis perigos.",
                attribute:
                    "intelligence"
            },

            {
                text:
                    "Investigo se existe algo valioso escondido ali.",
                attribute:
                    "ambition"
            },

            {
                text:
                    "Tento descobrir por que a passagem foi proibida.",
                attribute:
                    "empathy"
            }

        ]

    },


    {

        title:
            "Um colega confia a você um segredo perigoso. O que faz?",

        answers: [

            {
                text:
                    "Protejo o colega mesmo que isso me coloque em perigo.",
                attribute:
                    "bravery"
            },

            {
                text:
                    "Guardo o segredo. Uma confiança não deve ser quebrada.",
                attribute:
                    "loyalty"
            },

            {
                text:
                    "Analiso as consequências antes de decidir.",
                attribute:
                    "intelligence"
            },

            {
                text:
                    "Penso em como o segredo poderia mudar minha posição.",
                attribute:
                    "ambition"
            },

            {
                text:
                    "Tento entender por que meu colega precisou esconder aquilo.",
                attribute:
                    "empathy"
            }

        ]

    },


    {

        title:
            "Seu feitiço falha durante uma aula. Como reage?",

        answers: [

            {
                text:
                    "Tento novamente imediatamente.",
                attribute:
                    "bravery"
            },

            {
                text:
                    "Peço ajuda aos meus colegas.",
                attribute:
                    "loyalty"
            },

            {
                text:
                    "Estudo o erro para descobrir exatamente o que aconteceu.",
                attribute:
                    "intelligence"
            },

            {
                text:
                    "Pratico até conseguir fazer melhor que todos.",
                attribute:
                    "ambition"
            },

            {
                text:
                    "Tento descobrir se estava nervoso ou preocupado com alguma coisa.",
                attribute:
                    "empathy"
            }

        ]

    }

];


/* =========================================================
   ESCOLHA DA CASA
========================================================= */

function calculateHouse(playerName) {

    const player =
        game[playerName];


    const scores = {

        gryffindor:
            player.bravery,

        hufflepuff:
            player.loyalty +
            player.empathy,

        ravenclaw:
            player.intelligence,

        slytherin:
            player.ambition

    };


    let bestHouse =
        "gryffindor";


    let bestScore =
        -Infinity;


    Object.entries(scores).forEach(
        ([house, score]) => {

            if (score > bestScore) {

                bestScore = score;

                bestHouse = house;

            }

        }
    );


    return bestHouse;

}


function showHouseQuestion(
    playerName,
    questionIndex
) {

    const question =
        houseQuestions[questionIndex];


    if (!question) {

        finishHouseSelection(
            playerName
        );

        return;

    }


    game.currentPlayer =
        playerName;


    const displayName =
        playerName === "sasah"
            ? "Sasah"
            : "Lucas";


    chapterElement.textContent =
        `Seleção de ${displayName}`;


    locationElement.textContent =
        "O Chapéu Seletor";


    sceneElement.textContent =
        question.title;


    choicesElement.innerHTML =
        "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.className =
                "choice";


            button.innerHTML =
                `<strong>${index + 1}.</strong>${answer.text}`;


            button.addEventListener(
                "click",
                function () {

                    game[playerName][
                        answer.attribute
                    ]++;


                    if (
                        questionIndex + 1 <
                        houseQuestions.length
                    ) {

                        showHouseQuestion(
                            playerName,
                            questionIndex + 1
                        );

                    } else {

                        finishHouseSelection(
                            playerName
                        );

                    }

                    updateUI();

                }
            );


            choicesElement.appendChild(
                button
            );

        }
    );

}


function finishHouseSelection(playerName) {

    const house =
        calculateHouse(playerName);


    game[playerName].house =
        house;


    const houseData =
        houses[house];


    const displayName =
        playerName === "sasah"
            ? "Sasah"
            : "Lucas";


    chapterElement.textContent =
        "A escolha foi feita";


    locationElement.textContent =
        "O Chapéu Seletor";


    sceneElement.textContent =

`O Salão Principal fica em silêncio.

O Chapéu Seletor parece analisar cada pensamento, cada escolha e cada característica de ${displayName}.

Depois de alguns instantes, a decisão finalmente é anunciada:

${houseData.emoji} ${houseData.name}!

A nova vida em Hogwarts está prestes a começar.`;


    choicesElement.innerHTML =
        "";


    const button =
        document.createElement("button");


    button.className =
        "choice";


    button.innerHTML =
        `<strong>Continuar</strong>
         Seguir para Hogwarts.`;


    button.addEventListener(
        "click",
        function () {

            if (playerName === "sasah") {

                game.chapterSasah++;

                continueSasah();

            } else {

                game.chapterLucas++;

                continueLucas();

            }

        }
    );


    choicesElement.appendChild(
        button
    );


    addLog(
        `${displayName} foi selecionado(a) para ${houseData.name}.`
    );


    updateUI();

}


/* =========================================================
   HISTÓRIA DE SASAH
========================================================= */

const sasahStory = [

    {

        chapter:
            "Prólogo — Sasah",

        location:
            "Casa de Sasah",

        text:

`A noite parecia completamente comum.

Sasah estava em casa quando uma pequena luz surgiu no canto do quarto.

No início parecia apenas um reflexo.

Então a luz começou a se mover.

Um livro sobre a mesa abriu sozinho.

As páginas começaram a virar rapidamente até parar em uma página completamente vazia.

De repente, uma única frase apareceu no papel:

"Você foi chamada."

Antes que Sasah pudesse compreender o que estava acontecendo, uma coruja bateu contra a janela.

Havia uma carta presa à sua pata.

O símbolo no envelope era antigo.

E, estranhamente, parecia familiar.`,

        choices: [

            {

                text:
                    "Abrir a carta imediatamente.",

                effects: {
                    bravery: 1,
                    magic: 1,
                    xp: 5
                }

            },

            {

                text:
                    "Examinar o envelope cuidadosamente.",

                effects: {
                    intelligence: 1,
                    xp: 5
                }

            },

            {

                text:
                    "Esperar e observar a coruja.",

                effects: {
                    empathy: 1,
                    xp: 5
                }

            }

        ]

    },


    {

        chapter:
            "Capítulo I — A carta",

        location:
            "Quarto de Sasah",

        text:

`A carta finalmente está em suas mãos.

O papel é grosso e possui uma textura incomum.

Ela confirma aquilo que parecia impossível:

Sasah foi aceita em Hogwarts.

Mas existe algo estranho.

No final da carta há um pequeno símbolo que não aparece nas cartas comuns.

Um círculo dividido por uma linha vertical.

Quando Sasah toca o símbolo, sente uma pequena descarga de magia.

Por uma fração de segundo, ela ouve uma voz:

"Você não é a única."`,

        choices: [

            {

                text:
                    "Guardar a carta cuidadosamente.",

                effects: {
                    loyalty: 1,
                    magic: 1,
                    xp: 5
                }

            },

            {

                text:
                    "Tocar novamente no símbolo.",

                effects: {
                    magic: 2,
                    xp: 5
                }

            },

            {

                text:
                    "Pesquisar o símbolo.",

                effects: {
                    intelligence: 2,
                    xp: 5
                }

            }

        ]

    },


    {

        chapter:
            "Capítulo II — O mundo mágico",

        location:
            "Distrito mágico",

        text:

`Pouco tempo depois, Sasah atravessa pela primeira vez uma entrada para o mundo mágico.

Lojas cheias de objetos impossíveis aparecem diante dela.

Caldeirões.

Varinhas.

Livros.

Poções.

Criaturas mágicas.

Tudo parece maior do que qualquer história que ela já tenha lido.

Mas, entre a multidão, Sasah percebe uma pessoa encapuzada observando-a.

Quando ela olha novamente, a pessoa desapareceu.

No chão, entretanto, existe uma pequena moeda.

A mesma marca da carta está gravada nela.`,

        choices: [

            {

                text:
                    "Seguir a pessoa encapuzada.",

                effects: {
                    bravery: 2,
                    xp: 10
                }

            },

            {

                text:
                    "Investigar a moeda.",

                effects: {
                    intelligence: 2,
                    magic: 1,
                    xp: 10
                }

            },

            {

                text:
                    "Ignorar a pessoa e continuar o caminho.",

                effects: {
                    empathy: 1,
                    loyalty: 1,
                    xp: 10
                }

            }

        ]

    }

];


/* =========================================================
   HISTÓRIA DE LUCAS
========================================================= */

const lucasStory = [

    {

        chapter:
            "Prólogo — Lucas",

        location:
            "Casa de Lucas",

        text:

`Lucas sempre acreditou que havia algo estranho acontecendo ao seu redor.

Objetos mudavam de lugar.

Livros apareciam abertos em páginas que ele nunca tinha lido.

Às vezes, quando ficava irritado, as lâmpadas piscavam.

Naquela noite, porém, algo diferente aconteceu.

Uma coruja pousou na janela.

Ela carregava uma carta.

O envelope trazia um símbolo estranho.

Lucas ainda não sabe que outra pessoa recebeu exatamente a mesma marca.`,

        choices: [

            {

                text:
                    "Abrir a carta.",

                effects: {
                    bravery: 1,
                    magic: 1,
                    xp: 5
                }

            },

            {

                text:
                    "Investigar a coruja.",

                effects: {
                    intelligence: 1,
                    xp: 5
                }

            },

            {

                text:
                    "Tentar acalmar a situação.",

                effects: {
                    empathy: 1,
                    xp: 5
                }

            }

        ]

    },


    {

        chapter:
            "Capítulo I — O chamado",

        location:
            "Quarto de Lucas",

        text:

`A carta confirma que Lucas possui habilidades mágicas.

Mas existe uma observação escrita à mão:

"Não conte a ninguém sobre o símbolo."

Lucas olha novamente para o envelope.

O símbolo está brilhando.

Por um breve instante, uma voz parece surgir em sua mente:

"Quando as duas histórias se encontrarem, a verdade começará."`,

        choices: [

            {

                text:
                    "Guardar o segredo.",

                effects: {
                    loyalty: 1,
                    xp: 5
                }

            },

            {

                text:
                    "Investigar o símbolo.",

                effects: {
                    intelligence: 2,
                    xp: 5
                }

            },

            {

                text:
                    "Tentar descobrir quem está falando.",

                effects: {
                    bravery: 1,
                    magic: 1,
                    xp: 5
                }

            }

        ]

    },


    {

        chapter:
            "Capítulo II — A travessia",

        location:
            "Distrito mágico",

        text:

`Lucas chega ao mundo mágico.

Tudo é novo.

Mas uma coisa chama sua atenção.

Em uma loja antiga existe um livro exposto na vitrine.

Na capa está exatamente o mesmo símbolo de sua carta.

Quando Lucas se aproxima, o livro se abre sozinho.

Uma única página está marcada:

"Dois caminhos. Uma escolha."

Lucas sente que aquele livro estava esperando por ele.`,

        choices: [

            {

                text:
                    "Entrar na loja.",

                effects: {
                    bravery: 2,
                    xp: 10
                }

            },

            {

                text:
                    "Estudar o livro pela vitrine.",

                effects: {
                    intelligence: 2,
                    xp: 10
                }

            },

            {

                text:
                    "Perguntar ao vendedor sobre o símbolo.",

                effects: {
                    empathy: 1,
                    loyalty: 1,
                    xp: 10
                }

            }

        ]

    }

];


/* =========================================================
   SASAH
========================================================= */

function startSasah() {

    game.currentPlayer =
        "sasah";

    game.meeting =
        false;

    updatePlayerTag();

    showSasahChapter();

}


function showSasahChapter() {

    if (
        game.chapterSasah <
        sasahStory.length
    ) {

        renderScene(
            sasahStory[
                game.chapterSasah
            ]
        );

    } else {

        showHouseQuestion(
            "sasah",
            0
        );

    }

}


function continueSasah() {

    if (
        game.chapterSasah <
        sasahStory.length
    ) {

        showSasahChapter();

    } else {

        startLucas();

    }

}


/* =========================================================
   LUCAS
========================================================= */

function startLucas() {

    game.currentPlayer =
        "lucas";

    game.meeting =
        false;

    updatePlayerTag();

    showLucasChapter();

}


function showLucasChapter() {

    if (
        game.chapterLucas <
        lucasStory.length
    ) {

        renderScene(
            lucasStory[
                game.chapterLucas
            ]
        );

    } else {

        showHouseQuestion(
            "lucas",
            0
        );

    }

}


function continueLucas() {

    if (
        game.chapterLucas <
        lucasStory.length
    ) {

        showLucasChapter();

    } else {

        startMeeting();

    }

}


/* =========================================================
   RENDERIZAR CENA
========================================================= */

function renderScene(data) {

    if (!data) return;


    chapterElement.textContent =
        data.chapter;


    locationElement.textContent =
        data.location;


    sceneElement.textContent =
        data.text;


    choicesElement.innerHTML =
        "";


    data.choices.forEach(
        (choice, index) => {

            const button =
                document.createElement("button");


            button.className =
                "choice";


            button.innerHTML =
                `<strong>Escolha ${index + 1}</strong>
                 ${choice.text}`;


            button.addEventListener(
                "click",
                function () {

                    applyEffects(
                        choice.effects
                    );


                    addLog(
                        choice.text
                    );


                    if (
                        game.currentPlayer ===
                        "sasah"
                    ) {

                        game.chapterSasah++;

                        continueSasah();

                    } else {

                        game.chapterLucas++;

                        continueLucas();

                    }


                    updateUI();

                }
            );


            choicesElement.appendChild(
                button
            );

        }
    );


    updateUI();

}


/* =========================================================
   PRIMEIRO ENCONTRO
========================================================= */

function startMeeting() {

    game.meeting =
        true;

    updatePlayerTag();


    chapterElement.textContent =
        "Capítulo III — O encontro";


    locationElement.textContent =
        "Hogwarts — Corredor antigo";


    sceneElement.textContent =

`As histórias finalmente se cruzam.

Depois de dias separados, Sasah e Lucas chegam ao mesmo corredor.

É tarde da noite.

As tochas iluminam parcialmente as paredes antigas.

Os dois param.

Eles se encaram.

Nenhum deles sabe exatamente por que o outro parece familiar.

Então Sasah percebe algo.

O símbolo da carta de Lucas é exatamente igual ao símbolo de sua própria carta.

O mistério acaba de ganhar uma nova dimensão.`;


    choicesElement.innerHTML =
        "";


    createMeetingChoice(
        "Perguntar se Lucas também recebeu uma carta com o símbolo.",
        {
            friendship: 2,
            trust: 1
        }
    );


    createMeetingChoice(
        "Desconfiar de Lucas e perguntar o que ele está escondendo.",
        {
            rivalry: 2
        }
    );


    createMeetingChoice(
        "Mostrar imediatamente a própria carta.",
        {
            trust: 2,
            affinity: 1
        }
    );


    addLog(
        "Sasah e Lucas finalmente se encontraram."
    );


    updateUI();

}


function createMeetingChoice(
    text,
    effects
) {

    const button =
        document.createElement("button");


    button.className =
        "choice";


    button.innerHTML =
        `<strong>Escolha</strong>
         ${text}`;


    button.addEventListener(
        "click",
        function () {

            applyRelationshipEffects(
                effects
            );


            addLog(text);

            jointMission();

            updateUI();

        }
    );


    choicesElement.appendChild(
        button
    );

}


/* =========================================================
   EFEITOS DE RELACIONAMENTO
========================================================= */

function applyRelationshipEffects(
    effects
) {

    Object.entries(effects)
        .forEach(
            ([key, value]) => {

                if (
                    game.relationship[key]
                    !== undefined
                ) {

                    game.relationship[key]
                        += value;

                }

            }
        );

}


/* =========================================================
   MISSÃO
========================================================= */

function jointMission() {

    chapterElement.textContent =
        "Capítulo IV — O segredo";


    locationElement.textContent =
        "Biblioteca proibida";


    sceneElement.textContent =

`Depois do encontro, Sasah e Lucas percebem que existe algo conectando suas histórias.

Os dois seguem até uma parte esquecida da biblioteca.

Entre centenas de livros antigos, encontram uma pequena caixa.

Dentro dela existe um mapa de Hogwarts.

Duas marcas aparecem no mapa.

Uma representa Sasah.

A outra representa Lucas.

Quando os dois tocam o mapa ao mesmo tempo, uma passagem secreta aparece na parede.

Mas ninguém sabe o que existe do outro lado.`;


    choicesElement.innerHTML =
        "";


    createMissionChoice(
        "Abrir a passagem juntos.",
        {
            trust: 2,
            friendship: 2,
            affinity: 1
        }
    );


    createMissionChoice(
        "Investigar o mapa antes.",
        {
            trust: 1,
            affinity: 1
        }
    );


    createMissionChoice(
        "Cada um seguir por um caminho diferente.",
        {
            rivalry: 2
        }
    );

}


function createMissionChoice(
    text,
    effects
) {

    const button =
        document.createElement("button");


    button.className =
        "choice";


    button.innerHTML =
        `<strong>Escolha</strong>
         ${text}`;


    button.addEventListener(
        "click",
        function () {

            applyRelationshipEffects(
                effects
            );


            addLog(text);

            finalScene();

            updateUI();

        }
    );


    choicesElement.appendChild(
        button
    );

}


/* =========================================================
   FINAL DO PRIMEIRO ARCO
========================================================= */

function finalScene() {

    let ending;


    if (
        game.relationship.friendship >= 4
    ) {

        ending =

`Sasah e Lucas decidem confiar um no outro.

A passagem se abre.

Uma luz azulada ilumina o corredor.

Os dois sabem que aquela noite mudou suas vidas.

Eles ainda não sabem qual é o segredo escondido em Hogwarts.

Mas agora irão descobri-lo juntos.`;


    } else if (
        game.relationship.rivalry >= 3
    ) {

        ending =

`Sasah e Lucas continuam desconfiados.

A passagem se abre parcialmente.

Nenhum dos dois sabe se pode confiar completamente no outro.

O mistério, porém, é grande demais para ser ignorado.

A aventura está apenas começando.`;


    } else {

        ending =

`Os dois percebem que suas histórias estão conectadas.

Ainda existem perguntas.

Ainda existe desconfiança.

Mas existe também uma possibilidade:

talvez juntos consigam descobrir a verdade.`;


    }


    chapterElement.textContent =
        "Fim do primeiro arco";


    locationElement.textContent =
        "A passagem secreta";


    sceneElement.textContent =
        ending;


    choicesElement.innerHTML =
        "";


    const button =
        document.createElement("button");


    button.className =
        "choice";


    button.innerHTML =
        `<strong>✨ Primeiro arco concluído</strong>
         A aventura continuará em Hogwarts.`;


    button.addEventListener(
        "click",
        function () {

            addLog(
                "✨ Primeiro arco concluído."
            );

            button.disabled =
                true;

        }
    );


    choicesElement.appendChild(
        button
    );

}


/* =========================================================
   INTERFACE DOS PERSONAGENS
========================================================= */

function updateCharacterUI(
    playerName
) {

    const player =
        game[playerName];


    const prefix =
        playerName === "sasah"
            ? "sasah"
            : "lucas";


    const hp =
        document.getElementById(
            `${prefix}Hp`
        );


    const mana =
        document.getElementById(
            `${prefix}Mana`
        );


    const xp =
        document.getElementById(
            `${prefix}Xp`
        );


    if (hp) {

        hp.style.width =
            `${clamp(player.hp, 0, 100)}%`;

    }


    if (mana) {

        mana.style.width =
            `${clamp(player.mana, 0, 100)}%`;

    }


    if (xp) {

        xp.style.width =
            `${clamp(player.xp, 0, 100)}%`;

    }


    setText(
        `${prefix}HpText`,
        `${player.hp} / 100`
    );


    setText(
        `${prefix}ManaText`,
        `${player.mana} / 100`
    );


    setText(
        `${prefix}XpText`,
        `${player.xp} XP`
    );


    setText(
        `${prefix}House`,
        player.house
            ? `${houses[player.house].emoji} ${houses[player.house].name}`
            : "Casa ainda não escolhida"
    );


    /*
       IMPORTANTE:
       Aqui os IDs são escritos manualmente.
       Isso evita o bug da versão anterior,
       em que "sasahBravery" era procurado
       como "sasahbravery".
    */

    const attributes = {

        bravery:
            "Bravery",

        loyalty:
            "Loyalty",

        intelligence:
            "Intelligence",

        ambition:
            "Ambition",

        empathy:
            "Empathy",

        magic:
            "Magic"

    };


    Object.entries(attributes)
        .forEach(
            ([key, idPart]) => {

                setText(
                    `${prefix}${idPart}`,
                    player[key]
                );

            }
        );

}


function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


function updateRelationshipUI() {

    Object.entries(
        game.relationship
    ).forEach(
        ([key, value]) => {

            setText(
                key,
                value
            );

        }
    );

}


function updateUI() {

    updateCharacterUI(
        "sasah"
    );

    updateCharacterUI(
        "lucas"
    );

    updateRelationshipUI();

    updatePlayerTag();

}


/* =========================================================
   SALVAR
========================================================= */

function saveGame() {

    try {

        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(game)
        );


        addLog(
            "💾 Jogo salvo com sucesso."
        );

    } catch (error) {

        console.error(error);

        addLog(
            "❌ Não foi possível salvar o jogo."
        );

    }

}


/* =========================================================
   CARREGAR
========================================================= */

function loadGame() {

    try {

        const saved =
            localStorage.getItem(
                SAVE_KEY
            );


        if (!saved) {

            addLog(
                "Nenhum jogo salvo encontrado."
            );

            return;

        }


        game =
            JSON.parse(saved);


        addLog(
            "📂 Jogo carregado."
        );


        updateUI();


        if (game.meeting) {

            startMeeting();

        } else if (
            game.currentPlayer ===
            "sasah"
        ) {

            showSasahChapter();

        } else {

            showLucasChapter();

        }

    } catch (error) {

        console.error(error);

        addLog(
            "❌ Erro ao carregar o jogo."
        );

    }

}


/* =========================================================
   REINICIAR
========================================================= */

function restartGame() {

    const confirmed =
        window.confirm(
            "Tem certeza que deseja reiniciar toda a aventura?"
        );


    if (!confirmed) return;


    game =
        createGame();


    localStorage.removeItem(
        SAVE_KEY
    );


    logElement.innerHTML =
        "";


    addLog(
        "🔄 Uma nova aventura começou."
    );


    startSasah();

    updateUI();

}


/* =========================================================
   BOTÕES
========================================================= */

function setupButtons() {

    const saveButton =
        document.getElementById(
            "saveButton"
        );


    const loadButton =
        document.getElementById(
            "loadButton"
        );


    const restartButton =
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

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function startGame() {

    if (!checkInterface()) {

        console.error(
            "Erro: elementos do jogo não foram encontrados no HTML."
        );

        return;

    }


    setupButtons();


    addLog(
        "✨ A aventura de Sasah começou."
    );


    startSasah();

    updateUI();

}


/*
   Espera o HTML inteiro carregar
   antes de iniciar o RPG.
*/

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startGame
    );

} else {

    startGame();

}



