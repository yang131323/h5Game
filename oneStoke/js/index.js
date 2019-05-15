const currentPage = 'level';

 window.onhashchange = function hashChange (e) {
  let oldVal = e.oldURL.split('#');
  let newVal = e.newURL.split('#');
  oldVal = oldVal.length > 1 ? oldVal[oldVal.length - 1] : 'level';
  newVal = newVal.length > 1 ? newVal[newVal.length - 1] : 'level';
  document.getElementById(mapPage[oldVal]).style.display = 'none';
  document.getElementById(mapPage[newVal.substr(1)]).style.display = 'block';
}

function oneLevel (level = 'one', id = 'one-canvas', con = 'game-level-one', strColor = '#03a9f4', fillColor = '#689f38') {
  let startX = 0;
  let startY = 0;
  let isEnter = false;
  let isNext = false;
  let isClick = false;
  const currentLevel = Object.assign({}, allLevel[level]);
  let compleleLine = [];
  const dom = document.getElementById(id);
  const container = document.getElementById(con);
  const conLeft = container.getBoundingClientRect().left;
  const conTop = container.getBoundingClientRect().top;
  let ctx = null;

  dom.ondbclick = () => { return false }

  dom.style.background= `url("./css/${level}.png") no-repeat`;

  function initGraph () {
    ctx = dom.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = strColor;
    ctx.fillStyle = fillColor; // 
    const point = currentLevel['point'];
    const line = currentLevel['line'];
    ctx.beginPath();
    for (let i = 0; i < point.length; i++) {
      ctx.arc(point[i][0], point[i][1], 10, 0, Math.PI * 2, true);
      if (i < point.length - 1) { ctx.moveTo(point[i + 1][0], point[i + 1][1]); }
    }
    ctx.fill();
    ctx.beginPath();
    for (let i = 0; i < line.length; i++) {
      ctx.moveTo(line[i][0][0], line[i][0][1]);
      ctx.lineTo(line[i][1][0], line[i][1][1]);
    }
    ctx.stroke();
  }
  // initGraph();

  function proofLevel () {
    ctx.beginPath();
    ctx.arc(87, 135, 10, 0, Math.PI * 2, true);
    ctx.moveTo(274, 135)
    ctx.arc(274, 135, 10, 0, Math.PI * 2, true);
    ctx.moveTo(40, 230)
    ctx.arc(38, 230, 10, 0, Math.PI * 2, true);
    ctx.moveTo(180, 230)
    ctx.arc(180, 230, 10, 0, Math.PI * 2, true);
    ctx.moveTo(322, 230)
    ctx.arc(322, 230, 10, 0, Math.PI * 2, true);
    ctx.moveTo(38, 325)
    ctx.arc(38, 325, 10, 0, Math.PI * 2, true);
    ctx.moveTo(87, 325)
    ctx.arc(85, 325, 10, 0, Math.PI * 2, true);
    ctx.moveTo(270, 325)
    ctx.arc(275, 325, 10, 0, Math.PI * 2, true);
    ctx.moveTo(322, 325)
    ctx.arc(322, 325, 10, 0, Math.PI * 2, true);
    ctx.moveTo(87, 418)
    ctx.arc(87, 418, 10, 0, Math.PI * 2, true);
    ctx.moveTo(277, 418)
    ctx.arc(277, 418, 10, 0, Math.PI * 2, true);
    ctx.fill();
  }

  function initPoint () {
    const point = currentLevel['point'];
    ctx.beginPath();
    for (let i = 0; i < point.length; i++) {
      ctx.arc(point[i][0], point[i][1], 10, 0, Math.PI * 2, true);
      if (i < point.length - 1) { ctx.moveTo(point[i + 1][0], point[i + 1][1]); }
    }
    ctx.fill();
  };

  dom.onmouseenter = function () {
    if (isEnter) { return; }
    isEnter = true;
    ctx = dom.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = strColor;
    ctx.fillStyle = fillColor;
    initPoint();
    console.log(ctx);
  }

  function isKeepDown (x, y, lineS, lineE) {
    let result = false;
    // console.log(x, y, lineS, lineE);
    if (startX === lineS[0] && startY === lineS[1] && Math.abs(x - lineE[0]) <= 10 && Math.abs(y - lineE[1]) <= 10) {
      compleleLine.push([[startX, startY], [lineE[0], lineE[1]]]);
      startX = lineE[0];
      startY = lineE[1];
      result = true;
    } else if (startX === lineE[0] && startY === lineE[1] && Math.abs(x - lineS[0]) <= 10 && Math.abs(y - lineS[1]) <= 10) {
      compleleLine.push([[startX, startY], [lineS[0], lineS[1]]]);
      startX = lineS[0];
      startY = lineS[1];
      result = true;
    }
    return result;
  }

  function judgeLine (x, y) {
    let result = true;
    const lines = currentLevel['line'];
    for (let i = 0; i < lines.length; i++) {
      const lineS = lines[i][0];
      const lineE = lines[i][1];
      if (isKeepDown(x, y, lineS, lineE)) {
        result = false;
        lines.splice(i, 1);
        break;
      };
    }
    return result;
  }

  function drawEndLine () {
    for (let i = 0; i < compleleLine.length; i++) {
      ctx.moveTo(compleleLine[i][0][0], compleleLine[i][0][1]);
      ctx.lineTo(compleleLine[i][1][0], compleleLine[i][1][1]);
    }
  }

  function nextLevel () {
    console.log(currentLevel)
    if (currentLevel['line'].length <= 0) {
      setTimeout(() => { 
        isNext = confirm('congratulation you win ' + level + 'Level!');
        console.log('is next level: ' + isNext);
      }, 500);
      dom.onmousemove = null;
    }
  }

  function draw (e) {
    const tempX = e.pageX - conLeft;
    const tempY = e.pageY - conTop;
    ctx.restore();
    ctx.save();
    ctx.clearRect(0, 0, 360, 640);
    ctx.beginPath();
    drawEndLine();
    ctx.moveTo(startX, startY);
    if (judgeLine(tempX, tempY)) {
      ctx.lineTo(tempX, tempY);
    } else {
      ctx.lineTo(startX, startY);
    }
    ctx.stroke();
    nextLevel();
  }

  function judgeValid (x, y) {
    let result = {
      index: -1,
      end: true
    };
    const points = currentLevel['point'];
    for (let i = 0; i < points.length; i++) {
      if (Math.abs(x - points[i][0] <= 10 && Math.abs(y - points[i][1]) <= 10)) {
        result = {
          index: i,
          end: false
        };
        break;
      }
    }
    return result;
  }

  dom.onmousedown = function (e) {
    // ctx.save();
    const isValid = judgeValid(e.pageX - conLeft, e.pageY - conTop);
    if (isClick || isValid['end']) { return; }
    isClick = true;
    const point = currentLevel['point'];
    startX = point[isValid['index']][0];
    startY = point[isValid['index']][1];
    dom.onmousemove = draw;
  }
}

oneLevel();