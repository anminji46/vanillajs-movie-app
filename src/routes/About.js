import { Component } from '../core/coreMovie';
import aboutStore from '../store/about';

export default class About extends Component {
  render() {
    const {name, email, github, blog} = aboutStore.state;
    this.el.classList.add('container', 'about');
    this.el.innerHTML = /*html*/`
      <div class="photo"></div>
      <p class="name">${name}</p>
      <p>
        <a href="http://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_blank">${email}</a>
      </p>
      <p>
        <a href="${github}" target="_blank">Github</a>
      </p>
      <p>
        <a href="${blog}" target="_blank">Blog</a>
      </p>
    `;
  }
}