/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { createPortal } from "react-dom";

export const IFrame = ({ children, ...props }: any) => {
  const [contentRef, setContentRef] = useState(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe height={"100%"} width={"100%"} {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
