function onDragStart(event) {
  event.dataTransfer.setData("text", event.target.getAttribute('id'));
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(e) {
  e.preventDefault();
  var data = e.dataTransfer.getData("text");
  // console.log('data ' + data);
  var item = document.getElementById(data);
  // console.log('item ' + data);
  if (item) {
    // debugger;
    //добавить возможность перетаскивания друг на друга
    let targetDiv = e.target;
    var previousBoard = item.closest('.panels-board');
    var targetBoard = e.target.closest('.panels-board');
    // console.log(previousBoard);
    state.moveItemToOtherPanel(previousBoard.id, targetBoard.id, item.id)
    targetBoard.getElementsByClassName('list-group')[0].appendChild(item);
    var highlighted = document.getElementsByClassName('on-delete');
    for (let elem of highlighted) {
        elem.className = elem.className.replace('on-delete', '');
    }
    // document.getElementsByClassName('alert-danger').forEach(function(elem){
      // elem.className = elem.className.replace('alert-danger', '');
    // });
  } else {
    console.error('Cannot find element, event:', e)
  }
}

function dropDel(event){
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var item = document.getElementById(data);
  var previousBoard = item.closest('.panels-board');
  if (item) {
    var targetDiv = event.target;
    
    state.deleteItemFromState(previousBoard.id, item)
    item.remove();
    // можно как-то более изящно
    localStorage.state = JSON.stringify(state);

    var highlighted = document.getElementsByClassName('on-delete');
    for (let elem of highlighted) {
        // elem.className = elem.className.replace('on-delete', '');
        elem.className = 'col-sm';
    }

  }else {
    console.error('Cannot find element to Delete, event:', event)
  }
}

function onDragLeave(event){
      // console.log(event.target.className)
      event.target.className = 'col-sm';
}

function dragOverDelBut(event){
  // console.log(event.dataTransfer.myCount)
  // if ( event.dataTransfer.myCount !== 1){
  //     event.dataTransfer.myCount = 0}
  //   // console.log('dataTransfer '+ event.dataTransfer.files)
  //   // event.dataTransfer.myP = 1;
  //   // var a = event.dataTransfer.items;
  //   // var b = event.dataTransfer.myP;
  //   // debugger
  //   if (event.dataTransfer.myCount === 0){
  //       console.log('hey')
  //       allowDrop(event);
  //       event.currentTarget.className += ' on-delete'
  //       event.myCount = 'dedined';
  //       event.dataTransfer.myCount++;
  //       console.log(event.dataTransfer.myCount)
  //       }


  allowDrop(event);
  event.currentTarget.className = 'col-sm on-delete';
}


/* events fired on the drop targets */
// document.addEventListener("dragenter", function(event) {
//   // prevent default to allow drop

  

  
//   // console.log('enter:' + event.toElement.id);
//   // if (event.fromElement != null){
//   //   console.log('leave:' + event.fromElement.id);
//   // }else {
//   //   console.log('leave:none');
//   // }
  
//   event.preventDefault();
//   // 
// }, false);

// document.addEventListener("dragleave", function(event) {
//   // prevent default to allow drop
//   event.preventDefault();
//   var fromElement = event.fromElement;
//   if (
//       fromElement.className == 'row' ||
//       fromElement.className == 'container' || 
//       fromElement.tagName == 'span' || 
//       fromElement.tagName == 'html' || 
//       fromElement.tagName == 'body'
//     ){
//     return false;
//   }
//   var toElement = event.toElement;
//   console.log(fromElement);
//   if (fromElement == null || toElement == null){
//     return false;
//   }
//   if (fromElement.id != 'trash'){
//     addClass = ' alert-info'; 
//   } else {
//     if (event.fromElement.className.indexOf('panel-board') == -1){
//       fromElement = event.fromElement.closest('.panels-board');
//     }  
//   }
//   var addClass = ' alert-info';
//   if (event.toElement.className.indexOf('panel-board') == -1){
//     toElement = event.toElement.closest('.panels-board');
//   }

  

//   if (fromElement != null){
//     fromElement.className += addClass;
//   }
//   if (toElement != null){
//     toElement.className = toElement.className.replace(addClass, ''); 
//   }
// }, false);

