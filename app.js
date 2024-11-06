const mongoose = require ('mongoose')

mongoose.connect('mongodb+srv://Grupo-13:grupo13@cursadanodejs.ls9ii.mongodb.net/Node-js')
.then(() => console.log('Conexion exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB:', error));


/// CREANDO UN ESQUEMA ///

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes:[String],
    aliados:[String],
    enemigos:[String],
    createdAt: {type: Date, default: Date.now}
    },
    { collection: "Grupo-13" }
); 

const SuperHero = mongoose.model('Grupo-13', superheroSchema)

/// 1) INSERTAR UN DOCUMENTO

async function insertSuperHero(){
    const hero = new SuperHero({
        nombreSuperHeroe: "Wonder Woman",
        nombreReal: "Diana Prince",
        edad: 34,
        planetaOrigen: "Themyscira",
        debilidad: "No resistir la verdad",
        poderes: ["super fuerza", "agilidad", "inmortalidad", "vuelo"],
        aliados: ["Superman", "Batman", "Aquaman"],
        enemigos: ["Ares", "Cheetah"]
    })
    await hero.save();
    console.log('Superheroe insertado:', hero);
}

insertSuperHero() 

/// 2) ACTUALIZAR DOCUMENTO

async function updateSuperHero(nombreSuperHeroe){
    const result = await SuperHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 26 } }
    );
    console.log('Resultado de la actualizacion', result);
}
updateSuperHero('Wonder Woman') 

/// 3) ELIMINAR UN DOCUMENTO

async function deleteSuperHero(nombreSuperHeroe){
    const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
    console.log('Superheroe eliminado:', result);
}

deleteSuperHero('Wonder Woman'); 

/// 4) BUSCAR UN DOCUMENTO

async function findSuperHeroes(){
    const heroes = await SuperHero.find({ planetaOrigen: 'Tierra'});
    console.log('Superheroes encontrados:', heroes);
     
}
findSuperHeroes();