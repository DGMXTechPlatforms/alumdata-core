import success from '../../css/img/success.svg';
import aspiranteEditado from '../../css/img/cambiosModalAspirante.svg';
const ContCambiosGuardadosAsp = () => {
  return (
    <div>
      <img src={success} width="50" className="mx-auto mt-6" />
      <div className="mx-auto tituloModal text-xl text-center text-normalPurple mt-6">
        ¿Deseas realizar cambios al aspirante?
      </div>
      <img className="mx-auto mt-4" src={aspiranteEditado} width="40%" />
    </div>
  );
};

export default ContCambiosGuardadosAsp;
