/*
class List {
    
    constructor() {
        this.data = [];
    }

    add(data) {
        this.data.push(data);
        console.log(this.data);
    }

}

class TodoList extends List{

    constructor() {
        super();
        //exemplo de propriedade
        this.usuario = 'Lucas';
    }

    mostrarUsuario() {
        console.log(this.usuario);
    }

}


//class TodoList {
//
//    constructor() {
//        this.todos = [];
//    }
//
//    addTodo() {
//        this.todos.push('Novo todo');
//        console.log(this.todos);
//    }
//
//}


const minhaLista = new TodoList();

//document.getElementById("novotodo").addEventListener("click", function(){
//    minhaLista.add('Novo todo');
//});

minhaLista.mostrarUsuario();

class Matematica {

    static soma(a, b){
        return a + b;
    }

}

console.log(Matematica.soma(32, 56));

//////////////////////////

const arr = [1, 3, 5, 4, 20, 50];

const newArr = arr.map(function(item, index){
    return item * index;
});

console.log(newArr);

*/

/*

const usuario = {
    nome: "Lucas",
    sobrenome: "Bueno",
    telefone: {
        fixo: {
            numero: ["48987684352", "48999997676"]
        },
        celular: {
            numero: "48900000000"
        }
    },
    endereco: {
        cidade: "Floarianópolis",
        estado: "Santa Catarina"
    }
}

const { nome, sobrenome, telefone: { fixo: { numero } } } = usuario;

console.log(`Nome completo: ${nome} ${sobrenome}`);

document.body.innerHTML = "Nome completo do indivíduo: " + nome + " " + sobrenome;
document.body.innerHTML = JSON.stringify(usuario);

*/

/*

// REST

const usuario = {
    nome: "Lucas",
    sobrenome: "Bueno",
    idade: 20
}

const { nome, ...rest } = usuario;

console.log(nome);
console.log(rest);

const arr = [1, 2, 3, 4];
const [ a, b, ...c ] = arr;

console.log(a);
console.log(b);
console.log(c);

// SPREAD

const arr1 = [ 1, 2, 3 ];
const arr2 = [ 4, 5, 6 ];

const arr3 = [ ...arr1, ...arr2 ];

console.log(arr3);

*/

/*

// TEMPLATE LITERALS

const nome = "Lucas";
const idade = 20;

console.log(`Meu nome é ${ nome } e tenho ${ idade } anos.`);

*/

/*

import { soma } from './funcoes';

console.log(soma(2, 3));

*/

/*
minhaPromise().then(response => {
    console.log(response);
}).catch(err => {

});
*/
/*

import axios from 'axios';

class Api {
    static async getUserInfo(username) {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        console.log(response);
    }
}

Api.getUserInfo('lucxsbueno');

*/
/*
import axios from 'axios';

class Api {
    static async getUserInfo(username) {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            console.log(response.data);
        } catch (error) {
            console.error('Erro na api.');
        }
        
    }
}

Api.getUserInfo('lucxsbueno');
*/

import api from './api';

class App {

    constructor(){
        this.repositories = [];
        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');
        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if (loading) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');
            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();
        const repoInput = this.inputEl.value;
        if (repoInput.length == 0) {
            return;
        }
        try {
            this.setLoading();
            const response = await api.get(`/repos/${repoInput}`);
            const { name, description, html_url, owner: { avatar_url } } = response.data;
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });
            this.render();
        } catch (error) {
            alert('O repositório não existe.');
        }
        this.setLoading(false);
    }

    render(){
        this.listEl.innerHTML = '';
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);
            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));
            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));
            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));
            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);
            this.listEl.appendChild(listItemEl);
        });
    }

}

new App();