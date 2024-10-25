window.onload = () =>{
    pegaLocalStorage()
}

localStorage.setItem('teste',12)

function pegaLocalStorage(){
    document.getElementById('tabela').replaceChildren('')
    
    for (const key in localStorage) {
            const element = localStorage[key];
            console.log(key,element)
    }
}

function alteraLocalStorage(){
    const localStorageToChange = document.getElementById('localStorageToChange').value;
    localStorage.setItem(localStorageToChange,document.getElementById('inputUpdateLocalStorage').value);
}

function deletaLocalStorage(){
    const localStorageToChange = document.getElementById('localStorageToChange').value;
    localStorage.removeItem(localStorageToChange);
}