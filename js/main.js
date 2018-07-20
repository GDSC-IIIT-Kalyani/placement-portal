var tagsBoxes = {
    el: [],
    data : [],
    init : function() {
        this.el = document.getElementsByClassName('tagsbox');
    },
    indexOf: function (val) {
        for (var i=0; i<this.el.length; i++) {
            if (this.el.item(i) === val)
                return i;
        }
        return -1;    
    },
    addTag : function (obj) {
        var box = obj.parentElement.parentElement;
        if (box) {
            var el_index = this.indexOf(box);
            if (el_index > -1) {
                var value = box.querySelector('input[type="textbox"]').value;
                console.log(value);
                if (value) {
                    if (!this.data[el_index])
                        this.data[el_index] = [];
                    this.data[el_index].push(value);
                    var tagContainer = box.getElementsByClassName('tags-container')[0];
                    console.log(tagContainer);
                    var newTag = document.createElement('div');
                    newTag.setAttribute("data-tagname", value);
                    newTag.style = "margin: 3px 3px; display: inline-block; padding: 5px 10px; \
                    background-color: rgb(24, 46, 82); color: white;";
                    newTag.innerHTML = value + '&nbsp;&nbsp;<a href="javascript:void(0)" onclick="tagsBoxes.removeTag(this)"><i class="fas fa-times"></i></a>';
                    tagContainer.appendChild(newTag);
                }
            }
        }
    },
    removeTag: function(obj) {
        var box = obj.parentElement.parentElement.parentElement;
        if (box) {
            var el_index = this.indexOf(box);
            if (el_index > -1) {
                var tag = obj.parentElement;
                var value = tag.getAttribute("data-tagname");
                var index = this.data[el_index].indexOf(value);
                this.data[el_index].splice(index, 1);
                obj.parentElement.parentElement.removeChild(obj.parentElement);
            }
        }
    },
};

tagsBoxes.init();