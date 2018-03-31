import * as React from "react";
import * as ReactDOM from "react-dom";

import { User } from "./components/User";

ReactDOM.render(
  <User
    name="Derek Nordgren"
    id="derek-nordgren"
    watchlists={[
      "Robinhood",
      "GDAX",
      "Betterment",
    ]}
  />,
  document.getElementById("react-app"),
);
