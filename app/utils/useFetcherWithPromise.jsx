import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect, useRef } from "react";

/**
 * @author SamSelikoff
 * https://gist.github.com/samselikoff/510c020e4c9ec17f1cf76189ce683fa8)
 *
 * @returns a fetcher that can be used with async
 */

export function useFetcherWithPromise() {
  let resolveRef = useRef();
  let promiseRef = useRef();
  let fetcher = useFetcher();

  if (!promiseRef.current) {
    promiseRef.current = new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }

  const resetResolver = useCallback(() => {
    promiseRef.current = new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, [promiseRef, resolveRef]);

  const submit = useCallback(
    async (...args) => {
      fetcher.submit(...args);
      return promiseRef.current;
    },
    [fetcher, promiseRef]
  );

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      resolveRef.current(fetcher.data);
      resetResolver();
    }
  }, [fetcher, resetResolver]);

  return { ...fetcher, submit };
}
