import os
from flask import Flask ,jsonify,request,redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.utils import secure_filename

app=Flask(__name__)
CORS(app)
# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:root@localhost/tpofinal'
#                                               user:clave@localhost/nombreBaseDatos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db= SQLAlchemy(app)
ma=Marshmallow(app)

# defino las constantes para subir las fotos de los pianos
RUTA_CARGA_IMAGEN = os.path.join(os.pardir, 'web', 'imgs', 'pianos')

# defino la tabla
class Piano(db.Model):   # la clase Producto hereda de db.Model     
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    modelo=db.Column(db.String(45))
    imagen=db.Column(db.String(45))
    precio=db.Column(db.DECIMAL(15, 2))
    
    def __init__(self, modelo, imagen, precio):   #crea el  constructor de la clase
        self.modelo=modelo   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.imagen=imagen
        self.precio=precio
        
db.create_all()  # crea las tablas
#  ************************************************************
class PianoSchema(ma.Schema):
    class Meta:
        fields=('id','modelo','imagen','precio')
piano_schema=PianoSchema()            # para crear un producto
pianos_schema=PianoSchema(many=True)  # multiples registros
 
@app.route('/pianos',methods=['GET'])
def get_pianos():
    all_pianos=Piano.query.all()     # query.all() lo hereda de db.Model
    result=pianos_schema.dump(all_pianos)  # .dump() lo hereda de ma.schema
    return jsonify(result)
 
@app.route('/pianos/<id>',methods=['GET'])
def get_piano(id):
    piano=Piano.query.get(id)
    return piano_schema.jsonify(piano)

@app.route('/piano/<id>',methods=['DELETE'])
def delete_piano(id):
    piano=Piano.query.get(id)
    db.session.delete(piano)
    db.session.commit()
    return piano_schema.jsonify(piano)

@app.route('/pianos', methods=['POST']) # crea ruta o endpoint
def create_piano():
    print(request.json)  # request.json contiene el json que envio el cliente
    modelo=request.json['modelo']
    imagen=request.json['imagen']
    precio=request.json['precio']
    new_piano=Piano(modelo,imagen,precio)
    db.session.add(new_piano)
    db.session.commit()
    return piano_schema.jsonify(new_piano)

@app.route('/pianos/<id>' ,methods=['PUT'])
def update_piano(id):
    piano=Piano.query.get(id)
    modelo=request.json['modelo']
    imagen=request.json['imagen']
    precio=request.json['precio']
 
    piano.modelo=modelo
    piano.imagen=imagen
    piano.precio=precio
    db.session.commit()
    return piano_schema.jsonify(piano)

@app.route('/upload_image' ,methods=['POST'])
def upload_piano_image():
    archivo = request.files['imagen']
    ruta = os.path.join(RUTA_CARGA_IMAGEN, secure_filename(archivo.filename))
    archivo.save(ruta)
    return 'Imagen cargada correctamente'

# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)  