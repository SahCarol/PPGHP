/* =========================================================
   HOGWARTS RPG — SCRIPT PRINCIPAL
   Versão corrigida
   ========================================================= */

var SAVE_KEY = "hogwarts_rpg_v9";

/* =========================================================
   ESTADO PADRÃO DO JOGO
   ========================================================= */

function createDefaultGame() {
    return {
        phase: "names",
        chapter: 0,
        scene: 0,
        sceneId: "",
        turnMode: "both",

        sasah: {
            name: "Sasah",
            house: "—",

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
            magic: 0,

            inventory: [],
            spells: []
        },

        lucas: {
            name: "Lucas",
            house: "—",

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
            magic: 0,

            inventory: [],
            spells: []
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
            finalChamber: false,

            firstMeeting: false,
            trainMystery: false,
            castleMystery: false,
            bookFound: false,
            forbiddenRoom: false,
            professorClue: false,
            shadowCreature: false,
            kiwiSecret: false,
            lakeArtifact: false,
            mirrorBroken: false,
            societyDiscovered: false,
            undergroundDiscovered: false,
            finalSeal: false
        },

        houseAnswers: {
            sasah: [],
            lucas: []
        },

        log: []
    };
}

var game = createDefaultGame();

var currentSceneData = null;


/* =========================================================
   UTILIDADES
   ========================================================= */

function getElement(id) {
    return document.getElementById(id);
}

function setText(id, text) {
    var element = getElement(id);

    if (element) {
        element.textContent = text;
    }
}

function setWidth(id, value) {
    var element = getElement(id);

    if (!element) {
        return;
    }

    var number = Number(value);

    if (isNaN(number)) {
        number = 0;
    }

    number = Math.max(0, Math.min(100, number));

    element.style.width = number + "%";
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function addLog(text) {
    if (!game.log) {
        game.log = [];
    }

    game.log.push(String(text));

    if (game.log.length > 100) {
        game.log.shift();
    }

    updateLog();
}

function updateLog() {
    var log = getElement("log");

    if (!log) {
        return;
    }

    log.innerHTML = "";

    for (var i = 0; i < game.log.length; i++) {
        var paragraph = document.createElement("p");

        paragraph.textContent = game.log[i];

        log.appendChild(paragraph);
    }

    log.scrollTop = log.scrollHeight;
}


/* =========================================================
   FORMATAÇÃO DE TEXTO
   ========================================================= */

function replaceNames(text) {
    var result = String(text);

    result = result.replace(/\{P1\}/g, game.sasah.name);
    result = result.replace(/\{P2\}/g, game.lucas.name);
    result = result.replace(/\{KIWI\}/g, "Kiwi");

    return result;
}

function renderNarrative(title, text) {
    var scene = getElement("scene");

    if (!scene) {
        return;
    }

    scene.innerHTML = "";

    var heading = document.createElement("h2");

    heading.className = "story-title";
    heading.textContent = replaceNames(title);

    scene.appendChild(heading);

    var paragraphs = String(text)
        .split(/\n\s*\n/);

    for (var i = 0; i < paragraphs.length; i++) {
        var content = paragraphs[i].trim();

        if (!content) {
            continue;
        }

        var paragraph = document.createElement("p");

        paragraph.textContent = replaceNames(content);

        scene.appendChild(paragraph);
    }
}


/* =========================================================
   INTERFACE DOS PERSONAGENS
   ========================================================= */

function updateCharacterUI() {
    if (!game.sasah) {
        return;
    }

    if (!game.lucas) {
        return;
    }

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

    setText(
        "sasahXpText",
        String(game.sasah.xp)
    );

    setText(
        "lucasXpText",
        String(game.lucas.xp)
    );

    setWidth(
        "sasahHp",
        game.sasah.hp /
        game.sasah.maxHp *
        100
    );

    setWidth(
        "lucasHp",
        game.lucas.hp /
        game.lucas.maxHp *
        100
    );

    setWidth(
        "sasahMana",
        game.sasah.mana /
        game.sasah.maxMana *
        100
    );

    setWidth(
        "lucasMana",
        game.lucas.mana /
        game.lucas.maxMana *
        100
    );

    setWidth(
        "sasahXp",
        game.sasah.xp
    );

    setWidth(
        "lucasXp",
        game.lucas.xp
    );

    setText(
        "sasahBravery",
        String(game.sasah.bravery)
    );

    setText(
        "sasahLoyalty",
        String(game.sasah.loyalty)
    );

    setText(
        "sasahIntelligence",
        String(game.sasah.intelligence)
    );

    setText(
        "sasahAmbition",
        String(game.sasah.ambition)
    );

    setText(
        "sasahEmpathy",
        String(game.sasah.empathy)
    );

    setText(
        "sasahMagic",
        String(game.sasah.magic)
    );

    setText(
        "lucasBravery",
        String(game.lucas.bravery)
    );

    setText(
        "lucasLoyalty",
        String(game.lucas.loyalty)
    );

    setText(
        "lucasIntelligence",
        String(game.lucas.intelligence)
    );

    setText(
        "lucasAmbition",
        String(game.lucas.ambition)
    );

    setText(
        "lucasEmpathy",
        String(game.lucas.empathy)
    );

    setText(
        "lucasMagic",
        String(game.lucas.magic)
    );

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


/* =========================================================
   INDICADOR DE TURNO
   ========================================================= */

function updateTurnIndicator() {
    var tag = getElement("playerTag");

    if (!tag) {
        return;
    }

    if (game.turnMode === "sasah") {
        tag.textContent =
            "✦ Vez de " +
            game.sasah.name;
    } else if (game.turnMode === "lucas") {
        tag.textContent =
            "✦ Vez de " +
            game.lucas.name;
    } else {
        tag.textContent =
            "✦ Decisão conjunta";
    }

    document.body.classList.remove(
        "turn-player-one",
        "turn-player-two",
        "turn-both"
    );

    if (game.turnMode === "sasah") {
        document.body.classList.add(
            "turn-player-one"
        );
    } else if (game.turnMode === "lucas") {
        document.body.classList.add(
            "turn-player-two"
        );
    } else {
        document.body.classList.add(
            "turn-both"
        );
    }
}


/* =========================================================
   ATRIBUTOS
   ========================================================= */

function changeHp(character, amount) {
    character.hp = clamp(
        character.hp + amount,
        0,
        character.maxHp
    );

    updateCharacterUI();
}

function changeMana(character, amount) {
    character.mana = clamp(
        character.mana + amount,
        0,
        character.maxMana
    );

    updateCharacterUI();
}

function gainXp(character, amount) {
    if (!amount) {
        return;
    }

    character.xp += amount;

    while (character.xp >= 100) {
        character.xp -= 100;

        character.level += 1;
        character.magic += 1;

        character.maxMana += 5;
        character.mana = character.maxMana;

        character.maxHp += 5;
        character.hp = character.maxHp;

        addLog(
            character.name +
            " alcançou o nível " +
            character.level +
            "."
        );
    }

    updateCharacterUI();
}

function changeAttribute(character, attribute, amount) {
    if (
        typeof character[attribute] !== "number"
    ) {
        return;
    }

    character[attribute] += amount;

    if (character[attribute] < 0) {
        character[attribute] = 0;
    }

    updateCharacterUI();
}


/* =========================================================
   RELACIONAMENTO
   ========================================================= */

function changeRelationship(
    friendship,
    trust,
    rivalry,
    affinity
) {
    game.relationship.friendship +=
        friendship || 0;

    game.relationship.trust +=
        trust || 0;

    game.relationship.rivalry +=
        rivalry || 0;

    game.relationship.affinity +=
        affinity || 0;

    game.relationship.friendship =
        Math.max(
            0,
            game.relationship.friendship
        );

    game.relationship.trust =
        Math.max(
            0,
            game.relationship.trust
        );

    game.relationship.rivalry =
        Math.max(
            0,
            game.relationship.rivalry
        );

    game.relationship.affinity =
        Math.max(
            0,
            game.relationship.affinity
        );

    updateCharacterUI();
}


/* =========================================================
   KIWI
   ========================================================= */

function changeKiwiTrust(amount) {
    game.kiwi.trust += amount || 0;

    game.kiwi.trust =
        clamp(
            game.kiwi.trust,
            0,
            10
        );
}

function changeKiwiAffection(amount) {
    game.kiwi.affection += amount || 0;

    game.kiwi.affection =
        clamp(
            game.kiwi.affection,
            0,
            10
        );
}


/* =========================================================
   INVENTÁRIO
   ========================================================= */

function addItem(character, item) {
    if (!character.inventory) {
        character.inventory = [];
    }

    if (
        character.inventory.indexOf(item) === -1
    ) {
        character.inventory.push(item);

        addLog(
            character.name +
            " recebeu: " +
            item +
            "."
        );
    }
}

function addSpell(character, spell) {
    if (!character.spells) {
        character.spells = [];
    }

    if (
        character.spells.indexOf(spell) === -1
    ) {
        character.spells.push(spell);

        addLog(
            character.name +
            " aprendeu o feitiço " +
            spell +
            "."
        );
    }
}


/* =========================================================
   EFEITOS DAS ESCOLHAS
   ========================================================= */

function applyCharacterEffects(
    character,
    effects
) {
    if (!effects) {
        return;
    }

    if (effects.hp) {
        changeHp(
            character,
            effects.hp
        );
    }

    if (effects.mana) {
        changeMana(
            character,
            effects.mana
        );
    }

    if (effects.xp) {
        gainXp(
            character,
            effects.xp
        );
    }

    var attributes = [
        "bravery",
        "loyalty",
        "intelligence",
        "ambition",
        "empathy",
        "magic"
    ];

    for (var i = 0; i < attributes.length; i++) {
        var attribute = attributes[i];

        if (
            typeof effects[attribute] ===
            "number"
        ) {
            changeAttribute(
                character,
                attribute,
                effects[attribute]
            );
        }
    }

    if (effects.item) {
        addItem(
            character,
            effects.item
        );
    }

    if (effects.spell) {
        addSpell(
            character,
            effects.spell
        );
    }
}

function applyEffects(effects) {
    if (!effects) {
        return;
    }

    if (effects.sasah) {
        applyCharacterEffects(
            game.sasah,
            effects.sasah
        );
    }

    if (effects.lucas) {
        applyCharacterEffects(
            game.lucas,
            effects.lucas
        );
    }

    if (effects.relationship) {
        changeRelationship(
            effects.relationship.friendship,
            effects.relationship.trust,
            effects.relationship.rivalry,
            effects.relationship.affinity
        );
    }

    if (effects.kiwi) {
        if (
            typeof effects.kiwi.trust ===
            "number"
        ) {
            changeKiwiTrust(
                effects.kiwi.trust
            );
        }

        if (
            typeof effects.kiwi.affection ===
            "number"
        ) {
            changeKiwiAffection(
                effects.kiwi.affection
            );
        }

        if (
            typeof effects.kiwi.met ===
            "boolean"
        ) {
            game.kiwi.met =
                effects.kiwi.met;
        }

        if (
            typeof effects.kiwi.helped ===
            "boolean"
        ) {
            game.kiwi.helped =
                effects.kiwi.helped;
        }

        if (
            typeof effects.kiwi.rescued ===
            "boolean"
        ) {
            game.kiwi.rescued =
                effects.kiwi.rescued;
        }

        if (
            typeof effects.kiwi.followed ===
            "boolean"
        ) {
            game.kiwi.followed =
                effects.kiwi.followed;
        }

        if (
            typeof effects.kiwi.secret ===
            "boolean"
        ) {
            game.kiwi.secret =
                effects.kiwi.secret;
        }

        if (
            typeof effects.kiwi.finalAlly ===
            "boolean"
        ) {
            game.kiwi.finalAlly =
                effects.kiwi.finalAlly;
        }
    }

    if (effects.flags) {
        var flagNames =
            Object.keys(effects.flags);

        for (
            var i = 0;
            i < flagNames.length;
            i++
        ) {
            var flag =
                flagNames[i];

            game.flags[flag] =
                effects.flags[flag];
        }
    }

    updateCharacterUI();
}


/* =========================================================
   CONDIÇÕES
   ========================================================= */

function conditionMet(condition) {
    if (!condition) {
        return true;
    }

    if (condition.flag) {
        return (
            game.flags[condition.flag] ===
            condition.value
        );
    }

    if (condition.kiwiTrust) {
        return (
            game.kiwi.trust >=
            condition.kiwiTrust
        );
    }

    if (condition.friendship) {
        return (
            game.relationship.friendship >=
            condition.friendship
        );
    }

    if (condition.trust) {
        return (
            game.relationship.trust >=
            condition.trust
        );
    }

    if (condition.rivalry) {
        return (
            game.relationship.rivalry >=
            condition.rivalry
        );
    }

    if (condition.affinity) {
        return (
            game.relationship.affinity >=
            condition.affinity
        );
    }

    if (condition.house) {
        var character =
            condition.player === "lucas"
                ? game.lucas
                : game.sasah;

        return (
            character.house ===
            condition.house
        );
    }

    return true;
}


/* =========================================================
   TURNOS — CORREÇÃO PRINCIPAL
   ========================================================= */

function createTurnPanel(parent) {
    var panel =
        document.createElement("div");

    panel.className =
        "turn-selector";

    var title =
        document.createElement("div");

    title.className =
        "turn-title";

    title.textContent =
        "Quem conduz esta cena?";

    panel.appendChild(title);

    var buttons =
        document.createElement("div");

    buttons.className =
        "turn-buttons";

    createTurnButton(
        buttons,
        game.sasah.name,
        "sasah"
    );

    createTurnButton(
        buttons,
        game.lucas.name,
        "lucas"
    );

    createTurnButton(
        buttons,
        "Ambos",
        "both"
    );

    panel.appendChild(buttons);

    parent.appendChild(panel);
}

function createTurnButton(
    parent,
    name,
    mode
) {
    var button =
        document.createElement("button");

    button.type = "button";

    button.className =
        "turn-button";

    if (
        game.turnMode === mode
    ) {
        button.className +=
            " active";
    }

    button.textContent =
        name;

    button.addEventListener(
        "click",
        function() {
            game.turnMode = mode;

            updateTurnIndicator();

            renderCurrentScene();
        }
    );

    parent.appendChild(button);
}


/* =========================================================
   RENDERIZAÇÃO DE CENAS
   ========================================================= */

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
        false
    );
}

function renderScene(
    chapter,
    location,
    title,
    text,
    choices,
    resetTurn
) {
    game.chapter = chapter;

    if (resetTurn === true) {
        game.turnMode =
            "both";
    }

    currentSceneData = {
        chapter: chapter,
        location: location,
        title: title,
        text: text,
        choices: choices
    };

    setText(
        "chapter",
        "CAPÍTULO " +
        chapter
    );

    setText(
        "location",
        location
    );

    renderNarrative(
        title,
        text
    );

    updateTurnIndicator();

    renderChoices(
        choices
    );

    updateCharacterUI();
}

function renderChoices(choices) {
    var choicesElement =
        getElement("choices");

    if (!choicesElement) {
        return;
    }

    choicesElement.innerHTML = "";

    createTurnPanel(
        choicesElement
    );

    var title =
        document.createElement("h3");

    title.className =
        "choice-title";

    if (
        game.turnMode === "sasah"
    ) {
        title.textContent =
            "Escolha de " +
            game.sasah.name;
    } else if (
        game.turnMode === "lucas"
    ) {
        title.textContent =
            "Escolha de " +
            game.lucas.name;
    } else {
        title.textContent =
            "Decisão dos dois";
    }

    choicesElement.appendChild(
        title
    );

    for (
        var i = 0;
        i < choices.length;
        i++
    ) {
        var choice =
            choices[i];

        if (
            choice.condition &&
            !conditionMet(
                choice.condition
            )
        ) {
            continue;
        }

        var button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "choice-button";

        button.textContent =
            replaceNames(
                choice.text
            );

        (function(selectedChoice) {
            button.addEventListener(
                "click",
                function() {
                    selectChoice(
                        selectedChoice
                    );
                }
            );
        })(choice);

        choicesElement.appendChild(
            button
        );
    }
}


/* =========================================================
   ESCOLHA DO JOGADOR
   ========================================================= */

function selectChoice(choice) {
    if (!choice) {
        return;
    }

    if (choice.text) {
        addLog(
            replaceNames(
                choice.text
            )
        );
    }

    if (choice.effects) {
        applyEffects(
            choice.effects
        );
    }

    if (choice.action) {
        choice.action();
        return;
    }

    if (choice.next) {
        goToScene(
            choice.next
        );
    }
}

function goToScene(sceneId) {
    var scene =
        scenes[sceneId];

    if (!scene) {
        console.error(
            "Cena não encontrada:",
            sceneId
        );

        addLog(
            "Erro: a próxima cena não foi encontrada."
        );

        return;
    }

    game.sceneId =
        sceneId;

    if (scene.mode) {
        game.turnMode =
            scene.mode;
    }

    renderScene(
        scene.chapter,
        scene.location,
        scene.title,
        scene.text,
        scene.choices,
        false
    );
}


/* =========================================================
   SISTEMA DE NOMES
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

    var scene = document.getElementById("scene");

    if (scene) {

        scene.innerHTML = "";

        var title = document.createElement("h2");

        title.className = "story-title";

        title.textContent =
            "Duas histórias. Um destino.";

        scene.appendChild(title);

        var paragraph = document.createElement("p");

        paragraph.textContent =
            "Antes que a aventura comece, escolha o nome dos dois personagens que viverão esta história.";

        scene.appendChild(paragraph);

        var paragraph2 = document.createElement("p");

        paragraph2.textContent =
            "Os nomes escolhidos serão usados durante toda a aventura, nos diálogos, decisões e acontecimentos.";

        scene.appendChild(paragraph2);

    }


    var choices =
        document.getElementById("choices");

    if (!choices) {
        return;
    }

    choices.innerHTML = "";


    var box =
        document.createElement("div");

    box.className =
        "name-selection";


    /* =====================================================
       TÍTULO
    ===================================================== */

    var titleBox =
        document.createElement("h3");

    titleBox.textContent =
        "PERSONAGENS";

    box.appendChild(
        titleBox
    );


    /* =====================================================
       PERSONAGEM 1
    ===================================================== */

    var group1 =
        document.createElement("div");

    group1.className =
        "name-group";


    var label1 =
        document.createElement("label");

    label1.textContent =
        "Nome do personagem 1";

    label1.setAttribute(
        "for",
        "nameInput1"
    );


    var input1 =
        document.createElement("input");

    input1.type =
        "text";

    input1.id =
        "nameInput1";

    input1.name =
        "nameInput1";

    input1.placeholder =
        "Digite o nome do personagem 1";

    input1.maxLength =
        30;

    input1.autocomplete =
        "off";

    input1.value =
        game.sasah &&
        game.sasah.name
            ? game.sasah.name
            : "Sasah";


    group1.appendChild(
        label1
    );

    group1.appendChild(
        input1
    );

    box.appendChild(
        group1
    );


    /* =====================================================
       PERSONAGEM 2
    ===================================================== */

    var group2 =
        document.createElement("div");

    group2.className =
        "name-group";


    var label2 =
        document.createElement("label");

    label2.textContent =
        "Nome do personagem 2";

    label2.setAttribute(
        "for",
        "nameInput2"
    );


    var input2 =
        document.createElement("input");

    input2.type =
        "text";

    input2.id =
        "nameInput2";

    input2.name =
        "nameInput2";

    input2.placeholder =
        "Digite o nome do personagem 2";

    input2.maxLength =
        30;

    input2.autocomplete =
        "off";

    input2.value =
        game.lucas &&
        game.lucas.name
            ? game.lucas.name
            : "Lucas";


    group2.appendChild(
        label2
    );

    group2.appendChild(
        input2
    );

    box.appendChild(
        group2
    );


    /* =====================================================
       BOTÃO
    ===================================================== */

    var button =
        document.createElement("button");

    button.type =
        "button";

    button.className =
        "choice-button continue-button";

    button.textContent =
        "Começar aventura";


    button.addEventListener(
        "click",
        function() {

            var first =
                input1.value.trim();

            var second =
                input2.value.trim();


            /*
               Não permite que os personagens
               fiquem sem nome.
            */

            if (first === "") {

                input1.focus();

                alert(
                    "Digite o nome do primeiro personagem."
                );

                return;

            }


            if (second === "") {

                input2.focus();

                alert(
                    "Digite o nome do segundo personagem."
                );

                return;

            }


            /*
               Guarda os nomes escolhidos.
            */

            game.sasah.name =
                first;

            game.lucas.name =
                second;


            /*
               Registra a escolha no diário.
            */

            addLog(
                first +
                " e " +
                second +
                " começaram a aventura."
            );


            /*
               Atualiza imediatamente
               os cartões dos personagens.
            */

            updateCharacterUI();


            /*
               Salva os nomes.
            */

            saveGame();


            /*
               Agora começa a escolha das casas.
            */

            startHouseSelection(
                "sasah"
            );

        }
    );


    box.appendChild(
        button
    );


    choices.appendChild(
        box
    );


    /*
       Coloca automaticamente o cursor
       no primeiro nome.
    */

    setTimeout(
        function() {

            input1.focus();

            input1.select();

        },
        100
    );

}


/* =========================================================
   QUESTIONÁRIO DAS CASAS
   ========================================================= */

var houseQuestions = [
    {
        question:
            "Você encontra uma passagem proibida durante a noite. O que faz?",

        answers: [
            {
                text:
                    "Entro imediatamente. Quero descobrir o que existe lá.",
                trait:
                    "bravery"
            },
            {
                text:
                    "Chamo meus amigos para não enfrentar isso sozinho.",
                trait:
                    "loyalty"
            },
            {
                text:
                    "Procuro pistas e tento descobrir para onde a passagem leva.",
                trait:
                    "intelligence"
            },
            {
                text:
                    "Uso a oportunidade para descobrir algo que ninguém mais sabe.",
                trait:
                    "ambition"
            },
            {
                text:
                    "Primeiro penso se alguém pode estar em perigo.",
                trait:
                    "empathy"
            }
        ]
    },

    {
        question:
            "Um colega está sendo injustamente acusado. Como você reage?",

        answers: [
            {
                text:
                    "Defendo a pessoa, mesmo que isso me coloque em problemas.",
                trait:
                    "bravery"
            },
            {
                text:
                    "Fico ao lado dela até que tudo seja esclarecido.",
                trait:
                    "loyalty"
            },
            {
                text:
                    "Investigo os fatos para descobrir quem realmente está mentindo.",
                trait:
                    "intelligence"
            },
            {
                text:
                    "Transformo a situação em uma oportunidade para revelar a verdade e ganhar respeito.",
                trait:
                    "ambition"
            },
            {
                text:
                    "Tento entender o que todos estão sentindo antes de agir.",
                trait:
                    "empathy"
            }
        ]
    },

    {
        question:
            "Qual destas qualidades você mais gostaria de desenvolver?",

        answers: [
            {
                text:
                    "Coragem para enfrentar qualquer perigo.",
                trait:
                    "bravery"
            },
            {
                text:
                    "Lealdade para nunca abandonar quem amo.",
                trait:
                    "loyalty"
            },
            {
                text:
                    "Inteligência para compreender os maiores mistérios.",
                trait:
                    "intelligence"
            },
            {
                text:
                    "Ambição para alcançar grandes objetivos.",
                trait:
                    "ambition"
            },
            {
                text:
                    "Empatia para compreender profundamente outras pessoas.",
                trait:
                    "empathy"
            }
        ]
    },

    {
        question:
            "Você recebe uma informação extremamente poderosa. O que faz?",

        answers: [
            {
                text:
                    "Uso a informação para proteger alguém.",
                trait:
                    "bravery"
            },
            {
                text:
                    "Compartilho apenas com quem confio.",
                trait:
                    "loyalty"
            },
            {
                text:
                    "Estudo a informação antes de tomar qualquer decisão.",
                trait:
                    "intelligence"
            },
            {
                text:
                    "Guardo o segredo até poder utilizá-lo a meu favor.",
                trait:
                    "ambition"
            },
            {
                text:
                    "Penso primeiro nas consequências para as pessoas envolvidas.",
                trait:
                    "empathy"
            }
        ]
    },

    {
        question:
            "Qual frase mais combina com você?",

        answers: [
            {
                text:
                    "Prefiro tentar e enfrentar as consequências.",
                trait:
                    "bravery"
            },
            {
                text:
                    "Quem está comigo nunca fica para trás.",
                trait:
                    "loyalty"
            },
            {
                text:
                    "Sempre existe algo novo para descobrir.",
                trait:
                    "intelligence"
            },
            {
                text:
                    "Quero deixar minha marca no mundo.",
                trait:
                    "ambition"
            },
            {
                text:
                    "Nenhuma vitória vale a pena se alguém for destruído no caminho.",
                trait:
                    "empathy"
            }
        ]
    }
];


/* =========================================================
   CÁLCULO DA CASA
   ========================================================= */

function calculateHouse(answers) {
    var score = {
        bravery: 0,
        loyalty: 0,
        intelligence: 0,
        ambition: 0,
        empathy: 0
    };

    for (
        var i = 0;
        i < answers.length;
        i++
    ) {
        var trait =
            answers[i];

        if (
            typeof score[trait] ===
            "number"
        ) {
            score[trait]++;
        }
    }

    /*
       Empatia não cria uma quinta casa.
       Ela contribui para Lufa-Lufa.
    */

    var houses = {
        bravery: score.bravery,
        intelligence: score.intelligence,
        ambition: score.ambition,
        loyalty:
            score.loyalty +
            score.empathy
    };

    var bestHouse =
        "loyalty";

    var bestScore =
        houses.loyalty;

    var priority = [
        "bravery",
        "intelligence",
        "ambition",
        "loyalty"
    ];

    for (
        var i = 0;
        i < priority.length;
        i++
    ) {
        var key =
            priority[i];

        if (
            houses[key] >
            bestScore
        ) {
            bestScore =
                houses[key];

            bestHouse =
                key;
        }
    }

    if (
        bestHouse ===
        "bravery"
    ) {
        return "Grifinória";
    }

    if (
        bestHouse ===
        "intelligence"
    ) {
        return "Corvinal";
    }

    if (
        bestHouse ===
        "ambition"
    ) {
        return "Sonserina";
    }

    return "Lufa-Lufa";
}


/* =========================================================
   QUESTIONÁRIO — CONTROLE
   ========================================================= */

var currentQuizPlayer =
    null;

var currentQuizQuestion =
    0;

function startHouseSelection(player) {
    game.phase =
        "sorting";

    currentQuizPlayer =
        player;

    currentQuizQuestion =
        0;

    game.houseAnswers[player] =
        [];

    renderHouseQuestion();
}

function renderHouseQuestion() {
    var player =
        currentQuizPlayer;

    if (!player) {
        return;
    }

    var character =
        player === "sasah"
            ? game.sasah
            : game.lucas;

    var question =
        houseQuestions[
            currentQuizQuestion
        ];

    var scene =
        getElement("scene");

    var choices =
        getElement("choices");

    if (!scene || !choices) {
        return;
    }

    setText(
        "chapter",
        "O CHAPÉU SELETOR"
    );

    setText(
        "location",
        "Grande Salão"
    );

    scene.innerHTML = "";

    var title =
        document.createElement("h2");

    title.className =
        "story-title";

    title.textContent =
        "O que existe dentro de você?";

    scene.appendChild(
        title
    );

    var paragraph =
        document.createElement("p");

    paragraph.textContent =
        character.name +
        ", o Chapéu Seletor aguarda sua resposta.";

    scene.appendChild(
        paragraph
    );

    var questionElement =
        document.createElement("p");

    questionElement.className =
        "quiz-question";

    questionElement.textContent =
        question.question;

    scene.appendChild(
        questionElement
    );

    choices.innerHTML = "";

    var counter =
        document.createElement("div");

    counter.className =
        "quiz-counter";

    counter.textContent =
        "Pergunta " +
        (currentQuizQuestion + 1) +
        " de " +
        houseQuestions.length;

    choices.appendChild(
        counter
    );

    for (
        var i = 0;
        i < question.answers.length;
        i++
    ) {
        (function(index) {
            var answer =
                question.answers[index];

            var button =
                document.createElement("button");

            button.type =
                "button";

            button.className =
                "choice-button";

            button.textContent =
                answer.text;

            button.addEventListener(
                "click",
                function() {
                    game.houseAnswers[
                        player
                    ].push(
                        answer.trait
                    );

                    currentQuizQuestion++;

                    if (
                        currentQuizQuestion <
                        houseQuestions.length
                    ) {
                        renderHouseQuestion();
                    } else {
                        finishHouseSelection();
                    }
                }
            );

            choices.appendChild(
                button
            );
        })(i);
    }
}

function finishHouseSelection() {
    var player =
        currentQuizPlayer;

    var character =
        player === "sasah"
            ? game.sasah
            : game.lucas;

    var house =
        calculateHouse(
            game.houseAnswers[player]
        );

    character.house =
        house;

    addLog(
        character.name +
        " foi selecionado(a) para " +
        house +
        "."
    );

    if (
        player === "sasah"
    ) {
        startHouseSelection(
            "lucas"
        );
        return;
    }

    game.phase =
        "story";

    game.turnMode =
        "both";

    updateCharacterUI();

    goToScene(
        "sorting_result"
    );
}


