import recuperarContraseña from "../../css/img/recoverPasswordModal.svg";
const ContRecuperarPass = () =>{
    return (
        <div>
            <div className="mx-auto tituloModal text-xl text-center text-normalPurple mt-6">Recupera tu contraseña</div>
            <p className="text-base text-basic-gray mt-2 text-center">Por favor, verifica tu email</p>
            <input
            type="email"
            required
            className="font-sans bg-transparent text-lg appearance-none relative block w-4/5 mx-auto my-6 px-6 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
            placeholder="Correo electrónico"
            ></input>
            <img className="mx-auto my-4" src={recuperarContraseña} width="35%" />
        </div>
    )
}

export default ContRecuperarPass