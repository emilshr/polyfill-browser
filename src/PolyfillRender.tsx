import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { arrayPolyfillConfig } from "./data";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const PolyfillRender = () => {
  const { func } = useParams<{ func: string }>();
  const navigate = useNavigate();
  const config = useMemo(
    () => arrayPolyfillConfig.find((config) => config.func === func),
    [func]
  );

  useEffect(() => {
    if (!config) {
      navigate("/");
    }
  }, [config, navigate]);

  if (!config) {
    return <></>;
  }

  return (
    <SyntaxHighlighter
      language="javascript"
      style={anOldHope}
      wrapLines
      wrapLongLines
    >
      {config.codeSnippet}
    </SyntaxHighlighter>
  );
};
