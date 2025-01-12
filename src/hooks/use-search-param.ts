import { useQueryState, parseAsString } from "nuqs";

// https://github.com/47ng/nuqs
export function useSearchParam(key: string) {
  return useQueryState(
    key,
    parseAsString.withDefault('')
  );
}