/* =========================================================
   PRÓLOGO
   ========================================================= */

var scenes = {};


/* ---------------------------------------------------------
   PRÓLOGO — CENA 1
--------------------------------------------------------- */

scenes.prologue_1 = {
    chapter: 1,
    location: "Um pequeno quarto, na noite anterior à viagem",

    title:
        "CAPÍTULO I — AS CARTAS",

    mode: "both",

    text:
        "A noite parecia comum.\n\n" +
        "{P1} estava diante da janela quando ouviu três batidas no vidro. Não eram fortes o suficiente para assustar, mas havia alguma coisa estranha naquele som: três batidas, uma pausa, depois mais três.\n\n" +
        "Do outro lado da janela não havia ninguém. Apenas o céu escuro e algumas estrelas escondidas pelas nuvens.\n\n" +
        "Sobre a escrivaninha, porém, havia algo que não estava ali alguns minutos antes.\n\n" +
        "Uma carta.\n\n" +
        "O envelope era pesado, de papel grosso, marcado com um brasão que {P1} nunca tinha visto pessoalmente, embora tivesse a sensação inexplicável de já conhecê-lo.\n\n" +
        "Antes que pudesse tocar no envelope, ouviu-se um ruído no corredor.\n\n" +
        "Ao mesmo tempo, em outro lugar, {P2} encontrava exatamente o mesmo tipo de carta.\n\n" +
        "Duas cartas.\n\n" +
        "Duas pessoas.\n\n" +
        "E uma história que ainda não sabia que estava prestes a começar.",

    choices: [
        {
            text:
                "Abrir a carta imediatamente.",
            effects: {
                sasah: {
                    bravery: 1,
                    intelligence: 1,
                    xp: 5
                },
                relationship: {
                    affinity: 1
                },
                flags: {
                    trainMystery: true
                }
            },
            next:
                "prologue_2"
        },

        {
            text:
                "Examinar o envelope cuidadosamente antes de abri-lo.",
            effects: {
                sasah: {
                    intelligence: 2,
                    xp: 5
                },
                flags: {
                    bookFound: true
                }
            },
            next:
                "prologue_2"
        },

        {
            text:
                "Esperar e investigar quem deixou a carta.",
            effects: {
                sasah: {
                    bravery: 1,
                    intelligence: 1,
                    xp: 5
                },
                flags: {
                    professorClue: true
                }
            },
            next:
                "prologue_2"
        }
    ]
};


/* ---------------------------------------------------------
   PRÓLOGO — CENA 2
--------------------------------------------------------- */

scenes.prologue_2 = {
    chapter: 1,
    location: "A mesma noite",

    title:
        "A mensagem impossível",

    mode: "both",

    text:
        "Quando o envelope finalmente foi aberto, a primeira coisa que chamou atenção não foi a carta.\n\n" +
        "Foi o cheiro.\n\n" +
        "Cheirava a madeira antiga, poeira e alguma coisa parecida com chuva depois de uma tempestade.\n\n" +
        "Dentro havia uma única folha.\n\n" +
        "A mensagem era curta.\n\n" +
        "Hogwarts aguardava.\n\n" +
        "Mas havia uma segunda frase escrita abaixo, em tinta diferente:\n\n" +
        "“Não confiem em tudo que o castelo lhes mostrar.”\n\n" +
        "Nenhum nome assinava a mensagem.\n\n" +
        "Então uma pequena sombra passou pela janela.\n\n" +
        "Por um instante, {P1} teve a impressão de ver olhos brilhando na escuridão.\n\n" +
        "Quando olhou novamente, não havia nada.\n\n" +
        "A carta, porém, tinha mudado.\n\n" +
        "Agora havia uma palavra escrita no verso:\n\n" +
        "KIWI.",

    choices: [
        {
            text:
                "Guardar a carta.",
            effects: {
                sasah: {
                    loyalty: 1,
                    xp: 5
                },
                flags: {
                    trainMystery: true
                }
            },
            next:
                "prologue_3"
        },

        {
            text:
                "Investigar a palavra “KIWI”.",
            effects: {
                sasah: {
                    intelligence: 2,
                    xp: 10
                },
                flags: {
                    kiwiSecret: true
                }
            },
            next:
                "prologue_3"
        },

        {
            text:
                "Ignorar a mensagem e preparar-se para Hogwarts.",
            effects: {
                sasah: {
                    ambition: 1,
                    xp: 5
                }
            },
            next:
                "prologue_3"
        }
    ]
};


/* ---------------------------------------------------------
   PRÓLOGO — CENA 3
--------------------------------------------------------- */

scenes.prologue_3 = {
    chapter: 1,
    location: "Estação de King’s Cross",

    title:
        "O Expresso",

    mode: "both",

    text:
        "Na manhã seguinte, o mundo parecia normal demais.\n\n" +
        "Pessoas caminhavam pela estação carregando malas, crianças reclamavam do peso das mochilas e anúncios ecoavam pelo teto.\n\n" +
        "Então {P1} percebeu uma coisa.\n\n" +
        "A plataforma indicada na carta não aparecia em nenhuma placa.\n\n" +
        "Ao lado, {P2} também procurava pelo mesmo lugar.\n\n" +
        "Os dois ainda não sabiam disso.\n\n" +
        "Quando finalmente encontraram a passagem, uma parede aparentemente comum revelou um caminho escondido.\n\n" +
        "Do outro lado estava um trem vermelho, soltando vapor, cercado por famílias e estudantes.\n\n" +
        "O Expresso de Hogwarts.\n\n" +
        "Antes de embarcar, {P1} percebeu uma criatura minúscula escondida perto de uma das rodas do trem.\n\n" +
        "Era rápida demais para ser identificada.\n\n" +
        "Duas pequenas orelhas apareceram por um segundo.\n\n" +
        "Depois desapareceram.\n\n" +
        "A palavra da carta voltou à mente.\n\n" +
        "Kiwi.",

    choices: [
        {
            text:
                "Tentar seguir a pequena criatura.",
            effects: {
                sasah: {
                    empathy: 1,
                    intelligence: 1,
                    xp: 10
                },
                flags: {
                    trainMystery: true
                },
                kiwi: {
                    affection: 1
                }
            },
            next:
                "train_1"
        },

        {
            text:
                "Entrar no trem e procurar um compartimento.",
            effects: {
                sasah: {
                    loyalty: 1,
                    xp: 10
                }
            },
            next:
                "train_1"
        },

        {
            text:
                "Observar o trem e procurar sinais de magia.",
            effects: {
                sasah: {
                    intelligence: 1,
                    magic: 1,
                    xp: 10
                }
            },
            next:
                "train_1"
        }
    ]
};


/* =========================================================
   TREM — CENA 1
   ========================================================= */

scenes.train_1 = {
    chapter: 2,
    location: "Expresso de Hogwarts",

    title:
        "O compartimento vazio",

    mode: "sasah",

    text:
        "{P1} encontrou um compartimento aparentemente vazio.\n\n" +
        "Havia apenas duas poltronas, uma pequena mesa e uma janela através da qual a estação desaparecia lentamente.\n\n" +
        "Sobre a mesa havia um livro.\n\n" +
        "Não era um livro escolar.\n\n" +
        "Sua capa era preta, sem título, e uma pequena marca dourada lembrava uma pegada.\n\n" +
        "Quando {P1} tocou no livro, as páginas começaram a virar sozinhas.\n\n" +
        "Uma delas parou em um desenho de uma criatura estranha.\n\n" +
        "Corpo pequeno.\n\n" +
        "Orelhas longas.\n\n" +
        "Olhos enormes.\n\n" +
        "E uma cauda que parecia feita de folhas.\n\n" +
        "Abaixo do desenho havia uma única palavra:\n\n" +
        "LEBRÍLOPE.",

    choices: [
        {
            text:
                "Ler a descrição da Lebrílope.",
            effects: {
                sasah: {
                    intelligence: 2,
                    magic: 1,
                    xp: 15
                },
                flags: {
                    bookFound: true
                }
            },
            next:
                "train_2"
        },

        {
            text:
                "Fechar o livro imediatamente.",
            effects: {
                sasah: {
                    bravery: 1,
                    xp: 10
                }
            },
            next:
                "train_2"
        },

        {
            text:
                "Procurar outras páginas sobre a criatura.",
            effects: {
                sasah: {
                    intelligence: 2,
                    empathy: 1,
                    xp: 15
                },
                kiwi: {
                    affection: 1
                },
                flags: {
                    kiwiSecret: true
                }
            },
            next:
                "train_2"
        }
    ]
};


/* =========================================================
   TREM — CENA 2
========================================================= */

scenes.train_2 = {
    chapter: 2,
    location: "Expresso de Hogwarts",

    title:
        "Duas histórias se encontram",

    mode: "lucas",

    text:
        "{P2} caminhava pelo corredor do trem quando ouviu um som vindo de um dos compartimentos.\n\n" +
        "Parecia alguém folheando um livro.\n\n" +
        "Depois veio um pequeno ruído, como um animal tentando esconder-se.\n\n" +
        "A porta do compartimento estava entreaberta.\n\n" +
        "Por alguns segundos, {P2} viu apenas {P1} e o livro misterioso.\n\n" +
        "Então alguma coisa passou correndo atrás de {P1}.\n\n" +
        "Pequena.\n\n" +
        "Ágil.\n\n" +
        "Estranhamente adorável.\n\n" +
        "A criatura desapareceu pelo corredor.\n\n" +
        "O livro caiu no chão.\n\n" +
        "A capa se abriu sozinha.\n\n" +
        "Dessa vez, a página mostrava uma frase:\n\n" +
        "“A Lebrílope aparece quando uma história precisa de duas pessoas.”",

    choices: [
        {
            text:
                "Seguir a criatura pelo corredor.",
            effects: {
                lucas: {
                    bravery: 1,
                    empathy: 1,
                    xp: 15
                },
                kiwi: {
                    affection: 1
                }
            },
            next:
                "train_3"
        },

        {
            text:
                "Perguntar a {P1} o que está acontecendo.",
            effects: {
                lucas: {
                    loyalty: 1,
                    xp: 15
                },
                relationship: {
                    friendship: 2,
                    trust: 1
                }
            },
            next:
                "train_3"
        },

        {
            text:
                "Pegar o livro antes que alguém o veja.",
            effects: {
                lucas: {
                    ambition: 1,
                    intelligence: 1,
                    xp: 15
                },
                relationship: {
                    rivalry: 1
                }
            },
            next:
                "train_3"
        }
    ]
};


/* =========================================================
   TREM — CENA 3
========================================================= */

scenes.train_3 = {
    chapter: 2,
    location: "Corredor do Expresso",

    title:
        "A primeira escolha",

    mode: "both",

    text:
        "A criatura estava no fim do corredor.\n\n" +
        "Agora era possível vê-la melhor.\n\n" +
        "Ela tinha o tamanho aproximado de um gato pequeno, mas não se parecia com nenhum animal conhecido.\n\n" +
        "As orelhas longas tremiam enquanto observava os dois protagonistas.\n\n" +
        "Ela não parecia agressiva.\n\n" +
        "Parecia assustada.\n\n" +
        "Quando {P1} se aproximou, ela recuou.\n\n" +
        "Quando {P2} se aproximou, ela fez a mesma coisa.\n\n" +
        "Então uma porta do trem bateu violentamente.\n\n" +
        "A criatura se assustou e correu.\n\n" +
        "Antes de desaparecer, deixou cair uma pequena pena prateada.",

    choices: [
        {
            text:
                "Deixar a criatura fugir, mas guardar a pena.",
            effects: {
                sasah: {
                    empathy: 1,
                    xp: 10
                },
                lucas: {
                    intelligence: 1,
                    xp: 10
                },
                kiwi: {
                    trust: 1
                },
                flags: {
                    trainMystery: true
                }
            },
            next:
                "sorting_intro"
        },

        {
            text:
                "Tentar tranquilizar a criatura antes de ela fugir.",
            effects: {
                sasah: {
                    empathy: 2,
                    xp: 15
                },
                lucas: {
                    empathy: 2,
                    xp: 15
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                },
                flags: {
                    trainMystery: true
                }
            },
            next:
                "sorting_intro"
        },

        {
            text:
                "Tentar capturá-la para descobrir o que ela é.",
            effects: {
                sasah: {
                    bravery: 1,
                    xp: 15
                },
                lucas: {
                    ambition: 1,
                    xp: 15
                },
                relationship: {
                    rivalry: 2
                },
                kiwi: {
                    trust: -1
                },
                flags: {
                    trainMystery: true
                }
            },
            next:
                "sorting_intro"
        }
    ]
};


/* =========================================================
   SELEÇÃO DAS CASAS
========================================================= */

scenes.sorting_intro = {
    chapter: 3,
    location: "Grande Salão",

    title:
        "O Chapéu Seletor",

    mode: "both",

    text:
        "As portas do Grande Salão se abriram.\n\n" +
        "Centenas de velas flutuavam sobre as mesas. O teto parecia um céu noturno e as quatro mesas das casas estavam repletas de estudantes.\n\n" +
        "No centro do salão havia um banco.\n\n" +
        "Sobre ele estava o Chapéu Seletor.\n\n" +
        "A criatura do trem parecia ter desaparecido completamente.\n\n" +
        "Porém, quando {P1} olhou para uma das janelas, percebeu uma pequena silhueta observando o salão de longe.\n\n" +
        "Talvez o mistério da Lebrílope estivesse apenas começando.\n\n" +
        "O professor chamou o primeiro nome.\n\n" +
        "{P1} deu um passo à frente.",

    choices: [
        {
            text:
                "Sentar-se diante do Chapéu Seletor.",
            action: function() {
                startHouseSelection(
                    "sasah"
                );
            }
        }
    ]
};


scenes.sorting_result = {
    chapter: 3,
    location: "Grande Salão",

    title:
        "Duas casas, uma história",

    mode: "both",

    text:
        "O último nome foi anunciado.\n\n" +
        "{P2} deixou o banco e caminhou até a mesa de sua nova casa.\n\n" +
        "Agora os dois sabiam onde pertenciam.\n\n" +
        "{P1} pertencia a {P1_HOUSE}.\n\n" +
        "{P2} pertencia a {P2_HOUSE}.\n\n" +
        "Mas antes que pudessem conversar, todas as velas do salão se apagaram ao mesmo tempo.\n\n" +
        "Um vento gelado atravessou o ambiente.\n\n" +
        "O livro misterioso, escondido entre os pertences de um dos protagonistas, começou a vibrar.\n\n" +
        "Uma marca surgiu no chão.\n\n" +
        "Era a mesma marca dourada que aparecia na capa do livro.\n\n" +
        "E, no centro dela, apareceu uma pequena pegada.",

    choices: [
        {
            text:
                "Investigar a marca juntos.",
            effects: {
                relationship: {
                    friendship: 2,
                    trust: 2
                },
                sasah: {
                    intelligence: 1,
                    xp: 20
                },
                lucas: {
                    intelligence: 1,
                    xp: 20
                },
                flags: {
                    castleMystery: true
                }
            },
            next:
                "castle_1"
        },

        {
            text:
                "Seguir a direção de onde veio o vento.",
            effects: {
                sasah: {
                    bravery: 2,
                    xp: 20
                },
                lucas: {
                    bravery: 1,
                    xp: 20
                },
                flags: {
                    secretPassage: true
                }
            },
            next:
                "castle_1"
        },

               {
            text:
                "Guardar o segredo e esperar uma oportunidade melhor.",
            effects: {
                sasah: {
                    ambition: 1,
                    xp: 15
                },
                lucas: {
                    intelligence: 1,
                    xp: 15
                },
                relationship: {
                    trust: -1
                }
            },
            next:
                "castle_1"
        }
    ]
};


/* =========================================================
   FUNÇÃO ESPECIAL PARA NOMES DAS CASAS
========================================================= */

function getHouseNarrativeText(text) {
    return String(text)
        .replace(
            /\{P1_HOUSE\}/g,
            game.sasah.house
        )
        .replace(
            /\{P2_HOUSE\}/g,
            game.lucas.house
        );
}


/* =========================================================
   SOBRESCREVE O RENDER PARA CASAS
========================================================= */

var originalReplaceNames =
    replaceNames;

replaceNames = function(text) {
    var result =
        originalReplaceNames(text);

    result =
        result.replace(
            /\{P1_HOUSE\}/g,
            game.sasah.house
        );

    result =
        result.replace(
            /\{P2_HOUSE\}/g,
            game.lucas.house
        );

    return result;
};


/* =========================================================
   ARCO I — O CASTELO QUE OBSERVA
========================================================= */

scenes.castle_1 = {
    chapter: 4,
    location: "Corredores de Hogwarts",

    title:
        "O castelo que observa",

    mode: "sasah",

    text:
        "Na manhã seguinte, Hogwarts parecia perfeitamente normal.\n\n" +
        "Aulas começaram, estudantes corriam pelos corredores e professores tentavam organizar a rotina.\n\n" +
        "Mas {P1} percebeu algo estranho.\n\n" +
        "Um retrato estava olhando diretamente para ele.\n\n" +
        "Não era apenas uma impressão.\n\n" +
        "Os olhos do retrato acompanharam seus movimentos.\n\n" +
        "Quando {P1} se aproximou, o personagem pintado virou o rosto e sussurrou:\n\n" +
        "“Vocês dois não deveriam ter encontrado o livro.”\n\n" +
        "Então o retrato voltou à posição original.\n\n" +
        "Como se nunca tivesse falado.",

    choices: [
        {
            text:
                "Perguntar ao retrato quem escreveu o livro.",
            effects: {
                sasah: {
                    intelligence: 2,
                    xp: 20
                },
                flags: {
                    professorClue: true
                }
            },
            next:
                "castle_2"
        },

        {
            text:
                "Exigir que o retrato conte imediatamente o que sabe.",
            effects: {
                sasah: {
                    bravery: 2,
                    xp: 20
                },
                relationship: {
                    rivalry: 1
                }
            },
            next:
                "castle_2"
        },

        {
            text:
                "Não pressionar o retrato e observar seu comportamento.",
            effects: {
                sasah: {
                    empathy: 1,
                    intelligence: 1,
                    xp: 20
                }
            },
            next:
                "castle_2"
        }
    ] } 
};


scenes.castle_2 = {
    chapter: 4,
    location: "Biblioteca",

    title:
        "O livro sem título",

    mode: "lucas",

    text:
        "{P2} levou o livro até a biblioteca.\n\n" +
        "A bibliotecária imediatamente percebeu que havia algo incomum nele.\n\n" +
        "Ela não tocou na capa.\n\n" +
        "Apenas disse:\n\n" +
        "“Alguns livros não gostam de ser encontrados.”\n\n" +
        "Nas estantes mais antigas, {P2} encontrou uma referência às Lebrílopas.\n\n" +
        "Segundo o registro, eram criaturas extremamente raras capazes de perceber alterações na magia antiga.\n\n" +
        "Mas havia uma anotação ainda mais estranha.\n\n" +
        "Uma Lebrílope chamada Kiwi teria sido vista em Hogwarts décadas atrás.\n\n" +
        "Depois disso, todos os registros sobre ela desapareceram.",

    choices: [
        {
            text:
                "Pesquisar tudo que existir sobre Kiwi.",
            effects: {
                lucas: {
                    intelligence: 3,
                    xp: 25
                },
                flags: {
                    library: true,
                    kiwiSecret: true
                },
                kiwi: {
                    trust: 1
                }
            },
            next:
                "castle_3"
        },

        {
            text:
                "Pesquisar quem apagou os registros.",
            effects: {
                lucas: {
                    ambition: 1,
                    intelligence: 2,
                    xp: 25
                },
                flags: {
                    library: true,
                    professorClue: true
                }
            },
            next:
                "castle_3"
        },

        {
            text:
                "Fechar o livro e contar tudo a {P1}.",
            effects: {
                lucas: {
                    loyalty: 2,
                    xp: 20
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                }
            },
            next:
                "castle_3"
        }
    ]
};


scenes.castle_3 = {
    chapter: 4,
    location: "Biblioteca — seção restrita",

    title:
        "A porta que não deveria existir",

    mode: "both",

    text:
        "Os dois se encontraram depois das aulas.\n\n" +
        "As pistas pareciam apontar para o mesmo lugar.\n\n" +
        "A seção restrita da biblioteca.\n\n" +
        "Uma porta antiga estava escondida atrás de uma estante.\n\n" +
        "Não havia maçaneta.\n\n" +
        "Apenas duas marcas.\n\n" +
        "Uma para cada mão.\n\n" +
        "Quando {P1} e {P2} tocaram as marcas ao mesmo tempo, a porta se abriu.\n\n" +
        "Do outro lado havia uma sala estreita.\n\n" +
        "E no centro dela estava uma caixa de vidro.\n\n" +
        "Dentro da caixa havia uma pena prateada.\n\n" +
        "A mesma pena deixada pela criatura no trem.",

    choices: [
        {
            text:
                "Abrir a caixa.",
            effects: {
                sasah: {
                    bravery: 1,
                    magic: 1,
                    xp: 30
                },
                lucas: {
                    intelligence: 1,
                    magic: 1,
                    xp: 30
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                },
                flags: {
                    ancientArtifact: true,
                    forbiddenRoom: true
                }
            },
            next:
                "kiwi_1"
        },

        {
            text:
                "Estudar a proteção mágica primeiro.",
            effects: {
                sasah: {
                    intelligence: 2,
                    xp: 30
                },
                lucas: {
                    intelligence: 2,
                    xp: 30
                },
                relationship: {
                    trust: 1
                },
                flags: {
                    ancientArtifact: true
                }
            },
            next:
                "kiwi_1"
        },

        {
            text:
                "Não tocar na caixa e procurar outras pistas.",
            effects: {
                sasah: {
                    empathy: 1,
                    xp: 20
                },
                lucas: {
                    intelligence: 1,
                    xp: 20
                },
                flags: {
                    forbiddenRoom: true
                }
            },
            next:
                "kiwi_1"
        }
    ]
};


/* =========================================================
   ARCO II — KIWI
========================================================= */

scenes.kiwi_1 = {
    chapter: 5,
    location: "Uma sala escondida sob a biblioteca",

    title:
        "A Lebrílope",

    mode: "both",

    text:
        "Assim que a pena foi tocada, a sala inteira ficou silenciosa.\n\n" +
        "Então veio um pequeno espirro.\n\n" +
        "Atrás de uma pilha de livros apareceu a criatura.\n\n" +
        "Ela era exatamente como o desenho do livro.\n\n" +
        "Pequena.\n\n" +
        "Fofa.\n\n" +
        "Com enormes olhos atentos e orelhas compridas.\n\n" +
        "Ela segurava uma pequena folha entre as patas.\n\n" +
        "A criatura olhou para {P1}.\n\n" +
        "Depois para {P2}.\n\n" +
        "Finalmente, apontou para a pena.\n\n" +
        "“Kiwi?” perguntou {P1}.\n\n" +
        "A criatura inclinou a cabeça.\n\n" +
        "Era ela.\n\n" +
        "Kiwi, a Lebrílope.",

    choices: [
        {
            text:
                "Abaixar-se e falar com Kiwi calmamente.",
            effects: {
                sasah: {
                    empathy: 2,
                    xp: 25
                },
                lucas: {
                    empathy: 2,
                    xp: 25
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                },
                kiwi: {
                    met: true,
                    trust: 3,
                    affection: 2,
                    helped: true
                }
            },
            next:
                "kiwi_2"
        },

        {
            text:
                "Perguntar a Kiwi por que ela trouxe a pena.",
            effects: {
                sasah: {
                    intelligence: 1,
                    xp: 20
                },
                lucas: {
                    intelligence: 1,
                    xp: 20
                },
                kiwi: {
                    met: true,
                    trust: 1
                }
            },
            next:
                "kiwi_2"
        },

        {
            text:
                "Manter distância e observar Kiwi.",
            effects: {
                sasah: {
                    intelligence: 1,
                    xp: 15
                },
                lucas: {
                    intelligence: 1,
                    xp: 15
                },
                kiwi: {
                    met: true,
                    trust: 0
                }
            },
            next:
                "kiwi_2"
        }
    ]
};


scenes.kiwi_2 = {
    chapter: 5,
    location: "Sala escondida",

    title:
        "O aviso de Kiwi",

    mode: "lucas",

    text:
        "Kiwi não falava como uma pessoa.\n\n" +
        "Ela emitia pequenos sons e gesticulava.\n\n" +
        "Apesar disso, havia algo quase sobrenatural em sua maneira de se comunicar.\n\n" +
        "{P2} percebeu que ela apontava repetidamente para três lugares no desenho do livro.\n\n" +
        "A floresta.\n\n" +
        "O lago.\n\n" +
        "E uma porta desenhada sob Hogwarts.\n\n" +
        "Quando {P2} mencionou a palavra “câmara”, Kiwi imediatamente ficou assustada.\n\n" +
        "Ela correu até a parede e começou a arranhar o chão.\n\n" +
        "Sob a poeira apareceu um símbolo antigo.\n\n" +
        "O mesmo símbolo da pena.",

    choices: [
        {
            text:
                "Seguir Kiwi e observar o símbolo.",
            effects: {
                lucas: {
                    intelligence: 2,
                    empathy: 1,
                    xp: 25
                },
                kiwi: {
                    trust: 2,
                    affection: 1,
                    followed: true
                },
                flags: {
                    secretPassage: true,
                    kiwiSecret: true
                }
            },
            next:
                "kiwi_3"
        },

        {
            text:
                "Pedir que Kiwi mostre onde fica a entrada.",
            effects: {
                lucas: {
                    bravery: 1,
                    intelligence: 1,
                    xp: 25
                },
                kiwi: {
                    trust: 1,
                    followed: true
                },
                flags: {
                    secretPassage: true
                }
            },
            next:
                "kiwi_3"
        },

        {
            text:
                "Voltar para Hogwarts antes de continuar.",
            effects: {
                lucas: {
                    loyalty: 1,
                    xp: 20
                },
                relationship: {
                    trust: 1
                }
            },
            next:
                "kiwi_3"
        }
    ]
};


scenes.kiwi_3 = {
    chapter: 5,
    location: "Corredor subterrâneo",

    title:
        "A escolha de Kiwi",

    mode: "both",

    text:
        "O corredor abaixo da biblioteca parecia muito mais antigo que o próprio castelo.\n\n" +
        "As paredes estavam cobertas por raízes.\n\n" +
        "Em vários pontos havia marcas de garras.\n\n" +
        "Kiwi caminhava na frente.\n\n" +
        "De repente, ela parou.\n\n" +
        "Havia uma bifurcação.\n\n" +
        "Um caminho seguia para cima.\n\n" +
        "O outro descia.\n\n" +
        "Kiwi olhou para os dois protagonistas e apontou para o caminho subterrâneo.\n\n" +
        "Depois colocou a pequena pata sobre o coração.\n\n" +
        "Ela estava com medo.\n\n" +
        "Mas queria continuar.",

    choices: [
        {
            text:
                "Confiar em Kiwi e seguir pelo caminho subterrâneo.",
            effects: {
                sasah: {
                    bravery: 2,
                    xp: 30
                },
                lucas: {
                    bravery: 2,
                    xp: 30
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                },
                kiwi: {
                    trust: 2,
                    affection: 2,
                    followed: true
                },
                flags: {
                    secretPassage: true
                }
            },
            next:
                "forest_1"
        },

        {
            text:
                "Escolher o caminho de cima e investigar primeiro.",
            effects: {
                sasah: {
                    intelligence: 1,
                    xp: 25
                },
                lucas: {
                    intelligence: 1,
                    xp: 25
                },
                kiwi: {
                    trust: -1
                }
            },
            next:
                "forest_1"
        },

        {
            text:
                "Perguntar a Kiwi por que ela tem medo.",
            effects: {
                sasah: {
                    empathy: 2,
                    xp: 25
                },
                lucas: {
                    empathy: 2,
                    xp: 25
                },
                relationship: {
                    friendship: 1,
                    trust: 2
                },
                kiwi: {
                    trust: 3,
                    affection: 2
                }
            },
            next:
                "forest_1"
        }
    ]
};


/* =========================================================
   ARCO III — FLORESTA PROIBIDA
========================================================= */

scenes.forest_1 = {
    chapter: 6,
    location: "Floresta Proibida",

    title:
        "Entre as árvores",

    mode: "sasah",

    text:
        "A trilha terminou diante da Floresta Proibida.\n\n" +
        "A noite havia chegado.\n\n" +
        "As árvores eram tão altas que escondiam as estrelas.\n\n" +
        "Kiwi avançava cuidadosamente entre as raízes.\n\n" +
        "{P1} percebeu que a criatura parecia conhecer aquele lugar.\n\n" +
        "De repente, um galho estalou atrás deles.\n\n" +
        "Depois outro.\n\n" +
        "E outro.\n\n" +
        "Alguma coisa estava seguindo o grupo.\n\n" +
        "Kiwi parou.\n\n" +
        "Seu pelo se arrepiou.\n\n" +
        "No escuro, dois olhos apareceram.",

    choices: [
        {
            text:
                "Ficar entre Kiwi e a criatura.",
            effects: {
                sasah: {
                    bravery: 3,
                    hp: -10,
                    xp: 30
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                },
                relationship: {
                    trust: 1
                }
            },
            next:
                "forest_2"
        },

        {
            text:
                "Usar magia para iluminar a floresta.",
            effects: {
                sasah: {
                    magic: 2,
                    mana: -15,
                    xp: 30
                },
                flags: {
                    forest: true
                }
            },
            next:
                "forest_2"
        },

        {
            text:
                "Ficar imóvel e observar os olhos.",
            effects: {
                sasah: {
                    intelligence: 2,
                    xp: 25
                },
                flags: {
                    forest: true
                }
            },
            next:
                "forest_2"
        }
    ]
};


