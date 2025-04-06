url = 'http://localhost:3030/jsonstore/messenger';


function attachEvents() {
    // Създаваме слушател на събития
    document.getElementById('submit').addEventListener('click', onPost);
    document.getElementById('refresh').addEventListener('click', onRefresh);
}

attachEvents();

async function onPost() {
    let authorInput = document.querySelector('[name="author"]');
    let contentInput = document.querySelector('[name="content"]');

    let author = authorInput.value;
    let content = contentInput.value;

    if (!(author || content)) {
        return;
    }

    await postMessage(author, content);

    authorInput.value = '';
    contentInput.value = '';
}


async function onRefresh() {
    let textarea = document.getElementById('messages')

    let messages = await getMessages()

    let output = messages.map(m => `${m.author}: ${m.content}`).join('\n')

    textarea.value = output;
}

// Взимаме всички съобщения
async function getMessages() {
    let res = await fetch(url)
    let data = await res.json();

    return Object.values(data);
}


// Публикуваме съобщение
async function postMessage(author, content) {
    let message = { author, content };
    let options = {
        method: 'post',
        Headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    }

    await fetch(url, options);
}












