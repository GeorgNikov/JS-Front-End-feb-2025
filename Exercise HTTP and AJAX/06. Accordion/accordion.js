function solution() {
    onLoad();

    async function onLoad() {
        let articles = await getArticles();
        let sectionMain = document.getElementById('main');

        for (let article of articles) {
            let divAccordion = document.createElement('div');
            divAccordion.className = 'accordion';

            let divHead = document.createElement('div');
            divHead.className = 'head';

            let span = document.createElement('span');
            span.textContent = article.title;

            let button = document.createElement('button');
            button.className = 'button';
            button.textContent = 'More';
            button.setAttribute('id', article._id);

            const extraContentDiv = document.createElement('div');
            extraContentDiv.className = 'extra';
            extraContentDiv.style.display = 'none';

            // Added for second test
            extraContentDiv.dataset.loaded = 'false';

            button.addEventListener('click', (event) => onToggle(event, article._id, extraContentDiv, button));

            divHead.appendChild(span);
            divHead.appendChild(button);
            divAccordion.appendChild(divHead);
            divAccordion.appendChild(extraContentDiv);
            sectionMain.appendChild(divAccordion);
        }
    }

    async function onToggle(event, articleId, contentDiv, button) {
        if (contentDiv.style.display === 'none') {
            if (contentDiv.dataset.loaded === 'false') {
                const fullArticle = await getArticleContent(articleId);
                const p = document.createElement('p');
                p.textContent = fullArticle.content;
                contentDiv.appendChild(p);
                contentDiv.dataset.loaded = 'true';
            }

            contentDiv.style.display = 'block';
            button.textContent = 'Less';
        } else {
            contentDiv.style.display = 'none';
            button.textContent = 'More';
        }
    }

    async function getArticleContent(id) {
        const res = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
        const data = await res.json();

        return data;
    }

    async function getArticles() {
        let url = 'http://localhost:3030/jsonstore/advanced/articles/list/';
        let res = await fetch(url);
        let data = await res.json();

        return Object.values(data);
    }
}

solution();
