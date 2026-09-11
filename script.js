var SAVE_KEY = "hogwarts_rpg_v7";

var game = {
    phase: "names",
    chapter: 0,
    scene: 0,

    turnMode: "both",

    sasah: {
        name: "Sasah",
        house: "—",
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
        magic: 0
    },

    lucas: {
        name: "Lucas",
        house: "—",
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
        magic: 0
    },

    relationship: {
        friendship: 0,
        trust: 0,
        rivalry: 0,
        affinity: 0
    },

    kiwi: {
        met: false,
        trust: 0,
        affection: 0,
        helped: false,
        rescued: false,
        followed: false,
        secret: false,
        injured: false,
        finalAlly: false
    },

    flags: {
        library: false,
        secretPassage: false,
        ancientArtifact: false,
        professorMissing: false,
        forest: false,
        lake: false,
        guardian: false,
        tournament: false,
        mirror: false,
        betrayal: false,
        invasion: false,
        ancientMagic: false,
        finalBattle: false,
        finalChamber: false
    },

    houseAnswers: {
        sasah: [],
        lucas: []
    },

    log: []
};


/* =========================================================
   UTILIDADES
========================================================= */

function setText(id, text) {
    var element = document.getElementById(id);

    if (element) {
        element.textContent = text;
    }
}

function setWidth(id, value) {
    var element = document.getElementById(id);

    if (element) {
        element.style.width = Math.max(0, Math.min(100, value)) + "%";
    }
}

function addLog(text) {
    game.log.push(text);

    if (game.log.length > 80) {
        game.log.shift();
    }

    updateLog();
}

function updateLog() {
    var log = document.getElementById("log");

    if (!log) {
        return;
    }

    log.innerHTML = "";

    for (var i = 0; i < game.log.length; i++) {
        var p = document.createElement("p");
        p.textContent = game.log[i];
        log.appendChild(p);
    }
}

function updateCharacterUI() {
    setText("sasahName", game.sasah.name);
    setText("lucasName", game.lucas.name);

    setText("sasahHouse", game.sasah.house);
    setText("lucasHouse", game.lucas.house);

    setText(
        "sasahHpText",
        game.sasah.hp + " / " + game.sasah.maxHp
    );

    setText(
        "lucasHpText",
        game.lucas.hp + " / " + game.lucas.maxHp
    );

    setText(
        "sasahManaText",
        game.sasah.mana + " / " + game.sasah.maxMana
    );

    setText(
        "lucasManaText",
        game.lucas.mana + " / " + game.lucas.maxMana
    );

    setText("sasahXpText", String(game.sasah.xp));
    setText("lucasXpText", String(game.lucas.xp));

    setWidth(
        "sasahHp",
        game.sasah.hp / game.sasah.maxHp * 100
    );

    setWidth(
        "lucasHp",
        game.lucas.hp / game.lucas.maxHp * 100
    );

    setWidth(
        "sasahMana",
        game.sasah.mana / game.sasah.maxMana * 100
    );

    setWidth(
        "lucasMana",
        game.lucas.mana / game.lucas.maxMana * 100
    );

    setWidth(
        "sasahXp",
        game.sasah.xp
    );

    setWidth(
        "lucasXp",
        game.lucas.xp
    );

    setText("sasahBravery", String(game.sasah.bravery));
    setText("sasahLoyalty", String(game.sasah.loyalty));
    setText("sasahIntelligence", String(game.sasah.intelligence));
    setText("sasahAmbition", String(game.sasah.ambition));
    setText("sasahEmpathy", String(game.sasah.empathy));
    setText("sasahMagic", String(game.sasah.magic));

    setText("lucasBravery", String(game.lucas.bravery));
    setText("lucasLoyalty", String(game.lucas.loyalty));
    setText("lucasIntelligence", String(game.lucas.intelligence));
    setText("lucasAmbition", String(game.lucas.ambition));
    setText("lucasEmpathy", String(game.lucas.empathy));
    setText("lucasMagic", String(game.lucas.magic));

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

    updateTurnIndicator();
}

function updateTurnIndicator() {
    var tag = document.getElementById("playerTag");

    if (!tag) {
        return;
    }

    if (game.turnMode === "sasah") {
        tag.textContent = "🎮 " + game.sasah.name;
    } else if (game.turnMode === "lucas") {
        tag.textContent = "🎮 " + game.lucas.name;
    } else {
        tag.textContent = "🤝 " + game.sasah.name + " + " + game.lucas.name;
    }
}

function changeRelationship(friendship, trust, rivalry, affinity) {
    game.relationship.friendship += friendship || 0;
    game.relationship.trust += trust || 0;
    game.relationship.rivalry += rivalry || 0;
    game.relationship.affinity += affinity || 0;

    updateCharacterUI();
}

function gainXp(character, amount) {
    character.xp += amount;

    if (character.xp >= 100) {
        character.xp -= 100;
        character.magic += 1;
        character.maxMana += 5;
        character.mana = character.maxMana;

        addLog(
            character.name +
            " subiu de nível e sua magia aumentou!"
        );
    }

    updateCharacterUI();
}

function changeHp(character, amount) {
    character.hp += amount;

    if (character.hp > character.maxHp) {
        character.hp = character.maxHp;
    }

    if (character.hp < 0) {
        character.hp = 0;
    }

    updateCharacterUI();
}

function changeMana(character, amount) {
    character.mana += amount;

    if (character.mana > character.maxMana) {
        character.mana = character.maxMana;
    }

    if (character.mana < 0) {
        character.mana = 0;
    }

    updateCharacterUI();
}


/* =========================================================
   SISTEMA DE JOGADORES
========================================================= */

function createTurnPanel(parent, currentMode) {
    var panel = document.createElement("div");

    panel.className = "turn-selector";

    var title = document.createElement("div");

    title.className = "turn-title";
    title.textContent = "QUEM TOMA A DECISÃO?";

    panel.appendChild(title);

    var buttons = document.createElement("div");

    buttons.className = "turn-buttons";

    createTurnButton(
        buttons,
        "🎮 " + game.sasah.name,
        "sasah",
        currentMode
    );

    createTurnButton(
        buttons,
        "🎮 " + game.lucas.name,
        "lucas",
        currentMode
    );

    createTurnButton(
        buttons,
        "🤝 Ambos",
        "both",
        currentMode
    );

    panel.appendChild(buttons);

    parent.appendChild(panel);
}

function createTurnButton(parent, text, mode, currentMode) {
    var button = document.createElement("button");

    button.type = "button";
    button.className = "turn-button";

    if (mode === currentMode) {
        button.className += " active";
    }

    button.textContent = text;

    button.addEventListener("click", function() {
        game.turnMode = mode;

        updateTurnIndicator();

        renderCurrentScene();
    });

    parent.appendChild(button);
}

var currentSceneData = null;

function renderCurrentScene() {
    if (!currentSceneData) {
        return;
    }

    renderScene(
        currentSceneData.chapter,
        currentSceneData.location,
        currentSceneData.title,
        currentSceneData.text,
        currentSceneData.choices,
        currentSceneData.mode
    );
}


/* =========================================================
   SISTEMA DE CENAS
========================================================= */

