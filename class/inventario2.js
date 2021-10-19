export default class Inventory2 {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  add(newItem) {
    if (this.noRepeatId(newItem.getId()) == null) {
      return null;
    }
    if (!this.head) {
      this.head = newItem;
    } else {
      this._addRec(newItem, this.head);
    }
    this.size++;
  }

  _addRec(newest, current) {
    if (current.next == null) {
      current.next = newest;
    } else {
      this._addRec(newest, current.next);
    }
  }
  noRepeatId(id) {
    id = Number(id);
    let current = this.head;
    let data = "";
    while (current != null) {
      data = current;
      if (data.getId() === id) {
        return null;
      }
      current = current.next;
    }
    return true;
  }
  insertProductAt(product, index) {
    if (this.noRepeatId(product.getId()) == null) {
      return null;
    }
    if (index < 0 || index > this.size) {
      return null;
    }
    let current = this.head;
    let prev;
    if (index == 0) {
      product.next = current;
      this.head = product;
      return;
    } else {
      let i = 0;
      for (let i = 0; i < index; i++) {
        prev = current;
        current = current.next;
      }
      product.next = current;
      prev.next = product;
    }
    this.size++;
  }

  getLinkedList() {
    return this.head;
  }
  removeById(id) {
    id = Number(id);
    let current = this.head;
    let prev = null;
    while (current !== null) {
      if (current.getId() === id) {
        if (!prev) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return current;
      }
      prev = current;
      current = current.next;
    }
    return null;
  }
  removeFrom(index) {
    if (index < 0 || index > this.size) {
      return null;
    }
    let current = this.head;
    let prev = null;

    if (index === 0) {
      this.head = current.next;
    } else {
      for (let i = 0; i < index; i++) {
        prev = current;
        current = current.next;
      }
      prev.next = current.next;
    }
    this.size--;
    return current;
  }
  browser(id) {
    if (!this.head) {
      return null;
    }
    let current = this.head;
    while (current !== null) {
      if (current.getId() == id) return current;
      current = current.next;
    }
    return null;
  }
}
