export type PolyfillConfig = {
  func: string;
  codeSnippet: string;
};

export const arrayPolyfillConfig: PolyfillConfig[] = [
  {
    func: "reduce",
    codeSnippet: `Array.prototype.reduce = function (callback, initialValue) {
  let val = initialValue;
  console.log({ callback, val})

  for (let i = 0; i < this.length; i ++) {
    if (val) {
      val = callback.call(undefined, val, this[i], i, this);
    } else {
      val = this[i];
    }
  }
  return val;
}`,
  },
  {
    func: "map",
    codeSnippet: `Array.prototype.map = function (callback) {
  const newArr = [];
  for (let i = 0; i < this.length; i ++) {
    newArr.push(callback.call(undefined, this[i], i, this));
  }
  return newArr;
}`,
  },
  {
    func: "push",
    codeSnippet: `Array.prototype.push = function () {
  let tempLength = 0;
  while (this[tempLength] !== undefined) {
    tempLength ++;
  }
  let j = 0;
  for (let i = tempLength; arguments[j] !== undefined; i ++, j ++) {
    this[i] = arguments[j]
  }
  return tempLength + j;
}`,
  },
  {
    func: "concat",
    codeSnippet: `Array.prototype.concat = function () {
  let newArr = structuredClone(this);
  for (let i = 0; i < arguments.length; i ++) {
    if (Array.isArray(arguments[i])) {
      for (let j = 0; j < arguments[i].length; j ++) {
        newArr[newArr.length] = arguments[i][j];
      }
    } else {
      newArr[newArr.length] = arguments[i];
    }
  }
  return newArr;
}`,
  },
  {
    func: "join",
    codeSnippet: `Array.prototype.join = function (separator = ",") {
  let output = '';
  for (let i = 0; i < this.length; i ++) {
    if (i % 2 === 0) {
      output += (this[i] + separator)
    } else {
      output += this[i];
    }
  }
  return output;
}`,
  },
  {
    func: "slice",
    codeSnippet: `Array.prototype.slice = function(start = 0, endIndex) {
  if (start < 0) {
    return []
  }
  let end = endIndex ?? this.length - 1;
  if (endIndex < 0) {
    end = (this.length - Math.abs(endIndex)) ?? 0;
  }
  if (endIndex > this.length - 1) {
    end = this.length;
  }
  const output = [];
  for (let i = start; i < end; i ++) {
    output[output.length] = this[i];
  }
  return output;
}`,
  },
  {
    func: "filter",
    codeSnippet: `Array.prototype.filter = function(callback) {
  const arr = [];
  for (let i = 0; i < this.length; i ++) {
    if (callback.call(undefined, this[i], i, this) === true) {
      arr[arr.length] = this[i];
    }
  }
  return arr;
}`,
  },
  {
    func: "every",
    codeSnippet: `Array.prototype.every = function(callback) {
  let isValid = true;
  for (let i = 0; i < this.length; i ++) {
    if (callback.call(undefined, this[i], i, this) === false) {
      isValid = false;
      break;
    }
  }
  return isValid;
}
`,
  },
  {
    func: "fill",
    codeSnippet: `Array.prototype.fill = function(val, startArg = 0, endArg) {
  const arr = [];
  for (let i = 0; i < this.length; i ++) {
    arr[arr.length] = this[i];
  }
  let start = startArg;
  if (startArg < 0) {
    start = this.length + startArg;
  } else if (startArg >= this.length) {
    return arr;
  }
  let end = this.length - 1;
  if (endArg < 0) {
    end = this.length + end;
  } else if (endArg < this.length) {
    end = endArg;
  }
  for (let i = start; i < end; i ++) {
    arr[i] = val;
  }
  return arr;
}`,
  },
  {
    func: "find",
    codeSnippet: `Array.prototype.find = function(callback) {
  let foundElement = undefined;
  for (let i = 0; i < this.length; i ++) {
    if (callback.call(undefined, this[i], i, this) === true) {
      foundElement = this[i];
      break;
    }
  }
  return foundElement;
}`,
  },
  {
    func: "findIndex",
    codeSnippet: `Array.prototype.findIndex = function(callback) {
  let foundIndex = -1;
  for (let i = 0; i < this.length; i ++) {
    if (callback.call(undefined, this[i], i, this) === true) {
      foundIndex = i;
      break;
    }
  }
  return foundIndex;
}`,
  },
  {
    func: "splice",
    codeSnippet: `Array.prototype.splice = function(startArg, deleteCount, ...items) {
  if (deleteCount === 0) {
    return [];
  }

  let index = 0;

  const orgArr = [];

  for (index = 0; index < this.length; index ++) {
    orgArr[orgArr.length] = this[index];
  }

  let start = startArg;
  if (startArg < 0) {
    start = startArg + this.length;
  } else if (startArg >= this.length) {
    return []
  }

  const removedArr = [];

  index = start;
  let deleteArg = deleteCount;

  while (deleteArg--) {
    removedArr[removedArr.length] = this[index];
    index ++;
  }

  let count = 0;
  index = start
  while (count < items.length) {
    this[index] = items[count]
    index ++;
    count ++;
  }
  
  for (let k = start + deleteCount; k < orgArr.length; k ++, index ++) {
    this[index] = orgArr[k]
  }
  return removedArr;
}`,
  },
  {
    func: "indexOf",
    codeSnippet: `Array.prototype.indexOf = function(search, startFrom = 0) {
  let foundIndex = -1;
  if (startFrom >= this.length) {
    return foundIndex;
  }
  for (let i = startFrom; i < this.length; i ++) {
    if (this[i] === search) {
      foundIndex = i;
      break;
    }
  }
  return foundIndex
}`,
  },
  {
    func: "flat",
    codeSnippet: `Array.prototype.flat = function(depthArg = 1) {
  function flatten(arr, currentDepth) {
    if (currentDepth === 0 || !Array.isArray(arr)) {
      return arr;
    }
    return arr.reduce((result, currentValue) => {
      if (Array.isArray(currentValue)) {
        return result.concat(flatten(currentValue, currentDepth - 1));
      }
      return result.concat(currentValue)
    }, []);
  }
  return flatten(this, depthArg)
}`,
  },
];
