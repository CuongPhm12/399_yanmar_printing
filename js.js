$("#table_no_show").hide();

function getData() {
  let itemCode = $("#itemCode").text().trim();
  let prod_type1 = $("#prod_type1").text().trim();
  console.log(itemCode);
  const data_Send = {};
  data_Send.menucode = "M000000399";
  data_Send.type = "get_data";
  data_Send.header = JSON.stringify({ itemCode: itemCode });
  $.ajax({
    type: "post",
    url: "/ajax.do",
    data: data_Send,
    async: false,
    success: function (response, status, request) {
      const { print_data, sql } = JSON.parse(response.trim());
      console.log({ print_data, sql });

      var is_completee_last_page = "";
      for (let k = 0; k < print_data.length; k++) {
        // for(let l=0; l<print_data[k].length;l++){
        //   if(list_last_print_page[k].length>0){
        //  $(".last_page" + k).show();
        let item = print_data[k];

        let check_title = item.check_title || "";
        // // console.log(check_title)
        // if(check_title=="외관"){ count_one++}
        // else {count_two++}
        let check_item = item.check_item || "";
        let content = item.content || "";

        let newRow = `
                                  <tr class="rowsrepeat"  style="height: 40px;">
                                        <td style="width: 57.775px; height: 35px; text-align: center;">${check_title}</td>
                                        <td style="width: 198.288px; height: 35px;">${check_item}</td>
                                        <td style="width: 505.95px; height: 35px;">${content}</td>
                                        <td style="width: 122.162px; height: 35px; text-align: center;">합, 부</td>
                                    </tr>
                                    `;

        is_completee_last_page += newRow;
        //  }
        // }
      }
      $("#last_tr").after(is_completee_last_page);
      $("#prod_type1_text").text(prod_type1 + " 입고검사 기준서");
    },
    error: function (xmlHttpRequest, txtStatus, errorThrown) {
      console.log("erorr");
    },
  });
}
getData();
//rowspan
$(document).ready(function () {
  // Loop through each row with class "rowsrepeat"
  $(".rowsrepeat").each(function (index) {
    // Get the text content of the first td element within the current row
    var currentText = $(this).find("td:first").text();
    // If the currentText matches "외관" or "기타"
    if (currentText === "외관" || currentText === "기타") {
      // Get the number of rowspans needed
      var rowspan = $(".rowsrepeat").filter(function () {
        return $(this).find("td:first").text() === currentText;
      }).length;
      // If it's the first row with the value "외관" or "기타", set the rowspan
      if (
        index === 0 ||
        $(this).prev().find("td:first").text() !== currentText
      ) {
        $(this).find("td:first").attr("rowspan", rowspan);
      } else {
        // If not, hide the current td element
        $(this).find("td:first").hide();
      }
    }
  });
});
