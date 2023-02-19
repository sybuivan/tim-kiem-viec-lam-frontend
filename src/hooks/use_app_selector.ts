import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'src/redux_store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
