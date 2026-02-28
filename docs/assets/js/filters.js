(function () {
  var fO = document.getElementById("fOrigen");
  var fD = document.getElementById("fDestino");
  var clearBtn = document.getElementById("clear");
  var tbody = document.querySelector(".routes-table tbody");

  if (!fO || !fD || !tbody) return;

  function norm(s) {
    return (s || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // saca acentos
      .toLowerCase()
      .trim();
  }

  function filtrar() {
    var qO = norm(fO.value);
    var qD = norm(fD.value);

    var filas = tbody.querySelectorAll("tr");
    filas.forEach(function (tr) {
      var celdas = tr.querySelectorAll("td");
      var origen = norm(celdas[0] ? celdas[0].textContent : "");
      var destino = norm(celdas[1] ? celdas[1].textContent : "");
      var okO = !qO || origen.indexOf(qO) !== -1;
      var okD = !qD || destino.indexOf(qD) !== -1;
      tr.style.display = okO && okD ? "" : "none";
    });
  }

  fO.addEventListener("input", filtrar);
  fD.addEventListener("input", filtrar);
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      fO.value = "";
      fD.value = "";
      filtrar();
    });
  }

  filtrar();
})();
