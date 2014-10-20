var Song = Backbone.Model.extend({
  defaults: {
    name: "not specified",
    artist: "not specified"
  },
  initialize: function() {
    console.log("sample API call replacing name and artist");
  }
})