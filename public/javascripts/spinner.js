function increaseValue() {
    var money = document.getElementById('product_price').value
    
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
  }
  
  function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 2 ? value = 2 : '';
    value--;
    document.getElementById('number').value = value;
  }