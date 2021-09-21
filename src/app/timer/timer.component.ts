import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges, OnDestroy {
  message: string = 'timed out';
  remainingTime!: number;
  @Input()
  seconds: number = 11;
  @Output()
  finish = new EventEmitter<boolean>();
  private intervalId = 8;


  ngOnInit(): void {
    this.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('seconds' in changes) {
      let v = changes.seconds.currentValue;
      v = typeof v === 'undefined' ? 11 : v;
      const vFixed = Number(v);
      this.seconds = Number.isNaN(vFixed) ? 11 : vFixed;
    }
  }

  clearTimer() {
    clearInterval(this.intervalId)
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  start() {
    this.countdown();
    if (this.remainingTime <= 0) {
      this.remainingTime = this.seconds;
    }
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at ${this.remainingTime} seconds`;
  }

  reset() {
    this.clearTimer()
    this.remainingTime = this.seconds;
    this.message = `Click start to go again`
  }

  private countdown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.remainingTime -= 1;
      if (this.remainingTime === 0) {
        this.message = `boom`;
        this.clearTimer();
        this.finish.emit(true);
      } else {
        this.message = `${this.remainingTime} second and counting`
      }
    }, 1000);
  }
}
