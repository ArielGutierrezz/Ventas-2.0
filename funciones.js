import { getData, remove, save, selectOne} from "./firestore.js" //import { edit, getData, remove, save, selectOne } from "./firestore.js"

let id = 0

document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    if (document.querySelectorAll('.is-invalid').length == 0) {
        const vehiculo = {
            pat: document.getElementById('patente').value,
            email: document.getElementById('email').value,
            mar: document.getElementById('marca').value,
            mod: document.getElementById('modelo').value,
            pre: document.getElementById('precio').value,
            fec: document.getElementById('fecha').value,
            kil: document.getElementById('kilometros').value,
            est: document.querySelector('input[name="state"]:checked') ? document.querySelector('input[name="state"]:checked').value : ''
        }
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(vehiculo)
        } 
        else{
            edit(id,vehiculo)
            id = 0
        }
        limpiar()
    }
})
//DOMContentLoaded es una evento que se activa al recargar la página
window.addEventListener('DOMContentLoaded', () => {
     //función que recibe los datos de la db 
    getData((collection) => {
        let tabla = '';
        collection.forEach((doc) => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.pat}</td>
                <td>${item.email}</td>
                <td>${item.mar}</td>
                <td>${item.mod}</td>
                <td>${item.pre}</td>
                <td>${item.fec}</td>
                <td>${item.kil}</td>
                <td>${item.est}</td>
                <td nowrap>
                    <button class="btn btn-warning" data-id="${doc.id}">Editar</button>
                    <button class="btn btn-danger" data-id="${doc.id}">Eliminar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenido').innerHTML = tabla;

        document.querySelectorAll('.btn-danger').forEach(btn => {
            
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.dataset.id);
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        });
                    }
                }).catch((error) => {
                    const errorMessage = "Ocurrió un error al eliminar los datos. Por favor, inténtalo de nuevo.";
                    console.error(errorMessage, error);
                    Swal.fire({
                        title: "Error",
                        text: errorMessage,
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK"
                    });
                });
            });
        });

        //funcion de editar
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const vehiculo = await selectOne(btn.dataset.id)
                const e = vehiculo.data()
                document.getElementById('patente').value = e.pat
                document.getElementById('email').value = e.email
                document.getElementById('marca').value = e.mar
                document.getElementById('modelo').value = e.mod
                document.getElementById('precio').value = e.pre
                document.getElementById('fecha').value = e.fec
                document.getElementById('kilometros').value = e.kil
                document.getElementById('btnGuardar').value = 'Editar'
                document.getElementById('patente').readOnly = true
                id = vehiculo.id
            })
        })
    });
});