scenes.forest_2 = {
    chapter: 6,
    location: "Floresta Proibida",

    title:
        "A sombra",

    mode: "lucas",

    text:
        "A criatura saiu da escuridão.\n\n" +
        "Não era um monstro.\n\n" +
        "Era um animal ferido.\n\n" +
        "Uma grande criatura mágica estava presa entre raízes.\n\n" +
        "Kiwi correu até ela.\n\n" +
        "{P2} percebeu imediatamente que alguma coisa estava errada.\n\n" +
        "Havia marcas negras no corpo do animal.\n\n" +
        "Marcas parecidas com aquelas encontradas no livro.\n\n" +
        "Kiwi tocou uma das marcas.\n\n" +
        "A pequena criatura recuou como se tivesse sentido dor.\n\n" +
        "Alguém estava corrompendo a magia da floresta.",

    choices: [
        {
            text:
                "Tentar curar o animal.",
            effects: {
                lucas: {
                    empathy: 2,
                    magic: 1,
                    mana: -20,
                    xp: 35
                },
                kiwi: {
                    affection: 2,
                    trust: 2,
                    helped: true
                },
                flags: {
                    forest: true
                }
            },
            next:
                "forest_3"
        },

        {
            text:
                "Examinar as marcas negras.",
            effects: {
                lucas: {
                    intelligence: 3,
                    xp: 35
                },
                flags: {
                    forest: true,
                    ancientMagic: true
                }
            },
            next:
                "forest_3"
        },

        {
            text:
                "Levar o animal para longe do perigo.",
            effects: {
                lucas: {
                    bravery: 1,
                    loyalty: 1,
                    hp: -5,
                    xp: 30
                },
                kiwi: {
                    trust: 1
                },
                flags: {
                    forest: true
                }
            },
            next:
                "forest_3"
        }
    ]
};


scenes.forest_3 = {
    chapter: 6,
    location: "Clareira escondida",

    title:
        "A mensagem nas árvores",

    mode: "both",

    text:
        "Na clareira havia uma pedra coberta por musgo.\n\n" +
        "Quando os dois protagonistas se aproximaram, a pedra começou a emitir uma luz fraca.\n\n" +
        "Letras antigas apareceram na superfície.\n\n" +
        "“Quando a barreira cair, aquele que dorme sob o lago despertará.”\n\n" +
        "Kiwi ficou imóvel.\n\n" +
        "Ela sabia o significado daquela frase.\n\n" +
        "O problema era que agora os protagonistas também sabiam.\n\n" +
        "O mistério não estava limitado à floresta.\n\n" +
        "Estava espalhado por toda Hogwarts.",

    choices: [
        {
            text:
                "Prometer que protegerão Kiwi.",
            effects: {
                sasah: {
                    loyalty: 1,
                    empathy: 1,
                    xp: 30
                },
                lucas: {
                    loyalty: 1,
                    empathy: 1,
                    xp: 30
                },
                relationship: {
                    friendship: 3,
                    trust: 3
                },
                kiwi: {
                    trust: 2,
                    affection: 3
                }
            },
            next:
                "lake_1"
        },

        {
            text:
                "Decidir investigar o lago imediatamente.",
            effects: {
                sasah: {
                    bravery: 2,
                    xp: 30
                },
                lucas: {
                    intelligence: 2,
                    xp: 30
                },
                flags: {
                    lake: true
                }
            },
            next:
                "lake_1"
        },

        {
            text:
                "Voltar para Hogwarts e contar tudo a um professor.",
            effects: {
                sasah: {
                    loyalty: 1,
                    xp: 25
                },
                lucas: {
                    intelligence: 1,
                    xp: 25
                },
                flags: {
                    professorMissing: true
                }
            },
            next:
                "lake_1"
        }
    ]
};
/* =========================================================
   ARCO IV — O LAGO NEGRO
========================================================= */

scenes.lake_1 = {
    chapter: 7,
    location: "Margens do Lago Negro",

    title:
        "O chamado sob a água",

    mode: "both",

    text:
        "O Lago Negro estava completamente imóvel naquela noite.\n\n" +
        "Não havia vento.\n\n" +
        "Não havia ondas.\n\n" +
        "Nem mesmo os sons habituais das criaturas noturnas pareciam existir.\n\n" +
        "Kiwi permaneceu próxima dos dois protagonistas, olhando fixamente para a superfície escura.\n\n" +
        "{P1} percebeu primeiro.\n\n" +
        "Havia uma luz azulada no fundo do lago.\n\n" +
        "{P2} também a viu.\n\n" +
        "A luz desapareceu.\n\n" +
        "Depois reapareceu mais perto da margem.\n\n" +
        "Uma terceira vez.\n\n" +
        "Agora estava exatamente abaixo deles.\n\n" +
        "A água começou a formar pequenos círculos.\n\n" +
        "Kiwi recuou.\n\n" +
        "Alguma coisa estava chamando.",

    choices: [
        {
            text:
                "Aproximar-se da margem e observar a luz.",
            effects: {
                sasah: {
                    bravery: 2,
                    xp: 30
                },
                lucas: {
                    intelligence: 1,
                    xp: 25
                },
                relationship: {
                    friendship: 1,
                    trust: 1
                },
                flags: {
                    lake: true
                }
            },
            next:
                "lake_2"
        },

        {
            text:
                "Estudar a água antes de chegar mais perto.",
            effects: {
                sasah: {
                    intelligence: 1,
                    magic: 1,
                    xp: 30
                },
                lucas: {
                    intelligence: 2,
                    magic: 1,
                    xp: 30
                },
                flags: {
                    lake: true,
                    ancientMagic: true
                }
            },
            next:
                "lake_2"
        },

        {
            text:
                "Perguntar a Kiwi se ela sabe o que existe lá embaixo.",
            effects: {
                sasah: {
                    empathy: 2,
                    xp: 25
                },
                lucas: {
                    empathy: 2,
                    xp: 25
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                },
                flags: {
                    kiwiSecret: true,
                    lake: true
                }
            },
            next:
                "lake_2"
        }
    ]
};


scenes.lake_2 = {
    chapter: 7,
    location: "Lago Negro",

    title:
        "A memória da água",

    mode: "sasah",

    text:
        "A superfície do lago se abriu sem que ninguém a tocasse.\n\n" +
        "Uma coluna de água ergueu-se lentamente diante de {P1}.\n\n" +
        "Dentro dela havia imagens.\n\n" +
        "Não eram reflexos.\n\n" +
        "Eram memórias.\n\n" +
        "{P1} viu Hogwarts muitos anos antes.\n\n" +
        "Viu corredores diferentes.\n\n" +
        "Viu professores que já não estavam vivos.\n\n" +
        "E viu uma sala subterrânea onde várias pessoas cercavam um objeto brilhante.\n\n" +
        "No centro da sala havia uma figura encapuzada.\n\n" +
        "A figura segurava uma pequena criatura.\n\n" +
        "Uma Lebrílope.\n\n" +
        "Era Kiwi.\n\n" +
        "Mas a memória era antiga.\n\n" +
        "Muito antiga.\n\n" +
        "A figura encapuzada sussurrou:\n\n" +
        "“Enquanto a criatura existir, a Câmara permanecerá protegida.”\n\n" +
        "Então a memória desapareceu.",

    choices: [
        {
            text:
                "Tentar tocar a memória para descobrir mais.",
            effects: {
                sasah: {
                    magic: 2,
                    intelligence: 1,
                    mana: -20,
                    xp: 35
                },
                kiwi: {
                    trust: 1
                },
                flags: {
                    ancientMagic: true,
                    lakeArtifact: true
                }
            },
            next:
                "lake_3"
        },

        {
            text:
                "Recuar e contar tudo a {P2}.",
            effects: {
                sasah: {
                    loyalty: 2,
                    xp: 30
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                }
            },
            next:
                "lake_3"
        },

        {
            text:
                "Tentar memorizar todos os detalhes.",
            effects: {
                sasah: {
                    intelligence: 3,
                    xp: 35
                },
                flags: {
                    lakeArtifact: true
                }
            },
            next:
                "lake_3"
        }
    ]
};


scenes.lake_3 = {
    chapter: 7,
    location: "Margem do Lago",

    title:
        "A verdade de Kiwi",

    mode: "lucas",

    text:
        "{P2} ouviu tudo em silêncio.\n\n" +
        "Kiwi permaneceu olhando para o lago.\n\n" +
        "Quando {P2} mencionou a Câmara, a pequena criatura começou a tremer.\n\n" +
        "Ela então fez algo que nunca havia feito antes.\n\n" +
        "Tocou a própria testa e depois apontou para {P2}.\n\n" +
        "Uma pequena imagem apareceu no ar.\n\n" +
        "Era uma lembrança de Kiwi.\n\n" +
        "Ela estava sozinha em uma floresta.\n\n" +
        "Depois estava em Hogwarts.\n\n" +
        "Depois, em uma sala subterrânea.\n\n" +
        "E, finalmente, diante de uma porta enorme.\n\n" +
        "A porta tinha duas fechaduras.\n\n" +
        "Uma para cada protagonista.\n\n" +
        "Kiwi estava tentando mostrar que o livro não era apenas uma pista.\n\n" +
        "Era uma chave.",

    choices: [
        {
            text:
                "Prometer que ninguém usará Kiwi como chave.",
            effects: {
                lucas: {
                    empathy: 2,
                    loyalty: 2,
                    xp: 35
                },
                relationship: {
                    friendship: 2,
                    trust: 3
                },
                kiwi: {
                    trust: 3,
                    affection: 3
                },
                flags: {
                    kiwiSecret: true
                }
            },
            next:
                "mirror_1"
        },

        {
            text:
                "Perguntar o que existe atrás da porta.",
            effects: {
                lucas: {
                    intelligence: 2,
                    xp: 30
                },
                kiwi: {
                    trust: 1
                }
            },
            next:
                "mirror_1"
        },

        {
            text:
                "Perguntar quem tentou capturar Kiwi.",
            effects: {
                lucas: {
                    ambition: 1,
                    intelligence: 2,
                    xp: 35
                },
                kiwi: {
                    trust: 2
                },
                flags: {
                    societyDiscovered: true
                }
            },
            next:
                "mirror_1"
        }
    ]
};


/* =========================================================
   ARCO V — O ESPELHO
========================================================= */

scenes.mirror_1 = {
    chapter: 8,
    location: "Torre antiga de Hogwarts",

    title:
        "O espelho impossível",

    mode: "both",

    text:
        "As pistas levaram os protagonistas até uma torre que quase nunca era utilizada.\n\n" +
        "A porta estava destrancada.\n\n" +
        "No interior havia apenas uma sala circular.\n\n" +
        "E um espelho.\n\n" +
        "O espelho era enorme.\n\n" +
        "Sua moldura parecia feita de prata envelhecida.\n\n" +
        "Quando {P1} olhou para o reflexo, não viu a própria imagem.\n\n" +
        "Viu uma versão de si mesmo em um futuro diferente.\n\n" +
        "Quando {P2} olhou, também viu outra possibilidade.\n\n" +
        "Kiwi se recusou a olhar.\n\n" +
        "O espelho então mostrou os dois protagonistas juntos.\n\n" +
        "Eles estavam diante da Câmara.\n\n" +
        "Mas um deles estava segurando a mão da figura encapuzada.",

    choices: [
        {
            text:
                "Aproximar-se do espelho.",
            effects: {
                sasah: {
                    bravery: 1,
                    magic: 1,
                    xp: 30
                },
                lucas: {
                    bravery: 1,
                    magic: 1,
                    xp: 30
                },
                flags: {
                    mirror: true
                }
            },
            next:
                "mirror_2"
        },

        {
            text:
                "Não confiar no que o espelho mostra.",
            effects: {
                sasah: {
                    intelligence: 2,
                    xp: 30
                },
                lucas: {
                    intelligence: 2,
                    xp: 30
                },
                relationship: {
                    trust: 2
                },
                flags: {
                    mirror: true
                }
            },
            next:
                "mirror_2"
        },

        {
            text:
                "Perguntar a Kiwi por que ela não quer olhar.",
            effects: {
                sasah: {
                    empathy: 2,
                    xp: 25
                },
                lucas: {
                    empathy: 2,
                    xp: 25
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                },
                flags: {
                    mirror: true
                }
            },
            next:
                "mirror_2"
        }
    ]
};


scenes.mirror_2 = {
    chapter: 8,
    location: "Torre antiga",

    title:
        "O futuro que não aconteceu",

    mode: "sasah",

    text:
        "O reflexo mudou.\n\n" +
        "Agora {P1} viu uma versão de Hogwarts completamente destruída.\n\n" +
        "Os corredores estavam vazios.\n\n" +
        "As janelas estavam quebradas.\n\n" +
        "A magia havia desaparecido.\n\n" +
        "No centro das ruínas estava uma pessoa usando uma máscara negra.\n\n" +
        "A pessoa segurava o mesmo livro encontrado no trem.\n\n" +
        "Então o reflexo mostrou uma cena diferente.\n\n" +
        "{P1} estava sozinho.\n\n" +
        "Kiwi havia desaparecido.\n\n" +
        "{P2} estava do outro lado de uma porta.\n\n" +
        "E uma voz dizia:\n\n" +
        "“Você pode salvar Hogwarts. Mas não pode salvar todos.”\n\n" +
        "O espelho começou a rachar.",

    choices: [
        {
            text:
                "Quebrar o espelho.",
            effects: {
                sasah: {
                    bravery: 2,
                    magic: 1,
                    hp: -10,
                    xp: 35
                },
                flags: {
                    mirrorBroken: true
                }
            },
            next:
                "mirror_3"
        },

        {
            text:
                "Resistir à visão e procurar uma saída.",
            effects: {
                sasah: {
                    intelligence: 2,
                    bravery: 1,
                    xp: 35
                }
            },
            next:
                "mirror_3"
        },

        {
            text:
                "Tentar descobrir quem é a figura mascarada.",
            effects: {
                sasah: {
                    intelligence: 3,
                    xp: 35
                },
                flags: {
                    societyDiscovered: true
                }
            },
            next:
                "mirror_3"
        }
    ]
};


scenes.mirror_3 = {
    chapter: 8,
    location: "Torre antiga",

    title:
        "A escolha de {P2}",

    mode: "lucas",

    text:
        "{P2} percebeu algo que {P1} não havia percebido.\n\n" +
        "As rachaduras do espelho formavam letras.\n\n" +
        "Uma mensagem estava escondida nelas.\n\n" +
        "“O futuro não é uma profecia. É uma possibilidade.”\n\n" +
        "A figura mascarada apareceu novamente no reflexo.\n\n" +
        "Dessa vez, porém, seu rosto ficou visível por um segundo.\n\n" +
        "Era alguém de Hogwarts.\n\n" +
        "Alguém que os protagonistas já haviam visto.\n\n" +
        "Antes que {P2} pudesse reconhecer completamente a pessoa, o espelho explodiu em luz.",

    choices: [
        {
            text:
                "Guardar a informação em segredo.",
            effects: {
                lucas: {
                    ambition: 1,
                    intelligence: 2,
                    xp: 30
                },
                relationship: {
                    trust: -1
                },
                flags: {
                    betrayal: true
                }
            },
            next:
                "catacombs_1"
        },

        {
            text:
                "Contar imediatamente tudo a {P1}.",
            effects: {
                lucas: {
                    loyalty: 2,
                    xp: 30
                },
                relationship: {
                    trust: 3,
                    friendship: 2
                }
            },
            next:
                "catacombs_1"
        },

        {
            text:
                "Tentar recuperar um pedaço do espelho.",
            effects: {
                lucas: {
                    intelligence: 2,
                    magic: 1,
                    xp: 30
                },
                flags: {
                    mirrorBroken: true
                }
            },
            next:
                "catacombs_1"
        }
    ]
};


/* =========================================================
   ARCO VI — AS CATACUMBAS
========================================================= */

scenes.catacombs_1 = {
    chapter: 9,
    location: "Passagem subterrânea",

    title:
        "Abaixo do castelo",

    mode: "both",

    text:
        "A passagem encontrada sob a torre levava para uma parte de Hogwarts que não aparecia em nenhum mapa.\n\n" +
        "As paredes eram de pedra negra.\n\n" +
        "Não havia retratos.\n\n" +
        "Não havia tochas.\n\n" +
        "Apenas pequenas runas brilhavam no chão.\n\n" +
        "Kiwi caminhava lentamente entre elas.\n\n" +
        "De repente, uma das runas se acendeu.\n\n" +
        "Depois outra.\n\n" +
        "Depois todas.\n\n" +
        "Uma voz ecoou pelo corredor:\n\n" +
        "“Dois chegaram. Um deles abrirá a porta.”\n\n" +
        "Kiwi começou a rosnar.",

    choices: [
        {
            text:
                "Responder que ninguém abrirá porta alguma.",
            effects: {
                sasah: {
                    bravery: 2,
                    xp: 30
                },
                lucas: {
                    bravery: 1,
                    xp: 30
                },
                kiwi: {
                    trust: 1
                },
                relationship: {
                    trust: 2
                }
            },
            next:
                "catacombs_2"
        },

        {
            text:
                "Perguntar quem está falando.",
            effects: {
                sasah: {
                    intelligence: 1,
                    xp: 25
                },
                lucas: {
                    intelligence: 2,
                    xp: 25
                }
            },
            next:
                "catacombs_2"
        },

        {
            text:
                "Preparar-se para um possível ataque.",
            effects: {
                sasah: {
                    bravery: 2,
                    magic: 1,
                    xp: 30
                },
                lucas: {
                    bravery: 2,
                    magic: 1,
                    xp: 30
                }
            },
            next:
                "catacombs_2"
        }
    ]
};


scenes.catacombs_2 = {
    chapter: 9,
    location: "Catacumbas",

    title:
        "As estátuas",

    mode: "sasah",

    text:
        "Uma porta de pedra se abriu.\n\n" +
        "Atrás dela havia uma enorme câmara circular.\n\n" +
        "Ao redor das paredes estavam estátuas de antigos bruxos.\n\n" +
        "Cada estátua segurava uma varinha.\n\n" +
        "No centro havia uma inscrição:\n\n" +
        "“Somente quem não deseja possuir o poder poderá atravessar.”\n\n" +
        "Assim que {P1} deu um passo, todas as estátuas apontaram suas varinhas para ele.\n\n" +
        "Uma delas falou:\n\n" +
        "“O que você deseja?”",

    choices: [
        {
            text:
                "“Quero poder suficiente para proteger quem amo.”",
            effects: {
                sasah: {
                    bravery: 1,
                    empathy: 2,
                    xp: 35
                },
                relationship: {
                    friendship: 2
                }
            },
            next:
                "catacombs_3"
        },

        {
            text:
                "“Quero descobrir a verdade.”",
            effects: {
                sasah: {
                    intelligence: 3,
                    xp: 35
                }
            },
            next:
                "catacombs_3"
        },

        {
            text:
                "“Não quero o poder de vocês.”",
            effects: {
                sasah: {
                    empathy: 1,
                    bravery: 2,
                    xp: 40
                },
                flags: {
                    finalSeal: true
                }
            },
            next:
                "catacombs_3"
        }
    ]
};


scenes.catacombs_3 = {
    chapter: 9,
    location: "Câmara das Estátuas",

    title:
        "O preço da passagem",

    mode: "lucas",

    text:
        "As estátuas ficaram em silêncio.\n\n" +
        "Então uma delas se aproximou de {P2}.\n\n" +
        "“Todo poder possui um preço.”\n\n" +
        "A estátua abriu a mão.\n\n" +
        "Dentro dela havia uma pequena pedra azul.\n\n" +
        "“Você pode carregá-la consigo. Ela responderá à magia antiga.”\n\n" +
        "Kiwi olhou para a pedra e imediatamente se escondeu atrás de {P1}.\n\n" +
        "Alguma coisa naquela pedra a assustava.\n\n" +
        "Talvez fosse exatamente o objeto que os inimigos procuravam.",

    choices: [
        {
            text:
                "Pegar a pedra.",
            effects: {
                lucas: {
                    magic: 2,
                    ambition: 1,
                    xp: 40
                },
                kiwi: {
                    trust: -1
                },
                flags: {
                    ancientArtifact: true
                }
            },
            next:
                "society_1"
        },

        {
            text:
                "Recusar a pedra.",
            effects: {
                lucas: {
                    empathy: 1,
                    loyalty: 2,
                    xp: 35
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                },
                relationship: {
                    trust: 2
                }
            },
            next:
                "society_1"
        },

        {
            text:
                "Perguntar à estátua por que Kiwi tem medo dela.",
            effects: {
                lucas: {
                    intelligence: 2,
                    empathy: 1,
                    xp: 40
                },
                kiwi: {
                    trust: 3,
                    affection: 2
                },
                flags: {
                    kiwiSecret: true
                }
            },
            next:
                "society_1"
        }
    ]
};


/* =========================================================
   ARCO VII — A SOCIEDADE DAS SOMBRAS
========================================================= */

scenes.society_1 = {
    chapter: 10,
    location: "Hogwarts — corredor oeste",

    title:
        "Os símbolos nas paredes",

    mode: "both",

    text:
        "Ao retornarem às áreas conhecidas do castelo, os protagonistas perceberam que alguma coisa havia mudado.\n\n" +
        "Pequenos símbolos negros apareciam nas paredes.\n\n" +
        "Não estavam ali antes.\n\n" +
        "Kiwi reconheceu o símbolo imediatamente.\n\n" +
        "Era o mesmo que aparecia na memória do lago.\n\n" +
        "Um estudante passou pelos dois e parou diante de uma das marcas.\n\n" +
        "Ele tocou o símbolo.\n\n" +
        "Por um instante, seus olhos ficaram completamente negros.\n\n" +
        "Depois ele continuou andando como se nada tivesse acontecido.\n\n" +
        "A ameaça estava dentro de Hogwarts.",

    choices: [
        {
            text:
                "Seguir o estudante.",
            effects: {
                sasah: {
                    bravery: 1,
                    xp: 30
                },
                lucas: {
                    intelligence: 2,
                    xp: 30
                },
                flags: {
                    societyDiscovered: true
                }
            },
            next:
                "society_2"
        },

        {
            text:
                "Investigar o símbolo.",
            effects: {
                sasah: {
                    intelligence: 2,
                    xp: 30
                },
                lucas: {
                    intelligence: 2,
                    magic: 1,
                    xp: 35
                },
                flags: {
                    societyDiscovered: true
                }
            },
            next:
                "society_2"
        },

        {
            text:
                "Levar Kiwi para um lugar seguro.",
            effects: {
                sasah: {
                    empathy: 1,
                    loyalty: 1,
                    xp: 30
                },
                lucas: {
                    empathy: 1,
                    loyalty: 1,
                    xp: 30
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                },
                relationship: {
                    friendship: 2
                }
            },
            next:
                "society_2"
        }
    ]
};


scenes.society_2 = {
    chapter: 10,
    location: "Sala abandonada",

    title:
        "A Sociedade das Sombras",

    mode: "lucas",

    text:
        "{P2} encontrou uma sala escondida atrás de uma tapeçaria.\n\n" +
        "Havia dezenas de símbolos nas paredes.\n\n" +
        "No centro da sala havia uma mesa circular.\n\n" +
        "Sobre ela estavam documentos antigos.\n\n" +
        "Um deles tinha um título:\n\n" +
        "“Sociedade das Sombras — Projeto Lebrílope.”\n\n" +
        "As páginas explicavam que a Sociedade procurava uma criatura capaz de atravessar as barreiras mágicas que protegiam a Câmara Antiga.\n\n" +
        "Kiwi não era apenas uma testemunha.\n\n" +
        "Ela era a última criatura capaz de abrir o caminho.",

    choices: [
        {
            text:
                "Guardar os documentos como prova.",
            effects: {
                lucas: {
                    intelligence: 2,
                    loyalty: 1,
                    xp: 40
                },
                flags: {
                    societyDiscovered: true,
                    kiwiSecret: true
                }
            },
            next:
                "society_3"
        },

        {
            text:
                "Destruir os documentos para que ninguém os use.",
            effects: {
                lucas: {
                    bravery: 2,
                    xp: 35
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                },
                flags: {
                    societyDiscovered: true
                }
            },
            next:
                "society_3"
        },

        {
            text:
                "Procurar o nome de quem lidera a Sociedade.",
            effects: {
                lucas: {
                    intelligence: 3,
                    ambition: 1,
                    xp: 45
                },
                flags: {
                    societyDiscovered: true,
                    professorClue: true
                }
            },
            next:
                "society_3"
        }
    ]
};


scenes.society_3 = {
    chapter: 10,
    location: "Sala abandonada",

    title:
        "A revelação",

    mode: "both",

    text:
        "Os documentos revelaram uma verdade assustadora.\n\n" +
        "A Sociedade das Sombras existia havia décadas.\n\n" +
        "Seus membros estavam espalhados entre antigos alunos, funcionários e pessoas que nunca haviam deixado Hogwarts.\n\n" +
        "O objetivo era abrir a Câmara da Magia Antiga.\n\n" +
        "Mas havia um problema.\n\n" +
        "A Câmara não podia ser aberta por força.\n\n" +
        "Precisava de uma criatura que reconhecesse seus verdadeiros guardiões.\n\n" +
        "Kiwi.\n\n" +
        "E, segundo os documentos, os guardiões seriam duas pessoas escolhidas pelo próprio castelo.\n\n" +
        "Os dois protagonistas olharam um para o outro.\n\n" +
        "Eles finalmente entenderam por que as cartas haviam chegado.",

    choices: [
        {
            text:
                "Aceitar o papel de guardiões.",
            effects: {
                sasah: {
                    bravery: 2,
                    magic: 1,
                    xp: 40
                },
                lucas: {
                    bravery: 2,
                    magic: 1,
                    xp: 40
                },
                relationship: {
                    friendship: 3,
                    trust: 3
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                },
                flags: {
                    guardian: true
                }
            },
            next:
                "invasion_1"
        },

        {
            text:
                "Recusar o destino e proteger apenas Kiwi.",
            effects: {
                sasah: {
                    empathy: 2,
                    loyalty: 2,
                    xp: 40
                },
                lucas: {
                    empathy: 2,
                    loyalty: 2,
                    xp: 40
                },
                relationship: {
                    friendship: 3,
                    trust: 3
                },
                kiwi: {
                    trust: 3,
                    affection: 3,
                    finalAlly: true
                }
            },
            next:
                "invasion_1"
        },

        {
            text:
                "Descobrir primeiro quem escreveu as cartas.",
            effects: {
                sasah: {
                    intelligence: 2,
                    xp: 35
                },
                lucas: {
                    intelligence: 2,
                    xp: 35
                },
                flags: {
                    guardian: true,
                    professorClue: true
                }
            },
            next:
                "invasion_1"
        }
    ]
};


/* =========================================================
   ARCO VIII — A QUEDA DAS BARREIRAS
========================================================= */

scenes.invasion_1 = {
    chapter: 11,
    location: "Hogwarts",

    title:
        "A noite em que Hogwarts mudou",

    mode: "both",

    text:
        "O ataque começou pouco antes da meia-noite.\n\n" +
        "Primeiro foram as luzes.\n\n" +
        "Depois os retratos.\n\n" +
        "Então todas as portas do castelo se fecharam ao mesmo tempo.\n\n" +
        "Um estrondo percorreu as torres.\n\n" +
        "A barreira mágica de Hogwarts estava sendo atacada.\n\n" +
        "Estudantes corriam pelos corredores.\n\n" +
        "Professores tentavam proteger as entradas.\n\n" +
        "Kiwi desapareceu no meio da confusão.\n\n" +
        "Os dois protagonistas ouviram um som vindo do subterrâneo.\n\n" +
        "A Câmara estava despertando.",

    choices: [
        {
            text:
                "Procurar Kiwi.",
            effects: {
                sasah: {
                    bravery: 2,
                    xp: 35
                },
                lucas: {
                    empathy: 2,
                    xp: 35
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                },
                kiwi: {
                    affection: 2
                }
            },
            next:
                "invasion_2"
        },

        {
            text:
                "Ajudar os estudantes a chegarem em segurança.",
            effects: {
                sasah: {
                    bravery: 2,
                    loyalty: 2,
                    hp: -10,
                    xp: 40
                },
                lucas: {
                    loyalty: 2,
                    empathy: 1,
                    hp: -10,
                    xp: 40
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                }
            },
            next:
                "invasion_2"
        },

        {
            text:
                "Ir diretamente para a entrada subterrânea.",
            effects: {
                sasah: {
                    bravery: 3,
                    hp: -15,
                    xp: 40
                },
                lucas: {
                    bravery: 2,
                    magic: 1,
                    hp: -10,
                    xp: 40
                },
                flags: {
                    finalChamber: true
                }
            },
            next:
                "invasion_2"
        }
    ]
};


