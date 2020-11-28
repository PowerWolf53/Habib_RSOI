$(document).ready(function(){
  $("#btn1").click(function(){
    var d = {
        "email": $("#email").val(),
        "browser": $("#list").val(),
        "message": $("#message").val(),
        "remember": $("#remember").prop('checked'),
        "notify": $("#notify").prop('checked')
    };
    $.get("http://127.0.0.1:3000/new", d);
  });
  
  $("#btn2").click(function(){
      $.get("http://127.0.0.1:3000/txt", function(data, status){
            $("p.data").html('');
            $("p.data").append(data);
            
      });
  });
  
  $("#btn3").click(function(){
      $.get("http://127.0.0.1:3000/xml", function(xml, status){
            $("p.data").html('');
            $("p.data").append($(xml).find('email_key').text() + ":" + $(xml).find('email_value').text() + "<br>");
            $("p.data").append($(xml).find('browser_key').text() + ":" + $(xml).find('browser_value').text() + "<br>");
            $("p.data").append($(xml).find('message_key').text() + ":" + $(xml).find('message_value').text() + "<br>");
            $("p.data").append($(xml).find('remember_key').text() + ":" + $(xml).find('remember_value').text() + "<br>");
            $("p.data").append($(xml).find('notify_key').text() + ":" + $(xml).find('notify_value').text());
      });
  });
  
  
});