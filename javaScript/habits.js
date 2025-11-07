export function initHabitTracker() {
  

  let addBtn = document.querySelector(".btn");
  let habitList = document.querySelector(".habit-list");


  window.onload = renderHabits();


  const save = (habit , category) => {
    let habitList = JSON.parse(localStorage.getItem("habits"))||[] ;
    habitList.push({ habit, category, completed: false });
    console.log(habitList)
    localStorage.setItem("habits", JSON.stringify(habitList));
  }


  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let habit = document.getElementById("habit-input").value.trim();
    let category = document.getElementById("frequency").value;
    if (!habit || !category) {
      alert("Please enter a habit and select a category.");
      return;
    }
    save(habit, category);
    document.getElementById("habit-input").value = "";
    document.getElementById("frequency").value = "Daily";
    renderHabits();
  });

  function renderHabits  () {
    habitList.innerHTML = "";
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.forEach((item, index) => {
      let li = document.createElement("li");
      li.className = "habit-item";
      li.innerHTML = `
        <div class="habit-info">
          <input type="checkbox" class="complete-btn" ${item.completed ? "checked" : ""}/>
          <span>${item.habit} <em>${item.category}</em></span>
        </div>
        <button class="delete-btn">Delete</button>
      `;
      let completeBtn = li.querySelector(".complete-btn");
      let deleteBtn = li.querySelector(".delete-btn");


      deleteBtn.addEventListener("click", () => {
        habits.splice(index, 1);
        localStorage.setItem("habits", JSON.stringify(habits));
        renderHabits();
      });

      habitList.appendChild(li);
    });
  }
 

}