scenes.invasion_2 = {
    chapter: 11,
    location: "Subterrâneo de Hogwarts",

    title:
        "A criatura capturada",

    mode: "sasah",

    text:
        "{P1} encontrou Kiwi presa dentro de um círculo mágico.\n\n" +
        "A pequena criatura tentava escapar, mas as runas ao redor dela impediam qualquer movimento.\n\n" +
        "Do outro lado da sala estava uma figura encapuzada.\n\n" +
        "A mesma figura do espelho.\n\n" +
        "Ela levantou a cabeça.\n\n" +
        "“Vocês chegaram exatamente como previsto.”\n\n" +
        "A figura segurava a pedra azul.\n\n" +
        "“Apenas precisamos da Lebrílope. O resto de vocês é descartável.”\n\n" +
        "Kiwi olhou para {P1}.\n\n" +
        "Ela estava assustada.",

    choices: [
        {
            text:
                "Atacar imediatamente.",
            effects: {
                sasah: {
                    bravery: 3,
                    magic: 1,
                    mana: -25,
                    hp: -15,
                    xp: 50
                },
                kiwi: {
                    trust: 2,
                    affection: 2,
                    rescued: true
                },
                flags: {
                    invasion: true
                }
            },
            next:
                "invasion_3"
        },

        {
            text:
                "Distrair a figura para libertar Kiwi.",
            effects: {
                sasah: {
                    intelligence: 2,
                    bravery: 1,
                    xp: 50
                },
                kiwi: {
                    trust: 3,
                    affection: 3,
                    rescued: true,
                    helped: true
                },
                flags: {
                    invasion: true
                }
            },
            next:
                "invasion_3"
        },

        {
            text:
                "Tentar quebrar as runas sem atacar.",
            effects: {
                sasah: {
                    magic: 2,
                    intelligence: 2,
                    mana: -30,
                    xp: 50
                },
                kiwi: {
                    trust: 3,
                    rescued: true
                },
                flags: {
                    invasion: true
                }
            },
            next:
                "invasion_3"
        }
    ]
};


scenes.invasion_3 = {
    chapter: 11,
    location: "Câmara subterrânea",

    title:
        "A verdadeira face",

    mode: "lucas",

    text:
        "Quando {P2} chegou, a figura finalmente removeu a máscara.\n\n" +
        "Era alguém que os protagonistas conheciam.\n\n" +
        "Um professor.\n\n" +
        "Durante todo aquele tempo, ele havia guiado os estudantes para encontrar as pistas.\n\n" +
        "As cartas também haviam sido enviadas por ele.\n\n" +
        "Mas havia uma diferença importante.\n\n" +
        "Ele não queria destruir Hogwarts.\n\n" +
        "Acreditava que a magia antiga deveria pertencer a alguém capaz de controlá-la.\n\n" +
        "“O castelo escolheu vocês porque vocês são fortes juntos”, disse ele.\n\n" +
        "“Mas força não significa merecimento.”",

    choices: [
        {
            text:
                "Confrontá-lo sobre o uso de Kiwi.",
            effects: {
                lucas: {
                    bravery: 2,
                    empathy: 1,
                    xp: 45
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                }
            },
            next:
                "ancient_1"
        },

        {
            text:
                "Perguntar o que existe dentro da Câmara.",
            effects: {
                lucas: {
                    intelligence: 3,
                    xp: 45
                }
            },
            next:
                "ancient_1"
        },

        {
            text:
                "Exigir que ele liberte Kiwi.",
            effects: {
                lucas: {
                    bravery: 2,
                    loyalty: 2,
                    xp: 45
                },
                relationship: {
                    trust: 2
                },
                kiwi: {
                    trust: 3,
                    affection: 2
                }
            },
            next:
                "ancient_1"
        }
    ]
};


/* =========================================================
   ARCO IX — A CÂMARA DA MAGIA ANTIGA
========================================================= */

scenes.ancient_1 = {
    chapter: 12,
    location: "Entrada da Câmara",

    title:
        "As duas fechaduras",

    mode: "both",

    text:
        "A porta finalmente apareceu.\n\n" +
        "Era muito maior do que qualquer porta de Hogwarts.\n\n" +
        "Duas fechaduras brilhavam em sua superfície.\n\n" +
        "Uma tinha a marca de uma estrela.\n\n" +
        "A outra tinha a marca de uma lua.\n\n" +
        "O livro misterioso flutuou diante da porta.\n\n" +
        "As páginas se abriram sozinhas.\n\n" +
        "A primeira página dizia:\n\n" +
        "“Nenhuma magia antiga deve pertencer a uma única pessoa.”\n\n" +
        "Kiwi se aproximou.\n\n" +
        "A pequena criatura tocou a porta.\n\n" +
        "As duas fechaduras se iluminaram.\n\n" +
        "Agora os protagonistas precisavam decidir como abrir a Câmara.",

    choices: [
        {
            text:
                "Abrir as duas fechaduras juntos.",
            effects: {
                sasah: {
                    magic: 2,
                    bravery: 1,
                    xp: 50
                },
                lucas: {
                    magic: 2,
                    intelligence: 1,
                    xp: 50
                },
                relationship: {
                    friendship: 4,
                    trust: 4
                },
                kiwi: {
                    trust: 2,
                    affection: 2
                },
                flags: {
                    finalChamber: true
                }
            },
            next:
                "ancient_2"
        },

        {
            text:
                "Pedir que Kiwi abra a porta.",
            effects: {
                sasah: {
                    empathy: 2,
                    xp: 45
                },
                lucas: {
                    empathy: 2,
                    xp: 45
                },
                relationship: {
                    friendship: 2,
                    trust: 2
                },
                kiwi: {
                    trust: 4,
                    affection: 4,
                    finalAlly: true
                },
                flags: {
                    finalChamber: true
                }
            },
            next:
                "ancient_2"
        },

        {
            text:
                "Tentar abrir a porta usando a pedra azul.",
            effects: {
                sasah: {
                    magic: 2,
                    ambition: 2,
                    mana: -30,
                    xp: 50
                },
                lucas: {
                    magic: 2,
                    ambition: 1,
                    mana: -30,
                    xp: 50
                },
                kiwi: {
                    trust: -2
                },
                flags: {
                    finalChamber: true
                }
            },
            next:
                "ancient_2"
        }
    ]
};


scenes.ancient_2 = {
    chapter: 12,
    location: "Câmara da Magia Antiga",

    title:
        "O coração de Hogwarts",

    mode: "both",

    text:
        "A porta se abriu.\n\n" +
        "Do outro lado não havia tesouros.\n\n" +
        "Não havia ouro.\n\n" +
        "Não havia uma arma.\n\n" +
        "Havia uma árvore.\n\n" +
        "Uma árvore gigantesca crescia no centro da Câmara.\n\n" +
        "Suas raízes atravessavam o chão e desapareciam nas paredes.\n\n" +
        "Milhares de pequenas luzes percorriam seus galhos.\n\n" +
        "Era como se toda Hogwarts estivesse ligada àquela árvore.\n\n" +
        "Uma voz surgiu dentro da mente dos dois.\n\n" +
        "“A magia não pertence aos fortes.”\n\n" +
        "“Ela pertence aos que escolhem o que fazer com ela.”\n\n" +
        "Kiwi caminhou até a árvore.\n\n" +
        "Uma luz dourada envolveu a criatura.",

    choices: [
        {
            text:
                "Tocar a árvore junto com Kiwi.",
            effects: {
                sasah: {
                    magic: 3,
                    empathy: 2,
                    xp: 60
                },
                lucas: {
                    magic: 3,
                    empathy: 2,
                    xp: 60
                },
                kiwi: {
                    trust: 3,
                    affection: 3,
                    finalAlly: true
                },
                relationship: {
                    friendship: 3,
                    trust: 3
                },
                flags: {
                    ancientMagic: true
                }
            },
            next:
                "final_battle"
        },

        {
            text:
                "Perguntar à árvore por que foram escolhidos.",
            effects: {
                sasah: {
                    intelligence: 2,
                    magic: 2,
                    xp: 55
                },
                lucas: {
                    intelligence: 2,
                    magic: 2,
                    xp: 55
                },
                flags: {
                    ancientMagic: true
                }
            },
            next:
                "final_battle"
        },

        {
            text:
                "Recusar o poder e pedir apenas que Hogwarts seja protegida.",
            effects: {
                sasah: {
                    loyalty: 2,
                    empathy: 3,
                    xp: 60
                },
                lucas: {
                    loyalty: 2,
                    empathy: 3,
                    xp: 60
                },
                relationship: {
                    friendship: 4,
                    trust: 4
                },
                kiwi: {
                    trust: 4,
                    affection: 4,
                    finalAlly: true
                },
                flags: {
                    ancientMagic: true
                }
            },
            next:
                "final_battle"
        }
    ]
};
/* =========================================================
   PARTE 3/6
   ARCO VIII — A GUERRA DAS SOMBRAS
   ARCO IX — A CÂMARA ANTIGA
   ARCO X — O ÚLTIMO TESTE
   ARCO XI — CONSEQUÊNCIAS
   ARCO XII — EPÍLOGOS
========================================================= */


/* =========================================================
   ARCO VIII — A GUERRA DAS SOMBRAS
========================================================= */

scenes.final_war_1 = {
    chapter: 15,
    location: "Corredores de Hogwarts",
    title: "A noite em que Hogwarts caiu em silêncio",
    mode: "both",
    text:
        "O castelo inteiro parece prender a respiração.\n\n" +
        "As tochas dos corredores diminuem até quase desaparecer. " +
        "Por alguns segundos, não há vozes, passos ou risadas de estudantes. " +
        "Existe apenas um silêncio profundo, interrompido pelo som distante de alguma coisa arranhando as paredes.\n\n" +
        "{P1} olha para {P2}. Os dois já entenderam que aquilo não é um simples acidente mágico.\n\n" +
        "Kiwi permanece perto dos dois, arrepiado. Pela primeira vez desde que apareceu na biblioteca, " +
        "o pequeno Lebrílope não parece curioso. Parece realmente assustado.\n\n" +
        "Então as portas do corredor se fecham sozinhas.\n\n" +
        "Uma sombra atravessa o teto.\n\n" +
        "E outra.\n\n" +
        "E outra.\n\n" +
        "Hogwarts está sendo invadida.",
    choices: [
        {
            text: "Procurar outros alunos e tentar protegê-los.",
            effects: {
                sasah: { bravery: 2, empathy: 2, xp: 30 },
                lucas: { bravery: 2, loyalty: 2, xp: 30 },
                relationship: { friendship: 2, trust: 2 },
                flags: { studentsProtected: true }
            },
            next: "final_war_2"
        },
        {
            text: "Ir imediatamente para a Câmara Antiga.",
            effects: {
                sasah: { intelligence: 2, ambition: 1, xp: 30 },
                lucas: { intelligence: 2, ambition: 1, xp: 30 },
                relationship: { trust: 1 },
                flags: { rushedToChamber: true }
            },
            next: "final_war_2"
        },
        {
            text: "Ficar com Kiwi e descobrir o que está deixando-o tão assustado.",
            effects: {
                sasah: { empathy: 3, xp: 30 },
                lucas: { loyalty: 2, empathy: 2, xp: 30 },
                relationship: { friendship: 1, trust: 2 },
                kiwi: { trust: 3 },
                flags: { kiwiProtected: true }
            },
            next: "final_war_2"
        }
    ]
};


scenes.final_war_2 = {
    chapter: 15,
    location: "Grande Salão",
    title: "A defesa de Hogwarts",
    mode: "both",
    text:
        "O Grande Salão está irreconhecível.\n\n" +
        "Mesas foram empurradas para os lados. Professores tentam organizar os estudantes. " +
        "Feitiços de proteção iluminam as portas enquanto sombras se movem do lado de fora.\n\n" +
        "{P1} percebe que vários estudantes estão desesperados.\n\n" +
        "{P2} nota algo ainda mais estranho: algumas das sombras não estão atacando aleatoriamente. " +
        "Elas parecem procurar alguém.\n\n" +
        "Kiwi olha diretamente para os dois protagonistas.\n\n" +
        "— Elas estão procurando a chave.\n\n" +
        "A palavra permanece no ar.\n\n" +
        "A chave.\n\n" +
        "A mesma chave mencionada nos registros antigos.",
    choices: [
        {
            text: "Perguntar a Kiwi onde está a chave.",
            effects: {
                kiwi: { trust: 2 },
                sasah: { intelligence: 1, empathy: 1, xp: 35 },
                lucas: { intelligence: 1, empathy: 1, xp: 35 },
                flags: { askedKiwiAboutKey: true }
            },
            next: "final_war_3"
        },
        {
            text: "Perguntar aos professores sobre a chave.",
            effects: {
                sasah: { intelligence: 2, xp: 35 },
                lucas: { loyalty: 2, xp: 35 },
                flags: { askedTeachers: true }
            },
            next: "final_war_3"
        },
        {
            text: "Não perder tempo e ir atrás da Câmara.",
            effects: {
                sasah: { bravery: 2, xp: 35 },
                lucas: { bravery: 2, xp: 35 },
                flags: { ignoredWarning: true }
            },
            next: "final_war_3"
        }
    ]
};


scenes.final_war_3 = {
    chapter: 15,
    location: "Escadaria principal",
    title: "O inimigo conhece seus nomes",
    mode: "both",
    text:
        "Os dois correm pelos corredores.\n\n" +
        "As escadas mudam de direção. Quadros gritam. Armaduras se movimentam. " +
        "Feitiços atingem as paredes e deixam marcas luminosas no mármore.\n\n" +
        "De repente, todas as luzes se apagam.\n\n" +
        "Uma voz surge atrás deles.\n\n" +
        "— {P1}.\n\n" +
        "O protagonista se vira.\n\n" +
        "— {P2}.\n\n" +
        "A voz conhece os dois.\n\n" +
        "Kiwi se coloca na frente deles.\n\n" +
        "Uma criatura feita de sombras surge no topo da escada.",
    choices: [
        {
            text: "Enfrentar a criatura.",
            effects: {
                sasah: { bravery: 3, magic: -5, hp: -10, xp: 50 },
                lucas: { bravery: 3, magic: -5, hp: -10, xp: 50 },
                relationship: { trust: 2 },
                flags: { defeatedShadowGuard: true }
            },
            next: "ancient_chamber_1"
        },
        {
            text: "Tentar conversar com a criatura.",
            effects: {
                sasah: { intelligence: 2, empathy: 2, xp: 45 },
                lucas: { intelligence: 2, empathy: 2, xp: 45 },
                relationship: { trust: 3 },
                flags: { spokeToShadow: true }
            },
            next: "ancient_chamber_1"
        },
        {
            text: "Usar Kiwi para encontrar uma passagem secreta.",
            effects: {
                kiwi: { trust: 2 },
                sasah: { intelligence: 2, xp: 45 },
                lucas: { loyalty: 2, xp: 45 },
                flags: { secretPassage: true }
            },
            next: "ancient_chamber_1"
        }
    ]
};


/* =========================================================
   ARCO IX — A CÂMARA ANTIGA
========================================================= */

scenes.ancient_chamber_1 = {
    chapter: 16,
    location: "Câmara Antiga",
    title: "Aquilo que estava escondido",
    mode: "both",
    text:
        "A passagem termina diante de uma enorme porta de pedra.\n\n" +
        "Símbolos antigos cobrem sua superfície.\n\n" +
        "Quando {P1} aproxima a mão, os símbolos brilham.\n\n" +
        "Quando {P2} faz o mesmo, uma segunda sequência de símbolos aparece.\n\n" +
        "Kiwi observa em silêncio.\n\n" +
        "— Dois caminhos — diz ele. — Uma única escolha.\n\n" +
        "A porta se abre.\n\n" +
        "Do outro lado existe uma sala circular. No centro, flutuando acima de um pedestal, " +
        "está um objeto envolto em energia escura.\n\n" +
        "A magia antiga finalmente está diante deles.",
    choices: [
        {
            text: "Examinar o objeto antes de tocá-lo.",
            effects: {
                sasah: { intelligence: 3, xp: 50 },
                lucas: { intelligence: 3, xp: 50 },
                flags: { examinedAncientObject: true }
            },
            next: "ancient_chamber_2"
        },
        {
            text: "Tentar destruir o objeto imediatamente.",
            effects: {
                sasah: { bravery: 3, magic: -10, hp: -15, xp: 50 },
                lucas: { bravery: 3, magic: -10, hp: -15, xp: 50 },
                flags: { attackedAncientObject: true }
            },
            next: "ancient_chamber_2"
        },
        {
            text: "Pedir que Kiwi explique o que está acontecendo.",
            effects: {
                kiwi: { trust: 3 },
                sasah: { empathy: 2, xp: 50 },
                lucas: { empathy: 2, xp: 50 },
                flags: { kiwiExplainedAncientMagic: true }
            },
            next: "ancient_chamber_2"
        }
    ]
};


scenes.ancient_chamber_2 = {
    chapter: 16,
    location: "Câmara Antiga",
    title: "A verdade sobre a magia",
    mode: "both",
    text:
        "A energia ao redor do objeto começa a se mover.\n\n" +
        "Imagens aparecem no ar.\n\n" +
        "Os protagonistas veem Hogwarts muitos anos antes de terem nascido. " +
        "Veem estudantes que desapareceram. Veem professores tentando esconder alguma coisa. " +
        "Veem uma magia criada para proteger o castelo, mas que acabou desenvolvendo vontade própria.\n\n" +
        "A magia não é simplesmente boa ou má.\n\n" +
        "Ela reage às escolhas das pessoas.\n\n" +
        "Quanto mais medo, ambição e desconfiança existem ao redor dela, mais poderosa ela se torna.\n\n" +
        "Kiwi finalmente revela sua própria história.\n\n" +
        "Ele não encontrou os protagonistas por acaso.\n\n" +
        "Ele estava procurando duas pessoas capazes de decidir o destino da magia.",
    choices: [
        {
            text: "Aceitar a responsabilidade.",
            effects: {
                sasah: { bravery: 2, empathy: 2, xp: 60 },
                lucas: { bravery: 2, loyalty: 2, xp: 60 },
                relationship: { trust: 3, friendship: 2 },
                kiwi: { trust: 3 },
                flags: { acceptedResponsibility: true }
            },
            next: "ancient_chamber_3"
        },
        {
            text: "Questionar se eles realmente devem decidir isso.",
            effects: {
                sasah: { intelligence: 3, empathy: 2, xp: 60 },
                lucas: { intelligence: 3, empathy: 2, xp: 60 },
                relationship: { trust: 2 },
                flags: { questionedResponsibility: true }
            },
            next: "ancient_chamber_3"
        },
        {
            text: "Recusar o poder e tentar destruí-lo.",
            effects: {
                sasah: { bravery: 3, magic: -10, xp: 60 },
                lucas: { bravery: 3, magic: -10, xp: 60 },
                relationship: { trust: 1 },
                flags: { rejectedMagic: true }
            },
            next: "ancient_chamber_3"
        }
    ]
};


scenes.ancient_chamber_3 = {
    chapter: 16,
    location: "Câmara Antiga",
    title: "A chegada do verdadeiro inimigo",
    mode: "both",
    text:
        "Um estrondo interrompe a conversa.\n\n" +
        "A porta da Câmara Antiga se fecha violentamente.\n\n" +
        "Uma figura entra.\n\n" +
        "O responsável pelas sombras finalmente apareceu.\n\n" +
        "Ele não precisa levantar a voz.\n\n" +
        "A própria sala parece obedecê-lo.\n\n" +
        "— Vocês chegaram exatamente onde eu precisava que chegassem.\n\n" +
        "A criatura estende a mão em direção ao artefato.\n\n" +
        "A energia escura começa a deixar o pedestal.\n\n" +
        "Kiwi grita:\n\n" +
        "— AGORA!",
    choices: [
        {
            text: "Atacar o inimigo diretamente.",
            effects: {
                sasah: { bravery: 3, magic: -15, hp: -15, xp: 70 },
                lucas: { bravery: 3, magic: -15, hp: -15, xp: 70 },
                flags: { directFinalAttack: true }
            },
            next: "final_battle_1"
        },
        {
            text: "Proteger o artefato.",
            effects: {
                sasah: { loyalty: 2, intelligence: 2, magic: -10, xp: 70 },
                lucas: { loyalty: 2, intelligence: 2, magic: -10, xp: 70 },
                relationship: { trust: 3 },
                flags: { protectedArtifact: true }
            },
            next: "final_battle_1"
        },
        {
            text: "Confiar em Kiwi e seguir seu plano.",
            effects: {
                kiwi: { trust: 4 },
                sasah: { empathy: 2, xp: 70 },
                lucas: { empathy: 2, xp: 70 },
                relationship: { trust: 3 },
                flags: { trustedKiwiFinalPlan: true }
            },
            next: "final_battle_1"
        }
    ]
};


/* =========================================================
   ARCO X — A BATALHA FINAL
========================================================= */

scenes.final_battle_1 = {
    chapter: 17,
    location: "Câmara Antiga",
    title: "O último duelo",
    mode: "both",
    text:
        "A batalha começa.\n\n" +
        "O chão treme.\n\n" +
        "As paredes da Câmara Antiga racham enquanto a magia acumulada durante séculos é liberada.\n\n" +
        "{P1} sente a própria varinha vibrar.\n\n" +
        "{P2} percebe que seus feitiços estão ficando cada vez mais difíceis de controlar.\n\n" +
        "O inimigo lança uma onda de energia negra.\n\n" +
        "Os dois protagonistas são separados.",
    choices: [
        {
            text: "{P1} protege {P2}.",
            effects: {
                sasah: { bravery: 2, loyalty: 2, hp: -10, magic: -10, xp: 80 },
                lucas: { hp: -5, trust: 0, xp: 50 },
                relationship: { friendship: 4, trust: 4, rivalry: -2 },
                flags: { p1ProtectedP2: true }
            },
            next: "final_battle_2"
        },
        {
            text: "{P2} protege {P1}.",
            effects: {
                lucas: { bravery: 2, loyalty: 2, hp: -10, magic: -10, xp: 80 },
                sasah: { hp: -5, xp: 50 },
                relationship: { friendship: 4, trust: 4, rivalry: -2 },
                flags: { p2ProtectedP1: true }
            },
            next: "final_battle_2"
        },
        {
            text: "Os dois se recusam a lutar separados.",
            effects: {
                sasah: { loyalty: 2, empathy: 2, magic: -10, xp: 80 },
                lucas: { loyalty: 2, empathy: 2, magic: -10, xp: 80 },
                relationship: { friendship: 5, trust: 5, rivalry: -3 },
                flags: { foughtTogether: true }
            },
            next: "final_battle_2"
        }
    ]
};


scenes.final_battle_2 = {
    chapter: 17,
    location: "Câmara Antiga",
    title: "A escolha impossível",
    mode: "both",
    text:
        "O inimigo está enfraquecido.\n\n" +
        "Mas existe um problema.\n\n" +
        "A magia antiga precisa de um receptáculo.\n\n" +
        "Se ninguém assumir o controle, ela destruirá parte do castelo.\n\n" +
        "Se alguém assumir o controle sozinho, essa pessoa ficará ligada à magia para sempre.\n\n" +
        "Existe ainda uma terceira possibilidade.\n\n" +
        "Os dois podem dividir o vínculo.\n\n" +
        "Mas isso exigirá confiança absoluta.\n\n" +
        "Kiwi olha para os protagonistas.\n\n" +
        "— Vocês precisam escolher.",
    choices: [
        {
            text: "Um dos dois deve assumir o vínculo sozinho.",
            effects: {
                sasah: { bravery: 3, xp: 100 },
                lucas: { bravery: 3, xp: 100 },
                relationship: { trust: 2 },
                flags: { singleSacrifice: true }
            },
            next: "final_choice_single"
        },
        {
            text: "Dividir o vínculo entre os dois.",
            effects: {
                sasah: { loyalty: 3, empathy: 3, magic: -15, xp: 100 },
                lucas: { loyalty: 3, empathy: 3, magic: -15, xp: 100 },
                relationship: { friendship: 5, trust: 5 },
                flags: { sharedBond: true }
            },
            next: "final_choice_shared"
        },
        {
            text: "Destruir a magia mesmo que Hogwarts seja danificada.",
            effects: {
                sasah: { bravery: 3, intelligence: 2, magic: -20, hp: -20, xp: 100 },
                lucas: { bravery: 3, intelligence: 2, magic: -20, hp: -20, xp: 100 },
                flags: { destroyedAncientMagic: true }
            },
            next: "final_choice_destroy"
        }
    ]
};


/* =========================================================
   FINAL — VÍNCULO COMPARTILHADO
========================================================= */

scenes.final_choice_shared = {
    chapter: 18,
    location: "Câmara Antiga",
    title: "Dois caminhos, uma única magia",
    mode: "both",
    text:
        "Os dois avançam juntos.\n\n" +
        "Nenhum deles solta a varinha.\n\n" +
        "A magia antiga tenta escolher apenas um deles, mas os dois resistem.\n\n" +
        "A energia passa de {P1} para {P2} e de {P2} para {P1}.\n\n" +
        "Por alguns segundos, não existe mais diferença entre coragem, lealdade, inteligência, ambição ou empatia.\n\n" +
        "Existe apenas confiança.\n\n" +
        "A magia negra desaparece.\n\n" +
        "O inimigo cai.\n\n" +
        "Kiwi observa a cena com lágrimas nos olhos.\n\n" +
        "— Vocês entenderam algo que ninguém antes de vocês conseguiu entender.\n\n" +
        "O poder não precisava de um dono.\n\n" +
        "Precisava de pessoas capazes de dividi-lo.",
    choices: [
        {
            text: "Selar definitivamente a Câmara.",
            effects: {
                sasah: { xp: 150 },
                lucas: { xp: 150 },
                relationship: { friendship: 5, trust: 5 },
                kiwi: { trust: 5 },
                flags: { chamberSealed: true, bestEndingPath: true }
            },
            next: "ending_shared"
        },
        {
            text: "Preservar a Câmara para futuras gerações.",
            effects: {
                sasah: { intelligence: 3, xp: 150 },
                lucas: { intelligence: 3, xp: 150 },
                relationship: { trust: 3 },
                flags: { chamberPreserved: true }
            },
            next: "ending_shared"
        }
    ]
};


/* =========================================================
   FINAL — SACRIFÍCIO
========================================================= */

scenes.final_choice_single = {
    chapter: 18,
    location: "Câmara Antiga",
    title: "O preço do poder",
    mode: "both",
    text:
        "A magia procura um único coração.\n\n" +
        "{P1} e {P2} se encaram.\n\n" +
        "Nenhum dos dois quer que o outro faça aquilo.\n\n" +
        "Mas alguém precisa decidir.\n\n" +
        "A energia começa a envolver um dos protagonistas.\n\n" +
        "O outro tenta impedir, mas é tarde demais.\n\n" +
        "A magia é selada dentro de uma única pessoa.\n\n" +
        "O inimigo desaparece.\n\n" +
        "Hogwarts é salva.\n\n" +
        "Mas a vitória tem um preço.",
    choices: [
        {
            text: "Aceitar o destino e permanecer em Hogwarts.",
            effects: {
                relationship: { friendship: 4, trust: 4 },
                flags: { acceptedSacrifice: true }
            },
            next: "ending_sacrifice"
        },
        {
            text: "Procurar uma forma de libertar a pessoa do vínculo.",
            effects: {
                sasah: { intelligence: 3, xp: 100 },
                lucas: { intelligence: 3, xp: 100 },
                relationship: { friendship: 5, trust: 5 },
                flags: { searchForFreedom: true }
            },
            next: "ending_sacrifice_search"
        }
    ]
};


/* =========================================================
   FINAL — DESTRUIÇÃO
========================================================= */

scenes.final_choice_destroy = {
    chapter: 18,
    location: "Câmara Antiga",
    title: "O fim da magia",
    mode: "both",
    text:
        "Os dois levantam as varinhas.\n\n" +
        "A magia antiga começa a se partir.\n\n" +
        "O castelo inteiro treme.\n\n" +
        "Janelas quebram.\n\n" +
        "As paredes da Câmara desabam.\n\n" +
        "Mas a energia finalmente desaparece.\n\n" +
        "Não existe mais magia antiga.\n\n" +
        "Não existe mais ameaça.\n\n" +
        "Hogwarts sobrevive, embora nunca volte a ser exatamente a mesma.",
    choices: [
        {
            text: "Ficar para ajudar na reconstrução.",
            effects: {
                sasah: { loyalty: 3, empathy: 3, xp: 150 },
                lucas: { loyalty: 3, empathy: 3, xp: 150 },
                relationship: { friendship: 3, trust: 4 },
                flags: { helpedRebuild: true }
            },
            next: "ending_destroy"
        },
        {
            text: "Partir em busca de novas respostas.",
            effects: {
                sasah: { intelligence: 3, ambition: 2, xp: 150 },
                lucas: { intelligence: 3, ambition: 2, xp: 150 },
                relationship: { trust: 2 },
                flags: { newJourney: true }
            },
            next: "ending_destroy"
        }
    ]
};


