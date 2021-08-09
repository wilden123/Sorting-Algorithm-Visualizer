var container = document.getElementById("array");
var lengthOfArray = document.getElementById("num-input");
var submit = document.getElementById("submit-btn");
var speed = document.getElementById("speed");
var algoSelected = document.getElementById("algorithms");

function allFunc() {
  generatearray();
  swap();
  BubbleSort();
  console.log(lengthOfArray.value);
  let t1 = performance.now();
  console.log(t1);
  document.getElementById(
    "time"
  ).innerText = `Time it took to compute this algorithm: ${t1.toFixed(
    2
  )} Milliseconds`;
}

function generatearray() {
  //var lengthOfArray = document.getElementById("num-input");
  for (var i = 0; i < lengthOfArray.value; i++) {
    // Return a value from 1 to 100 (both inclusive)
    var value = Math.ceil(Math.random() * 100);

    // Creating element div
    var array_ele = document.createElement("div");

    // Adding class 'block' to div
    array_ele.classList.add("block");

    // Adding style to div
    array_ele.style.height = `${value * 3}px`;
    array_ele.style.transform = `translate(${i * 30}px)`;

    // Creating label element for displaying
    // size of particular block
    var array_ele_label = document.createElement("label");
    array_ele_label.classList.add("block_id");
    array_ele_label.innerText = value;

    // Appending created elements to index.html
    array_ele.appendChild(array_ele_label);
    container.appendChild(array_ele);

    document.getElementById("speed-label").innerText = speed.value;
  }
}

// Promise to swap two blocks
function swap(el1, el2) {
  var speed = document.getElementById("speed");
  return new Promise((resolve) => {
    // For exchanging styles of two blocks
    var temp = el1.style.transform;
    el1.style.transform = el2.style.transform;
    el2.style.transform = temp;

    window.requestAnimationFrame(function () {
      // For waiting for .25 sec
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, speed.value * 5);
    });
  });
}

// Asynchronous BubbleSort function
async function BubbleSort(delay = 100) {
  var blocks = document.querySelectorAll(".block");

  // BubbleSort Algorithm
  for (var i = 0; i < blocks.length; i += 1) {
    for (var j = 0; j < blocks.length - i - 1; j += 1) {
      // To change background-color of the
      // blocks to be compared
      blocks[j].style.backgroundColor = "#FF4949";
      blocks[j + 1].style.backgroundColor = "#FF4949";

      // To wait for .1 sec
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      console.log("run");
      var value1 = Number(blocks[j].childNodes[0].innerHTML);
      var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

      // To compare value of two blocks
      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
      }

      // Changing the color to the previous one
      blocks[j].style.backgroundColor = "#00fa9a";
      blocks[j + 1].style.backgroundColor = "#00fa9a";
    }

    //changing the color of greatest element
    //found in the above traversal
    blocks[blocks.length - i - 1].style.backgroundColor = "#00BFFF	";
  }
}
