const createElement = (tag, classNames) => {
  const element = document.createElement(tag);

  if (classNames) {
    classNames.forEach(className => {
      element.classList.add(className);
    });
  }

  return element;
}

class Table {
  constructor() {
    this.table = createElement('table', ['table', 'shadow', 'striped']);
    this.thead = createElement('thead');
    this.tbody = createElement('tbody');
    this.table.append(this.thead);
    this.table.append(this.tbody);
  }

  createTableHeaders(headerArr) {
    headerArr.forEach(header => {
      const th = createElement('th');
      th.textContent = header;
  
      this.thead.append(th);
    });
  }

  buildTableRows(dataArr)  {
    dataArr.map(data => {
      const tr = createElement('tr');
      Object.keys(data).forEach(key => {
        tr.insertAdjacentHTML('beforeend', `<td>${data[key]}</td>`);
        this.tbody.insertAdjacentElement('beforeend', tr);
      });
    });
  } 
}

// Model: Represents the data and business logic.
class Model {
  constructor() {
    this.data = [
      {
        name: 'Rob',
        age: 31,
        email: 'rob@email.com'
      },
      {
        name: 'Mike',
        age: 31,
         email: 'mike@email.com'
      },
      {
        name: 'Lauren',
        age: 29,
         email: 'lauren@email.com'
      },
    ];
  }
}

// View: Represents the UI elements
class View {
  constructor() {
    this.app = document.getElementById('app');
    this.table = new Table();
  }

  render(data) {
    this.table.createTableHeaders(['Name', 'Age', 'Email']);
    this.table.buildTableRows(data);
    this.app.insertAdjacentElement('beforeend', this.table.table)
  }
}

// ViewModel: Acts as a bridge between the Model and View
class ViewModel {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  initalize() {
    const data = this.model.data;
    this.view.render(data);
  }
}

// Usage
const viewModel = new ViewModel(new Model(), new View());
viewModel.initalize();