/* =========================================================
   EPÍLOGO — FINAL COMPARTILHADO
========================================================= */

scenes.ending_shared = {
    chapter: 19,
    location: "Hogwarts",
    title: "O começo de uma nova história",
    mode: "both",
    text:
        "Algumas semanas se passaram.\n\n" +
        "Hogwarts voltou a funcionar.\n\n" +
        "Os corredores foram reconstruídos. As aulas retornaram. " +
        "Os estudantes voltaram a rir.\n\n" +
        "{P1} e {P2} agora são conhecidos pelos estudantes mais novos como os protagonistas " +
        "da noite em que Hogwarts quase foi consumida pelas sombras.\n\n" +
        "Mas os dois sabem que a história foi muito maior do que uma batalha.\n\n" +
        "Foi uma história sobre escolhas.\n\n" +
        "Sobre confiança.\n\n" +
        "Sobre aprender que pessoas diferentes podem caminhar na mesma direção.\n\n" +
        "Kiwi continua aparecendo inesperadamente pelos corredores.\n\n" +
        "Às vezes na biblioteca.\n\n" +
        "Às vezes no dormitório.\n\n" +
        "E, ocasionalmente, dentro de uma mochila que definitivamente não deveria estar se mexendo.\n\n" +
        "A aventura terminou.\n\n" +
        "Mas Hogwarts ainda guarda muitos segredos.",
    choices: [
        {
            text: "Encerrar a história.",
            effects: {
                flags: { gameCompleted: true, ending: "shared" }
            },
            next: "credits"
        }
    ]
};


/* =========================================================
   EPÍLOGO — SACRIFÍCIO
========================================================= */

scenes.ending_sacrifice = {
    chapter: 19,
    location: "Hogwarts",
    title: "A pessoa que ficou para trás",
    mode: "both",
    text:
        "Hogwarts foi salva.\n\n" +
        "Os estudantes nunca conhecerão todos os detalhes daquela noite.\n\n" +
        "Alguns acreditam que foi apenas um acidente mágico.\n\n" +
        "Outros dizem que uma antiga maldição foi destruída.\n\n" +
        "Somente {P1} e {P2} conhecem toda a verdade.\n\n" +
        "A pessoa que carregou o vínculo permanece ligada à Câmara.\n\n" +
        "A outra visita a Câmara todos os dias.\n\n" +
        "Não como prisioneiro.\n\n" +
        "Não como herói.\n\n" +
        "Mas como alguém que prometeu que nunca abandonaria seu companheiro.\n\n" +
        "A história não terminou completamente.",
    choices: [
        {
            text: "Continuar procurando uma solução.",
            effects: {
                flags: { gameCompleted: true, ending: "sacrifice" }
            },
            next: "credits"
        }
    ]
};


/* =========================================================
   EPÍLOGO — BUSCA PELA LIBERDADE
========================================================= */

scenes.ending_sacrifice_search = {
    chapter: 19,
    location: "Biblioteca de Hogwarts",
    title: "Uma promessa",
    mode: "both",
    text:
        "Os livros da biblioteca estão espalhados sobre várias mesas.\n\n" +
        "Feitiços antigos, documentos esquecidos e registros proibidos foram reunidos diante dos dois.\n\n" +
        "{P1} pesquisa.\n\n" +
        "{P2} pesquisa.\n\n" +
        "Kiwi dorme em cima de um livro aberto.\n\n" +
        "Talvez a solução exista.\n\n" +
        "Talvez não.\n\n" +
        "Mas uma coisa é certa.\n\n" +
        "Eles não pretendem desistir.\n\n" +
        "A próxima aventura começa exatamente ali.",
    choices: [
        {
            text: "Encerrar a primeira aventura.",
            effects: {
                flags: { gameCompleted: true, ending: "sacrifice_search" }
            },
            next: "credits"
        }
    ]
};


/* =========================================================
   EPÍLOGO — DESTRUIÇÃO DA MAGIA
========================================================= */

scenes.ending_destroy = {
    chapter: 19,
    location: "Hogwarts",
    title: "Depois das sombras",
    mode: "both",
    text:
        "O castelo está ferido.\n\n" +
        "Torres precisam ser reconstruídas.\n\n" +
        "Algumas salas desapareceram completamente.\n\n" +
        "Mas Hogwarts continua de pé.\n\n" +
        "{P1} olha para os destroços.\n\n" +
        "{P2} permanece ao lado.\n\n" +
        "A magia antiga acabou.\n\n" +
        "Nenhum estudante jamais será ameaçado por ela novamente.\n\n" +
        "Mas ambos sabem que destruir uma parte da história também significa assumir a responsabilidade pelo futuro.\n\n" +
        "A reconstrução será longa.\n\n" +
        "E talvez seja justamente aí que uma nova história comece.",
    choices: [
        {
            text: "Encerrar a aventura.",
            effects: {
                flags: { gameCompleted: true, ending: "destroyed_magic" }
            },
            next: "credits"
        }
    ]
};


/* =========================================================
   CRÉDITOS / FINAL
========================================================= */

scenes.credits = {
    chapter: 20,
    location: "Hogwarts",
    title: "Fim da primeira aventura",
    mode: "both",
    text:
        "A aventura chegou ao fim.\n\n" +
        "Mas as escolhas feitas durante a história permanecerão registradas.\n\n" +
        "Cada amizade.\n\n" +
        "Cada rivalidade.\n\n" +
        "Cada segredo descoberto.\n\n" +
        "Cada vez que {P1} escolheu agir.\n\n" +
        "Cada vez que {P2} decidiu confiar.\n\n" +
        "E cada vez que os dois escolheram permanecer juntos.\n\n" +
        "Hogwarts continuará existindo.\n\n" +
        "Kiwi continuará aprontando.\n\n" +
        "E talvez, algum dia, uma nova porta seja aberta.\n\n" +
        "FIM.",
    choices: [
        {
            text: "Jogar novamente.",
            effects: {},
            next: "restart"
        }
    ]
};


/* =========================================================
   SISTEMA DE EFEITOS DAS ESCOLHAS
========================================================= */

function applyEffects(effects) {
    if (!effects) {
        return;
    }

    function applyCharacter(character, values) {
        if (!values) {
            return;
        }

        Object.keys(values).forEach(function(key) {
            if (key === "xp") {
                addXp(character, values[key]);
                return;
            }

            if (typeof character[key] === "number") {
                character[key] += values[key];
            }
        });

        normalizeCharacter(character);
    }

    applyCharacter(game.sasah, effects.sasah);
    applyCharacter(game.lucas, effects.lucas);

    if (effects.relationship) {
        Object.keys(effects.relationship).forEach(function(key) {
            if (typeof game.relationship[key] === "number") {
                game.relationship[key] += effects.relationship[key];
            }
        });
    }

    if (effects.kiwi) {
        Object.keys(effects.kiwi).forEach(function(key) {
            if (typeof game.kiwi[key] === "number") {
                game.kiwi[key] += effects.kiwi[key];
            }
        });
    }

    if (effects.flags) {
        Object.keys(effects.flags).forEach(function(key) {
            game.flags[key] = effects.flags[key];
        });
    }

    normalizeRelationship();
    normalizeKiwi();
}


/* =========================================================
   NORMALIZAÇÃO DOS PERSONAGENS
========================================================= */

function normalizeCharacter(character) {
    if (!character) {
        return;
    }

    character.hp = Math.max(0, Math.min(character.hp, character.maxHp || 100));
    character.mana = Math.max(0, Math.min(character.mana, character.maxMana || 100));

    character.bravery = Math.max(0, character.bravery);
    character.loyalty = Math.max(0, character.loyalty);
    character.intelligence = Math.max(0, character.intelligence);
    character.ambition = Math.max(0, character.ambition);
    character.empathy = Math.max(0, character.empathy);
    character.magic = Math.max(0, character.magic);
}


function normalizeRelationship() {
    game.relationship.friendship = Math.max(
        0,
        Math.min(100, game.relationship.friendship)
    );

    game.relationship.trust = Math.max(
        0,
        Math.min(100, game.relationship.trust)
    );

    game.relationship.rivalry = Math.max(
        0,
        Math.min(100, game.relationship.rivalry)
    );

    game.relationship.affinity = Math.max(
        0,
        Math.min(100, game.relationship.affinity)
    );
}


function normalizeKiwi() {
    if (!game.kiwi) {
        game.kiwi = {};
    }

    if (typeof game.kiwi.trust !== "number") {
        game.kiwi.trust = 0;
    }

    game.kiwi.trust = Math.max(
        0,
        Math.min(100, game.kiwi.trust)
    );
}


/* =========================================================
   SISTEMA DE EXPERIÊNCIA
========================================================= */

function addXp(character, amount) {
    if (!character || !amount) {
        return;
    }

    if (typeof character.xp !== "number") {
        character.xp = 0;
    }

    if (typeof character.level !== "number") {
        character.level = 1;
    }

    character.xp += amount;

    var required = character.level * 100;

    while (character.xp >= required) {
        character.xp -= required;
        character.level += 1;

        if (typeof character.maxHp !== "number") {
            character.maxHp = 100;
        }

        if (typeof character.maxMana !== "number") {
            character.maxMana = 100;
        }

        character.maxHp += 10;
        character.maxMana += 10;

        character.hp = character.maxHp;
        character.mana = character.maxMana;

        character.magic += 2;

        required = character.level * 100;
    }
}


/* =========================================================
   SUBSTITUIÇÃO DE NOMES
========================================================= */

function replaceTokens(text) {
    if (text === undefined || text === null) {
        return "";
    }

    var result = String(text);

    var name1 = game.sasah.name || "Protagonista 1";
    var name2 = game.lucas.name || "Protagonista 2";

    result = result.split("{P1}").join(name1);
    result = result.split("{P2}").join(name2);
    result = result.split("{KIWI}").join("Kiwi");

    return result;
}


/* =========================================================
   MOTOR DAS CENAS
========================================================= */

var currentSceneId = null;


function showScene(sceneId) {
    if (sceneId === "restart") {
        restartGame();
        return;
    }

    var scene = scenes[sceneId];

    if (!scene) {
        console.error("Cena não encontrada: " + sceneId);
        return;
    }

    currentSceneId = sceneId;

    if (scene.mode === "sasah" || scene.mode === "lucas" || scene.mode === "both") {
        game.turnMode = scene.mode;
    }

    game.currentScene = sceneId;

    renderDataScene(scene);

    updateAllUI();
}


function renderDataScene(scene) {
    var chapterElement = document.getElementById("chapter");
    var locationElement = document.getElementById("location");
    var sceneElement = document.getElementById("scene");
    var choicesElement = document.getElementById("choices");
    var playerTagElement = document.getElementById("playerTag");

    if (chapterElement) {
        chapterElement.textContent = "CAPÍTULO " + scene.chapter;
    }

    if (locationElement) {
        locationElement.textContent = replaceTokens(scene.location);
    }

    if (sceneElement) {
        sceneElement.innerHTML = "";

        var title = document.createElement("h2");
        title.className = "story-title";
        title.textContent = replaceTokens(scene.title);

        sceneElement.appendChild(title);

        var paragraphs = String(scene.text || "").split(/\n\s*\n/);

        paragraphs.forEach(function(paragraphText) {
            var paragraph = document.createElement("p");
            paragraph.textContent = replaceTokens(paragraphText);
            sceneElement.appendChild(paragraph);
        });
    }

    if (playerTagElement) {
        if (game.turnMode === "sasah") {
            playerTagElement.textContent =
                game.sasah.name + " conduz esta cena";
        } else if (game.turnMode === "lucas") {
            playerTagElement.textContent =
                game.lucas.name + " conduz esta cena";
        } else {
            playerTagElement.textContent =
                game.sasah.name + " e " + game.lucas.name +
                " conduzem esta cena";
        }
    }

    if (choicesElement) {
        choicesElement.innerHTML = "";

        var heading = document.createElement("h3");
        heading.textContent = "Escolha o que fazer:";
        choicesElement.appendChild(heading);

        if (!scene.choices || scene.choices.length === 0) {
            return;
        }

        scene.choices.forEach(function(choice, index) {
            var button = document.createElement("button");

            button.type = "button";
            button.className = "choice-button";

            button.textContent =
                (index + 1) + ". " + replaceTokens(choice.text);

            button.addEventListener("click", function() {
                chooseDataScene(choice);
            });

            choicesElement.appendChild(button);
        });
    }
}


/* =========================================================
   EXECUTA UMA ESCOLHA
========================================================= */

function chooseDataScene(choice) {
    if (!choice) {
        return;
    }

    if (choice.effects) {
        applyEffects(choice.effects);
    }

    addLogEntry(
        "Escolha: " + replaceTokens(choice.text)
    );

    if (choice.next) {
        showScene(choice.next);
    } else {
        updateAllUI();
    }

    saveGame();
}


/* =========================================================
   REGISTRO NO DIÁRIO
========================================================= */

function addLogEntry(text) {
    if (!game.log) {
        game.log = [];
    }

    game.log.push({
        chapter: game.chapter || 0,
        text: text,
        time: new Date().toLocaleTimeString("pt-BR")
    });

    if (game.log.length > 100) {
        game.log.shift();
    }

    renderLog();
}


function renderLog() {
    var logElement = document.getElementById("log");

    if (!logElement) {
        return;
    }

    logElement.innerHTML = "";

    if (!game.log || game.log.length === 0) {
        logElement.textContent = "Nenhum acontecimento registrado ainda.";
        return;
    }

    game.log.slice().reverse().forEach(function(entry) {
        var item = document.createElement("div");
        item.className = "log-entry";

        item.textContent =
            "[" + (entry.time || "--:--") + "] " +
            entry.text;

        logElement.appendChild(item);
    });
}


/* =========================================================
   ATUALIZAÇÃO GERAL DA INTERFACE
========================================================= */

function updateAllUI() {
    updateCharacterUI();
    updateRelationshipUI();
    renderLog();
}


function updateCharacterUI() {
    updateSingleCharacterUI(
        game.sasah,
        "sasahName",
        "sasahHouse",
        "sasahHpText",
        "sasahHp",
        "sasahManaText",
        "sasahMana",
        "sasahXpText",
        "sasahXp",
        "sasahBravery",
        "sasahLoyalty",
        "sasahIntelligence",
        "sasahAmbition",
        "sasahEmpathy",
        "sasahMagic"
    );

    updateSingleCharacterUI(
        game.lucas,
        "lucasName",
        "lucasHouse",
        "lucasHpText",
        "lucasHp",
        "lucasManaText",
        "lucasMana",
        "lucasXpText",
        "lucasXp",
        "lucasBravery",
        "lucasLoyalty",
        "lucasIntelligence",
        "lucasAmbition",
        "lucasEmpathy",
        "lucasMagic"
    );
}


function updateSingleCharacterUI(
    character,
    nameId,
    houseId,
    hpTextId,
    hpBarId,
    manaTextId,
    manaBarId,
    xpTextId,
    xpBarId,
    braveryId,
    loyaltyId,
    intelligenceId,
    ambitionId,
    empathyId,
    magicId
) {
    if (!character) {
        return;
    }

    setText(nameId, character.name || "???");
    setText(houseId, character.house || "Sem casa");

    setText(
        hpTextId,
        "HP: " + character.hp + "/" + character.maxHp
    );

    setBar(
        hpBarId,
        character.hp,
        character.maxHp
    );

    setText(
        manaTextId,
        "Mana: " + character.mana + "/" + character.maxMana
    );

    setBar(
        manaBarId,
        character.mana,
        character.maxMana
    );

    setText(
        xpTextId,
        "XP: " + character.xp + " • Nível " + character.level
    );

    setBar(
        xpBarId,
        character.xp,
        character.level * 100
    );

    setText(braveryId, character.bravery);
    setText(loyaltyId, character.loyalty);
    setText(intelligenceId, character.intelligence);
    setText(ambitionId, character.ambition);
    setText(empathyId, character.empathy);
    setText(magicId, character.magic);
}


