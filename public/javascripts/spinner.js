function increaseValue() {
    var money = document.getElementById('product_price').innerText
    var total_money = document.getElementById('total_pay');
    
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;

    

    total_money.innerHTML=money*value
  }
  
  function decreaseValue() {
    var money = document.getElementById('product_price').innerText
    var total_money = document.getElementById('total_pay');
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 2 ? value = 2 : '';
    value--;
    document.getElementById('number').value = value;
    total_money.innerHTML=money*value
  }