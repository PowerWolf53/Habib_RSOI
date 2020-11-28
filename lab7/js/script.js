
$(document).ready(function () {

    $(document).ajaxStart(function () {
        $("#loader").fadeIn(500);
    });

    $(document).ajaxStop(function () {
        $("#loader").fadeOut(500);
    });

    $(document).ajaxSuccess(function () {
        $("#message").append("<span style=\"color:lime;\">Демонстрация обработчика метода ajaxSuccess</span><br>");
    });

    $(document).ajaxSend(function (e, xhr, opt) {
        $("#message").append("<span style=\"color:lime;\">Демонстрация обработчика метода ajaxSend</span><br>");
    });

    $(document).ajaxComplete(function (e, xhr, opt) {
        $("#message").append("<span style=\"color:lime;\">Демонстрация обработчика метода ajaxComplete</span><br>");
    });

    // $(document).ajaxError(function(e, xhr, opt){
    //     document.location.href = "error.html";
    // });


    $("#loader").hide();
    PopUpHide();


    $("#btn1").click(function () {
        $.post("../resource/response.xml",
            function (data, status) {

                $("#ftext").val($(data).find("year").text());
                $("#stext").val($(data).find("name").text());
                $("#ttext").val($(data).find("sity").text());
            });
    });

    $("#btn2").click(function () {
        $.getScript("../js/addscript.js", function (id) {
            PopUpShowFromExternalFile();
        });
    });

    $("#btn3").click(function () {
        $.post("../resource/response.xml",
            function (data, status) {
                var year = $(data).find("year").text();

                var now = new Date().getFullYear();
                var age = now - year;

                if ($("#radio1").prop("checked")) {
                    $("#add_text").css("font-size", "0.5em");

                } else if ($("#radio2").prop("checked")) {
                    $("#add_text").css("font-size", "0.7em");
                } else if ($("#radio3").prop("checked")) {
                    $("#add_text").css("font-size", "1em");
                }

                $("#add_text").val(age);
                var text = $("#university").text();

                $("#add_text").val(age + " " + text);
            });
    });
});


function PopUpShow() {
    $.get("../html/description.html", function (data, status) {
        $("#append").clone($(data).find("p").text());
    });
    $("#popup1").show();
}


function PopUpHide() {
    $("#popup1").click().hide();
}