function setText(id, value) {
    var element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


function setBar(id, value, max) {
    var element = document.getElementById(id);

    if (!element) {
        return;
    }

    var percentage = 0;

    if (max > 0) {
        percentage = (value / max) * 100;
    }

    percentage = Math.max(0, Math.min(100, percentage));

    element.style.width = percentage + "%";
}


/* =========================================================
   RELACIONAMENTO
========================================================= */

function updateRelationshipUI() {
    setBar(
        "friendship",
        game.relationship.friendship,
        100
    );

    setBar(
        "trust",
        game.relationship.trust,
        100
    );

    setBar(
        "rivalry",
        game.relationship.rivalry,
        100
    );

    setBar(
        "affinity",
        game.relationship.affinity,
        100
    );
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

        addLogEntry("Jogo salvo.");
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
}


/* =========================================================
   CARREGAMENTO
========================================================= */

function loadGame() {
    try {
        var saved = localStorage.getItem(SAVE_KEY);

        if (!saved) {
            alert("Nenhum jogo salvo foi encontrado.");
            return;
        }

        var loaded = JSON.parse(saved);

        if (!loaded || !loaded.sasah || !loaded.lucas) {
            alert("O arquivo de salvamento é inválido.");
            return;
        }

        game = loaded;

        if (!game.flags) {
            game.flags = {};
        }

        if (!game.log) {
            game.log = [];
        }

        normalizeCharacter(game.sasah);
        normalizeCharacter(game.lucas);
        normalizeRelationship();
        normalizeKiwi();

        currentSceneId =
            game.currentScene || "arrival_1";

        if (scenes[currentSceneId]) {
            showScene(currentSceneId);
        } else {
            alert("A cena salva não existe nesta versão do jogo.");
        }

    } catch (error) {
        console.error("Erro ao carregar:", error);
        alert("Não foi possível carregar o jogo.");
    }
}


/* =========================================================
   REINICIAR
========================================================= */

function restartGame() {
    var confirmed = confirm(
        "Tem certeza de que deseja começar novamente?"
    );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(SAVE_KEY);

    location.reload();
}


/* =========================================================
   BOTÕES
========================================================= */

function setupControlButtons() {
    var saveButton = document.getElementById("saveButton");
    var loadButton = document.getElementById("loadButton");
    var restartButton = document.getElementById("restartButton");

    if (saveButton) {
        saveButton.addEventListener("click", function() {
            saveGame();
        });
    }

    if (loadButton) {
        loadButton.addEventListener("click", function() {
            loadGame();
        });
    }

    if (restartButton) {
        restartButton.addEventListener("click", function() {
            restartGame();
        });
    }
}


/* =========================================================
   INICIALIZAÇÃO DO MOTOR DATA-DRIVEN
========================================================= */

function startDataDrivenEngine() {
    setupControlButtons();

    if (!game.flags) {
        game.flags = {};
    }

    if (!game.log) {
        game.log = [];
    }

    normalizeCharacter(game.sasah);
    normalizeCharacter(game.lucas);
    normalizeRelationship();
    normalizeKiwi();

    updateAllUI();

    /*
       Se a Parte 1/2 já tiver definido currentScene,
       continuamos de onde o jogador estava.
    */
    if (game.currentScene && scenes[game.currentScene]) {
        showScene(game.currentScene);
        return;
    }

    /*
       Caso a campanha ainda esteja usando o motor antigo,
       a Parte 1 deverá encaminhar para a primeira cena
       data-driven.
    */
    if (scenes.arrival_1) {
        showScene("arrival_1");
    }
}


/* =========================================================
   FINAL DA PARTE 3/6
========================================================= */
/* =========================================================
   PARTE 4/6
   INTEGRAÇÃO DA CAMPANHA
   NOMES • CASAS • QUIZ • ATRIBUTOS • INÍCIO DA HISTÓRIA
========================================================= */


/* =========================================================
   ESTADO INICIAL
========================================================= */

function createInitialGame() {

    return {
        phase: "names",

        chapter: 0,

        currentScene: null,

        turnMode: "both",

        sasah: {
            name: "",
            house: "Indefinida",

            hp: 100,
            maxHp: 100,

            mana: 100,
            maxMana: 100,

            xp: 0,
            level: 1,

            bravery: 5,
            loyalty: 5,
            intelligence: 5,
            ambition: 5,
            empathy: 5,
            magic: 5
        },

        lucas: {
            name: "",
            house: "Indefinida",

            hp: 100,
            maxHp: 100,

            mana: 100,
            maxMana: 100,

            xp: 0,
            level: 1,

            bravery: 5,
            loyalty: 5,
            intelligence: 5,
            ambition: 5,
            empathy: 5,
            magic: 5
        },

        relationship: {
            friendship: 50,
            trust: 50,
            rivalry: 0,
            affinity: 50
        },

        kiwi: {
            name: "Kiwi",
            trust: 0,
            discovered: false,
            rescued: false
        },

        houseAnswers: {
            sasah: [],
            lucas: []
        },

        flags: {
            gameStarted: false,

            trainArrived: false,
            metKiwi: false,

            lakeArtifact: false,
            kiwiSecret: false,

            societyDiscovered: false,
            professorClue: false,

            mirrorBroken: false,

            finalSeal: false,
            ancientMagic: false,

            guardian: false,
            invasion: false,

            finalChamber: false,

            studentsProtected: false,
            rushedToChamber: false,
            kiwiProtected: false,

            askedKiwiAboutKey: false,
            askedTeachers: false,
            ignoredWarning: false,

            defeatedShadowGuard: false,
            spokeToShadow: false,
            secretPassage: false,

            examinedAncientObject: false,
            attackedAncientObject: false,
            kiwiExplainedAncientMagic: false,

            acceptedResponsibility: false,
            questionedResponsibility: false,
            rejectedMagic: false,

            directFinalAttack: false,
            protectedArtifact: false,
            trustedKiwiFinalPlan: false,

            p1ProtectedP2: false,
            p2ProtectedP1: false,
            foughtTogether: false,

            singleSacrifice: false,
            sharedBond: false,
            destroyedAncientMagic: false,

            chamberSealed: false,
            chamberPreserved: false,

            acceptedSacrifice: false,
            searchForFreedom: false,

            helpedRebuild: false,
            newJourney: false,

            gameCompleted: false,
            ending: ""
        },

        log: []
    };
}


/* =========================================================
   GARANTE QUE O OBJETO GAME EXISTA
========================================================= */

if (typeof game === "undefined" || !game) {
    var game = createInitialGame();
}


/* =========================================================
   QUIZ DAS CASAS
========================================================= */

var houseQuiz = [

    {
        question:
            "Você encontra um colega em perigo. O que faz?",

        answers: [

            {
                text: "Enfrento o perigo imediatamente.",
                house: "Grifinória",
                attribute: "bravery"
            },

            {
                text: "Fico ao lado dele e não o abandono.",
                house: "Lufa-Lufa",
                attribute: "loyalty"
            },

            {
                text: "Analiso a situação antes de agir.",
                house: "Corvinal",
                attribute: "intelligence"
            },

            {
                text: "Procuro uma maneira de transformar a situação em vantagem.",
                house: "Sonserina",
                attribute: "ambition"
            },

            {
                text: "Tento entender o que ele está sentindo.",
                house: "Lufa-Lufa",
                attribute: "empathy"
            }

        ]
    },

    {
        question:
            "Você recebe acesso a uma biblioteca proibida. O que procura?",

        answers: [

            {
                text: "Um livro sobre grandes feitos heroicos.",
                house: "Grifinória",
                attribute: "bravery"
            },

            {
                text: "Informações que possam ajudar meus amigos.",
                house: "Lufa-Lufa",
                attribute: "loyalty"
            },

            {
                text: "Conhecimento que ninguém mais descobriu.",
                house: "Corvinal",
                attribute: "intelligence"
            },

            {
                text: "Conhecimento que me dê poder.",
                house: "Sonserina",
                attribute: "ambition"
            },

            {
                text: "Um livro sobre sentimentos e comportamento humano.",
                house: "Lufa-Lufa",
                attribute: "empathy"
            }

        ]
    },

    {
        question:
            "Qual destas características mais combina com você?",

        answers: [

            {
                text: "Coragem.",
                house: "Grifinória",
                attribute: "bravery"
            },

            {
                text: "Lealdade.",
                house: "Lufa-Lufa",
                attribute: "loyalty"
            },

            {
                text: "Curiosidade.",
                house: "Corvinal",
                attribute: "intelligence"
            },

            {
                text: "Determinação.",
                house: "Sonserina",
                attribute: "ambition"
            },

            {
                text: "Empatia.",
                house: "Lufa-Lufa",
                attribute: "empathy"
            }

        ]
    },

    {
        question:
            "Quando alguém duvida de você, qual é sua reação?",

        answers: [

            {
                text: "Provo que sou capaz.",
                house: "Grifinória",
                attribute: "bravery"
            },

            {
                text: "Continuo fazendo o meu melhor.",
                house: "Lufa-Lufa",
                attribute: "loyalty"
            },

            {
                text: "Tento descobrir por que a pessoa pensa assim.",
                house: "Corvinal",
                attribute: "intelligence"
            },

            {
                text: "Uso a dúvida como motivação para vencer.",
                house: "Sonserina",
                attribute: "ambition"
            },

            {
                text: "Tento compreender a insegurança da pessoa.",
                house: "Lufa-Lufa",
                attribute: "empathy"
            }

        ]
    },

    {
        question:
            "Você encontra um artefato mágico extremamente poderoso.",

        answers: [

            {
                text: "Uso-o para proteger alguém.",
                house: "Grifinória",
                attribute: "bravery"
            },

            {
                text: "Guardo-o para impedir que outras pessoas se machuquem.",
                house: "Lufa-Lufa",
                attribute: "loyalty"
            },

            {
                text: "Estudo cuidadosamente seu funcionamento.",
                house: "Corvinal",
                attribute: "intelligence"
            },

            {
                text: "Descubro como usar seu poder a meu favor.",
                house: "Sonserina",
                attribute: "ambition"
            },

            {
                text: "Penso primeiro nas consequências para todos.",
                house: "Lufa-Lufa",
                attribute: "empathy"
            }

        ]
    }

];


/* =========================================================
   CALCULAR CASA
========================================================= */

function calculateHouse(characterKey) {

    var answers = game.houseAnswers[characterKey] || [];

    var scores = {
        "Grifinória": 0,
        "Lufa-Lufa": 0,
        "Corvinal": 0,
        "Sonserina": 0
    };

    answers.forEach(function(answer) {

        if (answer.house && scores[answer.house] !== undefined) {
            scores[answer.house] += 1;
        }

    });

    var character = game[characterKey];

    if (!character) {
        return "Grifinória";
    }

    /*
       Os atributos também participam da decisão.
    */

    scores["Grifinória"] += character.bravery / 10;
    scores["Lufa-Lufa"] +=
        (character.loyalty + character.empathy) / 20;

    scores["Corvinal"] +=
        character.intelligence / 10;

    scores["Sonserina"] +=
        character.ambition / 10;

    var bestHouse = "Grifinória";
    var bestScore = scores[bestHouse];

    Object.keys(scores).forEach(function(house) {

        if (scores[house] > bestScore) {
            bestHouse = house;
            bestScore = scores[house];
        }

    });

    return bestHouse;
}


/* =========================================================
   APLICA RESPOSTA DO QUIZ
========================================================= */

function answerHouseQuiz(characterKey, answerIndex) {

    var questionIndex =
        game.houseAnswers[characterKey].length;

    var question =
        houseQuiz[questionIndex];

    if (!question) {
        return;
    }

    var answer =
        question.answers[answerIndex];

    if (!answer) {
        return;
    }

    game.houseAnswers[characterKey].push(answer);

    var character = game[characterKey];

    if (character[answer.attribute] !== undefined) {
        character[answer.attribute] += 3;
    }

    if (characterKey === "sasah") {
        game.relationship.friendship += 1;
    }

    if (characterKey === "lucas") {
        game.relationship.trust += 1;
    }

    normalizeCharacter(character);
    normalizeRelationship();

    renderHouseQuiz(characterKey);
}


/* =========================================================
   RENDERIZAR QUIZ
========================================================= */

function renderHouseQuiz(characterKey) {

    var sceneElement =
        document.getElementById("scene");

    var choicesElement =
        document.getElementById("choices");

    if (!sceneElement || !choicesElement) {
        return;
    }

    var character =
        game[characterKey];

    var questionIndex =
        game.houseAnswers[characterKey].length;

    sceneElement.innerHTML = "";
    choicesElement.innerHTML = "";

    var title =
        document.createElement("h2");

    title.className = "story-title";

    title.textContent =
        "Seleção de Casa — " +
        character.name;

    sceneElement.appendChild(title);

    if (questionIndex >= houseQuiz.length) {

        var house =
            calculateHouse(characterKey);

        character.house = house;

        var result =
            document.createElement("p");

        result.textContent =
            "As respostas de " +
            character.name +
            " indicam uma forte afinidade com " +
            house +
            ".";

        sceneElement.appendChild(result);

        var continueButton =
            document.createElement("button");

        continueButton.className =
            "choice-button";

        continueButton.textContent =
            "Continuar";

        continueButton.addEventListener(
            "click",
            function() {

                if (characterKey === "sasah") {
                    game.phase = "quiz_lucas";
                    renderHouseQuiz("lucas");
                } else {

                    game.phase = "story";

                    game.flags.gameStarted = true;

                    showScene("arrival_1");
                }

                saveGame();
            }
        );

        choicesElement.appendChild(
            continueButton
        );

        updateAllUI();

        return;
    }

    var question =
        houseQuiz[questionIndex];

    var paragraph =
        document.createElement("p");

    paragraph.textContent =
        "Pergunta " +
        (questionIndex + 1) +
        " de " +
        houseQuiz.length +
        "\n\n" +
        question.question;

    sceneElement.appendChild(paragraph);

    question.answers.forEach(
        function(answer, index) {

            var button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "choice-button";

            button.textContent =
                (index + 1) +
                ". " +
                answer.text;

            button.addEventListener(
                "click",
                function() {

                    answerHouseQuiz(
                        characterKey,
                        index
                    );

                }
            );

            choicesElement.appendChild(
                button
            );

        }
    );

    updateAllUI();
}


/* =========================================================
   TELA DE NOMES
========================================================= */

function renderNameScreen() {

    var sceneElement =
        document.getElementById("scene");

    var choicesElement =
        document.getElementById("choices");

    if (!sceneElement || !choicesElement) {
        return;
    }

    sceneElement.innerHTML = "";
    choicesElement.innerHTML = "";

    var title =
        document.createElement("h2");

    title.className =
        "story-title";

    title.textContent =
        "Antes de Hogwarts";

    sceneElement.appendChild(title);

    var intro =
        document.createElement("p");

    intro.textContent =
        "Duas pessoas estão prestes a descobrir que suas vidas " +
        "estão ligadas a um dos maiores mistérios mágicos de Hogwarts.";

    sceneElement.appendChild(intro);

    var form =
        document.createElement("div");

    form.className =
        "name-selection";

    var label1 =
        document.createElement("label");

    label1.textContent =
        "Nome do protagonista 1";

    var input1 =
        document.createElement("input");

    input1.type = "text";
    input1.maxLength = 30;
    input1.placeholder =
        "Digite o primeiro nome";

    var label2 =
        document.createElement("label");

    label2.textContent =
        "Nome do protagonista 2";

    var input2 =
        document.createElement("input");

    input2.type = "text";
    input2.maxLength = 30;
    input2.placeholder =
        "Digite o segundo nome";

    form.appendChild(label1);
    form.appendChild(input1);
    form.appendChild(label2);
    form.appendChild(input2);

    sceneElement.appendChild(form);

    var startButton =
        document.createElement("button");

    startButton.type = "button";

    startButton.className =
        "choice-button";

    startButton.textContent =
        "Começar a aventura";

    startButton.addEventListener(
        "click",
        function() {

            var name1 =
                input1.value.trim();

            var name2 =
                input2.value.trim();

            if (!name1) {
                name1 = "Sasah";
            }

            if (!name2) {
                name2 = "Lucas";
            }

            game.sasah.name =
                name1;

            game.lucas.name =
                name2;

            game.phase =
                "quiz_sasah";

            game.chapter = 0;

            addLogEntry(
                "Os protagonistas foram definidos: " +
                name1 +
                " e " +
                name2 +
                "."
            );

            renderHouseQuiz("sasah");

            saveGame();
        }
    );

    choicesElement.appendChild(
        startButton
    );

    updateAllUI();
}


/* =========================================================
   CENA DE CHEGADA
========================================================= */

scenes.arrival_1 = {

    chapter: 1,

    location:
        "Estação King's Cross",

    title:
        "O trem para Hogwarts",

    mode:
        "both",

    text:
        "A estação está cheia.\n\n" +

        "Pessoas caminham apressadas enquanto malas desaparecem " +
        "pelos corredores e famílias se despedem antes da viagem.\n\n" +

        "{P1} observa tudo com uma mistura de curiosidade e ansiedade.\n\n" +

        "{P2} está alguns passos adiante, tentando entender como encontrar " +
        "a plataforma correta.\n\n" +

        "Por algum motivo, os dois sentem que aquela viagem será diferente " +
        "de qualquer outra que já fizeram.\n\n" +

        "Quando finalmente encontram a plataforma, o Expresso para Hogwarts " +
        "surge diante deles.\n\n" +

        "O vapor cobre parcialmente a estação.\n\n" +

        "A aventura começa.",

    choices: [

        {
            text:
                "{P1} entra primeiro no trem.",

            effects: {

                sasah: {
                    bravery: 2,
                    xp: 20
                },

                relationship: {
                    trust: 1
                },

                flags: {
                    trainArrived: true
                }

            },

            next:
                "arrival_2"
        },

        {
            text:
                "{P2} entra primeiro no trem.",

            effects: {

                lucas: {
                    bravery: 2,
                    xp: 20
                },

                relationship: {
                    trust: 1
                },

                flags: {
                    trainArrived: true
                }

            },

            next:
                "arrival_2"
        },

        {
            text:
                "Os dois entram juntos.",

            effects: {

                sasah: {
                    loyalty: 1,
                    empathy: 1,
                    xp: 20
                },

                lucas: {
                    loyalty: 1,
                    empathy: 1,
                    xp: 20
                },

                relationship: {
                    friendship: 2,
                    trust: 2
                },

                flags: {
                    trainArrived: true
                }

            },

            next:
                "arrival_2"
        }

    ]

};


/* =========================================================
   CENA 2 — COMPARTIMENTO
========================================================= */

scenes.arrival_2 = {

    chapter: 1,

    location:
        "Expresso para Hogwarts",

    title:
        "Um compartimento vazio",

    mode:
        "both",

    text:
        "Depois de algum tempo procurando um lugar para sentar, " +
        "{P1} e {P2} encontram um compartimento vazio.\n\n" +

        "A porta se fecha atrás deles.\n\n" +

        "Por alguns minutos, existe apenas o som das rodas do trem " +
        "passando pelos trilhos.\n\n" +

        "Então uma pequena batida aparece na janela.\n\n" +

        "Toc.\n\n" +

        "Toc.\n\n" +

        "Toc.\n\n" +

        "{P1} olha para fora.\n\n" +

        "Não há ninguém.\n\n" +

        "Quando olha novamente para dentro do compartimento, " +
        "há uma pequena criatura sentada sobre a bagagem.\n\n" +

        "Ela tem olhos enormes e uma aparência impossível de explicar.\n\n" +

        "Kiwi observa os dois.",

    choices: [

        {
            text:
                "Perguntar quem é a criatura.",

            effects: {

                kiwi: {
                    trust: 2
                },

                sasah: {
                    empathy: 1,
                    xp: 20
                },

                lucas: {
                    empathy: 1,
                    xp: 20
                },

                flags: {
                    metKiwi: true
                }

            },

            next:
                "arrival_3"
        },

        {
            text:
                "Ficar em silêncio e observar Kiwi.",

            effects: {

                kiwi: {
                    trust: 1
                },

                sasah: {
                    intelligence: 2,
                    xp: 20
                },

                lucas: {
                    intelligence: 2,
                    xp: 20
                },

                flags: {
                    metKiwi: true
                }

            },

            next:
                "arrival_3"
        },

        {
            text:
                "Perguntar como Kiwi entrou no trem.",

            effects: {

                kiwi: {
                    trust: 2
                },

                sasah: {
                    intelligence: 1,
                    xp: 20
                },

                lucas: {
                    intelligence: 1,
                    xp: 20
                },

                flags: {
                    metKiwi: true
                }

            },

            next:
                "arrival_3"
        }

    ]

};


/* =========================================================
   CENA 3 — O AVISO DE KIWI
========================================================= */

scenes.arrival_3 = {

    chapter: 2,

    location:
        "Expresso para Hogwarts",

    title:
        "O aviso",

    mode:
        "both",

    text:
        "Kiwi inclina a cabeça.\n\n" +

        "— Meu nome é Kiwi.\n\n" +

        "A criatura fala com uma voz pequena, mas extremamente séria.\n\n" +

        "— Vocês dois precisam tomar cuidado em Hogwarts.\n\n" +

        "{P1} pergunta por quê.\n\n" +

        "Kiwi olha para a janela.\n\n" +

        "— Porque alguma coisa acordou.\n\n" +

        "O trem passa por uma região coberta de árvores.\n\n" +

        "Por um instante, uma sombra gigantesca acompanha o trem.\n\n" +

        "Quando os protagonistas piscam, ela desaparece.\n\n" +

        "Kiwi continua olhando para fora.\n\n" +

        "— E ela sabe que vocês estão chegando.",

    choices: [

        {
            text:
                "Perguntar a Kiwi o que acordou.",

            effects: {

                kiwi: {
                    trust: 3
                },

                sasah: {
                    intelligence: 2,
                    xp: 30
                },

                lucas: {
                    intelligence: 2,
                    xp: 30
                },

                flags: {
                    kiwiSecret: true
                }

            },

            next:
                "arrival_4"
        },

        {
            text:
                "Perguntar por que a criatura conhece os dois.",

            effects: {

                kiwi: {
                    trust: 3
                },

                relationship: {
                    trust: 2
                },

                sasah: {
                    empathy: 2,
                    xp: 30
                },

                lucas: {
                    empathy: 2,
                    xp: 30
                },

                flags: {
                    kiwiSecret: true
                }

            },

            next:
                "arrival_4"
        },

        {
            text:
                "Ignorar o aviso e aproveitar a viagem.",

            effects: {

                sasah: {
                    bravery: 1,
                    xp: 30
                },

                lucas: {
                    bravery: 1,
                    xp: 30
                },

                flags: {
                    ignoredKiwiWarning: true
                }

            },

            next:
                "arrival_4"
        }

    ]

};


/* =========================================================
   CENA 4 — HOGWARTS
========================================================= */

scenes.arrival_4 = {

    chapter: 2,

    location:
        "Castelo de Hogwarts",

    title:
        "As portas do castelo",

    mode:
        "both",

    text:
        "O trem finalmente chega.\n\n" +

        "Depois da viagem, os estudantes descem e seguem em direção " +
        "às carruagens que os levarão ao castelo.\n\n" +

        "Então Hogwarts aparece.\n\n" +

        "Torres enormes se erguem contra o céu noturno.\n\n" +

        "Janelas iluminadas parecem observar os recém-chegados.\n\n" +

        "{P1} sente uma estranha sensação de familiaridade.\n\n" +

        "{P2} sente algo diferente: como se o castelo estivesse esperando por eles.\n\n" +

        "Kiwi desaparece antes que alguém perceba.\n\n" +

        "As portas gigantes se abrem.\n\n" +

        "A vida em Hogwarts está prestes a começar.",

    choices: [

        {
            text:
                "Entrar no castelo juntos.",

            effects: {

                sasah: {
                    loyalty: 1,
                    xp: 30
                },

                lucas: {
                    loyalty: 1,
                    xp: 30
                },

                relationship: {
                    friendship: 3,
                    trust: 2
                }

            },

            next:
                "arrival_5"
        },

        {
            text:
                "{P1} entra primeiro e observa o castelo.",

            effects: {

                sasah: {
                    intelligence: 1,
                    bravery: 1,
                    xp: 30
                },

                relationship: {
                    rivalry: 1
                }

            },

            next:
                "arrival_5"
        },

        {
            text:
                "{P2} entra primeiro e procura Kiwi.",

            effects: {

                lucas: {
                    empathy: 1,
                    intelligence: 1,
                    xp: 30
                },

                kiwi: {
                    trust: 1
                }

            },

            next:
                "arrival_5"
        }

    ]

};


/* =========================================================
   CENA 5 — PRIMEIRA NOITE
========================================================= */

scenes.arrival_5 = {

    chapter: 3,

    location:
        "Grande Salão",

    title:
        "A primeira noite",

    mode:
        "both",

    text:
        "O Grande Salão está iluminado por centenas de velas flutuantes.\n\n" +

        "Os novos estudantes observam o teto encantado.\n\n" +

        "Por alguns instantes, ninguém fala.\n\n" +

        "A cerimônia começa.\n\n" +

        "Cada estudante é chamado para descobrir sua casa.\n\n" +

        "Quando chega a vez de {P1}, o salão inteiro parece ficar mais silencioso.\n\n" +

        "Depois, chega a vez de {P2}.\n\n" +

        "Duas histórias começam naquela noite.\n\n" +

        "E nenhuma delas será igual ao que os protagonistas imaginavam.",

    choices: [

        {
            text:
                "Continuar.",

            effects: {
                sasah: {
                    xp: 40
                },

                lucas: {
                    xp: 40
                },

                flags: {
                    firstNight: true
                }
            },

            next:
                "arrival_6"
        }

    ]

};


/* =========================================================
   CENA 6 — PRIMEIRO SEGREDO
========================================================= */

scenes.arrival_6 = {

    chapter: 3,

    location:
        "Corredor próximo ao Grande Salão",

    title:
        "Uma porta que não deveria existir",

    mode:
        "both",

    text:
        "Depois da cerimônia, os estudantes começam a seguir para seus dormitórios.\n\n" +

        "Mas antes de se separarem, {P1} percebe algo estranho.\n\n" +

        "Entre duas paredes existe uma pequena porta de madeira.\n\n" +

        "Não havia porta ali alguns segundos antes.\n\n" +

        "{P2} também percebe.\n\n" +

        "Os dois se aproximam.\n\n" +

        "Existe um símbolo gravado na madeira.\n\n" +

        "O mesmo símbolo que apareceu nos registros encontrados anteriormente.\n\n" +

        "Kiwi surge atrás deles.\n\n" +

        "— Não abram essa porta.\n\n" +

        "Naturalmente, isso torna a porta ainda mais interessante.",

    choices: [

        {
            text:
                "Abrir a porta.",

            effects: {

                sasah: {
                    bravery: 2,
                    xp: 50
                },

                lucas: {
                    bravery: 2,
                    xp: 50
                },

                relationship: {
                    friendship: 2
                },

                flags: {
                    openedForbiddenDoor: true
                }

            },

            next:
                "arrival_7"
        },

        {
            text:
                "Examinar o símbolo antes de decidir.",

            effects: {

                sasah: {
                    intelligence: 3,
                    xp: 50
                },

                lucas: {
                    intelligence: 3,
                    xp: 50
                },

                relationship: {
                    trust: 2
                },

                flags: {
                    studiedForbiddenSymbol: true
                }

            },

            next:
                "arrival_7"
        },

        {
            text:
                "Confiar no aviso de Kiwi.",

            effects: {

                sasah: {
                    empathy: 2,
                    loyalty: 2,
                    xp: 50
                },

                lucas: {
                    empathy: 2,
                    loyalty: 2,
                    xp: 50
                },

                kiwi: {
                    trust: 4
                },

                relationship: {
                    trust: 4
                },

                flags: {
                    trustedKiwiEarly: true
                }

            },

            next:
                "arrival_7"
        }

    ]

};


/* =========================================================
   CENA 7 — PRIMEIRA MANHÃ
========================================================= */

scenes.arrival_7 = {

    chapter: 4,

    location:
        "Hogwarts",

    title:
        "O primeiro dia de aulas",

    mode:
        "both",

    text:
        "A manhã chega rápido demais.\n\n" +

        "O castelo está cheio de estudantes correndo para as aulas.\n\n" +

        "Há livros, pergaminhos e materiais mágicos espalhados pelos corredores.\n\n" +

        "{P1} e {P2} começam oficialmente sua vida escolar.\n\n" +

        "Mas alguma coisa mudou durante a noite.\n\n" +

        "No corredor onde a porta apareceu, existe agora apenas uma parede.\n\n" +

        "Nenhuma porta.\n\n" +

        "Nenhum símbolo.\n\n" +

        "Nenhuma explicação.\n\n" +

        "No chão, porém, existe uma pequena pena negra.\n\n" +

        "Kiwi observa a pena de longe.",

    choices: [

        {
            text:
                "Guardar a pena.",

            effects: {

                sasah: {
                    intelligence: 1,
                    xp: 40
                },

                lucas: {
                    intelligence: 1,
                    xp: 40
                },

                flags: {
                    blackFeather: true
                }

            },

            next:
                "arrival_8"
        },

        {
            text:
                "Mostrar a pena a Kiwi.",

            effects: {

                kiwi: {
                    trust: 4
                },

                flags: {
                    blackFeather: true,
                    showedFeatherToKiwi: true
                },

                relationship: {
                    trust: 2
                }

            },

            next:
                "arrival_8"
        },

        {
            text:
                "Não tocar na pena.",

            effects: {

                sasah: {
                    intelligence: 1,
                    xp: 40
                },

                lucas: {
                    intelligence: 1,
                    xp: 40
                }

            },

            next:
                "arrival_8"
        }

    ]

};


/* =========================================================
   CENA 8 — GANCHO PARA O ARCO SEGUINTE
========================================================= */

scenes.arrival_8 = {

    chapter: 4,

    location:
        "Biblioteca de Hogwarts",

    title:
        "O primeiro mistério",

    mode:
        "both",

    text:
        "Naquela tarde, {P1} e {P2} chegam à biblioteca.\n\n" +

        "Eles procuram informações sobre o símbolo encontrado na noite anterior.\n\n" +

        "Depois de algum tempo, encontram uma referência quase apagada em um livro antigo.\n\n" +

        "A página fala sobre uma magia escondida abaixo do Lago Negro.\n\n" +

        "O texto termina com uma frase incompleta:\n\n" +

        "\"Quando dois caminhos se encontram, a porta sob as águas desperta.\"\n\n" +

        "Os dois se entreolham.\n\n" +

        "Kiwi aparece sobre a mesa.\n\n" +

        "— Então começou.",

    choices: [

        {
            text:
                "Investigar o Lago Negro.",

            effects: {

                sasah: {
                    intelligence: 2,
                    xp: 60
                },

                lucas: {
                    intelligence: 2,
                    xp: 60
                },

                relationship: {
                    friendship: 2,
                    trust: 2
                },

                flags: {
                    lakeInvestigation: true
                }

            },

            next:
                "lake_1"
        }

    ]

};


/* =========================================================
   PREPARAÇÃO DA CAMPANHA
========================================================= */

function prepareGameForStory() {

    if (!game.sasah.name) {
        game.sasah.name = "Sasah";
    }

    if (!game.lucas.name) {
        game.lucas.name = "Lucas";
    }

    if (!game.sasah.house) {
        game.sasah.house = "Indefinida";
    }

    if (!game.lucas.house) {
        game.lucas.house = "Indefinida";
    }

    if (!game.flags) {
        game.flags = {};
    }

    if (!game.relationship) {
        game.relationship = {
            friendship: 50,
            trust: 50,
            rivalry: 0,
            affinity: 50
        };
    }

    if (!game.kiwi) {
        game.kiwi = {
            name: "Kiwi",
            trust: 0,
            discovered: false,
            rescued: false
        };
    }

    normalizeCharacter(game.sasah);
    normalizeCharacter(game.lucas);
    normalizeRelationship();
    normalizeKiwi();
}


/* =========================================================
   INICIALIZAÇÃO COMPLETA
========================================================= */

function initializeCompleteGame() {

    prepareGameForStory();

    setupControlButtons();

    if (game.phase === "names") {

        renderNameScreen();

        return;
    }

    if (game.phase === "quiz_sasah") {

        renderHouseQuiz("sasah");

        return;
    }

    if (game.phase === "quiz_lucas") {

        renderHouseQuiz("lucas");

        return;
    }

    if (
        game.phase === "story" &&
        game.currentScene &&
        scenes[game.currentScene]
    ) {

        showScene(game.currentScene);

        return;
    }

    game.phase = "names";

    renderNameScreen();
}


/* =========================================================
   CORREÇÃO DO SALVAMENTO
========================================================= */

function saveGameSilently() {

    try {

        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(game)
        );

    } catch (error) {

        console.error(
            "Não foi possível salvar o jogo:",
            error
        );

    }

}


/* =========================================================
   CARREGAMENTO MAIS SEGURO
========================================================= */

function loadGameComplete() {

    try {

        var saved =
            localStorage.getItem(SAVE_KEY);

        if (!saved) {

            alert(
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

            alert(
                "O salvamento está corrompido."
            );

            return;
        }

        game = loaded;

        prepareGameForStory();

        if (
            game.currentScene &&
            scenes[game.currentScene]
        ) {

            game.phase = "story";

            showScene(
                game.currentScene
            );

        } else {

            game.phase = "names";

            renderNameScreen();

        }

    } catch (error) {

        console.error(
            "Erro ao carregar o jogo:",
            error
        );

        alert(
            "O jogo salvo não pôde ser carregado."
        );

    }

}


/* =========================================================
   REINÍCIO COMPLETO
========================================================= */

function resetCompleteGame() {

    var confirmed =
        confirm(
            "Deseja apagar o progresso atual e começar uma nova aventura?"
        );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        SAVE_KEY
    );

    game =
        createInitialGame();

    currentSceneId =
        null;

    renderNameScreen();
}


/* =========================================================
   SUBSTITUIÇÃO DOS BOTÕES DE CONTROLE
========================================================= */

function replaceControlHandlers() {

    var saveButton =
        document.getElementById("saveButton");

    var loadButton =
        document.getElementById("loadButton");

    var restartButton =
        document.getElementById("restartButton");

    if (saveButton) {

        saveButton.onclick =
            function() {

                saveGameSilently();

                addLogEntry(
                    "Progresso salvo."
                );

            };

    }

    if (loadButton) {

        loadButton.onclick =
            function() {

                loadGameComplete();

            };

    }

    if (restartButton) {

        restartButton.onclick =
            function() {

                resetCompleteGame();

            };

    }

}


/* =========================================================
   INÍCIO DEFINITIVO
========================================================= */

function bootCompleteGame() {

    prepareGameForStory();

    replaceControlHandlers();

    initializeCompleteGame();

}


/* =========================================================
   INICIALIZAÇÃO QUANDO A PÁGINA CARREGA
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function() {

            bootCompleteGame();

        }
    );

} else {

    bootCompleteGame();

}


/* =========================================================
   FIM DA PARTE 4/6
========================================================= */
/* =========================================================
   PARTE 5/6
   SISTEMAS AVANÇADOS DE RPG
   ATRIBUTOS • XP • NÍVEIS • CASAS • RELACIONAMENTO
   AÇÕES • CONDIÇÕES • EVENTOS SECRETOS • CONSEQUÊNCIAS
========================================================= */


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

var RPG_CONFIG = {

    maxRelationship: 100,

    maxAttribute: 100,

    baseXpPerLevel: 100,

    hpPerLevel: 10,

    manaPerLevel: 10,

    magicPerLevel: 2,

    friendshipForSpecialEvent: 70,

    trustForSpecialEvent: 70,

    rivalryForSpecialEvent: 60,

    kiwiTrustForSecret: 60

};


/* =========================================================
   ATRIBUTOS
========================================================= */

var ATTRIBUTE_NAMES = {

    bravery: "Coragem",

    loyalty: "Lealdade",

    intelligence: "Inteligência",

    ambition: "Ambição",

    empathy: "Empatia",

    magic: "Magia"

};


function getAttributeName(attribute) {

    if (ATTRIBUTE_NAMES[attribute]) {
        return ATTRIBUTE_NAMES[attribute];
    }

    return attribute;

}


function getHighestAttribute(character) {

    var attributes = [
        "bravery",
        "loyalty",
        "intelligence",
        "ambition",
        "empathy"
    ];

    var highest = attributes[0];

    attributes.forEach(function(attribute) {

        if (
            character[attribute] >
            character[highest]
        ) {

            highest = attribute;

        }

    });

    return highest;

}


/* =========================================================
   DESCRIÇÃO DO PERFIL DO PERSONAGEM
========================================================= */

function getCharacterProfile(character) {

    if (!character) {
        return "";
    }

    var highest =
        getHighestAttribute(character);

    if (highest === "bravery") {

        return (
            "Este personagem costuma enfrentar situações difíceis " +
            "mesmo quando sente medo."
        );

    }

    if (highest === "loyalty") {

        return (
            "Este personagem valoriza vínculos, amizades e " +
            "promessas feitas aos outros."
        );

    }

    if (highest === "intelligence") {

        return (
            "Este personagem prefere compreender o problema " +
            "antes de agir."
        );

    }

    if (highest === "ambition") {

        return (
            "Este personagem possui grande determinação e " +
            "desejo de alcançar seus objetivos."
        );

    }

    if (highest === "empathy") {

        return (
            "Este personagem percebe facilmente as emoções " +
            "e necessidades de outras pessoas."
        );

    }

    return "";

}


/* =========================================================
   TESTE DE ATRIBUTO
========================================================= */

function attributeCheck(character, attribute, difficulty) {

    if (!character) {
        return false;
    }

    var value =
        Number(character[attribute] || 0);

    var randomBonus =
        Math.floor(Math.random() * 11);

    var result =
        value + randomBonus;

    return result >= difficulty;

}


/* =========================================================
   TESTE COM OS DOIS PERSONAGENS
========================================================= */

function combinedAttributeCheck(
    character1,
    character2,
    attribute,
    difficulty
) {

    var value1 =
        Number(character1[attribute] || 0);

    var value2 =
        Number(character2[attribute] || 0);

    var combined =
        Math.floor(
            (value1 + value2) / 2
        );

    var randomBonus =
        Math.floor(Math.random() * 11);

    return (
        combined +
        randomBonus >=
        difficulty
    );

}


/* =========================================================
   MODIFICADORES POR CASA
========================================================= */

function applyHouseBonus(character) {

    if (!character) {
        return;
    }

    if (character.house === "Grifinória") {

        character.bravery += 3;
        character.magic += 1;

    }

    else if (
        character.house === "Lufa-Lufa"
    ) {

        character.loyalty += 3;
        character.empathy += 2;

    }

    else if (
        character.house === "Corvinal"
    ) {

        character.intelligence += 3;
        character.magic += 1;

    }

    else if (
        character.house === "Sonserina"
    ) {

        character.ambition += 3;
        character.magic += 2;

    }

    normalizeCharacter(character);

}


/* =========================================================
   BÔNUS DE CASA
========================================================= */

function applyAllHouseBonuses() {

    if (
        game.flags.houseBonusesApplied
    ) {

        return;

    }

    applyHouseBonus(
        game.sasah
    );

    applyHouseBonus(
        game.lucas
    );

    game.flags.houseBonusesApplied =
        true;

}


/* =========================================================
   SISTEMA DE NÍVEL
========================================================= */

function getXpRequired(character) {

    if (!character) {
        return 100;
    }

    var level =
        Number(character.level || 1);

    return (
        level *
        RPG_CONFIG.baseXpPerLevel
    );

}


function getLevelProgress(character) {

    if (!character) {
        return 0;
    }

    var required =
        getXpRequired(character);

    if (required <= 0) {
        return 0;
    }

    return Math.min(
        100,
        Math.floor(
            (character.xp / required) *
            100
        )
    );

}


/* =========================================================
   SUBIR DE NÍVEL
========================================================= */

function levelUpCharacter(
    character,
    characterKey
) {

    if (!character) {
        return;
    }

    var leveledUp =
        false;

    var required =
        getXpRequired(character);

    while (
        character.xp >= required
    ) {

        character.xp -= required;

        character.level += 1;

        character.maxHp +=
            RPG_CONFIG.hpPerLevel;

        character.maxMana +=
            RPG_CONFIG.manaPerLevel;

        character.magic +=
            RPG_CONFIG.magicPerLevel;

        character.hp =
            character.maxHp;

        character.mana =
            character.maxMana;

        leveledUp = true;

        required =
            getXpRequired(character);

    }

    if (leveledUp) {

        addLogEntry(
            character.name +
            " alcançou o nível " +
            character.level +
            "."
        );

    }

}


/* =========================================================
   GANHO DE XP AVANÇADO
========================================================= */

function awardXp(
    characterKey,
    amount,
    reason
) {

    var character =
        game[characterKey];

    if (!character) {
        return;
    }

    var oldLevel =
        character.level;

    character.xp +=
        Number(amount || 0);

    levelUpCharacter(
        character,
        characterKey
    );

    if (reason) {

        addLogEntry(
            character.name +
            " recebeu " +
            amount +
            " XP: " +
            reason
        );

    }

    if (
        character.level >
        oldLevel
    ) {

        checkLevelEvents(
            characterKey,
            oldLevel,
            character.level
        );

    }

    normalizeCharacter(
        character
    );

}


/* =========================================================
   EVENTOS DE NÍVEL
========================================================= */

function checkLevelEvents(
    characterKey,
    oldLevel,
    newLevel
) {

    var character =
        game[characterKey];

    if (!character) {
        return;
    }

    if (
        oldLevel < 3 &&
        newLevel >= 3 &&
        !game.flags.level3Unlocked
    ) {

        game.flags.level3Unlocked =
            true;

        addLogEntry(
            character.name +
            " desbloqueou novas possibilidades mágicas."
        );

    }

    if (
        oldLevel < 5 &&
        newLevel >= 5 &&
        !game.flags.level5Unlocked
    ) {

        game.flags.level5Unlocked =
            true;

        addLogEntry(
            character.name +
            " atingiu um novo estágio de aprendizado."
        );

    }

    if (
        oldLevel < 10 &&
        newLevel >= 10 &&
        !game.flags.level10Unlocked
    ) {

        game.flags.level10Unlocked =
            true;

        addLogEntry(
            character.name +
            " alcançou um nível extraordinário de poder."
        );

    }

}


