class Topic {
  constructor({ topic, fn, opts = {}}) {
    this.topic = topic;
    this.fn = fn;
    this.opts = opts;
  }
}

class Emitter {
  constructor() {
    this.topics = new Map();
    this.befores = new Map();
    this.afters = new Map();
  }
  before(name, fn) {
    this.befores.set(name, fn);
  }
  after(name, fn) {
    this.afters.set(name, fn);
  }
  on(name, fn, { context } = { context: window }) {
    let set;

    if (!(set = this.topics.get(name))) {
      set = new Set();
      this.topics.set(name, set);
    }

    let topic = new Topic({
      topic: `t_${set.size}`,
      fn, opts, context
    });

    set.add(topic);
  }
  off(name, fn) {
    if (!name && !fn) {
      return this.topics.clear();
    } else if (!fn) {
      return this.topics.delete(name);
    }

    let topics = this.topics.get(name);
    let remove = [for (topic of topics) if (fn === topic.fn) topic];
    remove.forEach((t) => topics.delete(t));

  }
  trigger(name, data, ...args) {
    const topics = [for (topic of this.topics.get(name)) {context: topic.context, fn: topic.fn}];

    if (args.length) args.unshift(data);
    else args = [data];

    let results = [for (topic of topics) new Promise((resolve) => {
      setTimeout(() => {
        let before = this.befores.get(name);
        if (before) before.apply(topic.context, args);

        let result = topic.fn.apply(topic.context, args);

        resolve(result);
      }, 0);
    })];

    let after = this.afters.get(name);
    if (after) Promise.all(results).then((r) => after(r));

    return results;
  }
}

export default Emitter;
