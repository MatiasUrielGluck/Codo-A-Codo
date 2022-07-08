import os
from flask import Flask ,jsonify,request,redirect,render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.utils import secure_filename

app=Flask(__name__)
CORS(app)
# configuro la base de datos, con el nombre el usuario y la clave
#app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:root@localhost/tpofinal'
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://zgrxjtdeknoxui:b943d9c6342a65250670c5cda79099f227aefffeea9778b9a6001268781a7cce@ec2-44-195-162-77.compute-1.amazonaws.com:5432/ddn7hcl9k464p6'
#                                               user:clave@localhost/nombreBaseDatos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db= SQLAlchemy(app)
ma=Marshmallow(app)

# defino las constantes para subir las fotos de los pianos
RUTA_CARGA_IMAGEN = os.path.join('web', 'imgs', 'pianos')

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
 
# Rutas visibles
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nuestros_pianos')
def nuestros_pianos():
    return render_template('pianos.html')

@app.route('/servicios')
def servicios():
    return render_template('servicios.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/create')
def create():
    return render_template('create.html')

@app.route('/update')
def update():
    return render_template('update.html')

# Rutas REST API
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
    app.run(debug=True)  