/* =========================================================
   RELACIONAMENTO
========================================================= */

function changeRelationship(
    friendship,
    trust,
    rivalry,
    affinity
) {

    if (
        typeof friendship === "number"
    ) {

        game.relationship.friendship +=
            friendship;

    }

    if (
        typeof trust === "number"
    ) {

        game.relationship.trust +=
            trust;

    }

    if (
        typeof rivalry === "number"
    ) {

        game.relationship.rivalry +=
            rivalry;

    }

    if (
        typeof affinity === "number"
    ) {

        game.relationship.affinity +=
            affinity;

    }

    normalizeRelationship();

    checkRelationshipEvents();

}


/* =========================================================
   EVENTOS DE RELACIONAMENTO
========================================================= */

function checkRelationshipEvents() {

    var relationship =
        game.relationship;

    if (
        relationship.friendship >= 70 &&
        !game.flags.friendship70
    ) {

        game.flags.friendship70 =
            true;

        addLogEntry(
            game.sasah.name +
            " e " +
            game.lucas.name +
            " desenvolveram uma amizade muito forte."
        );

    }

    if (
        relationship.trust >= 70 &&
        !game.flags.trust70
    ) {

        game.flags.trust70 =
            true;

        addLogEntry(
            "A confiança entre os protagonistas atingiu um nível elevado."
        );

    }

    if (
        relationship.rivalry >= 60 &&
        !game.flags.rivalry60
    ) {

        game.flags.rivalry60 =
            true;

        addLogEntry(
            "A rivalidade entre os protagonistas está começando a afetar suas escolhas."
        );

    }

    if (
        relationship.affinity >= 80 &&
        !game.flags.affinity80
    ) {

        game.flags.affinity80 =
            true;

        addLogEntry(
            "Existe uma ligação especialmente forte entre os protagonistas."
        );

    }

}


/* =========================================================
   EVENTOS DE KIWI
========================================================= */

function checkKiwiEvents() {

    var trust =
        Number(
            game.kiwi.trust || 0
        );

    if (
        trust >= 30 &&
        !game.flags.kiwi30
    ) {

        game.flags.kiwi30 =
            true;

        addLogEntry(
            "Kiwi começa a confiar verdadeiramente nos protagonistas."
        );

    }

    if (
        trust >= 60 &&
        !game.flags.kiwi60
    ) {

        game.flags.kiwi60 =
            true;

        game.flags.kiwiSecretUnlocked =
            true;

        addLogEntry(
            "Kiwi revelou que ainda possui segredos sobre Hogwarts."
        );

    }

    if (
        trust >= 80 &&
        !game.flags.kiwi80
    ) {

        game.flags.kiwi80 =
            true;

        game.flags.kiwiTrueAlly =
            true;

        addLogEntry(
            "Kiwi considera os protagonistas seus verdadeiros aliados."
        );

    }

}


/* =========================================================
   CONDIÇÕES DE CENA
========================================================= */

function checkCondition(
    condition
) {

    if (!condition) {
        return true;
    }

    if (condition.flag) {

        return (
            game.flags[condition.flag] ===
            condition.value
        );

    }

    if (condition.minFriendship) {

        if (
            game.relationship.friendship <
            condition.minFriendship
        ) {

            return false;

        }

    }

    if (condition.minTrust) {

        if (
            game.relationship.trust <
            condition.minTrust
        ) {

            return false;

        }

    }

    if (condition.minRivalry) {

        if (
            game.relationship.rivalry <
            condition.minRivalry
        ) {

            return false;

        }

    }

    if (condition.minKiwiTrust) {

        if (
            game.kiwi.trust <
            condition.minKiwiTrust
        ) {

            return false;

        }

    }

    if (condition.house) {

        var houseCharacter =
            game[
                condition.character ||
                "sasah"
            ];

        if (
            !houseCharacter ||
            houseCharacter.house !==
            condition.house
        ) {

            return false;

        }

    }

    return true;

}


/* =========================================================
   ESCOLHAS CONDICIONAIS
========================================================= */

function getAvailableChoices(
    scene
) {

    if (
        !scene ||
        !scene.choices
    ) {

        return [];

    }

    return scene.choices.filter(
        function(choice) {

            if (!choice.condition) {
                return true;
            }

            return checkCondition(
                choice.condition
            );

        }
    );

}


/* =========================================================
   AÇÕES ESPECIAIS
========================================================= */

var specialActions = {

    investigate: function(characterKey) {

        var character =
            game[characterKey];

        if (!character) {
            return;
        }

        var success =
            attributeCheck(
                character,
                "intelligence",
                12
            );

        if (success) {

            character.xp += 25;

            character.intelligence += 1;

            addLogEntry(
                character.name +
                " descobriu uma pista importante."
            );

        } else {

            character.xp += 10;

            addLogEntry(
                character.name +
                " não encontrou uma resposta, mas aprendeu algo."
            );

        }

        levelUpCharacter(
            character,
            characterKey
        );

        normalizeCharacter(
            character
        );

    },


    encourage: function(
        sourceKey,
        targetKey
    ) {

        var source =
            game[sourceKey];

        var target =
            game[targetKey];

        if (
            !source ||
            !target
        ) {

            return;

        }

        source.empathy += 1;

        target.loyalty += 1;

        target.hp =
            Math.min(
                target.maxHp,
                target.hp + 5
            );

        changeRelationship(
            3,
            3,
            -1,
            2
        );

        addLogEntry(
            source.name +
            " apoiou " +
            target.name +
            "."
        );

    },


    focus: function(
        characterKey
    ) {

        var character =
            game[characterKey];

        if (!character) {
            return;
        }

        character.mana =
            Math.min(
                character.maxMana,
                character.mana + 15
            );

        character.magic += 1;

        character.xp += 15;

        levelUpCharacter(
            character,
            characterKey
        );

        addLogEntry(
            character.name +
            " concentrou sua energia mágica."
        );

    },


    defend: function(
        characterKey
    ) {

        var character =
            game[characterKey];

        if (!character) {
            return;
        }

        character.bravery += 1;

        character.loyalty += 1;

        character.mana =
            Math.max(
                0,
                character.mana - 5
            );

        character.xp += 20;

        levelUpCharacter(
            character,
            characterKey
        );

        addLogEntry(
            character.name +
            " assumiu uma postura defensiva."
        );

    }

};


/* =========================================================
   AÇÃO DO JOGADOR
========================================================= */

function performSpecialAction(
    action,
    characterKey,
    targetKey
) {

    if (
        !specialActions[action]
    ) {

        return;

    }

    specialActions[action](
        characterKey,
        targetKey
    );

    checkRelationshipEvents();

    checkKiwiEvents();

    updateAllUI();

    saveGameSilently();

}


/* =========================================================
   SISTEMA DE CONSEQUÊNCIAS
========================================================= */

function evaluateConsequences() {

    checkRelationshipEvents();

    checkKiwiEvents();

    applyAllHouseBonuses();

    evaluateHouseInteractions();

    evaluateCharacterDifferences();

}


/* =========================================================
   INTERAÇÃO ENTRE CASAS
========================================================= */

function evaluateHouseInteractions() {

    var house1 =
        game.sasah.house;

    var house2 =
        game.lucas.house;

    if (
        !house1 ||
        !house2
    ) {

        return;

    }

    if (
        house1 === house2 &&
        !game.flags.sameHouse
    ) {

        game.flags.sameHouse =
            true;

        game.relationship.friendship +=
            3;

        addLogEntry(
            "Os protagonistas descobriram que pertencem à mesma casa."
        );

    }

    if (
        house1 !== house2 &&
        !game.flags.differentHouses
    ) {

        game.flags.differentHouses =
            true;

        game.relationship.rivalry +=
            2;

        addLogEntry(
            "As diferenças entre as casas começam a influenciar a relação dos protagonistas."
        );

    }

    normalizeRelationship();

}


/* =========================================================
   DIFERENÇAS ENTRE OS PROTAGONISTAS
========================================================= */

function evaluateCharacterDifferences() {

    var attribute1 =
        getHighestAttribute(
            game.sasah
        );

    var attribute2 =
        getHighestAttribute(
            game.lucas
        );

    if (
        attribute1 !== attribute2 &&
        !game.flags.differentProfiles
    ) {

        game.flags.differentProfiles =
            true;

        addLogEntry(
            game.sasah.name +
            " e " +
            game.lucas.name +
            " possuem perfis bastante diferentes."
        );

    }

    if (
        attribute1 === attribute2 &&
        !game.flags.similarProfiles
    ) {

        game.flags.similarProfiles =
            true;

        addLogEntry(
            "Os protagonistas descobriram que possuem uma característica em comum muito forte."
        );

    }

}


/* =========================================================
   BÔNUS DE DECISÃO
========================================================= */

function applyDecisionBonus(
    characterKey,
    attribute
) {

    var character =
        game[characterKey];

    if (!character) {
        return;
    }

    if (
        character[attribute] ===
        undefined
    ) {

        return;

    }

    character[attribute] += 1;

    character.xp += 10;

    levelUpCharacter(
        character,
        characterKey
    );

    normalizeCharacter(
        character
    );

}


/* =========================================================
   SISTEMA DE MORAL
========================================================= */

function getMoralAlignment() {

    var courage =
        game.sasah.bravery +
        game.lucas.bravery;

    var loyalty =
        game.sasah.loyalty +
        game.lucas.loyalty;

    var intelligence =
        game.sasah.intelligence +
        game.lucas.intelligence;

    var ambition =
        game.sasah.ambition +
        game.lucas.ambition;

    var empathy =
        game.sasah.empathy +
        game.lucas.empathy;

    if (
        empathy >= courage &&
        empathy >= loyalty
    ) {

        return "Protetores";

    }

    if (
        ambition >= intelligence &&
        ambition >= empathy
    ) {

        return "Ambiciosos";

    }

    if (
        intelligence >= courage &&
        intelligence >= loyalty
    ) {

        return "Estrategistas";

    }

    if (
        courage >= loyalty
    ) {

        return "Desafiadores";

    }

    return "Leais";

}


/* =========================================================
   SISTEMA DE DIFICULDADE
========================================================= */

function getDifficultyForChapter(
    chapter
) {

    if (chapter <= 3) {
        return 10;
    }

    if (chapter <= 6) {
        return 15;
    }

    if (chapter <= 10) {
        return 20;
    }

    if (chapter <= 14) {
        return 25;
    }

    if (chapter <= 17) {
        return 30;
    }

    return 35;

}


/* =========================================================
   SISTEMA DE MAGIA
========================================================= */

function castSpell(
    characterKey,
    spellName,
    manaCost,
    power
) {

    var character =
        game[characterKey];

    if (!character) {
        return false;
    }

    if (
        character.mana <
        manaCost
    ) {

        addLogEntry(
            character.name +
            " tentou usar " +
            spellName +
            ", mas não tinha mana suficiente."
        );

        return false;

    }

    character.mana -=
        manaCost;

    var effectivePower =
        power +
        Math.floor(
            character.magic / 5
        );

    character.xp +=
        Math.max(
            5,
            effectivePower
        );

    levelUpCharacter(
        character,
        characterKey
    );

    addLogEntry(
        character.name +
        " utilizou " +
        spellName +
        "."
    );

    normalizeCharacter(
        character
    );

    return true;

}


/* =========================================================
   FEITIÇOS DISPONÍVEIS
========================================================= */

var spellBook = {

    "Lumos": {
        mana: 3,
        power: 5
    },

    "Protego": {
        mana: 8,
        power: 10
    },

    "Expelliarmus": {
        mana: 12,
        power: 15
    },

    "Stupefy": {
        mana: 15,
        power: 18
    },

    "Expecto Patronum": {
        mana: 30,
        power: 35
    }

};


/* =========================================================
   USAR FEITIÇO
========================================================= */

function useSpell(
    characterKey,
    spellName
) {

    var spell =
        spellBook[spellName];

    if (!spell) {
        return false;
    }

    return castSpell(
        characterKey,
        spellName,
        spell.mana,
        spell.power
    );

}


/* =========================================================
   RECOMPENSA POR DESCOBERTA
========================================================= */

function rewardDiscovery(
    characterKey,
    description,
    xp
) {

    var character =
        game[characterKey];

    if (!character) {
        return;
    }

    character.intelligence +=
        1;

    character.xp +=
        xp || 25;

    levelUpCharacter(
        character,
        characterKey
    );

    addLogEntry(
        character.name +
        " descobriu: " +
        description
    );

}


/* =========================================================
   RECOMPENSA DE CORAGEM
========================================================= */

function rewardBravery(
    characterKey,
    description,
    xp
) {

    var character =
        game[characterKey];

    if (!character) {
        return;
    }

    character.bravery +=
        1;

    character.xp +=
        xp || 25;

    levelUpCharacter(
        character,
        characterKey
    );

    addLogEntry(
        character.name +
        " demonstrou coragem: " +
        description
    );

}


/* =========================================================
   RECOMPENSA DE LEALDADE
========================================================= */

function rewardLoyalty(
    characterKey,
    targetKey,
    description
) {

    var character =
        game[characterKey];

    var target =
        game[targetKey];

    if (
        !character ||
        !target
    ) {

        return;

    }

    character.loyalty +=
        1;

    target.hp =
        Math.min(
            target.maxHp,
            target.hp + 10
        );

    target.mana =
        Math.min(
            target.maxMana,
            target.mana + 5
        );

    changeRelationship(
        4,
        5,
        -2,
        3
    );

    character.xp +=
        30;

    levelUpCharacter(
        character,
        characterKey
    );

    addLogEntry(
        character.name +
        " demonstrou lealdade: " +
        description
    );

}


/* =========================================================
   RECOMPENSA DE EMPATIA
========================================================= */

function rewardEmpathy(
    characterKey,
    description
) {

    var character =
        game[characterKey];

    if (!character) {
        return;
    }

    character.empathy +=
        2;

    character.xp +=
        25;

    changeRelationship(
        3,
        3,
        -1,
        4
    );

    levelUpCharacter(
        character,
        characterKey
    );

    addLogEntry(
        character.name +
        " demonstrou empatia: " +
        description
    );

}


/* =========================================================
   RECOMPENSA DE AMBIÇÃO
========================================================= */

function rewardAmbition(
    characterKey,
    description
) {

    var character =
        game[characterKey];

    if (!character) {
        return;
    }

    character.ambition +=
        2;

    character.xp +=
        30;

    levelUpCharacter(
        character,
        characterKey
    );

    addLogEntry(
        character.name +
        " demonstrou determinação: " +
        description
    );

}


/* =========================================================
   RECOMPENSA DE INTELIGÊNCIA
========================================================= */

function rewardIntelligence(
    characterKey,
    description
) {

    var character =
        game[characterKey];

    if (!character) {
        return;
    }

    character.intelligence +=
        2;

    character.xp +=
        30;

    levelUpCharacter(
        character,
        characterKey
    );

    addLogEntry(
        character.name +
        " demonstrou inteligência: " +
        description
    );

}


/* =========================================================
   EVENTOS SECRETOS
========================================================= */

function checkSecretEvents() {

    /*
       Kiwi muito próximo dos protagonistas.
    */

    if (
        game.kiwi.trust >= 60 &&
        game.relationship.trust >= 60 &&
        !game.flags.secretKiwiEvent
    ) {

        game.flags.secretKiwiEvent =
            true;

        addLogEntry(
            "Kiwi revelou uma passagem secreta que somente seus verdadeiros aliados podem encontrar."
        );

    }


    /*
       Grande amizade.
    */

    if (
        game.relationship.friendship >= 80 &&
        !game.flags.secretFriendshipEvent
    ) {

        game.flags.secretFriendshipEvent =
            true;

        addLogEntry(
            "A amizade entre os protagonistas desbloqueou uma memória especial."
        );

    }


    /*
       Grande rivalidade.
    */

    if (
        game.relationship.rivalry >= 70 &&
        !game.flags.secretRivalryEvent
    ) {

        game.flags.secretRivalryEvent =
            true;

        addLogEntry(
            "A rivalidade atingiu um ponto em que uma escolha futura poderá mudar completamente a história."
        );

    }


    /*
       Perfil mágico muito elevado.
    */

    if (
        game.sasah.magic >= 25 &&
        game.lucas.magic >= 25 &&
        !game.flags.powerfulMagicEvent
    ) {

        game.flags.powerfulMagicEvent =
            true;

        addLogEntry(
            "A energia mágica combinada dos protagonistas começou a chamar atenção."
        );

    }

}


/* =========================================================
   EXECUTA TODOS OS SISTEMAS
========================================================= */

function updateRPGSystems() {

    normalizeCharacter(
        game.sasah
    );

    normalizeCharacter(
        game.lucas
    );

    normalizeRelationship();

    normalizeKiwi();

    checkRelationshipEvents();

    checkKiwiEvents();

    checkSecretEvents();

    evaluateHouseInteractions();

    evaluateCharacterDifferences();

}


/* =========================================================
   ATUALIZAÇÃO ANTES DE UMA NOVA CENA
========================================================= */

function prepareNextScene() {

    updateRPGSystems();

    applyAllHouseBonuses();

    updateAllUI();

    saveGameSilently();

}


/* =========================================================
   MOTOR DE ESCOLHAS AVANÇADO
========================================================= */

function chooseAdvancedScene(
    choice
) {

    if (!choice) {
        return;
    }

    if (
        choice.condition &&
        !checkCondition(
            choice.condition
        )
    ) {

        return;

    }

    if (choice.effects) {

        applyEffects(
            choice.effects
        );

    }

    if (
        choice.attributeBonus
    ) {

        applyDecisionBonus(
            choice.character ||
            "sasah",
            choice.attributeBonus
        );

    }

    addLogEntry(
        "Escolha realizada: " +
        replaceTokens(
            choice.text
        )
    );

    prepareNextScene();

    if (choice.next) {

        showScene(
            choice.next
        );

    }

}


/* =========================================================
   SUBSTITUI O MOTOR DE ESCOLHAS
========================================================= */

function activateAdvancedChoices() {

    var originalShowScene =
        window.showScene;

    if (
        typeof originalShowScene !==
        "function"
    ) {

        return;

    }

}


/* =========================================================
   INDICADOR DE TURNO
========================================================= */

function getTurnCharacterName() {

    if (
        game.turnMode ===
        "sasah"
    ) {

        return game.sasah.name;

    }

    if (
        game.turnMode ===
        "lucas"
    ) {

        return game.lucas.name;

    }

    return (
        game.sasah.name +
        " e " +
        game.lucas.name
    );

}


/* =========================================================
   TEXTO DE TURNO
========================================================= */

function getTurnDescription() {

    if (
        game.turnMode ===
        "sasah"
    ) {

        return (
            game.sasah.name +
            " deve decidir."
        );

    }

    if (
        game.turnMode ===
        "lucas"
    ) {

        return (
            game.lucas.name +
            " deve decidir."
        );

    }

    return (
        game.sasah.name +
        " e " +
        game.lucas.name +
        " devem decidir juntos."
    );

}


/* =========================================================
   ESTATÍSTICAS PARA O FINAL
========================================================= */

function calculateFinalScore() {

    var score = 0;

    score +=
        game.sasah.level * 5;

    score +=
        game.lucas.level * 5;

    score +=
        game.relationship.friendship;

    score +=
        game.relationship.trust;

    score +=
        game.kiwi.trust;

    if (
        game.flags.studentsProtected
    ) {

        score += 20;

    }

    if (
        game.flags.foughtTogether
    ) {

        score += 30;

    }

    if (
        game.flags.sharedBond
    ) {

        score += 50;

    }

    if (
        game.flags.chamberSealed
    ) {

        score += 40;

    }

    return score;

}


/* =========================================================
   CLASSIFICAÇÃO DO FINAL
========================================================= */

function getEndingRank() {

    var score =
        calculateFinalScore();

    if (score >= 350) {

        return "Lendário";

    }

    if (score >= 280) {

        return "Extraordinário";

    }

    if (score >= 210) {

        return "Excelente";

    }

    if (score >= 150) {

        return "Bom";

    }

    return "Sobrevivente";

}


/* =========================================================
   RESUMO DA AVENTURA
========================================================= */

function generateAdventureSummary() {

    var summary = [];

    summary.push(
        "Classificação: " +
        getEndingRank()
    );

    summary.push(
        game.sasah.name +
        " — " +
        game.sasah.house +
        " — nível " +
        game.sasah.level
    );

    summary.push(
        game.lucas.name +
        " — " +
        game.lucas.house +
        " — nível " +
        game.lucas.level
    );

    summary.push(
        "Amizade: " +
        game.relationship.friendship
    );

    summary.push(
        "Confiança: " +
        game.relationship.trust
    );

    summary.push(
        "Rivalidade: " +
        game.relationship.rivalry
    );

    summary.push(
        "Afinidade: " +
        game.relationship.affinity
    );

    summary.push(
        "Confiança de Kiwi: " +
        game.kiwi.trust
    );

    return summary;

}


/* =========================================================
   DIÁRIO FINAL
========================================================= */

function addFinalSummaryToLog() {

    var summary =
        generateAdventureSummary();

    summary.forEach(
        function(line) {

            addLogEntry(
                line
            );

        }
    );

}


/* =========================================================
   PREPARAÇÃO PARA O FINAL
========================================================= */

function prepareEnding() {

    updateRPGSystems();

    addFinalSummaryToLog();

    game.flags.summaryGenerated =
        true;

    saveGameSilently();

}


/* =========================================================
   PROTEÇÃO CONTRA VALORES INVÁLIDOS
========================================================= */

function repairGameState() {

    if (!game.sasah) {
        game.sasah =
            createInitialGame().sasah;
    }

    if (!game.lucas) {
        game.lucas =
            createInitialGame().lucas;
    }

    if (!game.relationship) {

        game.relationship = {

            friendship: 50,
            trust: 50,
            rivalry: 0,
            affinity: 50

        };

    }

    if (!game.kiwi) {

        game.kiwi = {

            name: "Kiwi",
            trust: 0,
            discovered: false,
            rescued: false

        };

    }

    if (!game.flags) {
        game.flags = {};
    }

    if (!game.houseAnswers) {

        game.houseAnswers = {

            sasah: [],
            lucas: []

        };

    }

    if (!game.log) {
        game.log = [];
    }

    normalizeCharacter(
        game.sasah
    );

    normalizeCharacter(
        game.lucas
    );

    normalizeRelationship();

    normalizeKiwi();

}


/* =========================================================
   REPARO AUTOMÁTICO
========================================================= */

function runAutomaticRepair() {

    try {

        repairGameState();

        updateRPGSystems();

    } catch (error) {

        console.error(
            "Erro no reparo automático:",
            error
        );

    }

}


/* =========================================================
   SISTEMA DE AUTOSAVE
========================================================= */

var autoSaveTimer = null;


function startAutoSave() {

    if (autoSaveTimer) {

        clearInterval(
            autoSaveTimer
        );

    }

    autoSaveTimer =
        setInterval(
            function() {

                try {

                    if (
                        game &&
                        game.phase !==
                        "names"
                    ) {

                        saveGameSilently();

                    }

                } catch (error) {

                    console.error(
                        "Erro no autosave:",
                        error
                    );

                }

            },
            30000
        );

}


/* =========================================================
   INICIALIZAÇÃO DOS SISTEMAS
========================================================= */

function initializeAdvancedRPG() {

    runAutomaticRepair();

    startAutoSave();

    updateAllUI();

}


/* =========================================================
   EXECUTAR AO CARREGAR
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function() {

            initializeAdvancedRPG();

        }
    );

} else {

    initializeAdvancedRPG();

}


/* =========================================================
   FIM DA PARTE 5/6
========================================================= */
/* =========================================================
   PARTE 6/6
   MOTOR FINAL DO RPG
   INTEGRAÇÃO • CENAS • ESCOLHAS • TURNOS • SAVE/LOAD
   FINAIS • SEGURANÇA • INICIALIZAÇÃO
========================================================= */


/* =========================================================
   CONFIGURAÇÃO FINAL
========================================================= */

var FINAL_ENGINE_VERSION = "6.0";

var FINAL_SAVE_KEY =
    "hogwarts_rpg_final_v10";


/* =========================================================
   GARANTE A EXISTÊNCIA DO OBJETO GAME
========================================================= */

function ensureGameStructure() {

    if (!window.game) {

        window.game = {};

    }

    if (
        typeof game.phase ===
        "undefined"
    ) {

        game.phase = "names";

    }

    if (
        typeof game.chapter !==
        "number"
    ) {

        game.chapter = 0;

    }

    if (
        typeof game.scene !==
        "number"
    ) {

        game.scene = 0;

    }

    if (
        typeof game.turnMode ===
        "undefined"
    ) {

        game.turnMode = "both";

    }

    if (!game.flags) {

        game.flags = {};

    }

    if (!game.relationship) {

        game.relationship = {

            friendship: 50,
            trust: 50,
            rivalry: 0,
            affinity: 50

        };

    }

    if (!game.kiwi) {

        game.kiwi = {

            name: "Kiwi",
            trust: 0,
            discovered: false,
            rescued: false

        };

    }

    if (!game.log) {

        game.log = [];

    }

}


/* =========================================================
   NORMALIZA PERSONAGEM
========================================================= */

function normalizeCharacterFinal(
    character
) {

    if (!character) {
        return;
    }

    if (
        typeof character.level !==
        "number"
    ) {

        character.level = 1;

    }

    if (
        typeof character.xp !==
        "number"
    ) {

        character.xp = 0;

    }

    if (
        typeof character.maxHp !==
        "number"
    ) {

        character.maxHp = 100;

    }

    if (
        typeof character.hp !==
        "number"
    ) {

        character.hp =
            character.maxHp;

    }

    if (
        typeof character.maxMana !==
        "number"
    ) {

        character.maxMana = 100;

    }

    if (
        typeof character.mana !==
        "number"
    ) {

        character.mana =
            character.maxMana;

    }

    var attributes = [

        "bravery",
        "loyalty",
        "intelligence",
        "ambition",
        "empathy",
        "magic"

    ];

    attributes.forEach(
        function(attribute) {

            if (
                typeof character[
                    attribute
                ] !== "number"
            ) {

                character[
                    attribute
                ] = 0;

            }

        }
    );

    if (
        typeof character.house ===
        "undefined"
    ) {

        character.house = "";

    }

    if (
        typeof character.name ===
        "undefined"
    ) {

        character.name = "Protagonista";

    }

    character.hp =
        Math.max(
            0,
            Math.min(
                character.maxHp,
                character.hp
            )
        );

    character.mana =
        Math.max(
            0,
            Math.min(
                character.maxMana,
                character.mana
            )
        );

}


/* =========================================================
   NORMALIZA RELACIONAMENTO
========================================================= */

function normalizeRelationshipFinal() {

    if (!game.relationship) {

        game.relationship = {

            friendship: 50,
            trust: 50,
            rivalry: 0,
            affinity: 50

        };

    }

    var values = [

        "friendship",
        "trust",
        "rivalry",
        "affinity"

    ];

    values.forEach(
        function(value) {

            if (
                typeof game.relationship[
                    value
                ] !== "number"
            ) {

                game.relationship[
                    value
                ] = 0;

            }

            game.relationship[
                value
            ] = Math.max(
                0,
                Math.min(
                    100,
                    game.relationship[
                        value
                    ]
                )
            );

        }
    );

}


/* =========================================================
   NORMALIZA KIWI
========================================================= */

function normalizeKiwiFinal() {

    if (!game.kiwi) {

        game.kiwi = {

            name: "Kiwi",
            trust: 0,
            discovered: false,
            rescued: false

        };

    }

    if (
        typeof game.kiwi.trust !==
        "number"
    ) {

        game.kiwi.trust = 0;

    }

    game.kiwi.trust =
        Math.max(
            0,
            Math.min(
                100,
                game.kiwi.trust
            )
        );

}


/* =========================================================
   NORMALIZAÇÃO GERAL
========================================================= */

function normalizeFinalGame() {

    ensureGameStructure();

    normalizeCharacterFinal(
        game.sasah
    );

    normalizeCharacterFinal(
        game.lucas
    );

    normalizeRelationshipFinal();

    normalizeKiwiFinal();

}


/* =========================================================
   SUBSTITUIÇÃO DE TOKENS
========================================================= */

function replaceTokensFinal(
    text
) {

    if (
        text === null ||
        typeof text === "undefined"
    ) {

        return "";

    }

    var result =
        String(text);

    var p1 =
        game.sasah &&
        game.sasah.name
            ? game.sasah.name
            : "Sasah";

    var p2 =
        game.lucas &&
        game.lucas.name
            ? game.lucas.name
            : "Lucas";

    var kiwi =
        game.kiwi &&
        game.kiwi.name
            ? game.kiwi.name
            : "Kiwi";

    result =
        result.replace(
            /\{P1\}/g,
            p1
        );

    result =
        result.replace(
            /\{P2\}/g,
            p2
        );

    result =
        result.replace(
            /\{KIWI\}/g,
            kiwi
        );

    return result;

}


