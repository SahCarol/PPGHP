var SAVE_KEY = "hogwarts_rpg_save_v5";

var game = {
phase: "names",
chapter: 0,
scene: 0,


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

houseAnswers: {
    sasah: [],
    lucas: []
},

flags: {
    library: false,
    secretPassage: false,
    ancientArtifact: false,
    professorMissing: false,
    forest: false,
    lake: false,
    guardian: false,
    invasion: false,
    betrayal: false,
    ancientMagic: false,
    sacrifice: false,
    finalBattle: false
},

log: []


};

var houseQuestions = [
{
question: "Quando alguém que você ama está em perigo, o que você faz?",
answers: [
{ text: "Enfrento o perigo imediatamente.", trait: "bravery" },
{ text: "Fico ao lado da pessoa, aconteça o que acontecer.", trait: "loyalty" },
{ text: "Procuro uma maneira inteligente de resolver o problema.", trait: "intelligence" },
{ text: "Tento transformar a situação em uma oportunidade.", trait: "ambition" },
{ text: "Primeiro tento entender o que a pessoa está sentindo.", trait: "empathy" }
]
},
{
question: "Qual destas qualidades você mais valoriza?",
answers: [
{ text: "Coragem.", trait: "bravery" },
{ text: "Lealdade.", trait: "loyalty" },
{ text: "Conhecimento.", trait: "intelligence" },
{ text: "Determinação.", trait: "ambition" },
{ text: "Compaixão.", trait: "empathy" }
]
},
{
question: "Você encontra uma passagem secreta. O que faz?",
answers: [
{ text: "Entro sem hesitar.", trait: "bravery" },
{ text: "Chamo meus amigos para irmos juntos.", trait: "loyalty" },
{ text: "Investigo cuidadosamente antes de entrar.", trait: "intelligence" },
{ text: "Penso em como aquilo pode me beneficiar.", trait: "ambition" },
{ text: "Verifico se existe alguém precisando de ajuda lá dentro.", trait: "empathy" }
]
},
{
question: "Um professor acusa você injustamente. Como reage?",
answers: [
{ text: "Defendo minha posição diretamente.", trait: "bravery" },
{ text: "Peço ajuda a alguém em quem confio.", trait: "loyalty" },
{ text: "Apresento provas para demonstrar a verdade.", trait: "intelligence" },
{ text: "Transformo o problema em uma oportunidade para provar meu valor.", trait: "ambition" },
{ text: "Tento descobrir por que o professor agiu daquela maneira.", trait: "empathy" }
]
},
{
question: "Qual frase combina mais com você?",
answers: [
{ text: "É melhor tentar do que viver com medo.", trait: "bravery" },
{ text: "Ninguém deveria enfrentar tudo sozinho.", trait: "loyalty" },
{ text: "Sempre existe algo novo para aprender.", trait: "intelligence" },
{ text: "Eu quero chegar mais longe.", trait: "ambition" },
{ text: "Entender os outros também é uma forma de força.", trait: "empathy" }
]
}
];

function resetGame() {
game = {
phase: "names",
chapter: 0,
scene: 0,


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

    houseAnswers: {
        sasah: [],
        lucas: []
    },

    flags: {
        library: false,
        secretPassage: false,
        ancientArtifact: false,
        professorMissing: false,
        forest: false,
        lake: false,
        guardian: false,
        invasion: false,
        betrayal: false,
        ancientMagic: false,
        sacrifice: false,
        finalBattle: false
    },

    log: []
};

startNameScreen();


}

function addLog(text) {
game.log.push(text);


if (game.log.length > 60) {
    game.log.shift();
}

updateLog();


}

function updateLog() {
var logElement = document.getElementById("log");


if (!logElement) {
    return;
}

logElement.innerHTML = "";

for (var i = 0; i < game.log.length; i++) {
    var p = document.createElement("p");
    p.textContent = game.log[i];
    logElement.appendChild(p);
}


}

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

