let newID;
let db=openDatabase("itemDB", "1.0", "itemDB", 65535);//se crear la DB

function limpiar(){
document.getElementById("item").value="";
document.getElementById("precio").value="";
}

//FUNCIONALIDAD DE LOS BOTONES
//Eliminar registro
function eliminarRegistro(){
    $(document).one('click', 'button[type="button"]', function(event){
        let id = this.id;
        var lista = [];
        $('#listaProductos').each(function(){
            var celdas = $(this).find('tr.Reg_'+id);
            celdas.each(function(){
                var registro = $(this).find('span.mid');
                registro.each(function(){
                    lista.push($(this).html())
                });
            });
        });
        newID = lista[0].substr(1);
        db.transaction(function(transaction){
            var sql = "DELETE FROM productos WHERE id="+newID+";"
            transaction.executeSql(sql, undefined, function(){
                alert("Registro eliminado, actualice la página para verificar el cambio.")
            },function(transaction, err){
                alert(err.message);
            })
        })
    });
}
function editarRegistro(){
    alert("nyaaaa x2");
}

$(function (){
    //crea la tabla de productos (create)
    $("#crear").click(function(){
        db.transaction(function(transaction){
            var sql="CREATE TABLE productos "+
            "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "+
            "item VARCHAR(100) NOT NULL, "+
            "precio DECIMAL(5,2) NOT NULL)";
            transaction.executeSql(sql, undefined, function(){
                alert("Tabla creada");
            }, function(transaction, err){
                alert(err.message);
            })
            });
        });
    //cargar lista productos (select)
    $("#listar").click(function(){
        cargarDatos();
    })
     //Función para listar y pintar tabla de productos en la página web (create)
    function cargarDatos(){
        $("#listaProductos").children().remove();
        db.transaction(function(transaction){
            var sql="SELECT * FROM productos ORDER BY id DESC";
            transaction.executeSql(sql, undefined, function(transaction, result){
                if(result.rows.length){
                    $("#listaProductos").append('<tr><th>Código</th><th>Producto</th><th>Precio</th><th></th><th></th></tr>');
                    for(var i = 0; i < result.rows.length; i++){
                        var row = result.rows.item(i);
                        var item = row.item;
                        var id = row.id;
                        var precio = row.precio;
                        $("#listaProductos").append('<tr id="fila'+id+'" class="Reg_A'+id+'"><td><span class="myID">A'+id+
                        '</span></td><td><span>'+item+'</span></td><td><span>'+precio+
                        ' Bs. </span></td><td><button class="btn btn-modificar-dato" onClick="editarRegistro()"><img src="img/editar.png" alt="icono de editar" id="btn-edit"/></button></td><td><button class="btn btn-eliminar-dato" onClick="eliminarRegistro()"><img src="img/eliminar.png" alt="icono de eliminar" id="btn-delete"/></button></td></tr>');
                    }
                }else{
                    $("#listaProductos").append('<tr><td colspan="5" align="center">No existen registros de productos</td></tr>');
                }
            }, function(transaction, err){
                alert(err.message);
            })
        })

    }

    //Insertar registros (insert)
    $("#insertar").click(function(){
        var item = $("#item").val();
        var precio = $("#precio").val();
        db.transaction(function(transaction){
            var sql = "INSERT INTO productos(item,precio) VALUES (?,?)";
            transaction.executeSql(sql, [item,precio], function(){ 
            }, function(transaction, err){
                alert(err.message);
            })
        })
            limpiar();
            cargarDatos();
                
        })
    //funcion para borrar TODOS LOS REGISTROS
    $("#eliminar-todo").click(function(){
        if(!confirm("¿Está usted seguro se eliminar toda la tabla?, los datos se eliminarán de forma permanente.",""))
            return;
        db.transaction(function(transaction){
            var sql="DROP TABLE productos";
            transaction.executeSql(sql, undefined, function(){
                alert("Tabla borrada. Para ver el cambio actualice la página")
            }, function(transaction, err){
                alert(err.message);
            })
        })
        
    })










})

