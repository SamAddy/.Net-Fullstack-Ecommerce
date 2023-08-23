import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GlobalState } from "../redux/store";

const useCustomSelector: TypedUseSelectorHook<GlobalState> = useSelector;

export default useCustomSelector;