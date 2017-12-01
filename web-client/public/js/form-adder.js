

$(document).ready(() => {
  let i = 0;
  function duplicate() {
    const original = $('#submitFormSmall');
    const neww = original.clone();
    const txt1 = $("<p></p>").text("Text.");
    original.append(txt1.clone());
    console.log(original);
    console.log(txt1);
    // console.log(neww);
    // neww.appendTo(neww.prevObject);
    // const clone = original.cloneNode(true); // "deep" clone
    i += 1;
    // clone.id = `duplicater${i}`; // there can only be one element with an ID
    // clone.onclick = duplicate; // event handlers are not cloned
    // original.parentNode.appendChild(clone);
  }
  $('#button-add-suspect').click(() => {
    duplicate();
  });
});