/* =========================================================
   EFEITOS
========================================================= */

function applyFinalEffects(
    effects
) {

    if (!effects) {
        return;
    }


    /* ---------- SASAH ---------- */

    if (
        effects.sasah
    ) {

        applyCharacterEffectsFinal(
            game.sasah,
            effects.sasah
        );

    }


    /* ---------- LUCAS ---------- */

    if (
        effects.lucas
    ) {

        applyCharacterEffectsFinal(
            game.lucas,
            effects.lucas
        );

    }


    /* ---------- RELACIONAMENTO ---------- */

    if (
        effects.relationship
    ) {

        var relationship =
            effects.relationship;

        Object.keys(
            relationship
        ).forEach(
            function(key) {

                if (
                    typeof relationship[
                        key
                    ] === "number"
                ) {

                    game.relationship[
                        key
                    ] += relationship[
                        key
                    ];

                }

            }
        );

    }


    /* ---------- KIWI ---------- */

    if (
        effects.kiwi
    ) {

        Object.keys(
            effects.kiwi
        ).forEach(
            function(key) {

                var value =
                    effects.kiwi[key];

                if (
                    typeof value ===
                    "number"
                ) {

                    game.kiwi[key] +=
                        value;

                }

                else {

                    game.kiwi[key] =
                        value;

                }

            }
        );

    }


    /* ---------- FLAGS ---------- */

    if (
        effects.flags
    ) {

        Object.keys(
            effects.flags
        ).forEach(
            function(flag) {

                game.flags[flag] =
                    effects.flags[flag];

            }
        );

    }


    normalizeFinalGame();

}


/* =========================================================
   EFEITOS DOS PERSONAGENS
========================================================= */

function applyCharacterEffectsFinal(
    character,
    effects
) {

    if (!character) {
        return;
    }

    Object.keys(
        effects
    ).forEach(
        function(attribute) {

            var value =
                effects[attribute];

            if (
                typeof value !==
                "number"
            ) {

                character[attribute] =
                    value;

                return;

            }

            if (
                typeof character[
                    attribute
                ] !== "number"
            ) {

                character[
                    attribute
                ] = 0;

            }

            character[
                attribute
            ] += value;

        }
    );

}


/* =========================================================
   SISTEMA DE LOG
========================================================= */

function addFinalLog(
    message
) {

    if (!game.log) {

        game.log = [];

    }

    game.log.push(
        replaceTokensFinal(
            message
        )
    );

    if (
        game.log.length >
        150
    ) {

        game.log =
            game.log.slice(
                -150
            );

    }

    renderFinalLog();

}


/* =========================================================
   RENDERIZA DIÁRIO
========================================================= */

function renderFinalLog() {

    var log =
        document.getElementById(
            "log"
        );

    if (!log) {
        return;
    }

    log.innerHTML = "";

    var entries =
        game.log || [];

    entries.forEach(
        function(entry) {

            var p =
                document.createElement(
                    "p"
                );

            p.textContent =
                entry;

            log.appendChild(p);

        }
    );

    log.scrollTop =
        log.scrollHeight;

}


/* =========================================================
   RENDERIZA BARRA
========================================================= */

function renderBarFinal(
    id,
    current,
    maximum
) {

    var element =
        document.getElementById(
            id
        );

    if (!element) {
        return;
    }

    var percentage = 0;

    if (
        maximum > 0
    ) {

        percentage =
            Math.max(
                0,
                Math.min(
                    100,
                    (
                        current /
                        maximum
                    ) * 100
                )
            );

    }

    element.style.width =
        percentage + "%";

}


/* =========================================================
   ATUALIZA INTERFACE
========================================================= */

function updateFinalInterface() {

    normalizeFinalGame();


    /* ---------- SASAH ---------- */

    if (game.sasah) {

        setText(
            "sasahName",
            game.sasah.name
        );

        setText(
            "sasahHouse",
            game.sasah.house ||
            "Sem casa"
        );

        setText(
            "sasahHpText",
            game.sasah.hp +
            " / " +
            game.sasah.maxHp
        );

        setText(
            "sasahManaText",
            game.sasah.mana +
            " / " +
            game.sasah.maxMana
        );

        setText(
            "sasahXpText",
            game.sasah.xp +
            " / " +
            getXpRequired(
                game.sasah
            )
        );

        renderBarFinal(
            "sasahHp",
            game.sasah.hp,
            game.sasah.maxHp
        );

        renderBarFinal(
            "sasahMana",
            game.sasah.mana,
            game.sasah.maxMana
        );

        renderBarFinal(
            "sasahXp",
            game.sasah.xp,
            getXpRequired(
                game.sasah
            )
        );

        setText(
            "sasahBravery",
            game.sasah.bravery
        );

        setText(
            "sasahLoyalty",
            game.sasah.loyalty
        );

        setText(
            "sasahIntelligence",
            game.sasah.intelligence
        );

        setText(
            "sasahAmbition",
            game.sasah.ambition
        );

        setText(
            "sasahEmpathy",
            game.sasah.empathy
        );

        setText(
            "sasahMagic",
            game.sasah.magic
        );

    }


    /* ---------- LUCAS ---------- */

    if (game.lucas) {

        setText(
            "lucasName",
            game.lucas.name
        );

        setText(
            "lucasHouse",
            game.lucas.house ||
            "Sem casa"
        );

        setText(
            "lucasHpText",
            game.lucas.hp +
            " / " +
            game.lucas.maxHp
        );

        setText(
            "lucasManaText",
            game.lucas.mana +
            " / " +
            game.lucas.maxMana
        );

        setText(
            "lucasXp",
            game.lucas.xp +
            " / " +
            getXpRequired(
                game.lucas
            )
        );

        renderBarFinal(
            "lucasHp",
            game.lucas.hp,
            game.lucas.maxHp
        );

        renderBarFinal(
            "lucasMana",
            game.lucas.mana,
            game.lucas.maxMana
        );

        renderBarFinal(
            "lucasXp",
            game.lucas.xp,
            getXpRequired(
                game.lucas
            )
        );

        setText(
            "lucasBravery",
            game.lucas.bravery
        );

        setText(
            "lucasLoyalty",
            game.lucas.loyalty
        );

        setText(
            "lucasIntelligence",
            game.lucas.intelligence
        );

        setText(
            "lucasAmbition",
            game.lucas.ambition
        );

        setText(
            "lucasEmpathy",
            game.lucas.empathy
        );

        setText(
            "lucasMagic",
            game.lucas.magic
        );

    }


    /* ---------- RELACIONAMENTO ---------- */

    setText(
        "friendship",
        game.relationship.friendship
    );

    setText(
        "trust",
        game.relationship.trust
    );

    setText(
        "rivalry",
        game.relationship.rivalry
    );

    setText(
        "affinity",
        game.relationship.affinity
    );


    renderFinalLog();

}


/* =========================================================
   MOSTRA TURNO
========================================================= */

function renderFinalTurn() {

    var container =
        document.getElementById(
            "playerTag"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    var text =
        document.createElement(
            "span"
        );

    text.className =
        "turn-indicator";

    if (
        game.turnMode ===
        "sasah"
    ) {

        text.textContent =
            "Turno de " +
            game.sasah.name;

    }

    else if (
        game.turnMode ===
        "lucas"
    ) {

        text.textContent =
            "Turno de " +
            game.lucas.name;

    }

    else {

        text.textContent =
            "Decisão conjunta";

    }

    container.appendChild(
        text
    );

}


/* =========================================================
   RENDERIZADOR DE CENA
========================================================= */

function renderFinalScene(
    sceneId
) {

    if (
        !window.scenes ||
        !scenes[sceneId]
    ) {

        renderFallbackFinalScene();

        return;

    }

    var scene =
        scenes[sceneId];

    game.currentSceneId =
        sceneId;

    game.chapter =
        scene.chapter ||
        game.chapter;

    game.scene =
        scene.scene ||
        0;


    /* ---------- MODO ---------- */

    if (
        scene.mode
    ) {

        game.turnMode =
            scene.mode;

    }


    /* ---------- LOCAL ---------- */

    setText(
        "chapter",
        "CAPÍTULO " +
        game.chapter
    );

    setText(
        "location",
        replaceTokensFinal(
            scene.location ||
            "Hogwarts"
        )
    );


    /* ---------- TEXTO ---------- */

    var sceneElement =
        document.getElementById(
            "scene"
        );

    if (!sceneElement) {
        return;
    }

    sceneElement.innerHTML = "";


    var title =
        document.createElement(
            "h2"
        );

    title.className =
        "story-title";

    title.textContent =
        replaceTokensFinal(
            scene.title ||
            "Hogwarts"
        );

    sceneElement.appendChild(
        title
    );


    var text =
        replaceTokensFinal(
            scene.text ||
            ""
        );

    var paragraphs =
        text.split(
            /\n\s*\n/
        );

    paragraphs.forEach(
        function(paragraphText) {

            if (
                !paragraphText.trim()
            ) {

                return;

            }

            var paragraph =
                document.createElement(
                    "p"
                );

            paragraph.textContent =
                paragraphText.trim();

            sceneElement.appendChild(
                paragraph
            );

        }
    );


    /* ---------- TURNO ---------- */

    renderFinalTurn();


    /* ---------- ESCOLHAS ---------- */

    renderFinalChoices(
        scene
    );


    /* ---------- SISTEMAS ---------- */

    updateFinalInterface();

    updateFinalSpecialFlags();

}


/* =========================================================
   RENDERIZA ESCOLHAS
========================================================= */

function renderFinalChoices(
    scene
) {

    var choicesElement =
        document.getElementById(
            "choices"
        );

    if (!choicesElement) {
        return;
    }

    choicesElement.innerHTML = "";


    var available =
        getAvailableChoices(
            scene
        );


    if (
        available.length === 0
    ) {

        return;

    }


    var heading =
        document.createElement(
            "h3"
        );

    heading.textContent =
        "O que acontece agora?";

    choicesElement.appendChild(
        heading
    );


    available.forEach(
        function(choice, index) {

            var button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "choice-button";

            button.textContent =
                replaceTokensFinal(
                    choice.text
                );


            button.addEventListener(
                "click",
                function() {

                    handleFinalChoice(
                        choice,
                        index
                    );

                }
            );


            choicesElement.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   ESCOLHA
========================================================= */

function handleFinalChoice(
    choice,
    index
) {

    if (!choice) {
        return;
    }


    /* ---------- EFEITOS ---------- */

    if (
        choice.effects
    ) {

        applyFinalEffects(
            choice.effects
        );

    }


    /* ---------- BÔNUS DE ATRIBUTO ---------- */

    if (
        choice.attributeBonus
    ) {

        var characterKey =
            choice.character ||
            (
                game.turnMode ===
                "lucas"
                    ? "lucas"
                    : "sasah"
            );

        applyDecisionBonus(
            characterKey,
            choice.attributeBonus
        );

    }


    /* ---------- XP ---------- */

    if (
        typeof choice.xp ===
        "number"
    ) {

        var xpCharacter =
            choice.character ||
            (
                game.turnMode ===
                "lucas"
                    ? "lucas"
                    : "sasah"
            );

        awardXp(
            xpCharacter,
            choice.xp,
            "decisão importante"
        );

    }


    /* ---------- LOG ---------- */

    addFinalLog(
        "Escolha: " +
        replaceTokensFinal(
            choice.text
        )
    );


    /* ---------- CONSEQUÊNCIAS ---------- */

    evaluateConsequences();

    checkSecretEvents();

    updateFinalInterface();


    /* ---------- PRÓXIMA CENA ---------- */

    if (
        choice.next
    ) {

        setTimeout(
            function() {

                showScene(
                    choice.next
                );

            },
            120
        );

        return;

    }


    /* ---------- FINAL ---------- */

    if (
        choice.ending
    ) {

        showFinalEnding(
            choice.ending
        );

        return;

    }

}


/* =========================================================
   FUNÇÃO PRINCIPAL DE SHOW SCENE
========================================================= */

function showScene(
    sceneId
) {

    if (
        !sceneId
    ) {

        showFinalEnding(
            "normal"
        );

        return;

    }

    if (
        !window.scenes ||
        !scenes[sceneId]
    ) {

        renderFallbackFinalScene();

        return;

    }

    renderFinalScene(
        sceneId
    );

    saveGameSilently();

}


/* =========================================================
   CENA DE SEGURANÇA
========================================================= */

function renderFallbackFinalScene() {

    var scene =
        document.getElementById(
            "scene"
        );

    if (!scene) {
        return;
    }

    scene.innerHTML = "";

    var title =
        document.createElement(
            "h2"
        );

    title.className =
        "story-title";

    title.textContent =
        "Um silêncio inesperado";

    scene.appendChild(
        title
    );

    var paragraph =
        document.createElement(
            "p"
        );

    paragraph.textContent =
        "As páginas desta aventura parecem ter se embaralhado. " +
        "Mas a história ainda pode ser preservada pelo diário mágico.";

    scene.appendChild(
        paragraph
    );

    var button =
        document.createElement(
            "button"
        );

    button.className =
        "choice-button";

    button.textContent =
        "Voltar ao último capítulo";

    button.onclick =
        function() {

            if (
                game.currentSceneId &&
                window.scenes &&
                scenes[
                    game.currentSceneId
                ]
            ) {

                showScene(
                    game.currentSceneId
                );

            }

        };

    var choices =
        document.getElementById(
            "choices"
        );

    if (choices) {

        choices.innerHTML = "";

        choices.appendChild(
            button
        );

    }

}


/* =========================================================
   FINAIS
========================================================= */

function showFinalEnding(
    endingType
) {

    game.flags.gameFinished =
        true;

    prepareEnding();

    var scene =
        document.getElementById(
            "scene"
        );

    var choices =
        document.getElementById(
            "choices"
        );

    if (!scene) {
        return;
    }

    scene.innerHTML = "";

    if (choices) {

        choices.innerHTML = "";

    }


    var title =
        document.createElement(
            "h2"
        );

    title.className =
        "story-title";

    title.textContent =
        getEndingTitle(
            endingType
        );

    scene.appendChild(
        title
    );


    var paragraphs =
        getEndingText(
            endingType
        );


    paragraphs.forEach(
        function(text) {

            var p =
                document.createElement(
                    "p"
                );

            p.textContent =
                replaceTokensFinal(
                    text
                );

            scene.appendChild(
                p
            );

        }
    );


    var score =
        document.createElement(
            "p"
        );

    score.className =
        "ending-score";

    score.textContent =
        "Classificação da aventura: " +
        getEndingRank();

    scene.appendChild(
        score
    );


    if (choices) {

        var restart =
            document.createElement(
                "button"
            );

        restart.className =
            "choice-button";

        restart.textContent =
            "Recomeçar a aventura";

        restart.onclick =
            function() {

                resetFinalGame();

            };

        choices.appendChild(
            restart
        );

    }


    updateFinalInterface();

    saveGameSilently();

}


/* =========================================================
   TÍTULO DOS FINAIS
========================================================= */

function getEndingTitle(
    endingType
) {

    if (
        endingType ===
        "sacrifice"
    ) {

        return "O preço da magia";

    }

    if (
        endingType ===
        "dark"
    ) {

        return "A vitória das sombras";

    }

    if (
        endingType ===
        "secret"
    ) {

        return "O segredo além do véu";

    }

    if (
        endingType ===
        "friendship"
    ) {

        return "Dois nomes na história";

    }

    if (
        endingType ===
        "kiwi"
    ) {

        return "O segredo de Kiwi";

    }

    return "O fim de uma era";


}


/* =========================================================
   TEXTO DOS FINAIS
========================================================= */

function getEndingText(
    endingType
) {

    if (
        endingType ===
        "sacrifice"
    ) {

        return [

            "A batalha terminou, mas a magia cobrou seu preço.",

            "Quando o último feitiço desapareceu, {P1} e {P2} perceberam que Hogwarts jamais seria a mesma.",

            "Algumas cicatrizes permaneceriam. Algumas perguntas continuariam sem resposta.",

            "Ainda assim, os dois permaneceram juntos diante das ruínas.",

            "Kiwi observou em silêncio, sabendo que aquela história ainda não havia terminado."

        ];

    }


    if (
        endingType ===
        "dark"
    ) {

        return [

            "As sombras venceram a primeira batalha.",

            "Hogwarts sobreviveu, mas perdeu parte daquilo que a tornava um lar.",

            "{P1} e {P2} precisaram abandonar o castelo antes que fosse tarde demais.",

            "Kiwi desapareceu entre as passagens secretas.",

            "No horizonte, uma nova ameaça começou a surgir."

        ];

    }


    if (
        endingType ===
        "secret"
    ) {

        return [

            "O segredo escondido sob Hogwarts finalmente foi revelado.",

            "{P1} e {P2} descobriram que a ameaça era apenas uma parte de algo muito maior.",

            "A magia antiga reconheceu os dois como guardiões.",

            "Kiwi revelou sua verdadeira importância para aquela história.",

            "E uma porta que ninguém conhecia se abriu para além do mundo mágico."

        ];

    }


    if (
        endingType ===
        "friendship"
    ) {

        return [

            "Quando tudo terminou, ninguém conseguiu explicar exatamente como dois estudantes haviam conseguido sobreviver àquela aventura.",

            "Mas uma coisa era evidente: {P1} e {P2} haviam mudado.",

            "Eles aprenderam a confiar um no outro.",

            "Aprenderam que coragem não significa ausência de medo.",

            "E descobriram que algumas das maiores magias não são encontradas nos livros."

        ];

    }


    if (
        endingType ===
        "kiwi"
    ) {

        return [

            "Kiwi finalmente contou toda a verdade.",

            "A pequena criatura conhecia caminhos e segredos que estavam escondidos havia gerações.",

            "{P1} e {P2} compreenderam que Kiwi não havia simplesmente aparecido em suas vidas por acaso.",

            "Ele havia escolhido os dois.",

            "E, naquele momento, uma nova aventura começou."

        ];

    }


    return [

        "A última batalha chegou ao fim.",

        "O silêncio voltou aos corredores de Hogwarts.",

        "{P1} e {P2} olharam para o castelo e perceberam o quanto haviam mudado desde o primeiro dia.",

        "Eles haviam enfrentado medo, mistério, rivalidade, amizade e magia.",

        "A aventura terminou, mas suas histórias estavam apenas começando."

    ];

}


/* =========================================================
   FLAGS ESPECIAIS
========================================================= */

function updateFinalSpecialFlags() {

    if (
        game.relationship.friendship >= 80
    ) {

        game.flags.strongFriendship =
            true;

    }

    if (
        game.relationship.trust >= 80
    ) {

        game.flags.strongTrust =
            true;

    }

    if (
        game.relationship.rivalry >= 70
    ) {

        game.flags.dangerousRivalry =
            true;

    }

    if (
        game.kiwi.trust >= 80
    ) {

        game.flags.kiwiBestFriend =
            true;

    }

    if (
        game.sasah.magic >= 30 &&
        game.lucas.magic >= 30
    ) {

        game.flags.doubleMagic =
            true;

    }

}


/* =========================================================
   SAVE
========================================================= */

function saveGameSilently() {

    try {

        normalizeFinalGame();

        var saveData =
            JSON.stringify(
                game
            );

        localStorage.setItem(
            FINAL_SAVE_KEY,
            saveData
        );

        /*
           Também salva na chave antiga,
           quando possível, para manter
           compatibilidade com versões anteriores.
        */

        localStorage.setItem(
            "hogwarts_rpg_v10",
            saveData
        );

    } catch (error) {

        console.error(
            "Não foi possível salvar:",
            error
        );

    }

}


/* =========================================================
   SAVE MANUAL
========================================================= */

function saveFinalGame() {

    saveGameSilently();

    addFinalLog(
        "Jogo salvo no diário mágico."
    );

    updateFinalInterface();

}


/* =========================================================
   LOAD
========================================================= */

function loadFinalGame() {

    try {

        var data =
            localStorage.getItem(
                FINAL_SAVE_KEY
            );


        if (!data) {

            data =
                localStorage.getItem(
                    "hogwarts_rpg_v10"
                );

        }


        if (!data) {

            data =
                localStorage.getItem(
                    "hogwarts_rpg_v9"
                );

        }


        if (!data) {

            data =
                localStorage.getItem(
                    "hogwarts_rpg_v8"
                );

        }


        if (!data) {

            alert(
                "Nenhum jogo salvo foi encontrado."
            );

            return;

        }


        var loaded =
            JSON.parse(
                data
            );


        if (
            !loaded ||
            typeof loaded !==
            "object"
        ) {

            throw new Error(
                "Save inválido."
            );

        }


        window.game =
            loaded;


        normalizeFinalGame();

        updateFinalInterface();


        if (
            game.currentSceneId &&
            window.scenes &&
            scenes[
                game.currentSceneId
            ]
        ) {

            showScene(
                game.currentSceneId
            );

        }

        else {

            alert(
                "O jogo foi carregado, mas a cena anterior não está disponível."
            );

        }


    } catch (error) {

        console.error(
            "Erro ao carregar:",
            error
        );

        alert(
            "Não foi possível carregar este jogo salvo."
        );

    }

}


/* =========================================================
   RESET
========================================================= */

function resetFinalGame() {

    var confirmation =
        window.confirm(
            "Tem certeza que deseja apagar a aventura atual e começar novamente?"
        );

    if (!confirmation) {
        return;
    }


    try {

        localStorage.removeItem(
            FINAL_SAVE_KEY
        );

        localStorage.removeItem(
            "hogwarts_rpg_v10"
        );

        localStorage.removeItem(
            "hogwarts_rpg_v9"
        );

        localStorage.removeItem(
            "hogwarts_rpg_v8"
        );

        localStorage.removeItem(
            "hogwarts_rpg_v7"
        );

    } catch (error) {

        console.error(
            error
        );

    }


    window.location.reload();

}


/* =========================================================
   BOTÕES
========================================================= */

function connectFinalButtons() {

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

        saveButton.onclick =
            function() {

                saveFinalGame();

            };

    }


    if (loadButton) {

        loadButton.onclick =
            function() {

                loadFinalGame();

            };

    }


    if (restartButton) {

        restartButton.onclick =
            function() {

                resetFinalGame();

            };

    }

}


/* =========================================================
   CONTROLES DE TURNO
========================================================= */

function connectFinalTurnControls() {

    var buttons =
        document.querySelectorAll(
            ".player-turn"
        );


    buttons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    var mode =
                        button.getAttribute(
                            "data-player"
                        );


                    if (
                        mode ===
                        "player-one"
                    ) {

                        game.turnMode =
                            "sasah";

                    }

                    else if (
                        mode ===
                        "player-two"
                    ) {

                        game.turnMode =
                            "lucas";

                    }

                    else {

                        game.turnMode =
                            "both";

                    }


                    renderFinalTurn();

                    saveGameSilently();

                }
            );

        }
    );

}


/* =========================================================
   TECLADO
========================================================= */

function connectKeyboardControls() {

    document.addEventListener(
        "keydown",
        function(event) {

            /*
               Evita interferir em campos de texto.
            */

            var target =
                event.target;

            if (
                target &&
                (
                    target.tagName ===
                    "INPUT" ||
                    target.tagName ===
                    "TEXTAREA"
                )
            ) {

                return;

            }


            /*
               Teclas 1 a 9 selecionam escolhas.
            */

            var key =
                event.key;

            if (
                /^[1-9]$/.test(
                    key
                )
            ) {

                var number =
                    parseInt(
                        key,
                        10
                    );

                var choices =
                    document.querySelectorAll(
                        "#choices .choice-button"
                    );

                if (
                    choices[
                        number - 1
                    ]
                ) {

                    choices[
                        number - 1
                    ].click();

                }

            }


            /*
               S = salvar
            */

            if (
                key.toLowerCase() ===
                "s"
            ) {

                saveFinalGame();

            }

        }
    );

}


/* =========================================================
   DETECTOR DE CENA ATUAL
========================================================= */

function recoverCurrentScene() {

    if (
        game.currentSceneId &&
        window.scenes &&
        scenes[
            game.currentSceneId
        ]
    ) {

        return game.currentSceneId;

    }

    return null;

}


/* =========================================================
   INÍCIO DA HISTÓRIA
========================================================= */

function startFinalStory() {

    normalizeFinalGame();


    var current =
        recoverCurrentScene();


    if (current) {

        showScene(
            current
        );

        return;

    }


    /*
       Procura uma cena inicial conhecida.
    */

    var possibleStarts = [

        "intro_1",
        "start",
        "arrival_1",
        "train_1",
        "arc1_1",
        "lake_1"

    ];


    for (
        var i = 0;
        i < possibleStarts.length;
        i++
    ) {

        if (
            window.scenes &&
            scenes[
                possibleStarts[i]
            ]
        ) {

            showScene(
                possibleStarts[i]
            );

            return;

        }

    }


    /*
       Caso nenhuma cena seja encontrada,
       mantém o jogo funcionando.
    */

    renderFallbackFinalScene();

}


/* =========================================================
   COMPATIBILIDADE COM RENDER SCENE ANTIGO
========================================================= */

function connectLegacyCompatibility() {

    /*
       Algumas versões anteriores utilizavam
       renderCurrentScene().
    */

    if (
        typeof window.renderCurrentScene !==
        "function"
    ) {

        window.renderCurrentScene =
            function() {

                var current =
                    recoverCurrentScene();

                if (current) {

                    showScene(
                        current
                    );

                }

                else {

                    startFinalStory();

                }

            };

    }

}


/* =========================================================
   COMPATIBILIDADE COM SAVEGAME ANTIGO
========================================================= */

function connectLegacySaveCompatibility() {

    if (
        typeof window.saveGame !==
        "function"
    ) {

        window.saveGame =
            function() {

                saveFinalGame();

            };

    }


    if (
        typeof window.loadGame !==
        "function"
    ) {

        window.loadGame =
            function() {

                loadFinalGame();

            };

    }


    if (
        typeof window.resetGame !==
        "function"
    ) {

        window.resetGame =
            function() {

                resetFinalGame();

            };

    }

}


/* =========================================================
   SISTEMA DE SEGURANÇA CONTRA DUPLA INICIALIZAÇÃO
========================================================= */

if (
    !window.__HOGWARTS_FINAL_ENGINE_STARTED
) {

    window.__HOGWARTS_FINAL_ENGINE_STARTED =
        true;


    ensureGameStructure();

    normalizeFinalGame();

    connectFinalButtons();

    connectFinalTurnControls();

    connectKeyboardControls();

    connectLegacyCompatibility();

    connectLegacySaveCompatibility();

    updateFinalInterface();


    /*
       Se já houver uma cena carregada,
       restaura essa cena.
    */

    var recoveredScene =
        recoverCurrentScene();


    if (
        recoveredScene &&
        window.scenes &&
        scenes[
            recoveredScene
        ]
    ) {

        showScene(
            recoveredScene
        );

    }

}


/* =========================================================
   API GLOBAL DO RPG
   Útil para depuração pelo console.
========================================================= */

window.HogwartsRPG = {

    version:
        FINAL_ENGINE_VERSION,

    game:
        function() {

            return game;

        },

    save:
        function() {

            saveFinalGame();

        },

    load:
        function() {

            loadFinalGame();

        },

    reset:
        function() {

            resetFinalGame();

        },

    scene:
        function(id) {

            showScene(id);

        },

    xp:
        function(
            character,
            amount
        ) {

            awardXp(
                character,
                amount,
                "comando do sistema"
            );

            updateFinalInterface();

        },

    relationship:
        function(
            friendship,
            trust,
            rivalry,
            affinity
        ) {

            changeRelationship(
                friendship || 0,
                trust || 0,
                rivalry || 0,
                affinity || 0
            );

            updateFinalInterface();

        }

};


/* =========================================================
   FIM DO RPG
========================================================= */

/* =========================================================
CORREÇÃO DEFINITIVA - INICIALIZAÇÃO DA TELA DE NOMES
========================================================= */

// Esta função será a única responsável por iniciar o jogo.
function startGameCorrectly() {
    // 1. Garante que a estrutura básica do jogo existe
    if (typeof ensureGameStructure === 'function') {
        ensureGameStructure();
    }
    if (typeof normalizeFinalGame === 'function') {
        normalizeFinalGame();
    }

    // 2. Força o estado para a fase de nomes, ignorando qualquer save ou cena anterior
    game.phase = "names";
    game.currentScene = null;
    game.currentSceneId = null;
    game.chapter = 0;

    // 3. Renderiza a tela de nomes
    if (typeof renderNameScreen === 'function') {
        renderNameScreen();
    } else {
        console.error("ERRO CRÍTICO: A função renderNameScreen não foi encontrada.");
        return;
    }

    // 4. Conecta os botões de controle (Salvar, Carregar, Reiniciar)
    if (typeof connectFinalButtons === 'function') {
        connectFinalButtons();
    }
    if (typeof connectKeyboardControls === 'function') {
        connectKeyboardControls();
    }
}

// Impede que qualquer outra inicialização automática ocorra.
// Apenas a nossa função startGameCorrectly será executada.
window.onload = startGameCorrectly;

// Se a página já estiver carregada (o que pode acontecer), executa imediatamente.
if (document.readyState === "complete") {
    startGameCorrectly();
}
