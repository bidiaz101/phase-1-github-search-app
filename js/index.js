document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", e => {
        e.preventDefault()
        searchUsers()
    })
});

function searchUsers() {
    const search = document.getElementById("search")
    fetch(`https://api.github.com/search/users?q=${search.value}`)
    .then(resp => resp.json())
    .then(json => {
        for (const obj of json.items) {
            const listElement = document.createElement("li")
            listElement.innerHTML = `
            <h3>Username: ${obj.login}</h3>
            <img src= ${obj.avatar_url} alt=${obj.login}'s avatar>
            <a href=${obj.url}>${obj.login}'s Github</a>
            `
            listElement.id = obj.login
            listElement.addEventListener("click", () => findRepos(obj.login))
            document.getElementById("user-list").appendChild(listElement)
        }
    })
};

function findRepos(user) {
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(resp => resp.json())
    .then(json => {
        const repoList = document.getElementById("repos-list")
        repoList.innerHTML=""
        for(const obj of json) {
            const repoListItem = document.createElement("li")
            repoListItem.innerHTML = `<a href=${obj["html_url"]}>${obj["html_url"]}</a>`
            repoList.appendChild(repoListItem)
        }
    })
};