function renderScene(
    chapter,
    location,
    title,
    text,
    choices,
    suggestedMode
) {
    game.chapter = chapter;

    if (suggestedMode) {
        game.turnMode = suggestedMode;
    }

    currentSceneData = {
        chapter: chapter,
        location: location,
        title: title,
        text: text,
        choices: choices,
        mode: suggestedMode || game.turnMode
    };

    setText("chapter", title);
    setText("location", location);
    setText("scene", text);

    var choicesElement = document.getElementById("choices");

    if (!choicesElement) {
        return;
    }

    choicesElement.innerHTML = "";

    createTurnPanel(
        choicesElement,
        game.turnMode
    );

    var choiceTitle = document.createElement("h3");

    choiceTitle.className = "choice-title";

    if (game.turnMode === "sasah") {
        choiceTitle.textContent =
            "Decisão de " + game.sasah.name;
    } else if (game.turnMode === "lucas") {
        choiceTitle.textContent =
            "Decisão de " + game.lucas.name;
    } else {
        choiceTitle.textContent =
            "Decisão conjunta";
    }

    choicesElement.appendChild(choiceTitle);

    for (var i = 0; i < choices.length; i++) {
        createChoiceButton(
            choicesElement,
            choices[i].text,
            choices[i].action
        );
    }

    updateCharacterUI();
    updateLog();
}

function createChoiceButton(parent, text, action) {
    var button = document.createElement("button");

    button.type = "button";
    button.className = "choice-button";
    button.textContent = text;

    button.addEventListener("click", function() {
        action();
    });

    parent.appendChild(button);
}


/* =========================================================
   NOMES
========================================================= */

function startNameScreen() {
    game.phase = "names";

    setText(
        "chapter",
        "PRÓLOGO"
    );

    setText(
        "location",
        "Antes de Hogwarts"
    );

    setText(
        "scene",
        "Duas vidas estão prestes a mudar. " +
        "Escolha os nomes dos dois protagonistas."
    );

    var choices = document.getElementById("choices");

    if (!choices) {
        return;
    }

    choices.innerHTML = "";

    var box = document.createElement("div");

    box.className = "name-selection";

    var title = document.createElement("h2");

    title.textContent =
        "Escolha os protagonistas";

    box.appendChild(title);

    var label1 = document.createElement("label");

    label1.textContent =
        "Nome do Jogador 1";

    var input1 = document.createElement("input");

    input1.type = "text";
    input1.id = "nameInput1";
    input1.value = game.sasah.name;
    input1.maxLength = 30;

    label1.appendChild(input1);

    box.appendChild(label1);

    var label2 = document.createElement("label");

    label2.textContent =
        "Nome do Jogador 2";

    var input2 = document.createElement("input");

    input2.type = "text";
    input2.id = "nameInput2";
    input2.value = game.lucas.name;
    input2.maxLength = 30;

    label2.appendChild(input2);

    box.appendChild(label2);

    var button = document.createElement("button");

    button.type = "button";
    button.className =
        "choice-button continue-button";

    button.textContent =
        "Começar aventura";

    button.addEventListener("click", function() {
        var first = input1.value.trim();
        var second = input2.value.trim();

        if (first === "") {
            first = "Sasah";
        }

        if (second === "") {
            second = "Lucas";
        }

        game.sasah.name = first;
        game.lucas.name = second;

        addLog(
            first +
            " e " +
            second +
            " começaram a aventura."
        );

        startHouseSelection("sasah");
    });

    box.appendChild(button);

    choices.appendChild(box);

    updateCharacterUI();
}


/* =========================================================
   CHAPÉU SELETOR
========================================================= */

