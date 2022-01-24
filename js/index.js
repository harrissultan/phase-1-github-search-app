document.addEventListener('DOMContentLoaded', () => {
        search()
        
  });

  function search(){
    const form = document.querySelector("#github-form")
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let userName = document.querySelector('#search').value;
        searchName(userName)
    })
    form.reset();    
}

function searchRepo(Name){
    fetch(`https://api.github.com/users/${Name}/repos`)
    .then(res=>res.json())
    .then(data=>{
        const main = document.querySelector('#repos-list')
        data.forEach(user => {
            let list = document.createElement('li');
            list.innerText=user.url
            main.appendChild(list)
            
        })
    })
}

function searchName(Name){
    fetch(`https://api.github.com/search/users?q=${Name}`,{
        Method: "GET",
        header: {
            "Content-Type":"application/json",
        Accept: "application/vnd.github.v3+json",
        },
    })
    .then(res=>res.json())
    .then(data=>{
        const main = document.querySelector('#user-list')
        data.items.forEach(user => {
            let name = document.createElement('li');
            name.className = "Ulist"
            name.innerText=`NAME: ${user.login}`
            let dp = document.createElement('img')
            dp.className = "dp"
            dp.src = user.avatar_url
            let url = document.createElement('li')
            url.textContent = `URL: ${user.url}`
            main.append(dp,name,url)
            name.addEventListener('click', (e)=>{
                e.preventDefault();
                searchRepo(user.login)
                
            })
        })
    })
}