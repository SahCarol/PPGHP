
/* =========================================================
   CRÔNICAS DE HOGWARTS
   RPG DE SASAH & LUCAS
========================================================= */


/* =========================================================
   CONFIGURAÇÃO INICIAL
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


const defaultGame = {

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

    sasah: {

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

    },

    lucas: {

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

    },

    flags: {}

};


let game = structuredClone(defaultGame);


/* =========================================================
   ELEMENTOS HTML
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
   QUESTÕES DO CHAPÉU SELETOR
========================================================= */

const houseQuestions = [

    {
        title: "Quando você encontra um perigo inesperado, o que faz?",

        answers: [

            {
                text: "Enfrento o perigo imediatamente.",
                attribute: "bravery"
            },

            {
                text: "Primeiro penso em quem pode estar precisando de ajuda.",
                attribute: "loyalty"
            },

            {
                text: "Analiso cuidadosamente a situação antes de agir.",
                attribute: "intelligence"
            },

            {
                text: "Procuro descobrir como transformar o perigo em uma oportunidade.",
                attribute: "ambition"
            },

            {
                text: "Tento entender por que aquilo está acontecendo.",
                attribute: "empathy"
            }

        ]
    },


    {
        title: "Qual característica você mais admira em uma pessoa?",

        answers: [

            {
                text: "Coragem para defender aquilo em que acredita.",
                attribute: "bravery"
            },

            {
                text: "Lealdade, mesmo quando tudo fica difícil.",
                attribute: "loyalty"
            },

            {
                text: "Inteligência e curiosidade.",
                attribute: "intelligence"
            },

            {
                text: "Determinação para alcançar grandes objetivos.",
                attribute: "ambition"
            },

            {
                text: "Capacidade de compreender os sentimentos dos outros.",
                attribute: "empathy"
            }

        ]
    },


    {
        title: "Você descobre uma passagem proibida em Hogwarts. O que faz?",

        answers: [

            {
                text: "Entro. Se é proibida, provavelmente existe algo importante lá.",
                attribute: "bravery"
            },

            {
                text: "Procuro alguém de confiança para investigar comigo.",
                attribute: "loyalty"
            },

            {
                text: "Pesquiso primeiro sobre a passagem e seus possíveis perigos.",
                attribute: "intelligence"
            },

            {
                text: "Investigo se existe algo valioso escondido ali.",
                attribute: "ambition"
            },

            {
                text: "Tento descobrir por que a passagem foi proibida.",
                attribute: "empathy"
            }

        ]
    },


    {
        title: "Um colega confia a você um segredo perigoso. O que faz?",

        answers: [

            {
                text: "Protejo o colega mesmo que isso me coloque em perigo.",
                attribute: "bravery"
            },

            {
                text: "Guardo o segredo. Uma confiança não deve ser quebrada.",
                attribute: "loyalty"
            },

            {
                text: "Analiso as consequências antes de decidir.",
                attribute: "intelligence"
            },

            {
                text: "Penso em como o segredo poderia mudar minha posição.",
                attribute: "ambition"
            },

            {
                text: "Tento entender por que meu colega precisou esconder aquilo.",
                attribute: "empathy"
            }

        ]
    },


    {
        title: "Seu feitiço falha durante uma aula. Como reage?",

        answers: [

            {
                text: "Tento novamente imediatamente.",
                attribute: "bravery"
            },

            {
                text: "Peço ajuda aos meus colegas.",
                attribute: "loyalty"
            },

            {
                text: "Estudo o erro para descobrir exatamente o que aconteceu.",
                attribute: "intelligence"
            },

            {
                text: "Pratico até conseguir fazer melhor que todos.",
                attribute: "ambition"
            },

            {
                text: "Tento descobrir se estava nervoso ou preocupado com alguma coisa.",
                attribute: "empathy"
            }

        ]
    }

];


/* =========================================================
   UTILIDADES
========================================================= */

function cloneDefault() {

    return structuredClone(defaultGame);

}


function addLog(text) {

    const entry = document.createElement("div");

    entry.className = "log-entry";

    entry.textContent = text;

    logElement.prepend(entry);

}


function updatePlayerTag() {

    if (game.meeting) {

        playerTag.textContent =
            "Sasah & Lucas";

        return;

    }


    const name =
        game.currentPlayer === "sasah"
            ? "Sasah"
            : "Lucas";

    playerTag.textContent =
        `Jogando como ${name}`;

}


