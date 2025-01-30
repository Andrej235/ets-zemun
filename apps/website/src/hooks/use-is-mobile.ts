import { useMemo } from "react";

export default function useIsUsingMobile() {
  const isUsingMobile = useMemo(
    () =>
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent
      ),
    []
  );

  return isUsingMobile;
}

