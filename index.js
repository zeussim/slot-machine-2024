(function () {
  const items = [
    '🍭',
    '🚁',
    '🪂️',
    '🦄',
    '🍌',
    '🛰️',
    '🛩️',
    '😻',
    '💵',
    '🍁',    
    '✈️',
    '🍎',
    '😂',
    '🚀',
  ];
  const doors = document.querySelectorAll('.door');
  
  document.querySelector('#spinner').addEventListener('click', spin);
  document.querySelector('#reseter').addEventListener('click', reseter);
  //document.querySelector('#reseter').addEventListener('click', init);
  let startNumber = 100; 
  let totalNumber = 200;
  let selectNumber = [];
  
  function shufflearray(array) {
	for (let index = array.length - 1; index > 0; index--) {
		// 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
		const randomPosition = Math.floor(Math.random() * (index + 1));

		// 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
		const temporary = array[index];
		array[index] = array[randomPosition];
		array[randomPosition] = temporary;
	}
  }
  
  function reseter() {
	  //document.getElementById('snum').value = '';
	  let objparent = document.getElementById("cards");
	  objparent.replaceChildren();
	  selectNumber = [];
	  init(true, 1, 2);
  }

  function init(firstInit = true, groups = 1, duration = 1) {
	let boxSeq = 1;
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = '0';
		
		//let tnum = document.getElementById('tnum').value;
		if(document.getElementById('tstart').value == '') { document.getElementById('tstart').value = startNumber; }
		if(document.getElementById('tnum').value == '') { document.getElementById('tnum').value = totalNumber; }
		
      } else if (door.dataset.spinned === '1') {
		//alert("초기화");
		door.dataset.spinned = '0';
        //return;
      }

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      const pool = ['❓'];

      if (!firstInit) {
		if(boxSeq == 2) {
			let tstart = document.getElementById('tstart').value;
			let tnum = document.getElementById('tnum').value;
			let itemsNumber = [];
			for(let n=tstart; n<=tnum; n++) {				
				if(selectNumber.length > 0) {
					//제외될 숫자 찾기
					if(selectNumber.includes(n)){						
					}else{
						itemsNumber.push(n);
					}
				}else{
					itemsNumber.push(n);
				}								
			}
			//alert(itemsNumber);
			
			shufflearray(itemsNumber);
			duration = 3;
			
			const arr = [];
		
			for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
				arr.push(...itemsNumber);
			}
			pool.push(...shuffle(arr));
	
			boxesClone.addEventListener(
				'transitionstart',
				function () {
					door.dataset.spinned = '1';
					this.querySelectorAll('.box').forEach((box) => {
					box.style.filter = 'blur(1px)';
					});
				},
				{ once: true }
			);
	
			boxesClone.addEventListener(
				'transitionend',
				function () {
					this.querySelectorAll('.box').forEach((box, index) => {
					box.style.filter = 'blur(0)';
					if (index > 0) this.removeChild(box);
					});
				},
				{ once: true }
			);
			
		}else{
			duration = 2;
			const arr = [];
		
			for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
				arr.push(...items);
			}
			pool.push(...shuffle(arr));
	
			boxesClone.addEventListener(
				'transitionstart',
				function () {
					door.dataset.spinned = '1';
					this.querySelectorAll('.box').forEach((box) => {
					box.style.filter = 'blur(1px)';
					});
				},
				{ once: true }
			);
	
			boxesClone.addEventListener(
				'transitionend',
				function () {
					this.querySelectorAll('.box').forEach((box, index) => {
					box.style.filter = 'blur(0)';
					if (index > 0) this.removeChild(box);
					});
				},
				{ once: true }
			);
		
		}
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
	  
	  boxSeq = boxSeq + 1;
    }
  }

  async function spin() {
	document.querySelector('#spinner').disabled = true;
	document.querySelector('#reseter').disabled = true;
	document.querySelector('#tstart').disabled = true;
	document.querySelector('#tnum').disabled = true;
    init(false, 1, 2);
    
    for (const door of doors) {
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
	setTimeout(() => { 
		var boxs = document.getElementsByClassName("box");
		//alert(boxs[1].innerText);
		if(boxs[1].innerText != ''){
			selectNumber.push(Number(boxs[1].innerText));

			let circleCnt = document.querySelectorAll('.circle');
			let objparent = document.getElementById("cards");
			let newDiv = document.createElement("div");
			newDiv.innerText = boxs[1].innerText;
			newDiv.setAttribute("class", "circle");
			objparent.appendChild(newDiv);
				
			document.querySelector('#spinner').disabled = false;
			document.querySelector('#reseter').disabled = false;
			document.querySelector('#tstart').disabled = false;
			document.querySelector('#tnum').disabled = false;
		}		 
	}, 3000);
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();