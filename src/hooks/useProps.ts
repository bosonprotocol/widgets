import { useEffect, useState } from "react";

export const useProps = () => {
  const [props, setProps] = useState(window.xprops ?? {});
  useEffect(() => {
    if ("xprops" in window && typeof window.xprops.onProps === "function") {
      window.xprops.onProps((newProps: typeof props) => {
        setProps({ ...newProps });
      });
    }
  }, []);
  return { props };
};