function clamp(value, min, max) {

    return Math.max(min, Math.min(max, value));

}


/* =========================================================
   ATRIBUTOS
========================================================= */

function applyAttribute(player, attribute, amount = 1) {

    if (!game[player]) return;

    game[player][attribute] =
        (game[player][attribute] || 0) + amount;

}


function applyEffects(effects = {}) {

    const player =
        game.currentPlayer;


    Object.entries(effects).forEach(([key, value]) => {

        if (game.relationship[key] !== undefined) {

            game.relationship[key] += value;

            return;

        }


        if (game[player][key] !== undefined) {

            game[player][key] += value;

        }

    });

}


/* =========================================================
   CASA
========================================================= */

function calculateHouse(player) {

    const p = game[player];


    const scores = {

        gryffindor:
            p.bravery,

        hufflepuff:
            p.loyalty + p.empathy,

        ravenclaw:
            p.intelligence,

        slytherin:
            p.ambition

    };


    return Object.keys(scores)
        .sort((a, b) => scores[b] - scores[a])[0];

}


function showHouseQuestion(player, questionIndex) {

    const question =
        houseQuestions[questionIndex];


    chapterElement.textContent =
        `Seleção de ${player === "sasah" ? "Sasah" : "Lucas"}`;


    locationElement.textContent =
        "O Chapéu Seletor";


    sceneElement.textContent =
        question.title;


    choicesElement.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "choice";


        button.innerHTML =
            `<strong>${index + 1}.</strong>${answer.text}`;


        button.onclick = () => {

            applyAttribute(
                player,
                answer.attribute,
                1
            );


            if (questionIndex + 1 < houseQuestions.length) {

                showHouseQuestion(
                    player,
                    questionIndex + 1
                );

            } else {

                finishHouseSelection(player);

            }

        };


        choicesElement.appendChild(button);

    });

}


function finishHouseSelection(player) {

    const house =
        calculateHouse(player);


    game[player].house = house;


    const houseData =
        houses[house];


    chapterElement.textContent =
        "A escolha foi feita";


    locationElement.textContent =
        "O Chapéu Seletor";


    sceneElement.textContent =

        `O silêncio toma conta do Salão Principal.

O Chapéu Seletor parece analisar cada pensamento, cada escolha e cada característica de ${player === "sasah" ? "Sasah" : "Lucas"}.

Depois de alguns instantes, a decisão finalmente é anunciada:

${houseData.emoji} ${houseData.name}!

A partir daquele momento, uma nova etapa da vida começa.`;


    choicesElement.innerHTML = "";


    const button =
        document.createElement("button");


    button.className = "choice";


    button.innerHTML =
        "<strong>Continuar</strong> Seguir para Hogwarts.";


    button.onclick = () => {

        if (player === "sasah") {

            game.chapterSasah++;

            continueSasah();

        } else {

            game.chapterLucas++;

            continueLucas();

        }

    };


    choicesElement.appendChild(button);


    addLog(
        `${player === "sasah" ? "Sasah" : "Lucas"} foi para ${houseData.name}.`
    );


    updateUI();

}


/* =========================================================
   HISTÓRIA DE SASAH
========================================================= */

const sasahStory = [

    {
        chapter: "Prólogo — Sasah",
        location: "Casa de Sasah",

        text:
`A noite parecia comum.

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
                text: "Abrir a carta imediatamente.",
                effects: {
                    bravery: 1,
                    magic: 1
                }
            },

            {
                text: "Examinar o envelope cuidadosamente.",
                effects: {
                    intelligence: 1
                }
            },

            {
                text: "Esperar e observar a coruja.",
                effects: {
                    empathy: 1
                }
            }

        ]
    },


    {
        chapter: "Capítulo I — A carta",
        location: "Quarto de Sasah",

        text:
`A carta finalmente está em suas mãos.

O papel é grosso e possui uma textura incomum.

Ela confirma aquilo que parecia impossível:

Sasah foi aceita em Hogwarts.

Mas existe algo estranho.

No final da carta há um pequeno símbolo que não aparece nas cartas comuns.

Um círculo dividido por uma linha vertical.

Quando Sasah toca o símbolo, sente uma pequena descarga de magia.`,

        choices: [

            {
                text: "Guardar a carta.",
                effects: {
                    loyalty: 1,
                    magic: 1
                }
            },

            {
                text: "Tocar novamente no símbolo.",
                effects: {
                    magic: 2
                }
            },

            {
                text: "Pesquisar o símbolo.",
                effects: {
                    intelligence: 2
                }
            }

        ]
    },


    {
        chapter: "Capítulo II — O mundo mágico",
        location: "Distrito mágico",

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

Quando ela olha novamente, a pessoa desapareceu.`,

        choices: [

            {
                text: "Seguir a pessoa.",
                effects: {
                    bravery: 2
                }
            },

            {
                text: "Investigar o local onde ela estava.",
                effects: {
                    intelligence: 2
                }
            },

            {
                text: "Ignorar e continuar o caminho.",
                effects: {
                    empathy: 1
                }
            }

        ]
    }

];


