var numbers = {

  url: function(list) {
    return "/list.json";
  },

  getValue: function(element) {
    return element.drNumber;
  },

  ajaxSettings: {
    dataType: "json",
    method: "POST",
    data: {
      dataType: "json"
    }
  },

  preparePostData: function(data) {
    data.list = $("#sample-ajax-post").val();
    return data;
  }

};

$("#sample-ajax-post").autocomplete({
  source: numbers
});
