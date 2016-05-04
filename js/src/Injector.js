var Injector, NamedFunction, setType;

NamedFunction = require("NamedFunction");

setType = require("setType");

module.exports = Injector = NamedFunction("Injector", function(id) {
  var cache, injector;
  cache = Injector.cache;
  injector = cache[id];
  if (injector) {
    return injector;
  }
  injector = {
    id: id,
    values: Object.create(null),
    stacks: void 0
  };
  return cache[id] = setType(injector, Injector);
});

Injector.cache = Object.create(null);

Injector.prototype.get = function(key) {
  return this.values[key];
};

Injector.prototype.set = function(key, value) {
  this.values[key] = value;
};

Injector.prototype.push = function(key, value) {
  var oldValue, stack;
  if (value === void 0) {
    return;
  }
  oldValue = this.values[key];
  if (oldValue !== void 0) {
    if (this.stacks) {
      stack = this.stacks[key];
    } else {
      this.stacks = Object.create(null);
    }
    if (stack) {
      stack.push(oldValue);
    } else {
      this.stacks[key] = [oldValue];
    }
  }
  this.values[key] = value;
};

Injector.prototype.pop = function(key) {
  var stack;
  if (this.values[key] === void 0) {
    return;
  }
  if (this.stacks) {
    stack = this.stacks[key];
  }
  this.values[key] = stack ? stack.pop() : void 0;
};

Injector.prototype.call = function() {
  var func, key;
  key = Array.prototype.shift.call(arguments);
  func = this.values[key];
  if (!(func && func.call)) {
    throw TypeError("Must inject a Function into '" + this.id + "." + key + "'!");
  }
  return func.apply(null, arguments);
};

//# sourceMappingURL=../../map/src/Injector.map