function startSasah() {

    game.currentPlayer = "sasah";

    updatePlayerTag();

    showSasahChapter();

}


function showSasahChapter() {

    const chapter =
        game.chapterSasah;


    if (chapter < sasahStory.length) {

        const data =
            sasahStory[chapter];


        renderScene(data);

        return;

    }


    showHouseQuestion("sasah", 0);

}


function continueSasah() {

    game.chapterSasah++;

    if (game.chapterSasah < sasahStory.length) {

        showSasahChapter();

    } else {

        startMeetingCheck();

    }

}


/* =========================================================
   HISTÓRIA DE LUCAS
========================================================= */

const lucasStory = [

    {
        chapter: "Prólogo — Lucas",
        location: "Casa de Lucas",

        text:
`Lucas sempre acreditou que havia algo estranho acontecendo ao seu redor.

Objetos mudavam de lugar.

Livros apareciam abertos em páginas que ele nunca tinha lido.

Às vezes, quando ficava irritado, as lâmpadas piscavam.

Naquela noite, porém, algo diferente aconteceu.

Uma coruja pousou na janela.

Ela carregava uma carta.

O envelope trazia o mesmo símbolo misterioso que apareceria na história de outra pessoa.

Lucas ainda não sabe disso.`,

        choices: [

            {
                text: "Abrir a carta.",
                effects: {
                    bravery: 1,
                    magic: 1
                }
            },

            {
                text: "Investigar a coruja.",
                effects: {
                    intelligence: 1
                }
            },

            {
                text: "Tentar acalmar a situação.",
                effects: {
                    empathy: 1
                }
            }

        ]
    },


    {
        chapter: "Capítulo I — O chamado",
        location: "Quarto de Lucas",

        text:
`A carta confirma que Lucas possui habilidades mágicas.

Mas existe uma observação escrita à mão.

"Não conte a ninguém sobre o símbolo."

Lucas olha novamente para o envelope.

O símbolo está brilhando.

Por um breve instante, uma voz parece surgir em sua mente:

"Quando as duas histórias se encontrarem, a verdade começará."`,

        choices: [

            {
                text: "Guardar o segredo.",
                effects: {
                    loyalty: 1
                }
            },

            {
                text: "Investigar o símbolo.",
                effects: {
                    intelligence: 2
                }
            },

            {
                text: "Tentar descobrir quem está falando.",
                effects: {
                    bravery: 1,
                    magic: 1
                }
            }

        ]
    },


    {
        chapter: "Capítulo II — A travessia",
        location: "Distrito mágico",

        text:
`Lucas chega ao mundo mágico.

Tudo é novo.

Mas uma coisa chama sua atenção.

Em uma loja antiga existe um livro exposto na vitrine.

Na capa está exatamente o mesmo símbolo de sua carta.

Quando Lucas se aproxima, o livro se abre sozinho.

Uma única página está marcada:

"Dois caminhos. Uma escolha."`,

        choices: [

            {
                text: "Entrar na loja.",
                effects: {
                    bravery: 2
                }
            },

            {
                text: "Estudar o livro pela vitrine.",
                effects: {
                    intelligence: 2
                }
            },

            {
                text: "Perguntar ao vendedor sobre o símbolo.",
                effects: {
                    empathy: 1,
                    loyalty: 1
                }
            }

        ]
    }

];


function startLucas() {

    game.currentPlayer = "lucas";

    updatePlayerTag();

    showLucasChapter();

}


function showLucasChapter() {

    const chapter =
        game.chapterLucas;


    if (chapter < lucasStory.length) {

        const data =
            lucasStory[chapter];


        renderScene(data);

        return;

    }


    showHouseQuestion("lucas", 0);

}


