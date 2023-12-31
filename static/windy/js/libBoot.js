window.W = {
  version: "23.1.1",
  assets: "23.1.1.lib.baaa",
  sha: "a2400baaa",
  target: "lib",
  build: "2020-01-27, 09:01",
};
/*! Copyright (c) Windyty SE, 2019 all rights reserved */
var printError = function (t) {
    var e = function () {
      document.getElementById("windy").innerHTML =
        '\n\t\t\t<p style="text-align: center; margin-top: 200px;">\n\t\t\t\t' +
        t +
        '<br /><br />\n\t\t\t\tvisit <a style="color: inherit" href="https://www.windy.com/" target="_blank">www.windy.com</a> or <a style="color: inherit" href="https://api.windy.com/" target="_blank">api.windy.com</a>\n\t\t\t</p>';
    };
    console.error(t),
      "complete" === document.readyState
        ? e()
        : window.addEventListener("load", e);
  },
  message = function (t) {
    document
      .querySelector("#windy")
      .insertAdjacentHTML(
        "beforeend",
        '<section style="position: absolute;\n\t\t\t\t\tleft: 50%;\n\t\t\t\t\tbottom: 20%;\n\t\t\t\t\topacity: .6;\n\t\t\t\t\tpointer-events: none;\n\t\t\t\t\tline-height: 1.6;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t\ttransform: translate(-50%,-50%);\n\t\t\t\t\tfont-size: 16px;">' +
          t +
          "</section>"
      );
  };
!(function () {
  if (((DEBUG = !1), window.W && window.W.version))
    if (window.L) {
      var t = "https://www.windy.com/v/" + W.assets;
      window.windyInit = function (t, i) {
        var o = t.key;
        var r = new XMLHttpRequest();
        r.open("POST", "https://api.windy.com/api/map-forecast/v2/auth", !0),
          r.setRequestHeader("Content-type", "application/json; charset=utf-8"),
          (r.onload = function () {
            var a;
            try {
              a = JSON.parse(r.responseText);
            } catch (t) {
              a = {};
            }
            var s = a.auth,
              d = a.paid,
              c = a.domains,
              p = a.apiUser,
              l = a.id,
              u = a.name,
              w = a.type,
              y = a.exceeded;
            4 !== r.readyState || parseInt(r.status) >= 300
              ? printError("Not authorized to Windy API.")
              : e(o, c)
              ? ((window.W.windyBoot = {
                  options: t,
                  cb: i,
                  auth: s,
                  id: l,
                  name: u,
                  type: w,
                  paid: d,
                  apiUser: p,
                  exceeded: y,
                }),
                n(s))
              : printError("Windy API used on unauthorized domain.");
          }),
          r.send(JSON.stringify({ key: o }));
      };
      var e = function (t, e) {
          if (!e || !/\S+/.test(e)) return !0;
          var n = document.location.hostname;
          var i = e
            .split(",")
            .map(function (t) {
              return new RegExp(t.trim().toLowerCase());
            })
            .filter(function (t) {
              return t.test(n);
            });
          return i && i.length > 0;
        },
        n = function () {
          var e, n;
          (e = "lib.css"),
            ((n = document.createElement("link")).rel = "stylesheet"),
            (n.href = t + "/" + e),
            document.head.appendChild(n),
            (function (e, n) {
              var i = document.createElement("script");
              (i.type = "text/javascript"),
                document.head.appendChild(i),
                (i.async = !0),
                n && (i.onload = n),
                (i.onerror = function () {
                  return printError("Failed to load Windy API.");
                }),
                (i.src = t + "/" + e);
            })("lib.js", function () {
              var t = window.W.windyBoot.name;
              (!t || t.length < 5) &&
                message(
                  "Missing name of your app. Please go to your API key generation page and fill name of your app."
                );
            });
        };
    } else printError("Leaflet library is missing");
  else printError("Missing global object W. Have you loaded libManifest?");
})();
