export class Router {
  routes = {};

  add(routName, page) {
    this.routes[routName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;

    if (pathname === "/universe") {
      document.querySelector("body").style.backgroundImage =
        "url(./images/mountains-universe-2.png)";
    } else if (pathname === "/exploration") {
      document.querySelector("body").style.backgroundImage =
        "url(./images/mountains-universe-3.png)";
    } else {
      document.querySelector("body").style.backgroundImage =
        "url(./images/mountains-universe-1.png)";
    }

    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.getElementById("app").innerHTML = html;
      });
  }
}
