import { TailSpin } from "react-loader-spinner";

function Loader({ size, color }) {
  return (
    <TailSpin
      visible={true}
      height={size}
      width={size}
      color={color}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Loader;
