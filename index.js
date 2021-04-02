class CountdownTimer{
  constructor(obj) {
    this.selector = obj.selector;
    this.targetDate = obj.targetDate;
  }

  _intervalId = null;

  _spanRefs = {
    daysRef: document.querySelector('span[data-value="days"]'),
    hoursRef: document.querySelector('span[data-value="hours"]'),
    minsRef: document.querySelector('span[data-value="mins"]'),
    secsRef: document.querySelector('span[data-value="secs"]')
  }
  
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
    this._spanRefs.daysRef.textContent = `${this._pad(Math.floor(time / (1000 * 60 * 60 * 24)))}`
    this._spanRefs.hoursRef.textContent = `${this._pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))}`
    this._spanRefs.minsRef.textContent = `${this._pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)))}`
    this._spanRefs.secsRef.textContent = `${this._pad(Math.floor((time % (1000 * 60)) / 1000))}`
  }

  _pad(value) {
    return String(value).padStart(2, '0');
  }
}




const testTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Apr 25, 2021'),
});

testTimer.start();