import { NavLink, useParams } from "react-router-dom";
import { arrayPolyfillConfig } from "./data";
import { ArrayPolyfillRender } from "./PolyfillRender";

function Header() {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-2xl font-bold">Polyfills</h1>
      <h1 className="text-lg font-semibold">Array</h1>
      <hr />
    </div>
  );
}

function SidePanel() {
  const params = useParams<{ func: string }>();
  return (
    <ul className="flex flex-col gap-y-1 list-disc pl-3">
      {arrayPolyfillConfig.map(({ func }) => {
        return (
          <li
            key={func}
            className={`hover:underline ${
              func === params.func ? "underline decoration-blue-500" : ""
            }`}
          >
            <NavLink to={`/${func}`}>{func}</NavLink>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  return (
    <div className="min-h-svh w-svw p-4 flex flex-col gap-y-4">
      <Header />
      <div className="grid grid-cols-3 gap-4">
        <SidePanel />
        <div className="col-span-2">
          <ArrayPolyfillRender />
        </div>
      </div>
    </div>
  );
}

export default App;
