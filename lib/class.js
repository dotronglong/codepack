const INSTANCEOF_PROPERTY_NAME = '__implements';
const NOT_IN_ARRAY             = -1;

function copy(target, source, all = false) {
  Object.getOwnPropertyNames(source)
    .concat(Object.getOwnPropertySymbols(source))
    .forEach((prop) => {
      if (all === false && prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
        return
      }
      Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop))
    })
}

/**
 * Tools to deal with classes
 */
export default class Class {
  /**
   * Check whether or not a method exists in object
   * @ignore
   * @returns {boolean}
   */
  static methodExists(object, method) {
    return this.getMethods(object).indexOf(method) !== NOT_IN_ARRAY;
  }

  /**
   * Get all methods of an object
   * @ignore
   * @returns {Array}
   */
  static getMethods(object) {
    let methods = []
    if (typeof object.prototype === 'undefined') {
      // temporary not support this case
      if (typeof object[INSTANCEOF_PROPERTY_NAME] !== 'undefined') {
        object[INSTANCEOF_PROPERTY_NAME].forEach((o) => {
          Class.getMethods(o).forEach((name) => {
            if (name.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) return
            if (methods.indexOf(name) === NOT_IN_ARRAY) {
              methods.push(name)
            }
          })
        })
      }
    } else {
      methods = methods
        .concat(Object.getOwnPropertyNames(object.prototype), Object.getOwnPropertySymbols(object.prototype))
    }
    return methods
  }

  /**
   * Mixes many classes into one in order to allow to extend from multiple classes
   * @returns {object}
   */
  static mix(baseClass, ...mixins) {
    let base      = class _Combined extends baseClass {
      constructor(...args) {
        super(...args)

        this[INSTANCEOF_PROPERTY_NAME] = [baseClass]
        mixins.forEach((mixin) => {
          if (mixin.prototype.hasOwnProperty('init') === true) {
            mixin.prototype.init.call(this)
          }

          this[INSTANCEOF_PROPERTY_NAME].push(mixin)
        })
      }
    }

    mixins.forEach((mixin) => {
      copy(base.prototype, mixin.prototype)
      copy(base, mixin)
    })

    return base;
  }

  /**
   * Determine whether or not an object is an instance of a class
   * @ignore
   * @param {object} object Object to check
   * @param {object} target Class object to test
   * @returns {boolean}
   */
  static instanceof(object, target) {
    if (typeof target === 'function' && object instanceof target) {
      return true;
    }

    if (object.hasOwnProperty(INSTANCEOF_PROPERTY_NAME)) {
      const targetName = typeof target === 'string' ? target : target.name;
      const implementClasses = object[INSTANCEOF_PROPERTY_NAME];
      for (let i = 0; i < implementClasses.length; i++) {
        if (implementClasses[i].name === targetName) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Mark an object to be an instance of target's object
   * @ignore
   * @param {object} object Object to be modified
   * @param {object} target Class object be added as instance's class
   */
  static setInstanceof(object, target) {
    if (object.hasOwnProperty(INSTANCEOF_PROPERTY_NAME) === false) {
      Object.defineProperty(object, INSTANCEOF_PROPERTY_NAME, {
        enumerable: false,
        configurable: false,
        writable: true,
        value: []
      });
    }

    object[INSTANCEOF_PROPERTY_NAME].push(target);
  }

  /**
   * Remove all properties on an object
   * @param {object} object Object to be cleaned
   * @param {?Array} ignore List of ignoring properties, let them remain
   */
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

  /**
   * Define a property on an object with an easy way
   * @param {object} object The target object
   * @param {string} name Name of the property
   * @param {?*} [value=null] Initial value of property
   * @param {?boolean} [enumerable=true] Mark property as enumerable
   * @param {?writable} [writable=true] Mark property as writable
   * @param {?configurable} [configurable=true] Mark property as configurable
   */
  static defineProperty(object, name, value = null, enumerable = true, writable = true, configurable = true) {
    Object.defineProperty(object, name, {
      configurable: configurable,
      enumerable: enumerable,
      writable: writable,
      value: value
    })
  }

  /**
   * Define a property which is not enumerable
   * @param {object} object The target object
   * @param {string} name Name of the property
   * @param {?*} [value=null] Initial value of property
   */
  static definePropertyNotEnumerable(object, name, value = null) {
    return this.defineProperty(object, name, value, false)
  }

  /**
   * Define a property which is not writable
   * @param {object} object The target object
   * @param {string} name Name of the property
   * @param {?*} [value=null] Initial value of property
   */
  static definePropertyNotWritable(object, name, value = null) {
    return this.defineProperty(object, name, value, true, false)
  }

  /**
   * Define a property which is not configurable
   * @param {object} object The target object
   * @param {string} name Name of the property
   * @param {?*} [value=null] Initial value of property
   */
  static definePropertyNotConfigurable(object, name, value = null) {
    return this.defineProperty(object, name, value, true, true, false)
  }
}
