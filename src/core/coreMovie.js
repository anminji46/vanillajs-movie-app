// Componet
export class Component {
  constructor(payload = {}) {
    const {
      tagName = 'div', 
      state = {},
      props = {}
    } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {
    // elements...
  }
}

// Router
export function routeRender(routes){
  if(!location.hash) {
    history.replaceState(null, '', '/#/');
  };
  const routerView = document.querySelector('router-view');
  // http://localhost:1234/#/about?name=hong
  // location.hash -> #/about?name=hong
  const [hash, queryString=''] = location.hash.split('?');
    // http://localhost:1234/#/about?name=hong&age=100
  const query = 
    queryString
    .split('&')
    .reduce((acc, curr)=>{
      const [key, value] = curr.split('=');
      acc[key] = value;
      return acc;
    },{})
    history.replaceState(query,'');
  const currentRoute = routes.find(route => {
    return new RegExp(`${route.path}/?$`).test(hash);
  });
  routerView.innerHTML = '';
  routerView.append(new currentRoute.component().el);
  window.scrollTo(0,0);
};
export function createRouter(routes) {
  return function() {
    window.addEventListener('popstate',()=> {
      routeRender(routes);
    });
    routeRender(routes);
  }
};

// Store
export class Store {
  constructor(state) {
    this.state = {};
    this.observer = {};
    for(const key in state) {
      Object.defineProperty(this.state, key, {
        get : () => {
          return state[key]
        },
        set : (val) => {
          state[key] = val;
          if(Array.isArray(this.observer[key])){
            this.observer[key].forEach(observer => {
              return observer(val)
            });
          }
        }
      });
    }
  }
  subscribe(key, cb) {
    Array.isArray(this.observer[key])
    ? this.observer[key].push(cb)
    : this.observer[key] = [cb];
  }
};