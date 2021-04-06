class CountdownTimer{
  constructor(obj) {
    this.selector = obj.selector;
    this.targetDate = obj.targetDate;

    this.timerRef = document.querySelector(this.selector);
    this.daysRef = this.timerRef.querySelector('span[data-value="days"]');
    this.hoursRef = this.timerRef.querySelector('span[data-value="hours"]');
    this.minsRef = this.timerRef.querySelector('span[data-value="mins"]');
    this.secsRef = this.timerRef.querySelector('span[data-value="secs"]');
  }

  _intervalId = null;
  
  start() {
    const targetTime = this.targetDate.getTime();
    
    this._updateClock(0);

    this._intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetTime - currentTime;

      if (deltaTime <= 0) {
        this.stop();
      }

      this._updateClock(deltaTime);

    }, 1000);
  }

  stop() {
    clearInterval(this._intervalId);
    this._intervalId = null;
    this._updateClock(0);

  }

  _updateClock(time) {
    this.daysRef.textContent = `${this._pad(Math.floor(time / (1000 * 60 * 60 * 24)))}`
    this.hoursRef.textContent = `${this._pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))}`
    this.minsRef.textContent = `${this._pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)))}`
    this.secsRef.textContent = `${this._pad(Math.floor((time % (1000 * 60)) / 1000))}`
  }

  _pad(value) {
    return String(value).padStart(2, '0');
  }
}




const testTimer = new CountdownTimer({
  selector: `#timer-1`,
  targetDate: new Date('Apr 25, 2021'),
});

testTimer.start();


const testTimer2 = new CountdownTimer({
  selector: `#timer-2`,
  targetDate: new Date('Apr 30, 2021'),
});

testTimer2.start();