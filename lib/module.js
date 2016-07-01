import Class from './class';
import Static from './static';
import Singleton from './singleton';

export default class Module extends Class.combine(Static, Singleton) {
}