function updateCharacterUI() {
setText("sasahName", game.sasah.name);
setText("lucasName", game.lucas.name);


setText("sasahHouse", game.sasah.house);
setText("lucasHouse", game.lucas.house);

setText("sasahHpText", game.sasah.hp + " / " + game.sasah.maxHp);
setText("lucasHpText", game.lucas.hp + " / " + game.lucas.maxHp);

setText("sasahManaText", game.sasah.mana + " / " + game.sasah.maxMana);
setText("lucasManaText", game.lucas.mana + " / " + game.lucas.maxMana);

setText("sasahXpText", String(game.sasah.xp));
setText("lucasXpText", String(game.lucas.xp));

setWidth("sasahHp", game.sasah.hp / game.sasah.maxHp * 100);
setWidth("lucasHp", game.lucas.hp / game.lucas.maxHp * 100);

setWidth("sasahMana", game.sasah.mana / game.sasah.maxMana * 100);
setWidth("lucasMana", game.lucas.mana / game.lucas.maxMana * 100);

setWidth("sasahXp", Math.min(100, game.sasah.xp));
setWidth("lucasXp", Math.min(100, game.lucas.xp));

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

setText("friendship", String(game.relationship.friendship));
setText("trust", String(game.relationship.trust));
setText("rivalry", String(game.relationship.rivalry));
setText("affinity", String(game.relationship.affinity));


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
    character.xp = character.xp - 100;
    character.magic += 1;
    character.maxMana += 5;
    character.mana = character.maxMana;
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

function showScene(chapter, location, title, text, choices) {
game.chapter = chapter;


setText("chapter", title);
setText("location", location);
setText("scene", text);

var choicesElement = document.getElementById("choices");

if (!choicesElement) {
    return;
}

choicesElement.innerHTML = "";

for (var i = 0; i < choices.length; i++) {
    createChoiceButton(choicesElement, choices[i].text, choices[i].action);
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

function startNameScreen() {
game.phase = "names";


setText("chapter", "Prólogo");
setText("location", "Antes de Hogwarts");
setText(
    "scene",
    "Duas vidas estão prestes a mudar. Antes de a história começar, escolha os nomes dos dois protagonistas."
);

var choices = document.getElementById("choices");

if (!choices) {
    return;
}

choices.innerHTML = "";

var wrapper = document.createElement("div");
wrapper.className = "name-selection";

var title = document.createElement("h2");
title.textContent = "Escolha os protagonistas";
wrapper.appendChild(title);

var label1 = document.createElement("label");
label1.textContent = "Nome do primeiro protagonista";

var input1 = document.createElement("input");
input1.type = "text";
input1.id = "nameInput1";
input1.value = game.sasah.name;
input1.maxLength = 30;
input1.placeholder = "Digite um nome";

label1.appendChild(input1);
wrapper.appendChild(label1);

var label2 = document.createElement("label");
label2.textContent = "Nome do segundo protagonista";

var input2 = document.createElement("input");
input2.type = "text";
input2.id = "nameInput2";
input2.value = game.lucas.name;
input2.maxLength = 30;
input2.placeholder = "Digite um nome";

label2.appendChild(input2);
wrapper.appendChild(label2);

var button = document.createElement("button");
button.type = "button";
button.className = "choice-button continue-button";
button.textContent = "Começar a aventura";

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

    addLog(first + " e " + second + " iniciaram sua jornada.");
    startHouseSelection("sasah");
});

wrapper.appendChild(button);
choices.appendChild(wrapper);

updateCharacterUI();


}

function startHouseSelection(character) {
game.phase = "sorting";
game.houseAnswers[character] = [];


var person = character === "sasah" ? game.sasah : game.lucas;
var index = game.houseAnswers[character].length;

showHouseQuestion(character, index, person);


}

function showHouseQuestion(character, index, person) {
if (index >= houseQuestions.length) {
finishHouseSelection(character);
return;
}


var question = houseQuestions[index];

setText("chapter", "O Chapéu Seletor");
setText("location", "Salão Principal");
setText(
    "scene",
    person.name + ", o Chapéu Seletor parece observar cada pensamento seu.\n\n" +
    question.question
);

var choices = document.getElementById("choices");

if (!choices) {
    return;
}

choices.innerHTML = "";

for (var i = 0; i < question.answers.length; i++) {
    (function(answer) {
        createChoiceButton(
            choices,
            answer.text,
            function() {
                game.houseAnswers[character].push(answer.trait);

                if (person[answer.trait] !== undefined) {
                    person[answer.trait] += 1;
                }

                showHouseQuestion(
                    character,
                    game.houseAnswers[character].length,
                    person
                );
            }
        );
    })(question.answers[i]);
}

updateCharacterUI();


}

function calculateHouse(character) {
var person = character === "sasah" ? game.sasah : game.lucas;


var score = {
    bravery: person.bravery,
    loyalty: person.loyalty,
    intelligence: person.intelligence,
    ambition: person.ambition,
    empathy: person.empathy
};

/*
 * A empatia não é uma quinta casa.
 * Ela influencia principalmente Lufa-Lufa,
 * mas também funciona como critério secundário.
 */

var houses = [
    {
        name: "Grifinória",
        value: score.bravery * 2
    },
    {
        name: "Lufa-Lufa",
        value: score.loyalty * 2 + score.empathy * 1.5
    },
    {
        name: "Corvinal",
        value: score.intelligence * 2
    },
    {
        name: "Sonserina",
        value: score.ambition * 2
    }
];

houses.sort(function(a, b) {
    return b.value - a.value;
});

return houses[0].name;


}

function finishHouseSelection(character) {
var person = character === "sasah" ? game.sasah : game.lucas;


person.house = calculateHouse(character);

setText("chapter", "O Chapéu Seletor");
setText("location", "Salão Principal");

var description = "";

if (person.house === "Grifinória") {
    description =
        "O Chapéu reconhece sua coragem. Mesmo diante do desconhecido, existe dentro de você uma força que prefere enfrentar o perigo a fugir dele.";
} else if (person.house === "Lufa-Lufa") {
    description =
        "O Chapéu reconhece seu coração. Lealdade, empatia e disposição para permanecer ao lado daqueles que precisam de você pesam em sua escolha.";
} else if (person.house === "Corvinal") {
    description =
        "O Chapéu reconhece sua mente. Curiosidade, inteligência e desejo de compreender os mistérios fazem parte da sua essência.";
} else {
    description =
        "O Chapéu reconhece sua determinação. Ambição, estratégia e vontade de alcançar seus objetivos revelam uma personalidade que não se contenta com pouco.";
}

setText(
    "scene",
    person.name +
    " foi escolhido para " +
    person.house +
    ".\n\n" +
    description
);

var choices = document.getElementById("choices");

if (!choices) {
    return;
}

choices.innerHTML = "";

createChoiceButton(
    choices,
    character === "sasah" ? "Continuar" : "Começar a história",
    function() {
        if (character === "sasah") {
            startHouseSelection("lucas");
        } else {
            beginArcOne();
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

function beginArcOne() {
game.phase = "story";
game.chapter = 1;
game.scene = 0;


addLog("Arco I iniciado: O Primeiro Mistério de Hogwarts.");

arcOneSceneOne();


}

function arcOneSceneOne() {
showScene(
1,
"Expresso de Hogwarts",
"ARCO I — O PRIMEIRO MISTÉRIO",
"A viagem até Hogwarts começa em uma tarde aparentemente tranquila. " +
game.sasah.name +
" observa a paisagem pela janela enquanto " +
game.lucas.name +
" tenta entender um estranho símbolo encontrado em um livro antigo.\n\n" +
"O símbolo pulsa por alguns segundos e desaparece.\n\n" +
"Nenhum dos dois sabe ainda que aquele pequeno acontecimento está relacionado a algo muito maior.",
[
{
text: "Investigar o símbolo",
action: function() {
game.sasah.intelligence += 1;
game.lucas.intelligence += 1;
gainXp(game.sasah, 10);
gainXp(game.lucas, 10);
addLog("Os protagonistas decidiram investigar o símbolo.");
arcOneSceneTwo();
}
},
{
text: "Guardar o livro e não mexer mais nisso",
action: function() {
changeRelationship(1, 1, 0, 1);
addLog("Eles decidiram não mexer no estranho símbolo.");
arcOneSceneTwo();
}
},
{
text: "Tentar descobrir se o símbolo reage à magia",
action: function() {
game.sasah.magic += 1;
game.lucas.magic += 1;
changeMana(game.sasah, -10);
changeMana(game.lucas, -10);
addLog("Uma pequena tentativa de magia fez o símbolo brilhar.");
arcOneSceneTwo();
}
}
]
);
}

function arcOneSceneTwo() {
showScene(
1,
"Floresta próxima aos trilhos",
"Uma presença entre as árvores",
"Durante uma parada inesperada do trem, os protagonistas escutam um ruído vindo da vegetação.\n\n" +
"Por um instante, duas pequenas luzes aparecem entre as árvores.\n\n" +
"Quando chegam perto, não encontram ninguém.\n\n" +
"Apenas uma pequena marca em forma de espiral permanece no chão.",
[
{
text: "Examinar a marca",
action: function() {
game.sasah.intelligence += 1;
game.lucas.intelligence += 1;
addLog("Uma marca misteriosa foi encontrada.");
arcOneSceneThree();
}
},
{
text: "Seguir imediatamente as luzes",
action: function() {
game.sasah.bravery += 1;
game.lucas.bravery += 1;
changeHp(game.sasah, -5);
addLog("Eles seguiram as luzes pela floresta.");
arcOneSceneThree();
}
},
{
text: "Voltar para o trem",
action: function() {
changeRelationship(1, 1, 0, 1);
addLog("Os protagonistas decidiram não correr riscos.");
arcOneSceneThree();
}
}
]
);
}

function arcOneSceneThree() {
showScene(
1,
"Hogwarts",
"O castelo",
"Finalmente, as portas de Hogwarts se abrem.\n\n" +
game.sasah.name +
" e " +
game.lucas.name +
" chegam ao castelo, cada um carregando expectativas diferentes.\n\n" +
"Enquanto os alunos entram no Salão Principal, uma coruja deixa cair uma pequena pena escura perto dos protagonistas.\n\n" +
"No mesmo instante, o símbolo visto no trem volta a aparecer por um segundo.",
[
{
text: "Guardar a pena",
action: function() {
game.flags.ancientArtifact = true;
game.sasah.intelligence += 1;
addLog("A pena escura foi guardada.");
arcOneSceneFour();
}
},
{
text: "Mostrar a pena a um professor",
action: function() {
game.sasah.loyalty += 1;
game.lucas.loyalty += 1;
changeRelationship(1, 2, 0, 1);
addLog("A pena foi mostrada a um professor.");
arcOneSceneFour();
}
},
{
text: "Ignorar e entrar no Salão Principal",
action: function() {
addLog("Eles ignoraram a pena e seguiram para o Salão Principal.");
arcOneSceneFour();
}
}
]
);
}

function arcOneSceneFour() {
showScene(
1,
"Salão Principal",
"O início de uma amizade",
"Depois da seleção das casas, os dois protagonistas finalmente têm a oportunidade de conversar.\n\n" +
"Apesar de suas diferenças, existe a sensação de que suas histórias estão estranhamente conectadas.\n\n" +
"Antes que possam conversar mais, um barulho vem do lado de fora.",
[
{
text: "Investigar juntos",
action: function() {
changeRelationship(3, 3, 0, 2);
gainXp(game.sasah, 15);
gainXp(game.lucas, 15);
arcOneMeeting();
}
},
{
text: "Cada um investigar por conta própria",
action: function() {
changeRelationship(0, 0, 2, 0);
gainXp(game.sasah, 10);
gainXp(game.lucas, 10);
arcOneMeeting();
}
},
{
text: "Ignorar o barulho",
action: function() {
changeRelationship(1, 1, 0, 1);
arcOneMeeting();
}
}
]
);
}

function arcOneMeeting() {
showScene(
1,
"Corredor de Hogwarts",
"O primeiro grande sinal",
"No corredor vazio, os protagonistas encontram uma parede coberta por símbolos antigos.\n\n" +
"Um dos símbolos é exatamente igual ao que apareceu no livro.\n\n" +
"Antes que possam investigar, uma pequena criatura atravessa o corredor em alta velocidade.\n\n" +
"Ela desaparece atrás de uma armadura.",
[
{
text: "Seguir a criatura",
action: function() {
game.sasah.bravery += 1;
game.lucas.empathy += 1;
changeRelationship(2, 2, 0, 2);
arcTwoIntroduction();
}
},
{
text: "Investigar os símbolos",
action: function() {
game.sasah.intelligence += 1;
game.lucas.intelligence += 1;
game.flags.secretPassage = true;
arcTwoIntroduction();
}
},
{
text: "Voltar antes que alguém perceba",
action: function() {
changeRelationship(1, 1, 0, 1);
arcTwoIntroduction();
}
}
]
);
}

function arcTwoIntroduction() {
game.chapter = 2;
addLog("Arco II iniciado: Os Segredos sob o Castelo.");
   

showScene(
    2,
    "Biblioteca",
    "ARCO II — OS SEGREDOS SOB O CASTELO",
    "Alguns dias se passam.\n\n" +
    "O símbolo continua aparecendo nos lugares mais improváveis de Hogwarts.\n\n" +
    "Depois de pesquisar durante horas, os protagonistas descobrem uma referência a uma criatura capaz de perceber magia antiga.\n\n" +
    "A descrição é incompleta.\n\n" +
    "Mas uma palavra aparece claramente no livro: Lebrílope.",
    [
        {
            text: "Pesquisar sobre Lebrílope",
            action: function() {
                game.flags.library = true;
                game.sasah.intelligence += 2;
                game.lucas.intelligence += 2;
                addLog("A pesquisa sobre Lebrílope começou.");
                meetKiwi();
            }
        },
        {
            text: "Pesquisar sobre o símbolo",
            action: function() {
                game.flags.library = true;
                game.sasah.intelligence += 2;
                addLog("A origem do símbolo começou a ser investigada.");
                meetKiwi();
            }
        },
        {
            text: "Procurar uma passagem secreta",
            action: function() {
                game.flags.secretPassage = true;
                game.sasah.bravery += 1;
                game.lucas.bravery += 1;
                addLog("Os protagonistas decidiram procurar uma passagem secreta.");
                meetKiwi();
            }
        }
    ]
);


}

function meetKiwi() {
game.kiwi.met = true;


showScene(
    2,
    "Corredor subterrâneo",
    "Kiwi, a Lebrílope",
    "Depois de atravessarem uma passagem escondida, os protagonistas chegam a um corredor que não aparece em nenhum mapa conhecido.\n\n" +
    "Um som de pequenos passos ecoa pela pedra.\n\n" +
    "De repente, uma criatura surge de trás de uma coluna.\n\n" +
    "Ela possui o corpo ágil de uma Lebrílope, olhos enormes e atentos e pequenas marcas luminosas que percorrem sua pelagem.\n\n" +
    "A criatura inclina a cabeça e observa os dois.\n\n" +
    "Em seguida, solta um pequeno som curioso.\n\n" +
    "Uma placa antiga próxima a ela revela seu nome:\n\n" +
    "KIWI.",
    [
        {
            text: "Aproximar-se devagar",
            action: function() {
                game.kiwi.trust += 2;
                game.kiwi.affection += 2;
                game.sasah.empathy += 1;
                game.lucas.empathy += 1;
                addLog("Kiwi permitiu que os protagonistas se aproximassem.");
                kiwiChoiceOne();
            }
        },
        {
            text: "Oferecer comida",
            action: function() {
                game.kiwi.trust += 3;
                game.kiwi.affection += 3;
                game.kiwi.helped = true;
                addLog("Kiwi aceitou a comida e pareceu gostar dos protagonistas.");
                kiwiChoiceOne();
            }
        },
        {
            text: "Usar magia para descobrir o que ela é",
            action: function() {
                game.kiwi.trust -= 1;
                game.sasah.magic += 1;
                game.lucas.magic += 1;
                addLog("A magia assustou Kiwi por alguns instantes.");
                kiwiChoiceOne();
            }
        },
        {
            text: "Não fazer nada e esperar",
            action: function() {
                game.kiwi.trust += 1;
                game.kiwi.affection += 1;
                addLog("Kiwi percebeu que os protagonistas não pretendiam machucá-la.");
                kiwiChoiceOne();
            }
        }
    ]
);


}

function kiwiChoiceOne() {
showScene(
2,
"Corredor subterrâneo",
"O olhar de Kiwi",
"Kiwi se aproxima alguns passos.\n\n" +
"Ela olha para " +
game.sasah.name +
", depois para " +
game.lucas.name +
".\n\n" +
"Então suas pequenas marcas luminosas começam a brilhar.\n\n" +
"Kiwi corre até uma parede e toca uma pedra com o focinho.\n\n" +
"Um compartimento secreto se abre.\n\n" +
"A Lebrílope parece estar tentando mostrar alguma coisa.",
[
{
text: "Seguir Kiwi",
action: function() {
game.kiwi.followed = true;
game.kiwi.trust += 2;
game.flags.secretPassage = true;
addLog("Os protagonistas seguiram Kiwi.");
kiwiSecret();
}
},
{
text: "Investigar a parede primeiro",
action: function() {
game.sasah.intelligence += 1;
game.lucas.intelligence += 1;
game.kiwi.trust += 1;
kiwiSecret();
}
},
{
text: "Perguntar mentalmente o que ela quer",
action: function() {
game.sasah.empathy += 1;
game.lucas.empathy += 1;
game.kiwi.affection += 2;
addLog("Os protagonistas tentaram compreender Kiwi sem palavras.");
kiwiSecret();
}
}
]
);
}

function kiwiSecret() {
showScene(
2,
"Câmara esquecida",
"O segredo da Lebrílope",
"A câmara escondida contém um pedestal vazio.\n\n" +
"No chão existe o mesmo símbolo que apareceu no livro.\n\n" +
"Kiwi se aproxima do pedestal e toca a pedra.\n\n" +
"Uma visão surge na mente dos protagonistas.\n\n" +
"Eles veem Hogwarts muitos anos atrás, uma criatura semelhante a Kiwi correndo pelos corredores e um bruxo escondendo algo sob o castelo.\n\n" +
"A visão termina com uma porta sendo selada.\n\n" +
"Kiwi olha para os dois.\n\n" +
"Ela parece saber como abrir aquela porta.",
[
{
text: "Confiar em Kiwi",
action: function() {
game.kiwi.secret = true;
game.kiwi.trust += 3;
changeRelationship(2, 3, 0, 2);
addLog("Os protagonistas decidiram confiar em Kiwi.");
arcTwoCreature();
}
},
{
text: "Tentar abrir a porta sem Kiwi",
action: function() {
game.kiwi.trust -= 2;
game.sasah.magic += 1;
changeHp(game.sasah, -10);
addLog("A tentativa de abrir a porta causou uma reação mágica.");
arcTwoCreature();
}
},
{
text: "Perguntar se Kiwi conhece o lugar",
action: function() {
game.kiwi.secret = true;
game.kiwi.affection += 2;
game.sasah.empathy += 1;
game.lucas.empathy += 1;
addLog("Kiwi pareceu reconhecer o lugar.");
arcTwoCreature();
}
}
]
);
}

function arcTwoCreature() {
showScene(
2,
"Câmara subterrânea",
"O guardião",
"Um rugido ecoa pelas paredes.\n\n" +
"Uma criatura mágica surge da escuridão.\n\n" +
"Kiwi imediatamente se coloca entre ela e os protagonistas.\n\n" +
"Suas marcas luminosas brilham intensamente.\n\n" +
"Pela primeira vez, os protagonistas percebem que Kiwi não é apenas uma criatura curiosa.\n\n" +
"Ela possui uma conexão profunda com a magia antiga de Hogwarts.",
[
{
text: "Proteger Kiwi",
action: function() {
game.kiwi.affection += 3;
game.kiwi.trust += 2;
game.kiwi.rescued = true;
game.sasah.bravery += 1;
game.lucas.bravery += 1;
changeRelationship(2, 3, 0, 2);
gainXp(game.sasah, 20);
gainXp(game.lucas, 20);
arcTwoEnding();
}
},
{
text: "Pedir para Kiwi ficar atrás de vocês",
action: function() {
game.kiwi.trust += 2;
game.sasah.loyalty += 1;
game.lucas.loyalty += 1;
arcTwoEnding();
}
},
{
text: "Fugir imediatamente",
action: function() {
game.kiwi.trust -= 2;
changeRelationship(-1, -2, 1, -1);
changeHp(game.sasah, -15);
changeHp(game.lucas, -15);
arcTwoEnding();
}
}
]
);
}

function arcTwoEnding() {
game.flags.professorMissing = true;


showScene(
    2,
    "Hogwarts",
    "O professor desaparecido",
    "Ao retornarem ao castelo, uma notícia assustadora os espera.\n\n" +
    "Um professor desapareceu.\n\n" +
    "Ninguém sabe onde ele está.\n\n" +
    "Kiwi começa a andar inquieta pelo corredor.\n\n" +
    "Quando chega perto de uma janela, ela olha para a Floresta Proibida.\n\n" +
    "Depois olha para os protagonistas.\n\n" +
    "A mensagem é clara.\n\n" +
    "O próximo segredo está na floresta.",
    [
        {
            text: "Seguir Kiwi até a floresta",
            action: function() {
                game.kiwi.trust += 2;
                game.kiwi.followed = true;
                arcThreeIntroduction();
            }
        },
        {
            text: "Avisar um professor",
            action: function() {
                game.sasah.loyalty += 1;
                game.lucas.loyalty += 1;
                changeRelationship(1, 2, 0, 1);
                arcThreeIntroduction();
            }
        },
        {
            text: "Investigar primeiro o desaparecimento",
            action: function() {
                game.sasah.intelligence += 1;
                game.lucas.intelligence += 1;
                arcThreeIntroduction();
            }
        }
    ]
);


}

function arcThreeIntroduction() {
game.chapter = 3;
game.flags.forest = true;


addLog("Arco III iniciado: A Floresta Proibida.");

showScene(
    3,
    "Floresta Proibida",
    "ARCO III — A FLORESTA PROIBIDA",
    "A noite cai sobre Hogwarts.\n\n" +
    game.sasah.name +
    ", " +
    game.lucas.name +
    " e Kiwi entram na Floresta Proibida.\n\n" +
    "A Lebrílope parece conhecer exatamente o caminho.\n\n" +
    "Quanto mais avançam, mais forte fica a magia antiga.\n\n" +
    "Em determinado momento, Kiwi para completamente.",
    [
        {
            text: "Perguntar a Kiwi o que aconteceu",
            action: function() {
                game.kiwi.trust += 2;
                game.sasah.empathy += 1;
                game.lucas.empathy += 1;
                forestKiwiWarning();
            }
        },
        {
            text: "Examinar o local",
            action: function() {
                game.sasah.intelligence += 1;
                game.lucas.intelligence += 1;
                forestKiwiWarning();
            }
        },
        {
            text: "Continuar andando",
            action: function() {
                game.kiwi.trust -= 1;
                forestKiwiWarning();
            }
        }
    ]
);


}

function forestKiwiWarning() {
showScene(
3,
"Floresta Proibida",
"O aviso de Kiwi",
"Kiwi começa a emitir pequenos sons.\n\n" +
"Ela aponta as orelhas para a escuridão.\n\n" +
"Algo está se aproximando.\n\n" +
"Então Kiwi corre até os protagonistas e toca a perna de " +
game.sasah.name +
".\n\n" +
"Uma visão aparece novamente.\n\n" +
"O professor desaparecido está diante de uma criatura gigantesca.\n\n" +
"E alguém usando uma máscara está observando tudo.",
[
{
text: "Confiar no aviso de Kiwi e se esconder",
action: function() {
game.kiwi.trust += 2;
game.sasah.intelligence += 1;
game.lucas.intelligence += 1;
forestLake();
}
},
{
text: "Preparar-se para lutar",
action: function() {
game.sasah.bravery += 1;
game.lucas.bravery += 1;
game.kiwi.affection += 1;
forestLake();
}
},
{
text: "Tentar seguir a visão",
action: function() {
game.kiwi.secret = true;
game.sasah.magic += 1;
game.lucas.magic += 1;
forestLake();
}
}
]
);
}

function forestLake() {
game.flags.lake = true;


showScene(
    3,
    "Lago Negro",
    "O professor",
    "À margem do Lago Negro, os protagonistas finalmente encontram o professor desaparecido.\n\n" +
    "Ele está ferido, mas vivo.\n\n" +
    "Antes que possam ajudá-lo, a água começa a se movimentar.\n\n" +
    "Kiwi se aproxima do lago.\n\n" +
    "As marcas luminosas de seu corpo refletem na água.\n\n" +
    "Uma passagem surge no fundo do lago.",
    [
        {
            text: "Seguir Kiwi",
            action: function() {
                game.kiwi.trust += 3;
                game.kiwi.followed = true;
                game.sasah.bravery += 1;
                game.lucas.bravery += 1;
                lakeGuardian();
            }
        },
        {
            text: "Salvar o professor primeiro",
            action: function() {
                game.sasah.loyalty += 1;
                game.lucas.loyalty += 1;
                changeRelationship(2, 2, 0, 1);
                lakeGuardian();
            }
        },
        {
            text: "Investigar a passagem",
            action: function() {
                game.sasah.intelligence += 1;
                game.lucas.intelligence += 1;
                lakeGuardian();
            }
        }
    ]
);


}

function lakeGuardian() {
game.flags.guardian = true;


showScene(
    3,
    "Templo submerso",
    "O guardião antigo",
    "No fundo do lago existe uma estrutura esquecida.\n\n" +
    "No centro dela está uma estátua de uma Lebrílope.\n\n" +
    "Kiwi se aproxima.\n\n" +
    "A estátua começa a despertar.\n\n" +
    "Uma voz antiga ecoa pelo templo:\n\n" +
    "\"A pequena guardiã retornou.\"\n\n" +
    "Os protagonistas percebem que Kiwi pode ser descendente de uma linhagem que protege a magia antiga de Hogwarts.",
    [
        {
            text: "Proteger Kiwi",
            action: function() {
                game.kiwi.finalAlly = true;
                game.kiwi.affection += 4;
                game.kiwi.trust += 4;
                changeRelationship(2, 3, 0, 2);
                gainXp(game.sasah, 25);
                gainXp(game.lucas, 25);
                arcThreeEnding();
            }
        },
        {
            text: "Perguntar sobre a magia antiga",
            action: function() {
                game.kiwi.secret = true;
                game.sasah.intelligence += 2;
                game.lucas.intelligence += 2;
                arcThreeEnding();
            }
        },
        {
            text: "Tocar na estátua",
            action: function() {
                game.sasah.magic += 2;
                game.lucas.magic += 2;
                changeMana(game.sasah, -20);
                changeMana(game.lucas, -20);
                arcThreeEnding();
            }
        }
    ]
);


}

function arcThreeEnding() {
showScene(
3,
"Floresta Proibida",
"Uma promessa",
"Antes de retornarem ao castelo, Kiwi observa o céu.\n\n" +
"Uma sombra passa sobre a lua.\n\n" +
"A criatura se aproxima dos protagonistas.\n\n" +
"Pela primeira vez, Kiwi toca cada um deles com a testa.\n\n" +
"É um gesto de confiança.\n\n" +
"A pequena Lebrílope agora decidiu acompanhá-los.\n\n" +
"Mas o perigo também está se aproximando.\n\n" +
"A guerra está prestes a começar.",
[
{
text: "Prometer que protegerão Kiwi",
action: function() {
game.kiwi.trust += 3;
game.kiwi.affection += 3;
changeRelationship(2, 3, 0, 2);
arcFourIntroduction();
}
},
{
text: "Dizer que Kiwi deve ficar escondida",
action: function() {
game.kiwi.trust += 1;
arcFourIntroduction();
}
},
{
text: "Perguntar se ela está pronta para lutar",
action: function() {
game.kiwi.finalAlly = true;
game.kiwi.trust += 2;
game.kiwi.affection += 2;
arcFourIntroduction();
}
}
]
);
}

function arcFourIntroduction() {
game.chapter = 4;
game.flags.invasion = true;


addLog("Arco IV iniciado: A Guerra das Sombras.");

showScene(
    4,
    "Hogwarts",
    "ARCO IV — A GUERRA DAS SOMBRAS",
    "O ataque começa durante a madrugada.\n\n" +
    "As barreiras mágicas de Hogwarts tremem.\n\n" +
    "Professores correm pelos corredores.\n\n" +
    "Alunos são conduzidos para áreas protegidas.\n\n" +
    "Kiwi corre ao lado dos protagonistas.\n\n" +
    "Então as marcas de seu corpo começam a brilhar novamente.",
    [
        {
            text: "Ficar e defender Hogwarts",
            action: function() {
                game.sasah.bravery += 2;
                game.lucas.bravery += 2;
                game.kiwi.finalAlly = true;
                changeRelationship(2, 2, 0, 2);
                arcFourBattle();
            }
        },
        {
            text: "Levar Kiwi para um lugar seguro",
            action: function() {
                game.kiwi.affection += 3;
                game.kiwi.trust += 3;
                game.kiwi.rescued = true;
                changeRelationship(2, 3, 0, 2);
                arcFourBattle();
            }
        },
        {
            text: "Procurar a origem da invasão",
            action: function() {
                game.sasah.intelligence += 1;
                game.lucas.intelligence += 1;
                arcFourBattle();
            }
        }
    ]
);


}

function arcFourBattle() {
showScene(
4,
"Pátio de Hogwarts",
"A batalha",
"Feitiços iluminam o céu.\n\n" +
"A batalha se espalha pelo castelo.\n\n" +
"Um inimigo avança diretamente contra os protagonistas.\n\n" +
"Kiwi dispara na frente deles.\n\n" +
"Por um instante, a pequena criatura parece gigantesca.\n\n" +
"Uma aura luminosa envolve seu corpo.",
[
{
text: "Lutar ao lado de Kiwi",
action: function() {
game.kiwi.finalAlly = true;
game.kiwi.trust += 2;
game.kiwi.affection += 2;
game.sasah.bravery += 1;
game.lucas.bravery += 1;
changeMana(game.sasah, -15);
changeMana(game.lucas, -15);
changeHp(game.sasah, -10);
changeHp(game.lucas, -10);
arcFourBetrayal();
}
},
{
text: "Proteger Kiwi enquanto ela usa sua magia",
action: function() {
game.kiwi.trust += 4;
game.kiwi.affection += 4;
game.kiwi.finalAlly = true;
game.sasah.loyalty += 1;
game.lucas.loyalty += 1;
arcFourBetrayal();
}
},
{
text: "Usar toda a magia disponível",
action: function() {
game.sasah.magic += 2;
game.lucas.magic += 2;
changeMana(game.sasah, -30);
changeMana(game.lucas, -30);
arcFourBetrayal();
}
}
]
);
}

function arcFourBetrayal() {
game.flags.betrayal = true;


showScene(
    4,
    "Torre abandonada",
    "A máscara",
    "Depois da batalha, os protagonistas encontram a pessoa responsável pela invasão.\n\n" +
    "A figura mascarada retira lentamente a máscara.\n\n" +
    "Ela conhece a existência de Kiwi.\n\n" +
    "E revela algo assustador:\n\n" +
    "A Lebrílope é uma das últimas criaturas capazes de abrir a Câmara da Magia Antiga.\n\n" +
    "O inimigo quer capturar Kiwi.",
    [
        {
            text: "Não entregar Kiwi",
            action: function() {
                game.kiwi.trust += 5;
                game.kiwi.affection += 5;
                changeRelationship(3, 4, 0, 3);
                finalArcPreparation();
            }
        },
        {
            text: "Mandar Kiwi fugir",
            action: function() {
                game.kiwi.trust += 2;
                game.kiwi.affection += 2;
                finalArcPreparation();
            }
        },
        {
            text: "Tentar negociar",
            action: function() {
                game.sasah.intelligence += 1;
                game.lucas.intelligence += 1;
                game.kiwi.trust += 1;
                finalArcPreparation();
            }
        }
    ]
);


}

function finalArcPreparation() {
showScene(
4,
"Torre de Astronomia",
"A última escolha antes do fim",
"A noite termina com Hogwarts gravemente danificada.\n\n" +
"Os protagonistas sabem que não existe mais como fugir do confronto.\n\n" +
"Kiwi se aproxima deles.\n\n" +
"Ela aponta para o símbolo antigo que carregaram desde o início.\n\n" +
"A Câmara da Magia Antiga está prestes a abrir.",
[
{
text: "Ir com Kiwi",
action: function() {
game.kiwi.finalAlly = true;
game.kiwi.trust += 3;
arcFiveIntroduction();
}
},
{
text: "Ir somente com o outro protagonista",
action: function() {
changeRelationship(2, 2, 0, 2);
arcFiveIntroduction();
}
},
{
text: "Preparar Hogwarts para a batalha final",
action: function() {
game.sasah.loyalty += 1;
game.lucas.loyalty += 1;
arcFiveIntroduction();
}
}
]
);
}

function arcFiveIntroduction() {
game.chapter = 5;


addLog("Arco V iniciado: O Último Feitiço.");

showScene(
    5,
    "Câmara da Magia Antiga",
    "ARCO V — O ÚLTIMO FEITIÇO",
    "A porta finalmente se abre.\n\n" +
    "Atrás dela existe uma enorme câmara iluminada por uma magia que parece não pertencer à época atual.\n\n" +
    "No centro existe um núcleo de energia.\n\n" +
    "Kiwi se aproxima.\n\n" +
    "A criatura reconhece imediatamente aquele lugar.\n\n" +
    "Ela não era apenas uma testemunha da história.\n\n" +
    "Sua linhagem foi criada para proteger aquele poder.",
    [
        {
            text: "Deixar Kiwi tocar o núcleo",
            action: function() {
                game.kiwi.secret = true;
                game.kiwi.trust += 4;
                game.kiwi.affection += 4;
                game.flags.ancientMagic = true;
                arcFiveBattle();
            }
        },
        {
            text: "Estudar o núcleo antes",
            action: function() {
                game.sasah.intelligence += 2;
                game.lucas.intelligence += 2;
                game.flags.ancientMagic = true;
                arcFiveBattle();
            }
        },
        {
            text: "Destruir o núcleo",
            action: function() {
                game.sasah.magic += 2;
                game.lucas.magic += 2;
                game.flags.ancientMagic = true;
                arcFiveBattle();
            }
        }
    ]
);


}

function arcFiveBattle() {
game.flags.finalBattle = true;


showScene(
    5,
    "Câmara da Magia Antiga",
    "A batalha final",
    "O inimigo entra na câmara.\n\n" +
    "A energia antiga explode ao redor dos protagonistas.\n\n" +
    "Kiwi permanece entre eles e o inimigo.\n\n" +
    "Suas marcas luminosas agora brilham como pequenas estrelas.\n\n" +
    "Os protagonistas percebem que a batalha final não será vencida apenas pela força.\n\n" +
    "Será necessário decidir em quem confiar.",
    [
        {
            text: "Confiar em Kiwi",
            action: function() {
                game.kiwi.finalAlly = true;
                game.kiwi.trust += 5;
                game.kiwi.affection += 5;
                changeRelationship(3, 4, 0, 3);
                finalDecision();
            }
        },
        {
            text: "Combinar a magia dos dois protagonistas",
            action: function() {
                game.sasah.magic += 2;
                game.lucas.magic += 2;
                changeRelationship(3, 3, 0, 3);
                finalDecision();
            }
        },
        {
            text: "Enfrentar o inimigo diretamente",
            action: function() {
                game.sasah.bravery += 2;
                game.lucas.bravery += 2;
                changeHp(game.sasah, -20);
                changeHp(game.lucas, -20);
                finalDecision();
            }
        }
    ]
);


}

function finalDecision() {
var kiwiStrong = game.kiwi.trust >= 8 && game.kiwi.affection >= 8;
var relationshipStrong =
game.relationship.friendship >= 8 &&
game.relationship.trust >= 8;


showScene(
    5,
    "Câmara da Magia Antiga",
    "O último feitiço",
    "O núcleo começa a desmoronar.\n\n" +
    "Não existe mais tempo.\n\n" +
    game.sasah.name +
    " olha para " +
    game.lucas.name +
    ".\n\n" +
    "Kiwi permanece ao lado deles.\n\n" +
    "Uma última decisão determinará o destino de Hogwarts.",
    [
        {
            text: "Usar a magia antiga para proteger todos",
            action: function() {
                if (kiwiStrong) {
                    endingKiwiGuardian();
                } else if (relationshipStrong) {
                    endingTogether();
                } else {
                    endingHeroic();
                }
            }
        },
        {
            text: "Destruir definitivamente a magia antiga",
            action: function() {
                endingFreedom();
            }
        },
        {
            text: "Permitir que Kiwi escolha",
            action: function() {
                if (kiwiStrong) {
                    endingKiwiGuardian();
                } else {
                    endingKiwiEscape();
                }
            }
        }
    ]
);


}

function endingKiwiGuardian() {
game.flags.sacrifice = false;


showScene(
    5,
    "Câmara da Magia Antiga",
    "FINAL — A Guardiã de Hogwarts",
    "Kiwi corre até o centro da câmara.\n\n" +
    "A pequena Lebrílope toca o núcleo com o focinho.\n\n" +
    "A magia explode em uma luz intensa, mas não destrói ninguém.\n\n" +
    "A energia se espalha por Hogwarts e reconstrói lentamente as barreiras do castelo.\n\n" +
    "O inimigo desaparece.\n\n" +
    "Quando tudo termina, Kiwi retorna para perto dos protagonistas.\n\n" +
    "Ela continua sendo pequena, curiosa e brincalhona.\n\n" +
    "Mas agora todos sabem a verdade.\n\n" +
    "Kiwi é a nova guardiã da magia antiga de Hogwarts.\n\n" +
    "E " +
    game.sasah.name +
    " e " +
    game.lucas.name +
    " são seus companheiros.",
    [
        {
            text: "Continuar depois do final",
            action: function() {
                postGame();
            }
        }
    ]
);


}

function endingTogether() {
showScene(
5,
"Hogwarts",
"FINAL — Juntos",
game.sasah.name +
" e " +
game.lucas.name +
" combinam suas forças.\n\n" +
"A magia antiga é selada novamente.\n\n" +
"Kiwi observa tudo de longe e depois corre para junto dos dois.\n\n" +
"A amizade construída durante a aventura se torna uma das histórias mais lembradas de Hogwarts.\n\n" +
"O castelo está salvo.\n\n" +
"Mas os protagonistas sabem que aquilo foi apenas o começo.",
[
{
text: "Continuar depois do final",
action: function() {
postGame();
}
}
]
);
}

function endingHeroic() {
game.flags.sacrifice = true;


showScene(
    5,
    "Hogwarts",
    "FINAL — O preço da coragem",
    "A batalha é vencida, mas o esforço cobra um preço.\n\n" +
    game.sasah.name +
    " e " +
    game.lucas.name +
    " conseguem impedir que a magia antiga caia nas mãos erradas.\n\n" +
    "Kiwi permanece ao lado deles durante todo o processo.\n\n" +
    "Quando o silêncio finalmente retorna, os três observam Hogwarts.\n\n" +
    "A escola sobreviveu.\n\n" +
    "Mas ninguém sairá daquela noite sendo exatamente a mesma pessoa.",
    [
        {
            text: "Continuar depois do final",
            action: function() {
                postGame();
            }
        }
    ]
);


}

function endingFreedom() {
showScene(
5,
"Câmara destruída",
"FINAL — A liberdade",
"A magia antiga é destruída.\n\n" +
"Por alguns segundos, tudo fica completamente silencioso.\n\n" +
"Depois, a câmara começa a desmoronar.\n\n" +
"Kiwi corre para fora com os protagonistas.\n\n" +
"A ameaça desaparece para sempre.\n\n" +
"Kiwi agora está livre da responsabilidade de proteger aquele poder.\n\n" +
"Ela olha para a floresta e, pela primeira vez, parece verdadeiramente feliz.",
[
{
text: "Continuar depois do final",
action: function() {
postGame();
}
}
]
);
}

function endingKiwiEscape() {
showScene(
5,
"Floresta Proibida",
"FINAL — O caminho de Kiwi",
"Kiwi escolhe seu próprio caminho.\n\n" +
"A Lebrílope conduz os protagonistas para fora da câmara e desaparece entre as árvores.\n\n" +
"Antes de desaparecer, ela olha para trás.\n\n" +
"Os protagonistas entendem que não devem segui-la.\n\n" +
"Algumas criaturas mágicas não precisam ser possuídas ou controladas.\n\n" +
"Precisam apenas ser respeitadas.\n\n" +
"Durante muitos anos, sempre que alguém encontrava pequenas marcas luminosas na floresta, sabia que Kiwi ainda estava por perto.",
[
{
text: "Continuar depois do final",
action: function() {
postGame();
}
}
]
);
}

function postGame() {
game.phase = "postgame";


showScene(
    6,
    "Hogwarts",
    "EPÍLOGO — O começo de uma nova história",
    "Os acontecimentos da aventura se tornam uma lenda entre os alunos.\n\n" +
    game.sasah.name +
    " e " +
    game.lucas.name +
    " retornam à rotina de Hogwarts.\n\n" +
    "Mas agora existe uma diferença.\n\n" +
    "Sempre que os dois caminham pelos corredores mais antigos, pequenas pegadas aparecem perto deles.\n\n" +
    "Às vezes, uma cabeça aparece atrás de uma armadura.\n\n" +
    "Às vezes, uma pequena Lebrílope rouba alguma coisa da mesa e sai correndo.\n\n" +
    "E, em noites silenciosas, Kiwi pode ser encontrada observando o castelo do alto de uma colina.\n\n" +
    "A aventura terminou.\n\n" +
    "Mas a história de Kiwi, " +
    game.sasah.name +
    " e " +
    game.lucas.name +
    " está apenas começando.",
    [
        {
            text: "Jogar novamente",
            action: function() {
                resetGame();
            }
        }
    ]
);


}

function saveGame() {
try {
localStorage.setItem(SAVE_KEY, JSON.stringify(game));
addLog("Jogo salvo com sucesso.");
} catch (error) {
addLog("Não foi possível salvar o jogo.");
console.error(error);
}
}

function loadGame() {
try {
var saved = localStorage.getItem(SAVE_KEY);


    if (!saved) {
        addLog("Nenhum jogo salvo foi encontrado.");
        return;
    }

    var loaded = JSON.parse(saved);

    if (!loaded || !loaded.sasah || !loaded.lucas) {
        addLog("O arquivo salvo é inválido.");
        return;
    }

    game = loaded;

    updateCharacterUI();
    updateLog();

    if (game.phase === "names") {
        startNameScreen();
    } else if (game.phase === "sorting") {
        startHouseSelection("sasah");
    } else if (game.phase === "postgame") {
        postGame();
    } else {
        resumeGame();
    }

    addLog("Jogo carregado com sucesso.");
} catch (error) {
    addLog("Não foi possível carregar o jogo.");
    console.error(error);
}


}

function resumeGame() {
if (game.chapter === 1) {
arcOneSceneOne();
} else if (game.chapter === 2) {
arcTwoIntroduction();
} else if (game.chapter === 3) {
arcThreeIntroduction();
} else if (game.chapter === 4) {
arcFourIntroduction();
} else if (game.chapter === 5) {
arcFiveIntroduction();
} else {
startNameScreen();
}
}

function setupControls() {
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
        var confirmed = window.confirm(
            "Tem certeza que deseja reiniciar toda a aventura?"
        );

        if (confirmed) {
            localStorage.removeItem(SAVE_KEY);
            resetGame();
        }
    });
}


}

document.addEventListener("DOMContentLoaded", function() {
setupControls();
updateCharacterUI();
updateLog();
startNameScreen();
});

