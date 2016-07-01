export default class Descriptor {
  constructor(name = '', content = {}) {
    this.name = name;
    this.content = content;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getContent() {
    return this.content;
  }

  setContent(content) {
    this.content = content;
  }
}