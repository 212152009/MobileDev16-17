$.widget("idea.ideaList", {
	_create: function() {
		$.ajax({
			url: "/MobileDev16-17/WebService/ideas",
			dataType: "json",
			success: this._appendIdeas,
			context: this
		});
	},
	reload: function(){
		this.element.find(".idea:not(.template)").remove();
		$.ajax({
			url: "/MobileDev16-17/WebService/ideas",
			dataType: "json",
			success: this._appendIdeas,
			context: this
		});
	},
	_appendIdeas: function(ideas){
		var that = this;
		for(var i = 0; i < ideas.length; i++){
			var idea = ideas[i];
			var ideaElement = this.element.find(".template").clone().removeClass("template");
			ideaElement.find(".title").text(idea.title);
			ideaElement.find(".author").text(idea.author);
			ideaElement.click(idea.url, function(event){
				that._trigger("onIdeaClicked", null, event.data);
			});
			ideaElement.find(".delete_idea").click(idea.url, function(event){
				that._trigger("onDeleteClicked", null, event.data);
				return false;
			});
			ideaElement.find(".edit_idea").click(idea, function(event){
				that._trigger("onEditClicked", null, event.data);
				return false;
			});
			this.element.append(ideaElement);
		}
	}
});