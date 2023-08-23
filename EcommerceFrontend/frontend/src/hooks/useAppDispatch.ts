import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch