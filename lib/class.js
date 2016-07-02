const INSTANCEOF_PROPERTY_NAME = '__implements';
const NOT_IN_ARRAY = -1;
export default class Class {
  static combine(baseClass, ...mixins) {
    let base      = class _Combined extends baseClass {
      constructor(...args) {
        super(...args)

        let classNames = [baseClass.name]
        mixins.forEach((mixin) => {
          if (mixin.prototype.hasOwnProperty('init') === true) {
            mixin.prototype.init.call(this)
          }

          classNames.push(mixin.name)
        })
        this[INSTANCEOF_PROPERTY_NAME] = classNames
      }
    }
    let copyProps = (target, source) => {
      Object.getOwnPropertyNames(source)
        .concat(Object.getOwnPropertySymbols(source))
        .forEach((prop) => {
          if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
            return
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop))
        })
    }

    mixins.forEach((mixin) => {
      copyProps(base.prototype, mixin.prototype)
      copyProps(base, mixin)
    })

    return base;
  }

  static instanceof(object, target) {
    if (typeof target === 'function' && object instanceof target) {
      return true;
    }

    if (object.hasOwnProperty(INSTANCEOF_PROPERTY_NAME)) {
      const targetName = typeof target === 'string' ? target : target.name;
      const classNames = object[INSTANCEOF_PROPERTY_NAME];
      for (let i = 0; i < classNames.length; i++) {
        if (classNames[i] === targetName) {
          return true;
        }
      }
    }

    return false;
  }

  static setInstanceof(object, target) {
    if (object.hasOwnProperty(INSTANCEOF_PROPERTY_NAME) === false) {
      Object.defineProperty(object, INSTANCEOF_PROPERTY_NAME, {
        enumerable: false,
        configurable: false,
        writable: true,
        value: []
      });
    }

    object[INSTANCEOF_PROPERTY_NAME].push(typeof target === 'function' ? target.name : target);
  }

  static cleanProperties(object, ignore) {
    ignore = typeof ignore === 'undefined' ? [] : ignore;
    Object.keys(object).forEach((prop) => {
      if (ignore.length && ignore.indexOf(prop) > NOT_IN_ARRAY) {
        return
      }
      delete object[prop];
    });

    return object;
  }

  static defineProperty(object, name, value = null, enumerable = true, writable = true, configurable = true) {
    Object.defineProperty(object, name, {
      configurable: configurable,
      enumerable: enumerable,
      writable: writable,
      value: value
    })
  }

  static definePropertyNotEnumerable(object, name, value = null) {
    return this.defineProperty(object, name, value, false)
  }

  static definePropertyNotWritable(object, name, value = null) {
    return this.defineProperty(object, name, value, true, false)
  }

  static definePropertyNotConfigurable(object, name, value = null) {
    return this.defineProperty(object, name, value, true, true, false)
  }
}