const mapPage = {
  'level': 'game-level',
  'one': 'game-level-one',
  'two': 'game-level-two',
  'three': 'game-level-three',
  'four': 'game-level-four',
  'five': 'game-level-five',
  'six': 'game-level-six',
  'seven': 'game-level-seven',
  'eight': 'game-level-eight',
};

const currentPage = 'level';

 window.onhashchange = function hashChange (e) {
  let oldVal = e.oldURL.split('#');
  let newVal = e.newURL.split('#');
  let startX = 0;
  let startY = 0;
  oldVal = oldVal.length > 1 ? oldVal[oldVal.length - 1] : 'level';
  newVal = newVal.length > 1 ? newVal[newVal.length - 1] : 'level';
  document.getElementById(mapPage[oldVal]).style.display = 'none';
  document.getElementById(mapPage[newVal.substr(1)]).style.display = 'block';
}

let ctx = null;
function oneLevel (id = 'one-canvas', con = 'game-level-one') {
  const dom = document.getElementById(id);
  const container = document.getElementById(con);
  const conLeft = container.getBoundingClientRect().left;
  const conTop = container.getBoundingClientRect().top;
  console.log(conLeft, conTop);
  // let ctx = null;

  dom.onmouseenter = function () {
    ctx = dom.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#03a9f4';
    console.log(ctx);
  }

  function draw (e) {
    ctx.clearRect(0, 0, 360, 640);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(e.pageX - conLeft, e.pageY - conTop);
    ctx.stroke();
  }

  dom.onmousedown = function (e) {
    ctx.save();
    startX = e.pageX - conLeft;
    startY = e.pageY - conTop;
    console.log(startX, startY);
    dom.onmousemove = draw;
  }
}

oneLevel();