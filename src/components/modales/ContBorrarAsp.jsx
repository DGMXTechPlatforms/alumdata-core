import aspiranteBorrado from "../../css/img/eliminarModalAspirante.svg";
const ContBorrarAsp = () =>{
    return (
        <div>
            <div className="mx-auto tituloModal text-xl text-center text-normalPurple mt-6">¿Realmente desea eliminar este aspirante?</div>
            <p className="text-base text-basic-gray mt-2 text-center">Esta acción no puede deshacerse</p>
            <img className="mx-auto mt-4" src={aspiranteBorrado} width="40%" />
        </div>
    )
}


export default ContBorrarAsp