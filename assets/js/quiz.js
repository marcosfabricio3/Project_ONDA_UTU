(function () {
  // UTIL
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  //  POOL OF 50 QUESTIONS
// Format: { q, a:[...] (4 options), ok: correctIndex }
const QUESTIONS = [
  {
    q: "In what year was ONDA organized as a cooperative?",
    a: ["1925", "1930", "1935", "1940"],
    ok: 2,
  },
  {
    q: "Who made the pioneering Colonia–Montevideo trip in 1925?",
    a: [
      "Luis A. de Herrera",
      "Eloy G. Perazza",
      "J. Batlle y Ordóñez",
      "Luis A. de Pena",
    ],
    ok: 1,
  },
  {
    q: "Date of the Colonia–Montevideo trip in the Ford T?",
    a: ["11/25/1925", "01/01/1926", "07/18/1925", "12/30/1924"],
    ok: 0,
  },
  {
    q: "By 1937, ONDA had already surpassed…",
    a: [
      "100 thousand passengers/year",
      "1 million passengers/year",
      "5 million passengers/year",
      "50 thousand passengers/year",
    ],
    ok: 1,
  },
  {
    q: "Nickname of the GMC 161 introduced in 1947",
    a: ["La Montonera", "La Ola Marina (Sea Wave)", "La Pantera", "El Pez Volador"],
    ok: 1,
  },
  {
    q: "Modern configuration adopted by ONDA with the GMCs",
    a: [
      "Front engine, no luggage bay",
      "Rear engine and lower luggage bay",
      "4x4 traction",
      "Double cabin",
    ],
    ok: 1,
  },
  {
    q: "The GMC PD-4103 models were known as…",
    a: ["Galpón", "Centella del Plata (Silver Spark)", "Camello I", "Ola Marina"],
    ok: 1,
  },
  {
    q: "The PD-4104 “Galpón” stood out for…",
    a: [
      "Air suspension and restroom",
      "Double deck",
      "Automatic gearbox",
      "Sunroof",
    ],
    ok: 0,
  },
  {
    q: "The 1957 agreement with MOP/MTOP included…",
    a: [
      "Toll on Route 1",
      "Passenger pavilion in Colonia and station in Termas del Arapey",
      "Pier in Piriápolis",
      "Base in Rivera",
    ],
    ok: 1,
  },
  {
    q: "Hydrofoils MVD–Colonia–Buenos Aires began in the decade of…",
    a: ["1940s", "1950s", "1960s", "1970s"],
    ok: 2,
  },
  {
    q: "“Camellos” in ONDA referred to…",
    a: ["GMC PD-4107/4905", "Scania K113", "Mercedes O371", "Magirus-Deutz"],
    ok: 0,
  },
  {
    q: "Date of the General San Martín Bridge inauguration",
    a: ["09/16/1976", "08/25/1975", "10/12/1977", "01/01/1976"],
    ok: 0,
  },
  {
    q: "The “Bus de la Carrera” (1980) was a joint service with…",
    a: [
      "CUTCSA and COME",
      "CITA, COT and Expreso General Urquiza",
      "Buquebus and Colonia Express",
      "Raincoop and UCOT",
    ],
    ok: 1,
  },
  {
    q: "Approximate number of employees in 1990",
    a: ["600", "950", "1,451", "2,100"],
    ok: 2,
  },
  {
    q: "Operational buses (approx.) in 1991",
    a: ["48", "80", "132", "200"],
    ok: 0,
  },
  {
    q: "Active buses (approx.) in 1990",
    a: ["48", "80", "132", "200"],
    ok: 2,
  },
  {
    q: "Historic ONDA terminal in Montevideo",
    a: ["Tres Cruces", "Plaza Cagancha", "Pocitos", "Prado"],
    ok: 1,
  },
  {
    q: "Montevideo–Colonia del Sacramento route",
    a: ["Route 3", "Route 5", "Route 1", "Route 8"],
    ok: 2,
  },
  {
    q: "Montevideo–Salto route",
    a: ["Route 1", "Route 3", "Route 5", "Interbalnearia"],
    ok: 1,
  },
  {
    q: "Montevideo–Rivera route",
    a: ["Route 5", "Route 2", "Route 8", "Route 9"],
    ok: 0,
  },
  {
    q: "Classic road from Montevideo to Punta del Este",
    a: ["Interbalnearia", "Route 1", "Route 5", "Route 30"],
    ok: 0,
  },
  {
    q: "Montevideo–Mercedes usually goes through…",
    a: ["Route 2", "Route 5", "Route 9", "Route 8"],
    ok: 0,
  },
  {
    q: "Advantage of a rear engine",
    a: ["More noise", "Less noise and vibration", "Less storage", "Higher fuel use"],
    ok: 1,
  },
  {
    q: "What is the purpose of the lower luggage bay?",
    a: ["Fuel", "Luggage", "Tools", "Brake fluids"],
    ok: 1,
  },
  {
    q: "Panoramic windows provided…",
    a: [
      "Less visibility",
      "More light and views",
      "Less safety",
      "Only aesthetics",
    ],
    ok: 1,
  },
  {
    q: "The air suspension aimed to…",
    a: [
      "Increase fuel use",
      "Make the ride stiffer",
      "Improve comfort",
      "Lower fixed height",
    ],
    ok: 2,
  },
  {
    q: "Hydrofoils connected…",
    a: [
      "MVD–Colonia–Buenos Aires",
      "MVD–Punta–Colonia",
      "Salto–Paysandú–Concordia",
      "Rivera–Livramento–Quaraí",
    ],
    ok: 0,
  },
  {
    q: "Initial legal form of ONDA",
    a: ["Cooperative", "Corporation (S.A.)", "State-owned", "Sole proprietorship"],
    ok: 0,
  },
  {
    q: "Entry of PD-4103 units into ONDA",
    a: ["1945–46", "1947–48", "1951–52", "1955–56"],
    ok: 2,
  },
  {
    q: "Number of factory-built units added in 1948",
    a: ["6", "8", "12", "20"],
    ok: 2,
  },
  {
    q: "The PD-4104 “Galpón” was the first with an onboard restroom",
    a: ["True", "False"],
    ok: 0,
  },
  {
    q: "The “Bus de la Carrera” mainly benefited from…",
    a: ["General San Martín Bridge", "Hydrofoils", "Ferries", "Railway"],
    ok: 0,
  },
  {
    q: "Besides passengers, ONDA also transported…",
    a: ["Only pets", "Mail and parcels", "Fuel", "Hazardous materials"],
    ok: 1,
  },
  {
    q: "Year of arrival of the GMC 161 “Ola Marina”",
    a: ["1945", "1947", "1950", "1953"],
    ok: 1,
  },
  {
    q: "The modernization of 1947–1952 included rear engine and luggage bay",
    a: ["True", "False"],
    ok: 0,
  },
  {
    q: "Decade of PD-4104 incorporation",
    a: ["1940s", "1950s", "1960s", "1970s"],
    ok: 1,
  },
  {
    q: "The General San Martín Bridge connects…",
    a: [
      "Paysandú–Colón",
      "Fray Bentos–Puerto Unzué",
      "Salto–Concordia",
      "Bella Unión–Monte Caseros",
    ],
    ok: 1,
  },
  {
    q: "Compared to river routes, the Bus de la Carrera offered…",
    a: [
      "Less frequency",
      "Longer trips",
      "Shorter times and regular schedules",
      "Cargo only",
    ],
    ok: 2,
  },
  {
    q: "Montevideo–Porto Alegre service (approx.)",
    a: ["1960–65", "1972–75", "1989–91", "1995–98"],
    ok: 2,
  },
  {
    q: "Which was NOT a nickname for ONDA units?",
    a: ["Ola Marina", "Centella del Plata", "Galpón", "Pulpito"],
    ok: 3,
  },
  {
    q: "Montevideo–Treinta y Tres route",
    a: ["Route 2", "Route 5", "Route 8", "Route 9"],
    ok: 2,
  },
  {
    q: "Montevideo–Maldonado route",
    a: ["Interbalnearia", "Route 2", "Route 5", "Route 26"],
    ok: 0,
  },
  {
    q: "Montevideo–Fray Bentos route",
    a: ["Route 2", "Route 5", "Route 8", "Route 9"],
    ok: 0,
  },
  {
    q: "Innovation that reduced cabin noise",
    a: [
      "Rear engine",
      "Sliding windows",
      "Acoustic paint",
      "Alloy wheels",
    ],
    ok: 0,
  },
  {
    q: "Comfort feature introduced in the 1950s",
    a: ["Onboard restroom", "Wi-Fi", "USB", "Satellite TV"],
    ok: 0,
  },
  {
    q: "Traditional international ONDA route",
    a: ["Buenos Aires", "Asunción", "Santiago", "La Paz"],
    ok: 0,
  },
  {
    q: "Vehicle used in the first Colonia–Montevideo trip",
    a: ["Ford T", "GMC 161", "PD-4103", "PD-4104"],
    ok: 0,
  },
  {
    q: "Kilometers traveled (c.1937) were around…",
    a: ["1 million", "6 million", "10 million", "15 million"],
    ok: 1,
  },
  {
    q: "Main benefit of the lower luggage bay",
    a: [
      "More seats",
      "Space for luggage",
      "Less weight",
      "Better aerodynamics",
    ],
    ok: 1,
  },
  {
    q: "“Camello” is associated with…",
    a: ["PD-4107", "PD-4103", "161", "PD-4104"],
    ok: 0,
  },
];


  // ELEMENTOS UI
  const ui = {
    frame: $("#quizRoot"),
    qtext: $("#qtext"),
    opts: $("#opts"),
    timer: $("#timer"),
    prog: $("#progress"),
    start: $("#btnStart"),
    next: $("#btnNext"),
    prev: $("#btnPrev"),
    ff: $("#ll5050"),
    skip: $("#llSkip"),
    lifeln: $("#lifelines"),
    statStreak: $("#statStreak"),
    statCorrect: $("#statCorrect"),
    statAvg: $("#statAvg"),
  };

  // Dificultad
  const getDiff = () => {
    const r = document.querySelector('input[name="diff"]:checked');
    return r ? r.value : "facil";
  };

  // ESTADO 
  const game = {
    deck: [], 
    idx: 0, 
    answers: [], 
    used5050: false, 
    usedSkip: false, 
    allowLifelines: true,
    timePerQ: 25,
    t: null,
    remaining: 0,
    startTS: 0,
    times: [], 
    correct: 0,
    streak: 0,
    bestStreak: 0,
  };

  // CONFIG SEGÚN DIFICULTAD 
  function applyDifficulty() {
    const d = getDiff();
    if (d === "facil") {
      game.allowLifelines = true;
      game.timePerQ = 25;
    }
    if (d === "medio") {
      game.allowLifelines = true;
      game.timePerQ = 18;
    }
    if (d === "dificil") {
      game.allowLifelines = false;
      game.timePerQ = 12;
    }
    ui.lifeln.style.opacity = game.allowLifelines ? "1" : ".35";
    ui.ff.disabled = !game.allowLifelines;
    ui.skip.disabled = !game.allowLifelines;
  }

  //INICIO
  function startGame() {
    applyDifficulty();
    game.deck = shuffle([...QUESTIONS]).slice(0, 10);
    game.idx = 0;
    game.answers = Array(10).fill(null);
    game.times = Array(10).fill(0);
    game.used5050 = false;
    game.usedSkip = false;
    game.correct = 0;
    game.streak = 0;
    game.bestStreak = 0;

    ui.prev.disabled = true;
    ui.next.disabled = true;

    showQuestion(true);
  }

  //MOSTRAR PREGUNTA
  function showQuestion(resetTimer) {
    clearTimer();
    const q = game.deck[game.idx];
    ui.prog.textContent = game.idx + 1 + "/10";
    ui.qtext.textContent = q.q;
    ui.opts.innerHTML = "";

    q.a.forEach((txt, i) => {
      const b = document.createElement("button");
      b.textContent = txt;
      b.dataset.i = i;
      b.onclick = onAnswer;
      ui.opts.appendChild(b);
    });

    
    if (game.answers[game.idx] !== null) {
      lockOptions();
      ui.next.disabled = game.idx === 9;
      ui.prev.disabled = game.idx === 0;
      ui.timer.textContent = "—";
      return;
    }

    // Timer
    if (resetTimer) {
      game.remaining = game.timePerQ;
      ui.timer.textContent = String(game.remaining).padStart(2, "0");
      game.startTS = Date.now();
      game.t = setInterval(tick, 1000);
    }

    ui.prev.disabled = game.idx === 0;
    ui.next.disabled = true;
  }

  function tick() {
    game.remaining--;
    ui.timer.textContent = String(Math.max(0, game.remaining)).padStart(2, "0");
    if (game.remaining <= 0) {
      registerAnswer(-1, false, true);
      setTimeout(next, 400);
    }
  }

  function clearTimer() {
    if (game.t) {
      clearInterval(game.t);
      game.t = null;
    }
  }

  //RESPUESTA
  function onAnswer(e) {
    if (game.answers[game.idx] !== null) return;
    const choice = +e.currentTarget.dataset.i;
    const isOK = choice === game.deck[game.idx].ok;
    registerAnswer(choice, isOK, false);
  }

  function registerAnswer(choice, isOK, isTimeout) {
    clearTimer();
    
    if (game.startTS) {
      const elapsed = Math.max(
        0,
        Math.round((Date.now() - game.startTS) / 1000)
      );
      game.times[game.idx] = Math.min(elapsed, game.timePerQ);
    }

    game.answers[game.idx] = choice; // -1 si timeout
    if (isOK) {
      game.correct++;
      game.streak++;
      game.bestStreak = Math.max(game.bestStreak, game.streak);
    } else {
      game.streak = 0;
    }

    markButtons(choice, isOK);
    ui.next.disabled = game.idx === 9;

    // actualizar estadísticas
    updateStats();
  }

  function markButtons(choice, isOK) {
    const ok = game.deck[game.idx].ok;
    [...ui.opts.children].forEach((b) => {
      const i = +b.dataset.i;
      b.disabled = true;
      if (i === ok) b.classList.add("correct");
    });
    if (choice >= 0) {
      const btn = [...ui.opts.children].find((b) => +b.dataset.i === choice);
      if (btn && !isOK) btn.classList.add("wrong");
    }
  }

  function lockOptions() {
    const ok = game.deck[game.idx].ok;
    [...ui.opts.children].forEach((b) => {
      b.disabled = true;
      const i = +b.dataset.i;
      if (i === ok) b.classList.add("correct");
    });
    const choice = game.answers[game.idx];
    if (choice !== null && choice >= 0 && choice !== ok) {
      const btn = [...ui.opts.children].find((b) => +b.dataset.i === choice);
      if (btn) btn.classList.add("wrong");
    }
  }

  //NAVEGACIÓN
  function next() {
    if (game.idx >= 9) {
      endGame();
      return;
    }
    game.idx++;
    showQuestion(true);
  }
  function prev() {
    if (game.idx <= 0) return;
    game.idx--;
    showQuestion(false);
  }

  function endGame() {
    clearTimer();
    ui.qtext.textContent = `¡Fin! Correctas: ${game.correct}/10 — Mejor racha: x${game.bestStreak}`;
    ui.opts.innerHTML = "";
    ui.timer.textContent = "—";
    ui.next.disabled = true;
    ui.prev.disabled = game.idx === 0;
    updateStats(); // promedio final
  }

  // ESTADÍSTICAS
  function updateStats() {
    ui.statStreak.textContent = "x" + game.bestStreak;
    ui.statCorrect.textContent = `${game.correct}/10`;
    const answered = game.answers.filter((a) => a !== null).length;
    const totalTime = game.times.reduce((s, n) => s + n, 0);
    ui.statAvg.textContent = answered
      ? (totalTime / answered).toFixed(1) + "s"
      : "—";
  }

  // COMODINES
  function use5050() {
    if (!game.allowLifelines || game.used5050) return;
    if (game.answers[game.idx] !== null) return; // ya respondida
    const ok = game.deck[game.idx].ok;
    const wrong = [...ui.opts.children].filter((b) => +b.dataset.i !== ok);
    shuffle(wrong)
      .slice(0, 2)
      .forEach((b) => {
        b.disabled = true;
        b.style.opacity = 0.5;
      });
    game.used5050 = true;
  }
  function useSkip() {
    if (!game.allowLifelines || game.usedSkip) return;
    if (game.answers[game.idx] !== null) return;
    
    registerAnswer(-1, false, true);
    game.usedSkip = true;
    setTimeout(next, 250);
  }

  // EVENTOS
  ui.start.addEventListener("click", startGame);
  ui.next.addEventListener("click", next);
  ui.prev.addEventListener("click", prev);
  ui.ff.addEventListener("click", use5050);
  ui.skip.addEventListener("click", useSkip);
  $$('.chip input[name="diff"]').forEach((r) =>
    r.addEventListener("change", applyDifficulty)
  );

  // init
  applyDifficulty();
})();
