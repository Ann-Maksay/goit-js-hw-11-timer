class CountdownTimer{
  constructor(obj) {
    this.selector = obj.selector;
    this.targetDate = obj.targetDate;
  }

  _intervalId = null;
  
  start() {
    const targetTime = this.targetDate.getTime();
    const spanRefs = this._createRefs();
    
    this._updateClock(0, spanRefs);

    this._intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetTime - currentTime;

      if (deltaTime <= 0) {
        this.stop();
      }

      this._updateClock(deltaTime, spanRefs);

    }, 1000);
  }

  stop() {
    clearInterval(this._intervalId);
    this._intervalId = null;
  }

  _updateClock(time, obj) {
    obj.daysRef.textContent = `${this._pad(Math.floor(time / (1000 * 60 * 60 * 24)))}`
    obj.hoursRef.textContent = `${this._pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))}`
    obj.minsRef.textContent = `${this._pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)))}`
    obj.secsRef.textContent = `${this._pad(Math.floor((time % (1000 * 60)) / 1000))}`
  }

  _pad(value) {
    return String(value).padStart(2, '0');
  }

  _createRefs() {
    const timerRef = document.querySelector(this.selector);

    return {
      daysRef: timerRef.querySelector('span[data-value="days"]'),
      hoursRef: timerRef.querySelector('span[data-value="hours"]'),
      minsRef: timerRef.querySelector('span[data-value="mins"]'),
      secsRef: timerRef.querySelector('span[data-value="secs"]'),
    }
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