function continueLucas() {

    game.chapterLucas++;

    if (game.chapterLucas < lucasStory.length) {

        showLucasChapter();

    } else {

        startMeetingCheck();

    }

}


/* =========================================================
   RENDERIZAÇÃO
========================================================= */

function renderScene(data) {

    chapterElement.textContent =
        data.chapter;

    locationElement.textContent =
        data.location;

    sceneElement.textContent =
        data.text;

    choicesElement.innerHTML = "";


    data.choices.forEach((choice, index) => {

        const button =
            document.createElement("button");


        button.className = "choice";


        button.innerHTML =
            `<strong>Escolha ${index + 1}</strong>${choice.text}`;


        button.onclick = () => {

            applyEffects(choice.effects);

            addLog(choice.text);

            if (game.currentPlayer === "sasah") {

                continueSasah();

            } else {

                continueLucas();

            }

            updateUI();

        };


        choicesElement.appendChild(button);

    });


    updateUI();

}


/* =========================================================
   ENCONTRO DOS PERSONAGENS
========================================================= */

function startMeetingCheck() {

    if (
        game.chapterSasah >= sasahStory.length &&
        game.chapterLucas >= lucasStory.length
    ) {

        game.meeting = true;

        meetingScene();

    }

}


function meetingScene() {

    updatePlayerTag();


    chapterElement.textContent =
        "Capítulo III — O encontro";


    locationElement.textContent =
        "Hogwarts — Corredor antigo";


    sceneElement.textContent =

`As histórias finalmente se cruzam.

Depois de dias separados, Sasah e Lucas chegam ao mesmo corredor.

É tarde da noite.

As tochas iluminam apenas parcialmente as paredes antigas.

Os dois param.

Eles se encaram.

Nenhum deles sabe exatamente por que o outro parece familiar.

Então Sasah percebe algo.

O símbolo da carta de Lucas é exatamente igual ao símbolo de sua própria carta.

O mistério acaba de ganhar uma nova dimensão.`;


    choicesElement.innerHTML = "";


    createChoice(
        "Perguntar se Lucas também recebeu uma carta com o símbolo.",
        {
            friendship: 2,
            trust: 1
        }
    );


    createChoice(
        "Desconfiar de Lucas e perguntar o que ele está escondendo.",
        {
            rivalry: 2
        }
    );


    createChoice(
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


function createChoice(text, effects) {

    const button =
        document.createElement("button");


    button.className = "choice";


    button.innerHTML =
        `<strong>Escolha</strong>${text}`;


    button.onclick = () => {

        applyEffects(effects);

        addLog(text);

        jointMission();

        updateUI();

    };


    choicesElement.appendChild(button);

}


/* =========================================================
   MISSÃO CONJUNTA
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

Dentro dela há um mapa de Hogwarts.

Duas marcas aparecem no mapa.

Uma representa Sasah.

A outra representa Lucas.

Quando os dois tocam o mapa ao mesmo tempo, uma passagem secreta aparece na parede.

Mas ninguém sabe o que existe do outro lado.`;


    choicesElement.innerHTML = "";


    createMissionChoice(
        "Abrir a passagem juntos.",
        {
            trust: 2,
            friendship: 2,
            magic: 2
        }
    );


    createMissionChoice(
        "Investigar o mapa antes.",
        {
            intelligence: 2,
            trust: 1
        }
    );


    createMissionChoice(
        "Cada um seguir por um caminho diferente.",
        {
            rivalry: 2,
            ambition: 1
        }
    );

}


function createMissionChoice(text, effects) {

    const button =
        document.createElement("button");


    button.className = "choice";


    button.innerHTML =
        `<strong>Escolha</strong>${text}`;


    button.onclick = () => {

        applyEffects(effects);

        finalScene();

        updateUI();

    };


    choicesElement.appendChild(button);

}


/* =========================================================
   FINAL DO PRIMEIRO ARCO
========================================================= */

function finalScene() {

    let ending;


    if (game.relationship.friendship >= 4) {

        ending =
`Sasah e Lucas decidem confiar um no outro.

A passagem se abre.

Uma luz azulada ilumina o corredor.

Os dois sabem que aquela noite mudou suas vidas.

Eles ainda não sabem qual é o segredo escondido em Hogwarts.

Mas agora irão descobri-lo juntos.`;


    } else if (game.relationship.rivalry >= 3) {

        ending =
`Sasah e Lucas continuam desconfiados.

A passagem se abre parcialmente.

Nenhum dos dois sabe se pode confiar completamente no outro.

O mistério, porém, é grande demais para ser ignorado.

A aventura está apenas começando.`;


    } else {

        ending =
`Os dois percebem que suas histórias estão conectadas.

Ainda existe desconfiança.

Ainda existem perguntas.

Mas existe também uma possibilidade:

talvez juntos consigam descobrir a verdade.`;


    }


    chapterElement.textContent =
        "Fim do primeiro arco";


    locationElement.textContent =
        "A passagem secreta";


    sceneElement.textContent =
        ending;


    choicesElement.innerHTML = "";


    const button =
        document.createElement("button");


    button.className = "choice";


    button.innerHTML =
        "<strong>✨ Continuar futuramente</strong> O próximo capítulo ainda será descoberto.";


    button.onclick = () => {

        addLog(
            "Primeiro arco concluído."
        );

        button.disabled = true;

    };


    choicesElement.appendChild(button);

}


/* =========================================================
   INTERFACE
========================================================= */

function updateCharacterUI(player) {

    const p =
        game[player];


    const prefix =
        player === "sasah"
            ? "sasah"
            : "lucas";


    document.getElementById(
        `${prefix}Hp`
    ).style.width =
        `${clamp(p.hp, 0, 100)}%`;


    document.getElementById(
        `${prefix}Mana`
    ).style.width =
        `${clamp(p.mana, 0, 100)}%`;


    document.getElementById(
        `${prefix}Xp`
    ).style.width =
        `${clamp(p.xp, 0, 100)}%`;


    document.getElementById(
        `${prefix}HpText`
    ).textContent =
        `${p.hp} / 100`;


    document.getElementById(
        `${prefix}ManaText`
    ).textContent =
        `${p.mana} / 100`;


    document.getElementById(
        `${prefix}XpText`
    ).textContent =
        `${p.xp} XP`;


    document.getElementById(
        `${prefix}House`
    ).textContent =
        p.house
            ? `${houses[p.house].emoji} ${houses[p.house].name}`
            : "Casa ainda não escolhida";


    const attributes = [

        "Bravery",
        "Loyalty",
        "Intelligence",
        "Ambition",
        "Empathy",
        "Magic"

    ];


    attributes.forEach(attribute => {

        const key =
            attribute.toLowerCase();


        const element =
            document.getElementById(
                `${prefix}${attribute}`
            );


        if (element) {

            element.textContent =
                p[key];

        }

    });

}


function updateRelationshipUI() {

    Object.entries(game.relationship)
        .forEach(([key, value]) => {

            const element =
                document.getElementById(key);

            if (element) {

                element.textContent =
                    value;

            }

        });

}


function updateUI() {

    updateCharacterUI("sasah");

    updateCharacterUI("lucas");

    updateRelationshipUI();

    updatePlayerTag();

}


/* =========================================================
   SALVAMENTO
========================================================= */

function saveGame() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(game)
    );


    addLog(
        "💾 Jogo salvo com sucesso."
    );

}


function loadGame() {

    const saved =
        localStorage.getItem(SAVE_KEY);


    if (!saved) {

        addLog(
            "Nenhum jogo salvo encontrado."
        );

        return;

    }


    try {

        game =
            JSON.parse(saved);


        addLog(
            "📂 Jogo carregado."
        );


        updateUI();


        if (game.meeting) {

            meetingScene();

        } else if (game.currentPlayer === "sasah") {

            showSasahChapter();

        } else {

            showLucasChapter();

        }


    } catch (error) {

        console.error(error);

        addLog(
            "Não foi possível carregar o jogo."
        );

    }

}


/* =========================================================
   REINICIAR
========================================================= */

function restartGame() {

    const confirmed =
        confirm(
            "Tem certeza que deseja reiniciar toda a aventura?"
        );


    if (!confirmed) return;


    game =
        cloneDefault();


    localStorage.removeItem(
        SAVE_KEY
    );


    logElement.innerHTML = "";


    addLog(
        "🔄 Uma nova aventura começou."
    );


    startSasah();

    updateUI();

}


/* =========================================================
   INÍCIO
========================================================= */

function startGame() {

    addLog(
        "✨ A aventura de Sasah começou."
    );


    startSasah();

    updateUI();

}


startGame();

