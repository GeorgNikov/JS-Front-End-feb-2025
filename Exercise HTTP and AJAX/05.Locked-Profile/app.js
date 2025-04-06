async function getProfiles() {
    const res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await res.json();
    return Object.values(data);
}

async function createProfileCards() {
    let data = await getProfiles();

    const main = document.getElementById('main');
    main.innerHTML = '';
    let index = 1;

    data.forEach((profile) => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        const isLocked = true;

        profileDiv.innerHTML = `
            <img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${index}Locked" value="lock" ${isLocked ? 'checked' : ''}>
            <label>Unlock</label>
            <input type="radio" name="user${index}Locked" value="unlock" ${!isLocked ? 'checked' : ''}><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${index}Username" value="${profile.username}" disabled readonly />
            <div class="user${index}Details" style="display: none;">
                <hr>
                <label>Email:</label>
                <input type="email" name="user${index}Email" value="${profile.email}" disabled readonly />
                <label>Age:</label>
                <input type="number" name="user${index}Age" value="${profile.age}" disabled readonly />
            </div>
            <button onclick="toggleMoreInfo(${index})">Show more</button>
        `;

        main.appendChild(profileDiv);
        index++;
    });
}


function toggleMoreInfo(profileId) {
    const userDiv = document.querySelector(`.user${profileId}Details`);
    const button = document.querySelector(`button[onclick="toggleMoreInfo(${profileId})"]`);
    const unlockRadio = document.querySelector(`input[name="user${profileId}Locked"][value="unlock"]`);

    if (unlockRadio.checked) {
        if (userDiv.style.display === 'none') {
            userDiv.style.display = 'block';
            button.textContent = 'Hide it';
        } else {
            userDiv.style.display = 'none';
            button.textContent = 'Show more';
        }
    }
}

createProfileCards();