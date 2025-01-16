import { formatTime } from "timediff";

document.addEventListener("turbo:load", function() {
  const timeElements = document.querySelectorAll(".time-show");
  timeElements.forEach(function(timeElement) {
    const createdAt = timeElement.getAttribute("data-created-at");
    const formattedTime = formatTime(createdAt);

    const formattedTimeElement = timeElement.querySelector(".formatted-time");
    if (formattedTimeElement) {
      formattedTimeElement.textContent = formattedTime;
    }
  });
});