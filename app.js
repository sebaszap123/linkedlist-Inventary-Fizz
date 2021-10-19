import Product from "./class/product.js";
import Inventario2 from "./class/inventario2.js";
import Ux from "./class/ux.js";
class App {
  constructor() {
    this.btnBrowse = document.getElementById("btnBrowse");
    this.btnBrowse.addEventListener("click", this.browseProduct);
    this.btnRegister = document.getElementById("btnRegister");
    this.btnRegister.addEventListener("click", this.add);
    this.list = document.getElementById("btnList");
    this.listInverse = document.getElementById("btnListInverse");
    this.btnInsert = document.getElementById("btnInsert");
    this.list.addEventListener("click", this.listar);
    this.listInverse.addEventListener("click", this.listarInverse);
    this.btnInsert.addEventListener("click", this.insertProduct);
    this.linkedList = new Inventario2();
    this.divTable = document.getElementById("forTable");
    this.divActions = document.getElementById("actions");
    this.btnDelete = document.getElementById("btnDelete");
    this.btnDelete.addEventListener("click", this.deleteProduct);
  }
  browseProduct = () => {
    let id = document.getElementById("id").value;
    let uxBw = new Ux(this.divTable, this.divActions, this.linkedList);
    let bwProduct = this.linkedList.browser(id);
    if (bwProduct !== null) {
      uxBw.tellActions(`El producto ${bwProduct.getName()} si existe`);
    }
  };
  add = () => {
    let uxAdd = new Ux(this.divTable, this.divActions, this.linkedList);
    let product = this.createProduct();
    if (product === null) {
      uxAdd.tellActions("No se agregó el producto, faltan valores por agregar");
      return null;
    }
    let added = this.linkedList.add(product);
    if (added !== null) {
      uxAdd.tellActions(`El product ${product.getName()} se agrego`);
    } else if (added === null) {
      uxAdd.tellActions(
        `El product ${product.getName()} no se agrego, el producto ya existe`
      );
    }
  };
  createProduct = () => {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let mount = document.getElementById("mount").value;
    let price = document.getElementById("price").value;
    if (id && name && mount && price) {
      var product = new Product(id, name, mount, price);
      return product;
    }
    return null;
  };
  insertProduct = () => {
    let inserted = false;
    let product = this.createProduct();
    let pos = document.getElementById("insertValue").value;
    if (product !== null) {
      inserted = this.linkedList.insertProductAt(product, pos);
    }
    if (product == null) {
      alert("Debes ingresar un producto para poder insertarlo");
    }
    if (inserted) {
      let uxInsert = new Ux(this.divTable, this.divActions, this.inventary);
      uxInsert.tellActions(
        `Se inserto el producto ${product.getName()} en la posición ${pos} correctamente`
      );
    }
  };
  deleteProduct = () => {
    let uxDelete = new Ux(this.divTable, this.divActions, this.inventary);
    let idToDelete = document.getElementById("id").value;
    let pass = this.linkedList.removeById(idToDelete);
    if (pass == null) {
      uxDelete.tellActions("No ingresaste un id o codigó de producto");
      return null;
    } else if (pass == false) {
      uxDelete.tellActions(`el id ${idToDelete} no existe en el inventario`);
      return false;
    }
    uxDelete.tellActions(
      `el producto ${pass.getName()} con id ${pass.getId()} fue eliminado con éxito`
    );
  };
  listar = () => {
    let uxList = new Ux(this.divTable, this.divActions, this.linkedList);
    uxList.listing();
  };
  listarInverse = () => {
    let uxListInverse = new Ux(
      this.divTable,
      this.divActions,
      this.inventary.getArray()
    );
    uxListInverse.listInverse();
  };
}

new App();
