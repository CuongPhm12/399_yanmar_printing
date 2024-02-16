//$("#save_btn").hide();
$("#del_btn").hide();
$("#cust_btn1").hide();
$("#header-addrow").hide();
$("#header-delrow").hide();
$("#header-uprow").hide();
$("#header-downrow").hide();
$("#excelupload").hide();

$("#reset_btn")
  .after(`<div class="right-tap-btn ajaxset" id="print_btn_custom" style="">
									<span class="right-btn-text">Print</span></div>`);

const today = moment();
const lastDay = today.endOf("month").format("YYYY-MM-DD");
$(`#${itmobj1["from_date"]}`).val(moment().format("YYYY-MM-01"));
setItemDefaultValue(
  $("#" + itmobj1["from_date"]),
  moment().format("YYYY-MM-01")
);
$(`#${itmobj1["to_date"]}`).val(lastDay);
setItemDefaultValue($("#" + itmobj1["to_date"]), lastDay);

$("#reset_btn").on("click", function () {
  $(`#${itmobj1["from_date"]}`).val(moment().format("YYYY-MM-01"));
  $(`#${itmobj1["to_date"]}`).val(lastDay);
});

//for printing

$("#print_btn_custom").on("click", function (event) {
  const selectedRow = grid1.getCheckedRows();

  if (selectedRow.length === 1) {
    $("#print_btn").trigger("click");
  } else if (selectedRow.length >= 2) {
    msg("Cant print if selected row greater than 1 ");
    return;
  }
  if ($("#msgconfirm").is(":visible")) {
    $("#msgconfirm").dialog("destroy");
  }
});

$("#dfileModal").on("click", "a", function (event) {
  // var href = $(this).attr("href");

  // var txts = href.split("@");

  // href = "";
  // for(var i=1; i<txts.length; i++) {
  //     var fileExtension = txts[i].split(".").pop().toLowerCase();

  //     if(fileExtension == "pdf") {
  //         href = "/file/" + txts[i];
  //         break;
  //     }
  // }

  // if(href == "") {
  //     return;
  // }

  var href = $(this).attr("href");

  const fileExtension = href.split(".").pop().toLowerCase();

  if (fileExtension != "pdf") {
    return;
  }

  event.preventDefault(); // 클릭 이벤트 기본 동작 막기

  var gd1 = grid1.getCheckedRows();
  if (gd1.length == 0) {
    $("#" + itmobj1["pdf_file"]).val(href);
  } else {
    $("#" + itmobj1["pdf_file"]).val(href);
    grid1.setValue(gd1[0].rowKey, itmobj1["pdf_file"], href);
  }

  $("#cust_btn13").trigger("click");
});

$(
  ".editer-content2 #grid1 .tui-grid-lside-area .tui-grid-summary-area tr:first td:first"
).html(`<span style="font-weight:bold">합계</span>`);

$(`#${itmobj1["prod_type1_ser"]}`).select2();
$(`#${itmobj1["model_ser"]}`).select2();

$(window).on("resize", function () {
  var height =
    $(".right-content").height() -
    ($(".ui-widget-header").height() + $(".editer-content1").height() + 100);
  grid1.setHeight(height);
});

// $(`#${itmobj1["delv_file"]}_FILE`).attr("readonly", false).prop("disabled", false);
// $(`#${itmobj1["delv_file"]}`).attr("readonly", false).prop("disabled", false);
// $(`.editer-content1 .${itmobj1["delv_file"]}-ITEM`).hide();
$("#search_btn").trigger("click");
