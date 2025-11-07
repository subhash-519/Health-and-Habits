export function initDashboard() {
  let theme = localStorage.getItem("theme") || "light";

  const habits = JSON.parse(localStorage.getItem('habits')) || [];

  function getLabelColor(theme) {
    return theme === "dark" ? "#fff" : "#000";
  }

  let options = {
    chart: {
      type: 'radialBar',
      height: 300,
      width: 200
    },
    series: [0],
    colors: ['#00e676'],
    plotOptions: {
      radialBar: {
        hollow: { size: '70%' },
        track: { background: '#2a3445' },
        dataLabels: {
          name: { show: false },
          value: {
            show: true,
            fontSize: '22px',
            fontWeight: 'bold',
            color: getLabelColor(theme),
            formatter: (val) => val + "%"
          }
        }
      }
    }
  };

  // ================= HABITS ===================
  function renderHabit() {
    const checkboxe = document.querySelector("#checkboxes");
    if (!checkboxe || habits.length === 0) return;

    habits.forEach((ele, index) => {
      let li = document.createElement("li");
      li.innerHTML = `
        <span><input id="checkbox-${index}" type="checkbox"></span> 
        <span>${ele.habit}</span>`;
      checkboxe.prepend(li);
    });
  }
  renderHabit();

  let chart = new ApexCharts(document.querySelector("#progress"), options);
  chart.render();

  function updateProgress() {
    const checkboxes = document.querySelectorAll("#checkboxes input[type=checkbox]");
    const total = checkboxes.length;
    const checked = document.querySelectorAll("#checkboxes input:checked").length;
    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
    chart.updateSeries([percent]);
  }

  document.querySelectorAll("#checkboxes input[type=checkbox]").forEach(cb =>
    cb.addEventListener("change", updateProgress)
  );

  // ================= THEME TOGGLE ===================
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", theme);

      chart.updateOptions({
        plotOptions: {
          radialBar: {
            dataLabels: {
              value: { color: getLabelColor(theme) }
            }
          }
        }
      });
    });
  }

  // ================= WATER ===================
  function showWaterDetail() {
    const currentGlass = document.querySelector("#current-glass");
    const totalGoal = document.querySelector("#total-goal");
    if (!currentGlass || !totalGoal) return;

    const data = JSON.parse(localStorage.getItem("water")) || [];
    const lastGoal = data.length > 0 ? data[data.length - 1] : null;
    const date = new Date();

    if (lastGoal &&
      date.getDate() === lastGoal.date &&
      date.getMonth() + 1 === lastGoal.month &&
      date.getFullYear() === lastGoal.year
    ) {
      currentGlass.textContent = lastGoal.totalGlass;
      totalGoal.textContent = lastGoal.goalwater;
    } else {
      currentGlass.textContent = "0";
      totalGoal.textContent = "0";
    }
  }
  showWaterDetail();

  // ================= BMI ===================
  function showBmi() {
    const bmiId = document.querySelector("#bmi-id");
    const bmiCategory = document.querySelector("#bmi-category");
    if (!bmiId || !bmiCategory) return;

    const bmiData = JSON.parse(localStorage.getItem("bmi"));
    if (bmiData) {
      bmiId.textContent = bmiData.bmi;
      bmiCategory.textContent = bmiData.category;
    } else {
      bmiId.textContent = "0";
      bmiCategory.textContent = "...";
    }
  }
  showBmi();

  // ================= SLEEP ===================
  function showSleep() {
    const sleepshow = document.querySelector("#sleep-id");
    if (!sleepshow) return;

    const sleep = JSON.parse(localStorage.getItem("sleep")) || [];
    const lastGoal = sleep.length > 0 ? sleep[sleep.length - 1] : null;
    const date = new Date();

    if (lastGoal &&
      lastGoal.date === date.getDate() &&
      lastGoal.month === date.getMonth() + 1 &&
      lastGoal.year === date.getFullYear()
    ) {
      sleepshow.textContent = `${lastGoal.sleepHour} : ${lastGoal.sleepMin} hr`;
    } else {
      sleepshow.textContent = `...`;
    }
  }
  showSleep();

  // ================= CALORIES ===================
  function showCalories() {
    const calories = document.querySelector("#calories");
    if (!calories) return;

    const nutrition = JSON.parse(localStorage.getItem("nutrition")) || [];
    const date = new Date();
    let totalCal = 0;

    nutrition.forEach(item => {
      if (item.date === date.getDate() &&
        item.month === date.getMonth() + 1 &&
        item.year === date.getFullYear()
      ) {
        totalCal += parseInt(item.cal);
      }
    });

    calories.textContent = totalCal > 0 ? totalCal : "...";
  }
  showCalories();

  // ================= TIP OF THE DAY ===================
  function tipOfTheDay() {
    const tipCard = document.getElementById("tip-card");
    if (!tipCard) return;

    tipCard.innerHTML = ""; // clear old tips

    const waterGoal = JSON.parse(localStorage.getItem("water")) || [];
    if (waterGoal.length > 0) {
      const todayWater = waterGoal[waterGoal.length - 1];
      const totalWater = parseInt(todayWater.goalwater);
      const totalWaterIntake = todayWater.totalGlass;

      if (totalWaterIntake >= totalWater) {
        tipCard.innerHTML += `
          <div class="tip-log"><span>💧</span>
          <p>Your Water intake is completed</p></div>`;
      } else {
        tipCard.innerHTML += `
          <div class="tip-log"><span>💧</span>
          <p>Your Water intake is not completed</p></div>`;
      }
    }

    const sleep = JSON.parse(localStorage.getItem("sleep")) || [];
    if (sleep.length > 0) {
      const lastSleep = sleep[sleep.length - 1];
      const sleepHour = parseInt(lastSleep.sleepHour);
      if (sleepHour >= 7) {
        tipCard.innerHTML += `
          <div class="tip-log"><span>😴</span>
          <p>Good Job! Your sleep hour is completed</p></div>`;
      } else {
        tipCard.innerHTML += `
          <div class="tip-log"><span>😴</span>
          <p>Oops! Your sleep hour is NOT Completed</p></div>`;
      }
    }
  }
  tipOfTheDay();
}
