
class Activity {
    constructor(category, description, minutes, seconds, completed=false, color){
      this.category = category;
      this.description = description;
      this.minutes = minutes;
      this.seconds = seconds;
      this.completed = completed;
      this.color = color;
      this.id = Date.now();
    }

    startTimer() {
        var secs = this.seconds;
        var mins = this.minutes;
        roundBtn.disabled = true;
        function tick() {
          if (mins > 0 && secs === 0) {
            mins--;
            secs = 60;
          }
          else if (mins === 0 && secs === 0) {
              logActivityBtn.disabled = false;
              return displayCompleteMessage();
          }
          secs--;
          userTimeInput.innerHTML = (mins < 10 ? "0" : "") + String(mins) + ":" + (secs < 10 ? "0" : "") + String(secs);
          setTimeout(tick, 1000);
        }
        tick();
    }

    markComplete() {
      roundBtn.disabled = false;
      var activityCardBlock =
       `
         <li id=${this.id}><div class="card">
           <label id="card-category">${this.category}</label>
           <label id="card-time">${this.minutes} MIN ${(this.seconds === 0 ? "" : (this.seconds + " SECONDS"))}</label>
           <label id="card-description">${this.description}</label>
         </div>
         <div class="color-indicator" style="background-color: ${[this.color]};"></div>
         </li>
        `
      ul.insertAdjacentHTML("afterbegin", activityCardBlock);
      this.completed = true;
}

    saveToStorage() {
      var stringifiedPastActivities = JSON.stringify(newActivity);
      localStorage.setItem(`${newActivity.id}`, stringifiedPastActivities);
    }
  };
