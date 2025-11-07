// export function initProgress() {
//   let options = {
//     chart: {
//       type: "line",
//       height: 500
//     },
//     series: [
//       { name: "Sales", data: [1000, 1170, 660, 1030] },
//       { name: "Expenses", data: [400, 460, 1120, 540] },
//       { name: "masti", data: [600, 400, 820, 1200] }
//     ],
//     xaxis: { categories: ["2004", "2005", "2006", "2007"]
//     },
//     title: { text: "Company Performance", align: "center" },
//     legend: { position: "bottom" },
//     stroke: { curve: "smooth" }
//   };

//   let chart = new ApexCharts(document.querySelector("#chart"), options);
//   chart.render();
// }

// export function initProgress() {
//   const theme = localStorage.getItem("theme");

//   let options = {
//     chart: {
//       type: "line",
//       height: 500,
//       // width:900,
//       background: "transparent",
//     },
//     theme: {
//       mode: theme == "dark" ? "dark" : "light",
//     },
//     series: [
//       { name: "water", data: [2, 3, 8, 1.5, 4, 6, 5] },
//       { name: "sleep", data: [7, 4, 9, 7, 6, 5, 10] },
//       { name: "Excercise", data: [1, 3, 5, 2, 3, 1, 4] },

//     ],

//     xaxis: {
//       categories: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
//       labels: {
//         style: {
//           colors: theme === "dark" ? "#f3f4f6" : "#1f2937", fontSize: "20px",
//         }
//       },
//     },
//     title: {
//       text: "Progress Data",
//       align: "center",

//       style: { color: theme === "dark" ? "#f3f4f6" : "#1f2937", fontSize: "20px", },
//     },
//     legend: {
//       position: "bottom",
//       fontSize: "30px",
//       labels: { colors: theme === "dark" ? "#f3f4f6" : "#1f2937" },
//     },
//     stroke: { curve: "smooth" },
//   };

//   let chart = new ApexCharts(document.querySelector("#chart"), options);
//   chart.render();
// }


export function initProgress() {
  const theme = localStorage.getItem("theme");

  let options = {
    chart: {
      type: "line",
      height: 500,
      background: "transparent",
    },
    theme: {
      mode: theme === "dark" ? "dark" : "light",
    },
    series: [
      { name: "Water", data: [2, 3, 8, 1.5, 4, 6, 5] },
      { name: "Sleep", data: [7, 4, 9, 7, 6, 5, 10] },
      { name: "Exercise", data: [1, 3, 5, 2, 3, 1, 4] },
    ],
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      labels: {
        style: {
          colors: theme === "dark" ? "#f3f4f6" : "#1f2937",
          fontSize: "20px",
        }
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === "dark" ? "#f3f4f6" : "#1f2937",
          fontSize: "18px", // Increased font size for Y-axis
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold"
        }
      }
    },
    title: {
      text: "Progress Data",
      align: "center",
      style: {
        color: theme === "dark" ? "#f3f4f6" : "#1f2937",
        fontSize: "20px",
      },
    },
    legend: {
      position: "bottom",
      fontSize: "30px",
      labels: {
        colors: theme === "dark" ? "#f3f4f6" : "#1f2937",
      },
    },
    stroke: {
      curve: "smooth",
    },
  };

  let chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}
