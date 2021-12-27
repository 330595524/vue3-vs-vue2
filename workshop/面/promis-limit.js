class PromiseQueue {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 1;
    this.currentCount = 0;
    this.pendingList = [];
  }

  add(task) {
    this.pendingList.push(task);
    this.run();
  }
  run() {
    if (this.pendingList.length === 0) {
      return;
    }
    if (this.concurrency === this.currentCount) {
      return;
    }
    this.currentCount++;
    const { fn } = this.pendingList
      .sort((a, b) => {
        b.priorityp - a.priority;
      })
      .shift();
    const promise = fn();
    promise.then(
      this.completeOne.bind(this).catch(this.completeOne.bind(this))
    );
  }
  completeOne() {
    this.currentCount--;
    this.run();
  }
}

const q = new PromiseQueue({ concurrency: 3 });

const formatTash = (url) => {
  return {
    fn: () => loadImg(url),
    priority: url.priority,
  };
};
