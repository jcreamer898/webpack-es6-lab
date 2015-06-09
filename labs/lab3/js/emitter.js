class Emitter {
  constructor() {
    this.topics = {};
  }
  on(name, fn, { context } = {}) {
    let topics = this.topics[name] = this.topics[name] || [];

    topics.push({
      topic: `t_${Object.keys(topics).length + 1}`,
      fn, context
    });
  }
  off(name, fn, opts = {}) {}
  trigger(name, ...args) {
    let topics = this.topics[name];

    let results = [for (topic of topics)
      if (topic.fn) topic.fn.apply(topic.context, args)];

    return results;
  }
}

module.exports = Emitter;
