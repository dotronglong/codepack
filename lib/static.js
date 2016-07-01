import Bag from './bag';

let Static = class StaticBag {};
Object.getOwnPropertyNames(Bag.prototype)
  .concat(Object.getOwnPropertySymbols(Bag.prototype))
  .forEach((prop) => {
    if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length|clean)$/)) return;
    Object.defineProperty(Static, prop, Object.getOwnPropertyDescriptor(Bag.prototype, prop))
  });
Static.data = Static;
Object.defineProperty(Static, 'clean', Object.assign(Object.getOwnPropertyDescriptor(Bag.prototype, 'clean'), {
  value: () => {
    Object.keys(Static).forEach((key) => {
      if (key === 'data') return;
      delete Static[key];
    });
    Static.data = Static;
  }
}));

export default Static;