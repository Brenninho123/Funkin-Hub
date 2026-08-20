class MainMenuState {
  constructor(game) {
    this.game = game;
    this.container = null;
    this.selectedIndex = 0;
    this.options = ['Play', 'Mods', 'Options', 'Credits'];
    this.optionElements = [];
  }

  create() {
    this.container = document.createElement('div');
    this.container.id = 'main-menu-state';

    const title = document.createElement('h1');
    title.textContent = "Main Menu";
    this.container.appendChild(title);

    const menuList = document.createElement('ul');
    menuList.className = 'menu-list';

    this.options.forEach((optionText, index) => {
      const li = document.createElement('li');
      li.textContent = optionText;
      li.className = 'menu-option';
      if (index === this.selectedIndex) {
        li.classList.add('selected');
      }
      menuList.appendChild(li);
      this.optionElements.push(li);
    });

    this.container.appendChild(menuList);

    const app = document.getElementById('app');
    if (app) {
      app.appendChild(this.container);
    }

    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      this.changeSelection(-1);
    } else if (event.key === 'ArrowDown') {
      this.changeSelection(1);
    } else if (event.key === 'Enter') {
      this.selectOption();
    } else if (event.key === 'Escape' || event.key === 'Backspace') {
      this.game.switchState(new (require('./IntroState.js').default)(this.game));
    }
  };

  changeSelection(direction) {
    this.optionElements[this.selectedIndex].classList.remove('selected');
    
    this.selectedIndex += direction;
    if (this.selectedIndex < 0) {
      this.selectedIndex = this.options.length - 1;
    } else if (this.selectedIndex >= this.options.length) {
      this.selectedIndex = 0;
    }

    this.optionElements[this.selectedIndex].classList.add('selected');
  }

  selectOption() {
    const selectedOption = this.options[this.selectedIndex];
    switch (selectedOption) {
      case 'Play':
        break;
      case 'Mods':
        break;
      case 'Options':
        break;
      case 'Credits':
        break;
    }
  }

  update() {}

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

export default MainMenuState;
