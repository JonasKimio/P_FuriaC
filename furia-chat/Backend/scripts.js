// Carrega JSON e preenche toda a interface
async function carregarDados() {
    const resposta = await fetch('Backend/data.json');
    const dados = await resposta.json();

    preencherTime(dados.time1, 'time1');
    preencherTime(dados.time2, 'time2');
}

function preencherTime(time, id) {
    document.getElementById(`${id}-nome`).innerText = time.nome;
    document.getElementById(`${id}-placar`).innerText = `Placar: ${time.placarJogo} / ${time.placarMapa}`;
    document.getElementById(`${id}-mapa`).innerText = `Mapa: ${time.mapa}`;
    document.getElementById(`${id}-lado`).innerText = `Lado: ${time.lado}`;

    let economiaTotal = 0;
    let totalKills = 0, totalDeaths = 0, totalAssists = 0;

    let lista = '';
    time.jogadores.forEach(jog => {
        economiaTotal += jog.eco;
        totalKills += jog.k;
        totalDeaths += jog.d;
        totalAssists += jog.a;

        lista += `<li style="background-color: #00000020; border: 5px solid #00000020; border-radius: 10px; list-style: none; margin: 5px">
            <b>${jog.nome}</b> — Vida: ${jog.vida} — ${jog.k}/${jog.d}/${jog.a} — $${jog.eco}<br>
            <strong>Armas:</strong> ${jog.armas.join(', ')}<br>
            <strong>Utilitários:</strong> ${jog.utilitarios.join(', ')}<br>
            <strong>Proteção:</strong> ${jog.protecao}<br>
            <strong>Kit/Bomba:</strong> ${jog.kit}
        </li>`;
    });

    document.getElementById(`${id}-economia`).innerText = `Economia total: $${economiaTotal}`;
    document.getElementById(`${id}-kda`).innerText = `Total K/D/A: ${totalKills}/${totalDeaths}/${totalAssists}`;
    document.getElementById(`${id}-jogadores`).innerHTML = lista;
}


function preencherChat(chat) {
    const chatBox = document.getElementById('chat-mensagens');
    chatBox.innerHTML = '';
    chat.forEach(msg => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${msg.autor}:</strong> ${msg.mensagem}`;
        chatBox.appendChild(p);
    });
}

// Lógica de envio de mensagens
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chat-mensagens');

const mensagensChat = [];

chatForm.addEventListener('submit', e => {
    e.preventDefault();

    const mensagem = chatInput.value.trim();
    const nickname = document.getElementById('chatNickname').value.trim() || 'Anônimo';

    if (!mensagem) return;

    const novaMensagem = { autor: nickname, mensagem: mensagem };
    mensagensChat.push(novaMensagem);

    const p = document.createElement('p');
    p.innerHTML = `<strong>${novaMensagem.autor}:</strong> ${novaMensagem.mensagem}`;
    chatMessages.appendChild(p);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = '';
});



carregarDados();

const chatNickname = document.getElementById('chatNickname');

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    const nome = chatNickname.value.trim() || 'Anônimo';

    if (!msg) return;

    const p = document.createElement('p');
    p.innerHTML = `<strong>${nome}:</strong> ${msg}`;
    chatMessages.appendChild(p);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = '';
});