var houseQuestions = [
    {
        question:
            "Quando alguém que você ama está em perigo, o que faz?",

        answers: [
            {
                text: "Enfrento o perigo imediatamente.",
                trait: "bravery"
            },
            {
                text: "Fico ao lado da pessoa.",
                trait: "loyalty"
            },
            {
                text: "Procuro uma solução inteligente.",
                trait: "intelligence"
            },
            {
                text: "Transformo a situação em oportunidade.",
                trait: "ambition"
            },
            {
                text: "Tento entender o que ela está sentindo.",
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
            "Você encontra uma passagem secreta. O que faz?",

        answers: [
            {
                text: "Entro sem hesitar.",
                trait: "bravery"
            },
            {
                text: "Chamo meus amigos.",
                trait: "loyalty"
            },
            {
                text: "Investigo antes de entrar.",
                trait: "intelligence"
            },
            {
                text: "Penso no que posso ganhar.",
                trait: "ambition"
            },
            {
                text: "Verifico se alguém precisa de ajuda.",
                trait: "empathy"
            }
        ]
    },

    {
        question:
            "Um professor acusa você injustamente.",

        answers: [
            {
                text: "Defendo minha posição.",
                trait: "bravery"
            },
            {
                text: "Procuro alguém de confiança.",
                trait: "loyalty"
            },
            {
                text: "Apresento provas.",
                trait: "intelligence"
            },
            {
                text: "Uso a situação para provar meu valor.",
                trait: "ambition"
            },
            {
                text: "Tento entender o professor.",
                trait: "empathy"
            }
        ]
    },

    {
        question:
            "Qual frase combina mais com você?",

        answers: [
            {
                text: "É melhor tentar do que viver com medo.",
                trait: "bravery"
            },
            {
                text: "Ninguém deveria enfrentar tudo sozinho.",
                trait: "loyalty"
            },
            {
                text: "Sempre existe algo novo para aprender.",
                trait: "intelligence"
            },
            {
                text: "Eu quero chegar mais longe.",
                trait: "ambition"
            },
            {
                text: "Entender também é uma forma de força.",
                trait: "empathy"
            }
        ]
    }
];

function startHouseSelection(character) {
    game.phase = "sorting";

    game.houseAnswers[character] = [];

    showHouseQuestion(
        character,
        0
    );
}

function showHouseQuestion(
    character,
    index
) {
    if (index >= houseQuestions.length) {
        finishHouseSelection(character);
        return;
    }

    var person =
        character === "sasah"
        ? game.sasah
        : game.lucas;

    var question =
        houseQuestions[index];

    setText(
        "chapter",
        "O CHAPÉU SELETOR"
    );

    setText(
        "location",
        "Salão Principal"
    );

    setText(
        "scene",
        person.name +
        ", o Chapéu Seletor observa seus pensamentos.\n\n" +
        question.question
    );

    var choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    for (
        var i = 0;
        i < question.answers.length;
        i++
    ) {
        (function(answer) {

            createChoiceButton(
                choices,
                answer.text,
                function() {

                    game.houseAnswers[
                        character
                    ].push(
                        answer.trait
                    );

                    person[
                        answer.trait
                    ] += 1;

                    showHouseQuestion(
                        character,
                        game.houseAnswers[
                            character
                        ].length
                    );
                }
            );

        })(question.answers[i]);
    }

    updateCharacterUI();
}

function calculateHouse(character) {
    var person =
        character === "sasah"
        ? game.sasah
        : game.lucas;

    var gryffindor =
        person.bravery * 2;

    var hufflepuff =
        person.loyalty * 2 +
        person.empathy * 1.5;

    var ravenclaw =
        person.intelligence * 2;

    var slytherin =
        person.ambition * 2;

    var scores = [
        {
            name: "Grifinória",
            score: gryffindor
        },
        {
            name: "Lufa-Lufa",
            score: hufflepuff
        },
        {
            name: "Corvinal",
            score: ravenclaw
        },
        {
            name: "Sonserina",
            score: slytherin
        }
    ];

    scores.sort(function(a, b) {
        return b.score - a.score;
    });

    return scores[0].name;
}

function finishHouseSelection(character) {
    var person =
        character === "sasah"
        ? game.sasah
        : game.lucas;

    person.house =
        calculateHouse(character);

    setText(
        "chapter",
        "O CHAPÉU SELETOR"
    );

    setText(
        "location",
        "Salão Principal"
    );

    setText(
        "scene",
        person.name +
        " foi escolhido para " +
        person.house +
        "."
    );

    var choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    createChoiceButton(
        choices,
        character === "sasah"
        ? "Continuar para o Jogador 2"
        : "Começar a aventura",
        function() {

            if (character === "sasah") {
                startHouseSelection("lucas");
            } else {
                arc1Scene1();
            }

        }
    );

    addLog(
        person.name +
        " foi selecionado para " +
        person.house +
        "."
    );

    updateCharacterUI();
}


/* =========================================================
   ARCO 1
   A CHEGADA
========================================================= */

function arc1Scene1() {
    game.chapter = 1;

    renderScene(
        1,
        "Expresso de Hogwarts",
        "ARCO I — A CHEGADA",
        "O Expresso de Hogwarts atravessa o interior da Inglaterra.\n\n" +
        game.sasah.name +
        " observa a paisagem pela janela enquanto " +
        game.lucas.name +
        " encontra um livro antigo dentro de sua bagagem.\n\n" +
        "O livro possui um símbolo que parece pulsar.",
        [
            {
                text: "Investigar o livro",
                action: function() {
                    game.sasah.intelligence += 1;
                    game.lucas.intelligence += 1;
                    game.flags.ancientArtifact = true;
                    gainXp(game.sasah, 10);
                    gainXp(game.lucas, 10);
                    addLog("O símbolo antigo foi investigado.");
                    arc1Scene2();
                }
            },
            {
                text: "Guardar o livro",
                action: function() {
                    changeRelationship(1, 1, 0, 1);
                    arc1Scene2();
                }
            },
            {
                text: "Usar magia no símbolo",
                action: function() {
                    game.sasah.magic += 1;
                    game.lucas.magic += 1;
                    changeMana(game.sasah, -10);
                    changeMana(game.lucas, -10);
                    arc1Scene2();
                }
            }
        ],
        "both"
    );
}

function arc1Scene2() {
    renderScene(
        1,
        "Expresso de Hogwarts",
        "O primeiro turno",
        "Uma carta cai no chão.\n\n" +
        "Dentro dela existe apenas uma frase:\n\n" +
        "\"Quando a Lebrílope aparecer, não confiem na sombra.\"\n\n" +
        "A carta parece ter sido escrita recentemente.",
        [
            {
                text: "Guardar a carta",
                action: function() {
                    game.sasah.intelligence += 1;
                    arc1Scene3();
                }
            },
            {
                text: "Procurar quem escreveu",
                action: function() {
                    game.lucas.bravery += 1;
                    arc1Scene3();
                }
            },
            {
                text: "Contar tudo ao outro protagonista",
                action: function() {
                    changeRelationship(2, 2, 0, 2);
                    arc1Scene3();
                }
            }
        ],
        "sasah"
    );
}

function arc1Scene3() {
    renderScene(
        1,
        "Hogwarts",
        "O castelo",
        "As portas de Hogwarts se abrem.\n\n" +
        "Os dois entram pela primeira vez.\n\n" +
        "No alto de uma torre, uma pequena silhueta observa os novos alunos.",
        [
            {
                text: "Observar a silhueta",
                action: function() {
                    game.sasah.intelligence += 1;
                    arc1Scene4();
                }
            },
            {
                text: "Ignorar",
                action: function() {
                    arc1Scene4();
                }
            },
            {
                text: "Tentar descobrir o que é",
                action: function() {
                    game.lucas.empathy += 1;
                    arc1Scene4();
                }
            }
        ],
        "lucas"
    );
}

function arc1Scene4() {
    renderScene(
        1,
        "Salão Principal",
        "Uma escola, dois destinos",
        "A seleção das casas termina.\n\n" +
        "Agora começa a verdadeira vida em Hogwarts.\n\n" +
        "Mas alguma coisa parece estar observando os dois.",
        [
            {
                text: "Investigar juntos",
                action: function() {
                    changeRelationship(3, 3, 0, 2);
                    gainXp(game.sasah, 15);
                    gainXp(game.lucas, 15);
                    arc2Scene1();
                }
            },
            {
                text: "Cada um seguir seu caminho",
                action: function() {
                    changeRelationship(0, 0, 2, 0);
                    arc2Scene1();
                }
            },
            {
                text: "Procurar um professor",
                action: function() {
                    game.sasah.loyalty += 1;
                    game.lucas.loyalty += 1;
                    arc2Scene1();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   ARCO 2
   OS SEGREDOS DA BIBLIOTECA
========================================================= */

function arc2Scene1() {
    game.chapter = 2;
    game.flags.library = true;

    renderScene(
        2,
        "Biblioteca",
        "ARCO II — OS SEGREDOS DA BIBLIOTECA",
        "Depois de alguns dias, os protagonistas encontram novamente o símbolo antigo.\n\n" +
        "Dessa vez ele aparece em um livro sobre criaturas mágicas raras.\n\n" +
        "Uma página descreve uma criatura chamada Lebrílope.",
        [
            {
                text: "Pesquisar sobre a Lebrílope",
                action: function() {
                    game.sasah.intelligence += 2;
                    game.lucas.intelligence += 1;
                    arc2Scene2();
                }
            },
            {
                text: "Pesquisar sobre magia antiga",
                action: function() {
                    game.lucas.intelligence += 2;
                    game.flags.ancientMagic = true;
                    arc2Scene2();
                }
            },
            {
                text: "Procurar uma passagem secreta",
                action: function() {
                    game.sasah.bravery += 1;
                    game.flags.secretPassage = true;
                    arc2Scene2();
                }
            }
        ],
        "both"
    );
}

function arc2Scene2() {
    renderScene(
        2,
        "Biblioteca",
        "O livro proibido",
        "Uma seção escondida da biblioteca contém informações sobre criaturas guardiãs.\n\n" +
        "A descrição é estranhamente específica:\n\n" +
        "\"Uma Lebrílope chamada Kiwi pode reconhecer magia antiga mesmo quando ela está adormecida.\"",
        [
            {
                text: "Procurar Kiwi",
                action: function() {
                    game.kiwi.trust += 1;
                    meetKiwi();
                }
            },
            {
                text: "Continuar pesquisando",
                action: function() {
                    game.sasah.intelligence += 2;
                    game.lucas.intelligence += 2;
                    meetKiwi();
                }
            },
            {
                text: "Esconder o livro",
                action: function() {
                    game.flags.ancientArtifact = true;
                    meetKiwi();
                }
            }
        ],
        "sasah"
    );
}


/* =========================================================
   KIWI
========================================================= */

function meetKiwi() {
    game.kiwi.met = true;

    renderScene(
        2,
        "Corredor subterrâneo",
        "Kiwi, a Lebrílope",
        "Um som de pequenos passos ecoa pelo corredor.\n\n" +
        "Uma criatura aparece atrás de uma armadura.\n\n" +
        "É uma Lebrílope de olhos atentos, extremamente ágil e com pequenas marcas luminosas pelo corpo.\n\n" +
        "Ela olha para os dois.\n\n" +
        "Uma pequena placa antiga revela seu nome:\n\n" +
        "KIWI.",
        [
            {
                text: "Aproximar-se devagar",
                action: function() {
                    game.kiwi.trust += 2;
                    game.kiwi.affection += 2;
                    game.sasah.empathy += 1;
                    arc2Kiwi2();
                }
            },
            {
                text: "Oferecer comida",
                action: function() {
                    game.kiwi.trust += 3;
                    game.kiwi.affection += 3;
                    game.kiwi.helped = true;
                    arc2Kiwi2();
                }
            },
            {
                text: "Usar magia para examiná-la",
                action: function() {
                    game.kiwi.trust -= 1;
                    game.sasah.magic += 1;
                    arc2Kiwi2();
                }
            }
        ],
        "both"
    );
}

function arc2Kiwi2() {
    renderScene(
        2,
        "Corredor subterrâneo",
        "A escolha de Kiwi",
        "Kiwi corre até uma parede e toca uma pedra.\n\n" +
        "Uma passagem secreta se abre.\n\n" +
        "A Lebrílope olha para os protagonistas como se estivesse perguntando:\n\n" +
        "\"Vocês vêm comigo?\"",
        [
            {
                text: "Seguir Kiwi",
                action: function() {
                    game.kiwi.followed = true;
                    game.kiwi.trust += 3;
                    game.flags.secretPassage = true;
                    arc2Kiwi3();
                }
            },
            {
                text: "Esperar Kiwi voltar",
                action: function() {
                    game.kiwi.trust += 1;
                    arc2Kiwi3();
                }
            },
            {
                text: "Explorar a passagem",
                action: function() {
                    game.sasah.intelligence += 1;
                    game.lucas.bravery += 1;
                    arc2Kiwi3();
                }
            }
        ],
        "lucas"
    );
}

function arc2Kiwi3() {
    renderScene(
        2,
        "Câmara esquecida",
        "O segredo de Kiwi",
        "No interior da passagem existe uma sala esquecida.\n\n" +
        "No centro há uma estátua de uma Lebrílope.\n\n" +
        "Kiwi toca a estátua.\n\n" +
        "Uma visão surge.\n\n" +
        "Há muitos anos, criaturas como Kiwi protegiam uma fonte de magia escondida sob Hogwarts.",
        [
            {
                text: "Confiar em Kiwi",
                action: function() {
                    game.kiwi.secret = true;
                    game.kiwi.trust += 3;
                    game.kiwi.affection += 3;
                    changeRelationship(2, 3, 0, 2);
                    arc2Ending();
                }
            },
            {
                text: "Investigar a estátua",
                action: function() {
                    game.sasah.intelligence += 2;
                    game.lucas.intelligence += 2;
                    arc2Ending();
                }
            },
            {
                text: "Tentar abrir o pedestal",
                action: function() {
                    game.sasah.magic += 1;
                    changeMana(game.sasah, -15);
                    arc2Ending();
                }
            }
        ],
        "both"
    );
}

function arc2Ending() {
    game.flags.professorMissing = true;

    renderScene(
        2,
        "Hogwarts",
        "Um desaparecimento",
        "Ao retornarem, descobrem que um professor desapareceu.\n\n" +
        "Kiwi fica inquieta e aponta para a Floresta Proibida.\n\n" +
        "O mistério está apenas começando.",
        [
            {
                text: "Seguir Kiwi",
                action: function() {
                    game.kiwi.trust += 2;
                    arc3Scene1();
                }
            },
            {
                text: "Avisar os professores",
                action: function() {
                    game.sasah.loyalty += 1;
                    game.lucas.loyalty += 1;
                    arc3Scene1();
                }
            },
            {
                text: "Investigar o professor",
                action: function() {
                    game.sasah.intelligence += 1;
                    game.lucas.intelligence += 1;
                    arc3Scene1();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   ARCO 3
   FLORESTA PROIBIDA
========================================================= */

function arc3Scene1() {
    game.chapter = 3;
    game.flags.forest = true;

    renderScene(
        3,
        "Floresta Proibida",
        "ARCO III — A FLORESTA PROIBIDA",
        "A noite chega.\n\n" +
        "Os protagonistas entram na Floresta Proibida acompanhados por Kiwi.\n\n" +
        "A Lebrílope parece conhecer caminhos que nenhum mapa mostra.",
        [
            {
                text: "Seguir Kiwi",
                action: function() {
                    game.kiwi.trust += 2;
                    game.kiwi.followed = true;
                    arc3Scene2();
                }
            },
            {
                text: "Escolher o próprio caminho",
                action: function() {
                    game.sasah.bravery += 1;
                    arc3Scene2();
                }
            },
            {
                text: "Deixar Kiwi liderar",
                action: function() {
                    game.kiwi.affection += 3;
                    arc3Scene2();
                }
            }
        ],
        "sasah"
    );
}

function arc3Scene2() {
    renderScene(
        3,
        "Floresta Proibida",
        "O predador",
        "Um rugido ecoa entre as árvores.\n\n" +
        "Kiwi congela.\n\n" +
        "Ela conhece aquela criatura.\n\n" +
        "Algo grande está caçando no escuro.",
        [
            {
                text: "Proteger Kiwi",
                action: function() {
                    game.kiwi.trust += 3;
                    game.kiwi.affection += 3;
                    game.kiwi.rescued = true;
                    game.sasah.bravery += 1;
                    game.lucas.loyalty += 1;
                    arc3Scene3();
                }
            },
            {
                text: "Mandar Kiwi se esconder",
                action: function() {
                    game.kiwi.trust += 1;
                    arc3Scene3();
                }
            },
            {
                text: "Enfrentar a criatura",
                action: function() {
                    game.sasah.bravery += 1;
                    game.lucas.bravery += 1;
                    changeHp(game.sasah, -15);
                    changeHp(game.lucas, -10);
                    arc3Scene3();
                }
            }
        ],
        "both"
    );
}

function arc3Scene3() {
    game.flags.lake = true;

    renderScene(
        3,
        "Lago Negro",
        "O professor desaparecido",
        "À margem do Lago Negro, os protagonistas encontram o professor desaparecido.\n\n" +
        "Ele está ferido.\n\n" +
        "Antes que possam ajudá-lo, a água começa a brilhar.\n\n" +
        "Kiwi observa o lago.",
        [
            {
                text: "Salvar o professor",
                action: function() {
                    game.sasah.loyalty += 1;
                    game.lucas.loyalty += 1;
                    changeRelationship(2, 2, 0, 1);
                    arc3Scene4();
                }
            },
            {
                text: "Seguir o sinal de Kiwi",
                action: function() {
                    game.kiwi.trust += 3;
                    arc3Scene4();
                }
            },
            {
                text: "Investigar o lago",
                action: function() {
                    game.sasah.intelligence += 2;
                    arc3Scene4();
                }
            }
        ],
        "lucas"
    );
}

function arc3Scene4() {
    game.flags.guardian = true;

    renderScene(
        3,
        "Templo submerso",
        "A guardiã",
        "No fundo do lago existe um templo.\n\n" +
        "Uma estátua de Lebrílope desperta.\n\n" +
        "Uma voz antiga ecoa:\n\n" +
        "\"A última guardiã retornou.\"",
        [
            {
                text: "Proteger Kiwi",
                action: function() {
                    game.kiwi.finalAlly = true;
                    game.kiwi.trust += 4;
                    game.kiwi.affection += 4;
                    arc3Ending();
                }
            },
            {
                text: "Descobrir a verdade",
                action: function() {
                    game.kiwi.secret = true;
                    game.sasah.intelligence += 2;
                    game.lucas.intelligence += 2;
                    arc3Ending();
                }
            },
            {
                text: "Usar magia na estátua",
                action: function() {
                    game.sasah.magic += 2;
                    game.lucas.magic += 1;
                    changeMana(game.sasah, -20);
                    arc3Ending();
                }
            }
        ],
        "both"
    );
}

function arc3Ending() {
    renderScene(
        3,
        "Floresta Proibida",
        "Uma nova companheira",
        "Kiwi decide acompanhar os protagonistas.\n\n" +
        "Ela não é apenas uma criatura mágica.\n\n" +
        "Ela sabe que alguma coisa terrível está despertando sob Hogwarts.",
        [
            {
                text: "Prometer proteger Kiwi",
                action: function() {
                    game.kiwi.trust += 3;
                    game.kiwi.affection += 3;
                    arc4Scene1();
                }
            },
            {
                text: "Perguntar o que ela sabe",
                action: function() {
                    game.kiwi.secret = true;
                    arc4Scene1();
                }
            },
            {
                text: "Preparar-se para o próximo mistério",
                action: function() {
                    arc4Scene1();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   ARCO 4
   DUELOS E CASAS
========================================================= */

function arc4Scene1() {
    game.chapter = 4;
    game.flags.tournament = true;

    renderScene(
        4,
        "Campo de Duelos",
        "ARCO IV — O TORNEIO DAS CASAS",
        "Hogwarts anuncia um grande torneio entre as casas.\n\n" +
        "Os protagonistas precisam participar.\n\n" +
        "Mas alguém está usando o torneio para observar suas habilidades mágicas.",
        [
            {
                text: "Entrar no torneio",
                action: function() {
                    game.sasah.bravery += 1;
                    game.lucas.magic += 1;
                    arc4Scene2();
                }
            },
            {
                text: "Investigar quem está observando",
                action: function() {
                    game.sasah.intelligence += 2;
                    arc4Scene2();
                }
            },
            {
                text: "Recusar o torneio",
                action: function() {
                    game.sasah.loyalty += 1;
                    game.lucas.loyalty += 1;
                    arc4Scene2();
                }
            }
        ],
        "both"
    );
}

function arc4Scene2() {
    renderScene(
        4,
        "Arena",
        "O duelo",
        game.sasah.name +
        " entra na arena.\n\n" +
        "O adversário lança um feitiço poderoso.\n\n" +
        "A plateia grita.\n\n" +
        "Kiwi observa atentamente.",
        [
            {
                text: "Atacar",
                action: function() {
                    game.sasah.bravery += 2;
                    game.sasah.magic += 1;
                    arc4Scene3();
                }
            },
            {
                text: "Usar estratégia",
                action: function() {
                    game.sasah.intelligence += 2;
                    arc4Scene3();
                }
            },
            {
                text: "Poupar o adversário",
                action: function() {
                    game.sasah.empathy += 2;
                    game.kiwi.affection += 1;
                    arc4Scene3();
                }
            }
        ],
        "sasah"
    );
}

function arc4Scene3() {
    renderScene(
        4,
        "Arena",
        "A vez do Jogador 2",
        game.lucas.name +
        " precisa entrar na arena.\n\n" +
        "Mas seu adversário parece conhecer exatamente os pontos fracos dele.",
        [
            {
                text: "Lutar com força",
                action: function() {
                    game.lucas.bravery += 2;
                    arc4Scene4();
                }
            },
            {
                text: "Usar inteligência",
                action: function() {
                    game.lucas.intelligence += 2;
                    arc4Scene4();
                }
            },
            {
                text: "Tentar conversar",
                action: function() {
                    game.lucas.empathy += 2;
                    changeRelationship(1, 1, 0, 2);
                    arc4Scene4();
                }
            }
        ],
        "lucas"
    );
}

function arc4Scene4() {
    renderScene(
        4,
        "Arena",
        "Kiwi interfere",
        "Uma energia estranha surge na arena.\n\n" +
        "Kiwi percebe o perigo antes de todos.\n\n" +
        "Ela salta para dentro do campo e interrompe o duelo.",
        [
            {
                text: "Confiar em Kiwi",
                action: function() {
                    game.kiwi.trust += 3;
                    game.kiwi.affection += 3;
                    arc5Scene1();
                }
            },
            {
                text: "Tirar Kiwi da arena",
                action: function() {
                    game.kiwi.trust += 1;
                    arc5Scene1();
                }
            },
            {
                text: "Investigar a energia",
                action: function() {
                    game.sasah.intelligence += 1;
                    game.lucas.intelligence += 1;
                    arc5Scene1();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   ARCO 5
   O ESPELHO
========================================================= */

function arc5Scene1() {
    game.chapter = 5;
    game.flags.mirror = true;

    renderScene(
        5,
        "Ala abandonada",
        "ARCO V — O ESPELHO DAS POSSIBILIDADES",
        "Uma porta que nunca existiu antes aparece em Hogwarts.\n\n" +
        "Atrás dela existe um enorme espelho.\n\n" +
        "O reflexo de cada protagonista mostra uma versão diferente de seu futuro.",
        [
            {
                text: "Olhar o próprio futuro",
                action: function() {
                    game.sasah.intelligence += 1;
                    arc5Scene2();
                }
            },
            {
                text: "Impedir o outro de olhar",
                action: function() {
                    changeRelationship(-1, -1, 2, -1);
                    arc5Scene2();
                }
            },
            {
                text: "Olhar juntos",
                action: function() {
                    changeRelationship(3, 3, 0, 3);
                    arc5Scene2();
                }
            }
        ],
        "both"
    );
}

function arc5Scene2() {
    renderScene(
        5,
        "Sala do Espelho",
        "O medo de cada um",
        game.sasah.name +
        " vê uma vida onde está sozinho.\n\n" +
        game.lucas.name +
        " vê Hogwarts sendo destruída.\n\n" +
        "Kiwi vê apenas uma floresta vazia.",
        [
            {
                text: "Ajudar o outro protagonista",
                action: function() {
                    changeRelationship(3, 4, 0, 3);
                    game.sasah.empathy += 1;
                    game.lucas.empathy += 1;
                    arc5Scene3();
                }
            },
            {
                text: "Enfrentar o próprio medo",
                action: function() {
                    game.sasah.bravery += 1;
                    game.lucas.bravery += 1;
                    arc5Scene3();
                }
            },
            {
                text: "Perguntar a Kiwi o que ela viu",
                action: function() {
                    game.kiwi.trust += 2;
                    game.kiwi.secret = true;
                    arc5Scene3();
                }
            }
        ],
        "both"
    );
}

function arc5Scene3() {
    renderScene(
        5,
        "Sala do Espelho",
        "A verdade escondida",
        "Kiwi finalmente revela parte de seu segredo.\n\n" +
        "Sua família protege a magia antiga há séculos.\n\n" +
        "Mas existe alguém tentando capturar essa magia.",
        [
            {
                text: "Prometer ajudar Kiwi",
                action: function() {
                    game.kiwi.trust += 4;
                    game.kiwi.affection += 4;
                    arc6Scene1();
                }
            },
            {
                text: "Perguntar quem está por trás disso",
                action: function() {
                    game.sasah.intelligence += 2;
                    game.lucas.intelligence += 1;
                    arc6Scene1();
                }
            },
            {
                text: "Manter o segredo",
                action: function() {
                    game.kiwi.trust += 2;
                    arc6Scene1();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   ARCO 6
   AS CATACUMBAS
========================================================= */

function arc6Scene1() {
    game.chapter = 6;

    renderScene(
        6,
        "Catacumbas de Hogwarts",
        "ARCO VI — AS CATACUMBAS",
        "Uma escadaria escondida leva para baixo do castelo.\n\n" +
        "Os símbolos encontrados desde o início da aventura aparecem nas paredes.",
        [
            {
                text: "Descer",
                action: function() {
                    game.sasah.bravery += 1;
                    arc6Scene2();
                }
            },
            {
                text: "Estudar os símbolos",
                action: function() {
                    game.sasah.intelligence += 2;
                    arc6Scene2();
                }
            },
            {
                text: "Mandar Kiwi procurar o caminho",
                action: function() {
                    game.kiwi.trust += 2;
                    arc6Scene2();
                }
            }
        ],
        "sasah"
    );
}

function arc6Scene2() {
    renderScene(
        6,
        "Catacumbas",
        "O labirinto",
        game.lucas.name +
        " percebe que o caminho se divide em três.\n\n" +
        "Um leva ao perigo.\n" +
        "Outro leva a uma sala desconhecida.\n" +
        "O terceiro parece levar diretamente para fora.",
        [
            {
                text: "Escolher o caminho perigoso",
                action: function() {
                    game.lucas.bravery += 2;
                    changeHp(game.lucas, -10);
                    arc6Scene3();
                }
            },
            {
                text: "Escolher a sala desconhecida",
                action: function() {
                    game.lucas.intelligence += 2;
                    arc6Scene3();
                }
            },
            {
                text: "Voltar",
                action: function() {
                    game.lucas.loyalty += 1;
                    arc6Scene3();
                }
            }
        ],
        "lucas"
    );
}

function arc6Scene3() {
    renderScene(
        6,
        "Catacumbas",
        "A criatura de pedra",
        "Uma criatura feita de pedra desperta.\n\n" +
        "Kiwi reconhece o símbolo em seu peito.\n\n" +
        "Ela sabe como acalmá-la.",
        [
            {
                text: "Deixar Kiwi agir",
                action: function() {
                    game.kiwi.trust += 3;
                    game.kiwi.affection += 2;
                    arc6Ending();
                }
            },
            {
                text: "Ajudar Kiwi",
                action: function() {
                    game.sasah.empathy += 1;
                    game.lucas.loyalty += 1;
                    game.kiwi.trust += 2;
                    arc6Ending();
                }
            },
            {
                text: "Atacar a criatura",
                action: function() {
                    game.sasah.bravery += 1;
                    game.lucas.bravery += 1;
                    changeHp(game.sasah, -15);
                    arc6Ending();
                }
            }
        ],
        "both"
    );
}

function arc6Ending() {
    renderScene(
        6,
        "Catacumbas",
        "O mapa perdido",
        "Depois que a criatura desaparece, um mapa mágico surge no chão.\n\n" +
        "Ele mostra uma enorme câmara abaixo de Hogwarts.\n\n" +
        "É o lugar onde tudo começou.",
        [
            {
                text: "Guardar o mapa",
                action: function() {
                    game.flags.ancientArtifact = true;
                    arc7Scene1();
                }
            },
            {
                text: "Estudar o mapa",
                action: function() {
                    game.sasah.intelligence += 2;
                    arc7Scene1();
                }
            },
            {
                text: "Deixar Kiwi escolher",
                action: function() {
                    game.kiwi.trust += 2;
                    arc7Scene1();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   ARCO 7
   O PROFESSOR
========================================================= */

function arc7Scene1() {
    game.chapter = 7;

    renderScene(
        7,
        "Sala dos Professores",
        "ARCO VII — O PROFESSOR",
        "As pistas apontam para alguém dentro de Hogwarts.\n\n" +
        "Os protagonistas descobrem que uma pessoa da escola conhece a existência de Kiwi.",
        [
            {
                text: "Investigar discretamente",
                action: function() {
                    game.sasah.intelligence += 1;
                    arc7Scene2();
                }
            },
            {
                text: "Confrontar a pessoa",
                action: function() {
                    game.sasah.bravery += 1;
                    arc7Scene2();
                }
            },
            {
                text: "Contar aos professores",
                action: function() {
                    game.sasah.loyalty += 1;
                    arc7Scene2();
                }
            }
        ],
        "sasah"
    );
}

function arc7Scene2() {
    renderScene(
        7,
        "Torre",
        "A descoberta",
        "O professor revela que a magia antiga não é necessariamente maligna.\n\n" +
        "Ela apenas amplifica aquilo que existe dentro de quem a utiliza.",
        [
            {
                text: "Perguntar sobre Kiwi",
                action: function() {
                    game.kiwi.secret = true;
                    arc7Scene3();
                }
            },
            {
                text: "Perguntar sobre o inimigo",
                action: function() {
                    game.sasah.intelligence += 2;
                    arc7Scene3();
                }
            },
            {
                text: "Perguntar sobre a Câmara",
                action: function() {
                    game.lucas.intelligence += 2;
                    arc7Scene3();
                }
            }
        ],
        "both"
    );
}

function arc7Scene3() {
    renderScene(
        7,
        "Torre",
        "Uma escolha perigosa",
        "O professor oferece aos protagonistas a possibilidade de abandonar a investigação.\n\n" +
        "Se continuarem, poderão descobrir algo que Hogwarts tentou esconder durante séculos.",
        [
            {
                text: "Continuar",
                action: function() {
                    game.sasah.bravery += 1;
                    game.lucas.bravery += 1;
                    arc8Scene1();
                }
            },
            {
                text: "Parar a investigação",
                action: function() {
                    game.sasah.loyalty += 1;
                    game.lucas.loyalty += 1;
                    arc8Scene1();
                }
            },
            {
                text: "Deixar Kiwi decidir",
                action: function() {
                    game.kiwi.trust += 3;
                    arc8Scene1();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   ARCO 8
   A GUERRA DAS SOMBRAS
========================================================= */

function arc8Scene1() {
    game.chapter = 8;
    game.flags.invasion = true;

    renderScene(
        8,
        "Hogwarts",
        "ARCO VIII — A GUERRA DAS SOMBRAS",
        "As barreiras de Hogwarts começam a ruir.\n\n" +
        "Uma invasão começou.\n\n" +
        "Os alunos correm pelos corredores enquanto professores tentam proteger o castelo.",
        [
            {
                text: "Defender Hogwarts",
                action: function() {
                    game.sasah.bravery += 2;
                    game.lucas.bravery += 2;
                    arc8Scene2();
                }
            },
            {
                text: "Proteger os alunos",
                action: function() {
                    game.sasah.loyalty += 2;
                    game.lucas.loyalty += 2;
                    arc8Scene2();
                }
            },
            {
                text: "Procurar o invasor",
                action: function() {
                    game.sasah.intelligence += 1;
                    game.lucas.intelligence += 1;
                    arc8Scene2();
                }
            }
        ],
        "both"
    );
}

function arc8Scene2() {
    renderScene(
        8,
        "Pátio",
        "A batalha",
        "Os protagonistas estão cercados.\n\n" +
        "Kiwi corre para o centro do pátio.\n\n" +
        "Uma enorme aura luminosa surge ao redor dela.",
        [
            {
                text: "Lutar ao lado de Kiwi",
                action: function() {
                    game.kiwi.finalAlly = true;
                    game.kiwi.trust += 3;
                    game.kiwi.affection += 3;
                    arc8Scene3();
                }
            },
            {
                text: "Proteger Kiwi",
                action: function() {
                    game.kiwi.trust += 4;
                    game.kiwi.affection += 4;
                    arc8Scene3();
                }
            },
            {
                text: "Usar magia máxima",
                action: function() {
                    game.sasah.magic += 2;
                    game.lucas.magic += 2;
                    changeMana(game.sasah, -30);
                    changeMana(game.lucas, -30);
                    arc8Scene3();
                }
            }
        ],
        "both"
    );
}

function arc8Scene3() {
    game.flags.betrayal = true;

    renderScene(
        8,
        "Torre destruída",
        "A máscara cai",
        "O responsável pela invasão aparece.\n\n" +
        "Ele conhece Kiwi.\n\n" +
        "E sabe que ela é a chave para abrir a Câmara da Magia Antiga.",
        [
            {
                text: "Não entregar Kiwi",
                action: function() {
                    game.kiwi.trust += 5;
                    changeRelationship(3, 4, 0, 3);
                    arc9Scene1();
                }
            },
            {
                text: "Mandar Kiwi fugir",
                action: function() {
                    game.kiwi.trust += 2;
                    arc9Scene1();
                }
            },
            {
                text: "Tentar negociar",
                action: function() {
                    game.sasah.intelligence += 1;
                    game.lucas.intelligence += 1;
                    arc9Scene1();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   ARCO 9
   A CÂMARA DA MAGIA
========================================================= */

function arc9Scene1() {
    game.chapter = 9;

    renderScene(
        9,
        "Subterrâneo de Hogwarts",
        "ARCO IX — A CÂMARA DA MAGIA",
        "O caminho até a Câmara finalmente foi encontrado.\n\n" +
        "Kiwi está cada vez mais silenciosa.\n\n" +
        "Ela sabe que o momento decisivo está chegando.",
        [
            {
                text: "Seguir Kiwi",
                action: function() {
                    game.kiwi.trust += 3;
                    arc9Scene2();
                }
            },
            {
                text: "Estudar os símbolos",
                action: function() {
                    game.sasah.intelligence += 2;
                    arc9Scene2();
                }
            },
            {
                text: "Preparar os feitiços",
                action: function() {
                    game.sasah.magic += 1;
                    game.lucas.magic += 1;
                    arc9Scene2();
                }
            }
        ],
        "both"
    );
}

function arc9Scene2() {
    renderScene(
        9,
        "Câmara da Magia",
        "O núcleo",
        "Um enorme núcleo de energia flutua no centro da Câmara.\n\n" +
        "Kiwi se aproxima.\n\n" +
        "A magia reage imediatamente.",
        [
            {
                text: "Deixar Kiwi tocar o núcleo",
                action: function() {
                    game.kiwi.secret = true;
                    game.kiwi.trust += 4;
                    game.kiwi.affection += 4;
                    arc9Scene3();
                }
            },
            {
                text: "Estudar o núcleo",
                action: function() {
                    game.sasah.intelligence += 2;
                    game.lucas.intelligence += 2;
                    arc9Scene3();
                }
            },
            {
                text: "Tentar destruir o núcleo",
                action: function() {
                    game.sasah.magic += 2;
                    game.lucas.magic += 2;
                    changeMana(game.sasah, -25);
                    arc9Scene3();
                }
            }
        ],
        "both"
    );
}

function arc9Scene3() {
    renderScene(
        9,
        "Câmara da Magia",
        "O verdadeiro inimigo",
        "O inimigo finalmente aparece.\n\n" +
        "Ele não quer simplesmente controlar a magia.\n\n" +
        "Quer apagar todas as criaturas mágicas que não puder controlar.\n\n" +
        "Kiwi está em perigo.",
        [
            {
                text: "Proteger Kiwi",
                action: function() {
                    game.kiwi.finalAlly = true;
                    game.kiwi.trust += 5;
                    game.kiwi.affection += 5;
                    arc10Scene1();
                }
            },
            {
                text: "Atacar o inimigo",
                action: function() {
                    game.sasah.bravery += 2;
                    game.lucas.bravery += 2;
                    arc10Scene1();
                }
            },
            {
                text: "Tentar convencê-lo",
                action: function() {
                    game.sasah.empathy += 1;
                    game.lucas.empathy += 1;
                    arc10Scene1();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   ARCO 10
   O ÚLTIMO FEITIÇO
========================================================= */

function arc10Scene1() {
    game.chapter = 10;
    game.flags.finalChamber = true;

    renderScene(
        10,
        "Câmara da Magia Antiga",
        "ARCO X — O ÚLTIMO FEITIÇO",
        "Tudo o que aconteceu desde a chegada a Hogwarts levou a este momento.\n\n" +
        "O núcleo está instável.\n\n" +
        "A batalha final começou.",
        [
            {
                text: "Lutar juntos",
                action: function() {
                    changeRelationship(4, 4, 0, 4);
                    game.sasah.magic += 2;
                    game.lucas.magic += 2;
                    arc10Scene2();
                }
            },
            {
                text: "Deixar cada protagonista lutar de um lado",
                action: function() {
                    game.sasah.bravery += 1;
                    game.lucas.bravery += 1;
                    arc10Scene2();
                }
            },
            {
                text: "Confiar em Kiwi",
                action: function() {
                    game.kiwi.finalAlly = true;
                    game.kiwi.trust += 5;
                    game.kiwi.affection += 5;
                    arc10Scene2();
                }
            }
        ],
        "both"
    );
}

function arc10Scene2() {
    renderScene(
        10,
        "Câmara da Magia Antiga",
        "A última batalha",
        game.sasah.name +
        " e " +
        game.lucas.name +
        " estão diante do inimigo.\n\n" +
        "Kiwi permanece entre eles.\n\n" +
        "O núcleo começa a quebrar.",
        [
            {
                text: "Usar toda a magia",
                action: function() {
                    game.sasah.magic += 3;
                    game.lucas.magic += 3;
                    changeMana(game.sasah, -40);
                    changeMana(game.lucas, -40);
                    arc10Final();
                }
            },
            {
                text: "Confiar completamente em Kiwi",
                action: function() {
                    game.kiwi.finalAlly = true;
                    game.kiwi.trust += 6;
                    game.kiwi.affection += 6;
                    arc10Final();
                }
            },
            {
                text: "Combinar magia e amizade",
                action: function() {
                    changeRelationship(5, 5, 0, 5);
                    game.sasah.magic += 2;
                    game.lucas.magic += 2;
                    arc10Final();
                }
            }
        ],
        "both"
    );
}

function arc10Final() {
    game.flags.finalBattle = true;

    var strongKiwi =
        game.kiwi.trust >= 12 &&
        game.kiwi.affection >= 12;

    var strongRelationship =
        game.relationship.friendship >= 12 &&
        game.relationship.trust >= 12;

    renderScene(
        10,
        "Câmara da Magia Antiga",
        "A decisão final",
        "A magia antiga está prestes a destruir a Câmara.\n\n" +
        "Tudo depende da última escolha.\n\n" +
        "Kiwi olha para os dois protagonistas.\n\n" +
        "Pela primeira vez, ela parece compreender perfeitamente o que eles dizem.",
        [
            {
                text: "Salvar Kiwi e selar a magia",
                action: function() {

                    if (strongKiwi) {
                        endingKiwi();
                    } else if (strongRelationship) {
                        endingTogether();
                    } else {
                        endingHeroic();
                    }

                }
            },
            {
                text: "Destruir a magia antiga",
                action: function() {
                    endingFreedom();
                }
            },
            {
                text: "Deixar Kiwi decidir",
                action: function() {

                    if (strongKiwi) {
                        endingKiwi();
                    } else {
                        endingKiwiEscape();
                    }

                }
            }
        ],
        "both"
    );
}


/* =========================================================
   FINAIS
========================================================= */

function endingKiwi() {
    renderScene(
        10,
        "Hogwarts",
        "FINAL — KIWI, A GUARDIÃ",
        "Kiwi toca o núcleo.\n\n" +
        "Uma enorme onda de luz atravessa Hogwarts.\n\n" +
        "As barreiras do castelo são restauradas.\n\n" +
        "O inimigo desaparece.\n\n" +
        "Kiwi retorna para os protagonistas.\n\n" +
        "Ela continua pequena, curiosa e brincalhona.\n\n" +
        "Mas agora todos sabem sua verdadeira importância.\n\n" +
        "Kiwi se tornou a nova guardiã da magia antiga de Hogwarts.\n\n" +
        game.sasah.name +
        " e " +
        game.lucas.name +
        " são seus companheiros.",
        [
            {
                text: "Continuar para o epílogo",
                action: function() {
                    epilogue();
                }
            }
        ],
        "both"
    );
}

function endingTogether() {
    renderScene(
        10,
        "Hogwarts",
        "FINAL — JUNTOS",
        game.sasah.name +
        " e " +
        game.lucas.name +
        " combinam suas forças.\n\n" +
        "A magia é selada.\n\n" +
        "Kiwi corre para junto dos dois.\n\n" +
        "A amizade construída durante toda a aventura se transforma em uma das maiores histórias de Hogwarts.",
        [
            {
                text: "Continuar para o epílogo",
                action: function() {
                    epilogue();
                }
            }
        ],
        "both"
    );
}

function endingHeroic() {
    renderScene(
        10,
        "Hogwarts",
        "FINAL — O PREÇO DA CORAGEM",
        "A batalha termina.\n\n" +
        "Hogwarts sobrevive, mas os protagonistas jamais serão os mesmos.\n\n" +
        "Kiwi permanece ao lado deles.\n\n" +
        "A pequena Lebrílope observa o castelo e parece saber que uma nova aventura virá.",
        [
            {
                text: "Continuar para o epílogo",
                action: function() {
                    epilogue();
                }
            }
        ],
        "both"
    );
}

function endingFreedom() {
    renderScene(
        10,
        "Câmara destruída",
        "FINAL — LIBERDADE",
        "A magia antiga é destruída.\n\n" +
        "A Câmara começa a desmoronar.\n\n" +
        "Os protagonistas conseguem escapar com Kiwi.\n\n" +
        "A Lebrílope finalmente está livre de seu antigo destino.",
        [
            {
                text: "Continuar para o epílogo",
                action: function() {
                    epilogue();
                }
            }
        ],
        "both"
    );
}

function endingKiwiEscape() {
    renderScene(
        10,
        "Floresta Proibida",
        "FINAL — O CAMINHO DE KIWI",
        "Kiwi escolhe seu próprio caminho.\n\n" +
        "Ela desaparece entre as árvores.\n\n" +
        "Antes de partir, olha para os protagonistas uma última vez.\n\n" +
        "Os dois sabem que a pequena Lebrílope continuará observando Hogwarts.",
        [
            {
                text: "Continuar para o epílogo",
                action: function() {
                    epilogue();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   EPÍLOGO
========================================================= */

function epilogue() {
    game.phase = "postgame";

    renderScene(
        11,
        "Hogwarts",
        "EPÍLOGO — O COMEÇO DE UMA NOVA ERA",
        "Os acontecimentos se tornam uma lenda entre os alunos.\n\n" +
        game.sasah.name +
        " e " +
        game.lucas.name +
        " retornam à rotina.\n\n" +
        "Mas Hogwarts nunca mais parece a mesma.\n\n" +
        "Às vezes, pequenas pegadas aparecem perto das torres.\n\n" +
        "Objetos desaparecem das mesas.\n\n" +
        "Uma sombra passa pelas janelas.\n\n" +
        "E, em algum lugar da Floresta Proibida, uma pequena Lebrílope observa o castelo.\n\n" +
        "Kiwi ainda está por perto.\n\n" +
        "A aventura terminou.\n\n" +
        "Mas Hogwarts guarda muitos outros mistérios.",
        [
            {
                text: "Jogar novamente",
                action: function() {
                    resetGame();
                }
            }
        ],
        "both"
    );
}


/* =========================================================
   SALVAR / CARREGAR
========================================================= */

function saveGame() {
    try {
        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(game)
        );

        addLog("Jogo salvo com sucesso.");
    } catch (error) {
        console.error(error);
        addLog("Erro ao salvar o jogo.");
    }
}

function loadGame() {
    try {
        var saved =
            localStorage.getItem(SAVE_KEY);

        if (!saved) {
            addLog(
                "Nenhum jogo salvo encontrado."
            );
            return;
        }

        game = JSON.parse(saved);

        updateCharacterUI();
        updateLog();

        if (game.phase === "names") {
            startNameScreen();
        } else if (game.phase === "sorting") {
            startHouseSelection("sasah");
        } else if (
            game.phase === "postgame"
        ) {
            epilogue();
        } else {
            resumeGame();
        }

        addLog("Jogo carregado.");
    } catch (error) {
        console.error(error);
        addLog("Erro ao carregar o jogo.");
    }
}

function resumeGame() {
    if (game.chapter <= 1) {
        arc1Scene1();
    } else if (game.chapter === 2) {
        arc2Scene1();
    } else if (game.chapter === 3) {
        arc3Scene1();
    } else if (game.chapter === 4) {
        arc4Scene1();
    } else if (game.chapter === 5) {
        arc5Scene1();
    } else if (game.chapter === 6) {
        arc6Scene1();
    } else if (game.chapter === 7) {
        arc7Scene1();
    } else if (game.chapter === 8) {
        arc8Scene1();
    } else if (game.chapter === 9) {
        arc9Scene1();
    } else if (game.chapter === 10) {
        arc10Scene1();
    } else {
        startNameScreen();
    }
}


/* =========================================================
   RESET
========================================================= */

function resetGame() {
    game = {
        phase: "names",
        chapter: 0,
        scene: 0,
        turnMode: "both",

        sasah: {
            name: "Sasah",
            house: "—",
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
            magic: 0
        },

        lucas: {
            name: "Lucas",
            house: "—",
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
            magic: 0
        },

        relationship: {
            friendship: 0,
            trust: 0,
            rivalry: 0,
            affinity: 0
        },

        kiwi: {
            met: false,
            trust: 0,
            affection: 0,
            helped: false,
            rescued: false,
            followed: false,
            secret: false,
            injured: false,
            finalAlly: false
        },

        flags: {
            library: false,
            secretPassage: false,
            ancientArtifact: false,
            professorMissing: false,
            forest: false,
            lake: false,
            guardian: false,
            tournament: false,
            mirror: false,
            betrayal: false,
            invasion: false,
            ancientMagic: false,
            finalBattle: false,
            finalChamber: false
        },

        houseAnswers: {
            sasah: [],
            lucas: []
        },

        log: []
    };

    currentSceneData = null;

    startNameScreen();
}


/* =========================================================
   CONTROLES
========================================================= */

function setupControls() {
    var saveButton =
        document.getElementById("saveButton");

    var loadButton =
        document.getElementById("loadButton");

    var restartButton =
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
            function() {

                var confirmRestart =
                    window.confirm(
                        "Tem certeza que deseja reiniciar toda a aventura?"
                    );

                if (confirmRestart) {
                    localStorage.removeItem(
                        SAVE_KEY
                    );

                    resetGame();
                }
            }
        );
    }
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupControls();

        updateCharacterUI();
        updateLog();

        startNameScreen();
    }
);

