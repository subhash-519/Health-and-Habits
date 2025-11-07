export function initHealthTabs() {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");


  //===================== B U T T O N S ===============================================
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  //====================== N U T R I T I O N ===========================================
  function nutritionTabs() {
    let addNutritionBtn = document.querySelector("#add-nutrition");
    let nutritionList = document.querySelector("#nutrition-list");

    function renderNutrition() {
      nutritionList.innerHTML = "";
      const nutrition = JSON.parse(localStorage.getItem("nutrition")) || [];

      nutrition.forEach((element, index) => {
        let li = document.createElement("li");
        li.className = "habit-item";
        li.innerHTML = `
        <div class="habit-info">
          <span>${element.date}-${element.month}-${element.year}</span>
          <span>${element.food}</span>
          <span>${element.cal} cal</span>
        </div>
        <button class="delete-btn" data-index="${index}">Remove</button>
      `;

        nutritionList.prepend(li);
      });

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const idx = e.target.getAttribute("data-index");

          let nutritionData =
            JSON.parse(localStorage.getItem("nutrition")) || [];
          nutritionData.splice(idx, 1);

          localStorage.setItem("nutrition", JSON.stringify(nutritionData));
          renderNutrition();
        });
      });
    }

    addNutritionBtn.addEventListener("click", () => {
      let food = document.querySelector("#food-item").value.trim();
      let calories = document.querySelector("#calories").value;

      if (!food || !calories) {
        alert("please!, enter all fields");
        return;
      }

      console.log(food, calories);

      const nutrition = JSON.parse(localStorage.getItem("nutrition")) || [];
      const date = new Date();
      nutrition.push({
        food: food,
        cal: calories,
        day: date.getDay(),
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      localStorage.setItem("nutrition", JSON.stringify(nutrition));
      renderNutrition();
      alert("Nutrition added successfully.");
      document.querySelector("#food-item").value = "";
    });
    renderNutrition();
  }
  nutritionTabs();


  //======================= E X E R C I S E =============================================
  function excerciseTabs() {
    let addExcerciseBtn = document.querySelector("#excercise-button");
    let excerciseList = document.querySelector("#excercise-list");

    function renderExcercise() {
      excerciseList.innerHTML = "";
      const excercise = JSON.parse(localStorage.getItem("excercise")) || [];

      excercise.forEach((element, index) => {
        let li = document.createElement("li");
        li.className = "habit-item";
        li.innerHTML = `
        <div class="habit-info">
          <span>${element.date}-${element.month}-${element.year}</span>
          <span>${element.excerciseText}</span>
          <span>${element.time} min</span>
        </div>
        <button class="delete-btn" data-index="${index}">Remove</button>
      `;

        excerciseList.prepend(li);
      });

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const idx = e.target.getAttribute("data-index");

          let excerciseData =
            JSON.parse(localStorage.getItem("nutrition")) || [];
          excerciseData.splice(idx, 1);

          localStorage.setItem("excercise", JSON.stringify(excerciseData));
          renderExcercise();
        });
      });
    }

    addExcerciseBtn.addEventListener("click", () => {
      let excerciseText = document.querySelector("#exercise-text").value.trim();
      let excerciseTime = document.querySelector("#excercise-time").value;

      if (!excerciseText || !excerciseTime) {
        alert("please!, enter all fields");
        return;
      }

      console.log(excerciseText, excerciseTime);

      const excercise = JSON.parse(localStorage.getItem("excercise")) || [];
      const date = new Date();
      excercise.push({
        excerciseText: excerciseText,
        time: excerciseTime < 5 ? 5 : excerciseTime,
        day: date.getDay(),
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      localStorage.setItem("excercise", JSON.stringify(excercise));
      renderExcercise();
      alert("Nutrition added successfully.");
      document.querySelector("#food-item").value = "";
    });
    renderExcercise();
  }
  excerciseTabs();


  //======================= S L E E P ==== S E C T I O N =================================
  function sleepTab() {
    let addSleepBtn = document.querySelector("#sleep-btn");
    let sleepList = document.querySelector("#sleep-list");

    function renderSleep() {
      sleepList.innerHTML = "";
      const sleep = JSON.parse(localStorage.getItem("sleep")) || [];

      sleep.forEach((element, index) => {
        let li = document.createElement("li");
        li.className = "habit-item";
        li.innerHTML = `
        <div class="habit-info">
          <span>${element.date}-${element.month}-${element.year}</span>
          <span>${element.sleepHour}hr:${element.sleepMin}min</span>
          
        </div>
        <button class="delete-btn" data-index="${index}">Remove</button>
      `;

        sleepList.prepend(li);
      });

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const idx = e.target.getAttribute("data-index");

          let sleepData = JSON.parse(localStorage.getItem("sleep")) || [];
          sleepData.splice(idx, 1);

          localStorage.setItem("sleep", JSON.stringify(sleepData));
          renderSleep();
        });
      });
    }

    addSleepBtn.addEventListener("click", () => {
      let sleepHour = document.querySelector("#sleep-hours").value;
      let sleepMin = document.querySelector("#sleep-min").value;

      if (!sleepHour || !sleepMin) {
        alert("Both feilds are required");
        return;
      }

      if (sleepHour <= 0 && sleepMin <= 0) {
        alert("Enter valid hours and Minute");
        return;
      }

      if (
        !(sleepHour >= 0 && sleepHour < 24 && sleepMin >= 0 && sleepHour < 60)
      ) {
        alert("Enter valid hours and Minute");
        return;
      }

      const sleep = JSON.parse(localStorage.getItem("sleep")) || [];
      const lastGoal = sleep.length > 0 ? sleep[sleep.length - 1] : null;

      const date = new Date();
      if (lastGoal &&
        lastGoal.date === date.getDate() - 1 &&
        lastGoal.month === date.getMonth() + 1 &&
        lastGoal.year === date.getFullYear()
      ) {
        lastGoal.sleepHour = sleepHour;
        lastGoal.sleepMin = sleepMin;
        sleep[sleep.length - 1] = lastGoal;
        localStorage.setItem("sleep", JSON.stringify(sleep));
        renderSleep();
        return;
      }


      sleep.push({
        sleepHour,
        sleepMin,
        day: date.getDay()-1,
        date: date.getDate()-1,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      localStorage.setItem("sleep", JSON.stringify(sleep));
      renderSleep();
      alert("SleepData added successfully.");
      document.querySelector("#sleep-hours").value = "";
      document.querySelector("#sleep-min").value = "";
    });
    renderSleep();
  }
  sleepTab();


  //======================== B M I =======================================================
  function calculateBmi() {
    const calculateBtn = document.querySelector("#calculate");
    const showBmi = document.querySelector("#show-bmi");

    calculateBtn.addEventListener("click", () => {
      const weight = parseFloat(document.querySelector("#weight").value);
      const height = parseFloat(document.querySelector("#height").value);

      if (!height || !weight) {
        alert("Please enter all fields");
        return;
      }
      if (height <= 0 || weight <= 0) {
        alert("Enter valid height and weight");
        return;
      }

      const heightInMeters = height / 100;

      const bmi = weight / (heightInMeters * heightInMeters);
      console.log("BMI:", bmi);

      let category;
      if (bmi < 18.5) {
        category = "Underweight";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal weight";
      } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
      } else {
        category = "Obesity";
      }

      const bmiData = {
        bmi: bmi.toFixed(2),
        category,
      };

      localStorage.setItem("bmi", JSON.stringify(bmiData));
      renderBmi(bmiData);
    });

    function renderBmi(bmiData) {
      showBmi.innerHTML = "";
      let li = document.createElement("li");
      li.className = "habit-item";
      li.innerHTML = `
      <div class="habit-info">
        <span>The BMI is: ${bmiData.bmi}</span><br/>
        <span>You are: ${bmiData.category}</span>
      </div>`;
      showBmi.appendChild(li);
    }

    const saved = JSON.parse(localStorage.getItem("bmi"));
    if (saved) {
      renderBmi(saved);
    }
  }
  calculateBmi();


  // ================= W A T E R ===== S E C T I O N ======================================
  function waterTabs() {
    const incBtn = document.querySelector("#inc-btn");
    const decBtn = document.querySelector("#decr-btn");
    const currentGlass = document.querySelector("#data");
    const todayGoalBtn = document.querySelector("#addon-water");   // goal button
    const showWater = document.querySelector("#show-water");   // append space

    let water = JSON.parse(localStorage.getItem("water")) || [];
    let lastGoal = water.length > 0 ? water[water.length - 1] : undefined;

    function save() {
      localStorage.setItem("water", JSON.stringify(water));
    }

    function increment() {
      lastGoal.totalGlass = (lastGoal.totalGlass || 0) + 1;
      currentGlass.textContent = lastGoal.totalGlass;
      save();
    }

    function decrement() {
      if (lastGoal.totalGlass > 0) {
        lastGoal.totalGlass -= 1;
        currentGlass.textContent = lastGoal.totalGlass;
        save();
      }
    }

    function updateGoal() {
      lastGoal.goalwater = document.querySelector("#water-goal").value;
      save();
    }

    function createNewGoal() {
      const goalwater = document.querySelector("#water-goal").value;
      const totalGlass = currentGlass.value; ///...................

      const cdate = new Date();
      const day = cdate.getDay();
      const date = cdate.getDate();
      const month = cdate.getMonth() + 1;
      const year = cdate.getFullYear();

      const todayGoal = { goalwater, totalGlass, day, date, month, year };
      water.push(todayGoal);
      lastGoal = todayGoal;
      save();
      currentGlass.textContent = totalGlass;
    }

    todayGoalBtn.addEventListener("click", () => {
      const date = new Date();

      if (!lastGoal) {
        createNewGoal();
        return;
      }

      if (date.getDate() === lastGoal.date &&
        date.getMonth() + 1 === lastGoal.month &&
        date.getFullYear() === lastGoal.year) {

        updateGoal();
      } else {
        createNewGoal();
      }
    });

    incBtn.addEventListener("click", () => {
      const date = new Date();
      if (
        lastGoal &&
        date.getDate() === lastGoal.date &&
        date.getMonth() + 1 === lastGoal.month &&
        date.getFullYear() === lastGoal.year
      ) {
        increment();
      } else {
        alert("Please! First set today's goal");
      }
    });

    decBtn.addEventListener("click", () => {
      const date = new Date();
      if (
        lastGoal &&
        date.getDate() === lastGoal.date &&
        date.getMonth() + 1 === lastGoal.month &&
        date.getFullYear() === lastGoal.year
      ) {
        decrement();
      } else {
        alert("Please! First set today's goal");
      }
    });

    if (lastGoal) {
      currentGlass.textContent = lastGoal.totalGlass || 0;
    } else {
      currentGlass.textContent = 0;
    }
  }
  waterTabs();

}
