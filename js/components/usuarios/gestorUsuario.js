import Servicios from './servicios.js';
class GestorUsuarios {
    constructor() {
        this.servicios = new Servicios();
        //todas las variables que deben inicializarse
        this.token = '';
        this.usuarios = []; 
        //LOS USUARIOS DE LA FUNCION GESTORUSUARIOS
        this.init();
    }
    login() {
        const usuario = $('#user').val();
        const contrasena = $('#pass').val();
        /*  
            call(error, succss) {
                if (error) { .. }
                else { .. }
            }
            this.servicios.autenticar(usuario, contrasena, call){

            }
        */
        this.servicios.autenticar(usuario, contrasena, (error, response) => {
            if (error) {
                alert('Usuario o contraseña incorrectos');
            } else {
                //this.usuarios.push(response.usuario);
                //agrega un campo al array
                console.log(response);
                if (response.status == 200) {
                    alert('¡Login exitoso!');
                    this.token = response.token;
                    this.cleanMain();
                    this.mostrarUsuarios(this.token);
                }
            }
        });
    }
    mostrarUsuarios(token) {
        this.servicios.obtenerUsuarios(token, (error, response) => {
            if (error) {
                console.error('Error al obtener usuarios:', error);
            } else {
                console.log(response);
                this.renderizarUsuarios(response);
            }
        });
    }
    cleanMain() {
        $("#mainlogin").html("");
    }
    
    getColorByType(type) {
        const colors = {
            'Eléctrico': 'yellow',
            'Fuego': 'red',
            'Planta': 'green',
            'Agua': 'lightblue',
            'Tierra': 'brown',
            'Siniestro': 'black',
            'Acero': 'gray',
        };
        return colors[type] || 'white'; 
    }

    renderizarUsuarios(usuarios) {
        usuarios.forEach(entrenador => {
            $('#mainlogin').append(`
                <div class="entrenador">
                    <h1>Entrenador: ${entrenador.entrenador}</h1>
                    <h2>Sus pokemones: </h2>
                    <div class="pokemones">
                        ${entrenador.pokemons.map(pokemon => {
                            const borderColor = this.getColorByType(pokemon.tipo);
                            return `
                                <div class="pokemon" style="border: 4px solid ${borderColor};">
                                    <h3>${pokemon.nombre}</h3>
                                    <p>Tipo: ${pokemon.tipo}</p>
                                    <img src="${pokemon.foto}" alt="${pokemon.nombre}">
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `);
        });
    }
    
    renderLogin() {
        const templatelogin = `<div class="inputLogin">
            <div class="input">
                <label>Usuario</label>
                <input type="text" id="user" />
            </div>
            <div class="input">
                <label>Password</label>
                <input type="password" id="pass" />
            </div>
            <div class="input">
                <button type="submit" class="btn" id="btLogin">Logear</button>
            </div>
        </div>`;
        $("#mainlogin").append(templatelogin);
    }
    // funciones para IMPRIMIR vistas
    render() {
        this.renderLogin();
    }
    init() {
        this.render();
        //otras funcionalidades
        $('#btLogin').on('click', () => {
            this.login();
        });
    }
}

export default GestorUsuarios;