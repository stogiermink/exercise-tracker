if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

let exercises = JSON.parse(localStorage.getItem('exs'))||[];

const render = (filter='') => {
  const list = document.getElementById('list');
  list.innerHTML = '';
  exercises.filter(e=>e.name.toLowerCase().includes(filter))
    .forEach((e,i) => {
      const li = document.createElement('li');
      li.textContent = `${e.name} – ${e.weight} kg — ${e.comment}`;
      const del = document.createElement('button');
      del.textContent = '✖';
      del.onclick = () => { exercises.splice(i,1); save(); render(filter); };
      li.appendChild(del);
      list.appendChild(li);
    });
};

const save = () => {
  localStorage.setItem('exs', JSON.stringify(exercises));
};

document.getElementById('add').onclick = () => {
  const name=prompt('Exercise name:')||'';
  const weight=prompt('Weight:')||'';
  const comment=prompt('Comment:')||'';
  if(!name||!weight) return;
  exercises.push({name,weight,comment});
  save();
  render(document.getElementById('search').value.toLowerCase());
};

document.getElementById('search').oninput = e => render(e.target.value.toLowerCase());

render();
