import { formatTime } from "timediff";

document.addEventListener("turbo:load", function() {
  console.log("Turbolinks load event triggered");
  const timeElements = document.querySelectorAll(".time-show");
  console.log("timeElements:", timeElements);
  timeElements.forEach(function(timeElement) {
    const createdAt = timeElement.getAttribute("data-created-at");
    console.log("createdAt:", createdAt);
    const formattedTime = formatTime(createdAt);
    console.log("formattedTime:", formattedTime);

    const formattedTimeElement = timeElement.querySelector(".formatted-time");
    if (formattedTimeElement) {
      formattedTimeElement.textContent = formattedTime;
    }
  });
});