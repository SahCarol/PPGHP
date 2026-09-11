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
    game.phase =
        "names";

    var existing =
        document.getElementById(
            "rpgNameScreen"
        );

    if (existing) {
        existing.remove();
    }

    var overlay =
        document.createElement("div");

    overlay.id =
        "rpgNameScreen";

    overlay.className =
        "rpg-name-screen";

    var box =
        document.createElement("div");

    box.className =
        "name-screen-box";

    var title =
        document.createElement("h1");

    title.textContent =
        "Hogwarts";

    box.appendChild(title);

    var subtitle =
        document.createElement("p");

    subtitle.textContent =
        "Uma nova história está prestes a começar.";

    box.appendChild(subtitle);

    var intro =
        document.createElement("p");

    intro.textContent =
        "Escolha os nomes dos dois protagonistas.";

    box.appendChild(intro);

    var label1 =
        document.createElement("label");

    label1.textContent =
        "Protagonista 1";

    box.appendChild(label1);

    var input1 =
        document.createElement("input");

    input1.type =
        "text";

    input1.maxLength =
        24;

    input1.value =
        game.sasah.name;

    input1.placeholder =
        "Nome do protagonista";

    box.appendChild(input1);

    var label2 =
        document.createElement("label");

    label2.textContent =
        "Protagonista 2";

    box.appendChild(label2);

    var input2 =
        document.createElement("input");

    input2.type =
        "text";

    input2.maxLength =
        24;

    input2.value =
        game.lucas.name;

    input2.placeholder =
        "Nome do protagonista";

    box.appendChild(input2);

    var startButton =
        document.createElement("button");

    startButton.type =
        "button";

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
                name1 =
                    "Sasah";
            }

            if (!name2) {
                name2 =
                    "Lucas";
            }

            game.sasah.name =
                name1;

            game.lucas.name =
                name2;

            game.phase =
                "story";

            game.chapter =
                0;

            game.scene =
                0;

            game.sceneId =
                "prologue_1";

            overlay.remove();

            showGameInterface();

            addLog(
                "A aventura de " +
                name1 +
                " e " +
                name2 +
                " começou."
            );

            goToScene(
                "prologue_1"
            );
        }
    );

    box.appendChild(
        startButton
    );

    overlay.appendChild(
        box
    );

    document.body.appendChild(
        overlay
    );

    hideGameInterface();
}

function hideGameInterface() {
    var selectors = [
        ".game-header",
        ".game-layout",
        ".game-container",
        ".game-controls"
    ];

    for (
        var i = 0;
        i < selectors.length;
        i++
    ) {
        var elements =
            document.querySelectorAll(
                selectors[i]
            );

        for (
            var j = 0;
            j < elements.length;
            j++
        ) {
            elements[j].classList.add(
                "rpg-hidden"
            );
        }
    }
}

function showGameInterface() {
    var selectors = [
        ".game-header",
        ".game-layout",
        ".game-container",
        ".game-controls"
    ];

    for (
        var i = 0;
        i < selectors.length;
        i++
    ) {
        var elements =
            document.querySelectorAll(
                selectors[i]
            );

        for (
            var j = 0;
            j < elements.length;
            j++
        ) {
            elements[j].classList.remove(
                "rpg-hidden"
            );
        }
    }
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
    ]
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
