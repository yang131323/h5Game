function initGame (items) {
  let imgs = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  let result = [];
  const len = imgs.length;
  for (let i = 0; i < 8; i++) {
    const index = Math.floor(Math.random() * imgs.length);
    items[i].style['background-image'] = `url('./img/${imgs[index]}.png')`;
    result.push(imgs[index]);
    imgs.splice(index, 1);
  }
  result.push('null');
  return result;
}

function isMove (curVal, nullVal) {
  let result = false;
  const diffVal = Math.abs(curVal - nullVal)
  result = diffVal === 1 ? true : (diffVal === 3 );
  return result;
}

function move (items, initOrder, curIndex, nullItem) {
  let temp = items[curIndex].style['background-image'];
  items[curIndex].style['background-image'] = '';
  items[nullItem].style['background-image'] = temp;
  temp = initOrder[curIndex];
  initOrder[curIndex] = initOrder[nullItem];
  initOrder[nullItem] = temp;
  nullItem = curIndex;
  return nullItem;
}

function initEvent (dom, initOrder, items, nullItem = 8) {
  const imgs = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'null'];
  initOrder.push('');
  dom.onclick = function addEvent (e) {
    const target = e.target;
    if (target.style && !target.style['background-image']) { return; }
    const currentIndex = [].slice.call(items).indexOf(target);
    if (!isMove(currentIndex, nullItem)) { return; }
    nullItem = move(items, initOrder, currentIndex, nullItem);
    if (imgs.join('') === initOrder.join('')) {
      setTimeout(() => {
        confirm('Congratulation you win!');
      }, 1500)
      dom.onclick = null;
    }
  }
}

function init (id = 'puzzle') {
  const dom = document.getElementById(id);
  const items = document.querySelectorAll('.puzzle-item');
  const initOrder = initGame(items);
  initEvent(dom, initOrder, items);
}

init();