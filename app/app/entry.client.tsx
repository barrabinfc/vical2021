import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

hydrate(<RemixBrowser />, document);

if (window.ENV.FF.ServiceWorker && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
